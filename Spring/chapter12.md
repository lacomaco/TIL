# 커맨드 객체 값 검증, 에러메시지 처리하기.

커맨드 객체를 사용하기 위해서는 Validator 인터페이스를 , 에러처리하기 위해선 Errors 인터페이스가 필요하다. 둘다 validation에 있다.

```java
public interface Validator{
    boolean supports<Class<?> clazz); //validator 가능한지 검토.
    void validate(Object target,Errors errors); //target에 검증할 커맨드 객체가, errors에 에러메시지 출력용.
}
```

validator 샘플코드.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import spring.RegisterRequest;

//Validator 인터페이스 적용.
public class RegisterRequestValidator implements Validator {
    //정규식
	private static final String emailRegExp = 
			"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
			"[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    //정규식 담을 pattern.
	private Pattern pattern;

	public RegisterRequestValidator() {
        //객체가 생성되면 정규식을 패턴에 주입한다.
		pattern = Pattern.compile(emailRegExp);
		System.out.println("RegisterRequestValidator#new(): " + this);
	}

	@Override
    //clazz객체가 RegisterRequest 클래스로 타입 변경이 가능한지 확인한다. 
    //RegisterRequest를 검증해야하니 RegisterRequest로 타입변경이 가능한지 확인해야한다.
	public boolean supports(Class<?> clazz) {
		return RegisterRequest.class.isAssignableFrom(clazz);
	}

	@Override
    //target 파라미터는 검증할 검사 객체, errors는 결과 에러코드를 설정하기 위한 객체이다.
	public void validate(Object target, Errors errors) {
		System.out.println("RegisterRequestValidator#validate(): " + this);
        //target 객체를 RegisterRequest로 강제형변환.
		RegisterRequest regReq = (RegisterRequest) target;
		if (regReq.getEmail() == null || regReq.getEmail().trim().isEmpty()) {
            //errors rejectValue에 key-value 처럼 에러메시지를 추가한다.
			errors.rejectValue("email", "required");
		} else {
			Matcher matcher = pattern.matcher(regReq.getEmail());
			if (!matcher.matches()) {
				errors.rejectValue("email", "bad");
			}
        }

        //ValidationUtils는 검증 코드를 간결하게 해줌. 이경우엔 검사 대상 객체의 name 프로퍼티가 없거나 공백이면 required를 추가. 
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "required");
        //이경우엔 passowrd 프로퍼티가 비어있다면 required를 추가해준다.
		ValidationUtils.rejectIfEmpty(errors, "password", "required");
		ValidationUtils.rejectIfEmpty(errors, "confirmPassword", "required");
		if (!regReq.getPassword().isEmpty()) {
			if (!regReq.isPasswordEqualToConfirmPassword()) {
				errors.rejectValue("confirmPassword", "nomatch");
			}
		}
	}

}
```

에러 검증코드 사용법

```java
@Controller
public class test{
    @Autowired
    private MemberRegisterService memberRegisterService;

    @PostMapping("/test3")
    public String handler3(RegisterRequest reg,Errors errors){
        new RegisterRequestValidator().validate(reg,errors);
        if(errors.hasErrors()){
            return "register/step2";
        }
        ...

    }
}
```

반드시 검증객체 뒤에 errors가 와야한다.

검증후에 에러가 존재한다면 hasErrors 메소드를 통해서 유무를 볼 수 있다.

errors.rejct();는 커맨드 객체 자체에 에러가 붙어있을경우 사용하는것이다. rejectValue는 key-value 쌍으로 붙여줘야하지만
reject는 errors.reject("noName"); 식으로 바로 커맨드 객체 자체에 에러를 추가하는것이 가능하다.
reject는 글로벌 에러라고 부른다.

# 2. Errors와 ValidationUtils 클래스의 주요 메서드.
reject, rejectValue가 있음.

ValidationUtils에는 
rejectIfEmpty(Errors erros,String field,String errorCode);
rejectIfEmptyOrWhitespace 메소드들이 있음.

커맨드 객체를 통해서 검출된 에러는

JSP에서 <form:errors path="..."> 을통해서 출력하는것이 가능하다.

만약 registerRequest 커맨드 객체를 검증하는데
errors.rejectValue("email","required");가 붙어있다면 에러 메시지는 다음 순서로 검색된다.

1. required.registerRequest.email
2. required.email
3. required.String
4. required

에러코드가 2개 이상 있을시 위의 순서로 검색한다.

# 4. 글로벌 범위 Validator와 컨트롤러 범위 Validator

@Valid 애노테이션을 이용해서 커맨드 객체 검증 기능을 사용할 수 있음.

글로벌 범위 Validator는 모든 컨트롤러에 적용가능한 Validator를 의미함.

우선은 WevMvcConfigurer가 적용된 스프링 설정 파일에

```java
@Override
public Validator getValidator(){
    return new RegisterRequestValidator();
}
```
로 정의한 검증 객체를 등록해야한다.

등록된 글로벌 범위 객체는 @Valid 애노테이션을 이용해서 손쉽게 적용이 가능하다.

```java
public String handle(@Valid RegisterRequest regReq,Erros errors){
    ...
}
```

요청메서드가 실행전에 검증을 수행하고 그 결과를 errors에 적용한다.

# @InitBinder 애노테이션을 이용한 컨트롤러 범위 Validator
글로벌이 아닌 컨트롤러 에서만 쓰이는 범위 Validator도 설정이 가능하다.

방법은 간단하다. 컨트롤러에 @InitBinder가 붙은 메소드가 바인더를 리턴하면된다.

```java
@InitBinder
protected void initBinder(WebDataBinder binder){
    binder.setValidator(new RegisterRequestValidator());
}
```

그후 @Valid를 붙이면된다.

컨트롤러에선 글로벌 Validator보터 InitValidator가 더 우선순위가 높다.

# Bean Validation을 이용한 값 검증 처리.

@Valid이외에 @NotNull,@Digits,@Size 등의 애노테이션으로 복잡하고 긴 Validator 구현하지않고 손쉽게 커맨드객체 값 검증이 가능하다.

그러기 위해선 validation-api 라는 javax.validation 아티팩트를 추가해야하고

책에선 hibernate-validator를 사용하였다.

이것은 커맨드객체에 값 검증 규칙을 올리기만하면된다.

```java
public class RegisterRequest{
    @NotBlank
    @Email
    private String email;
    @Size(min=6)
    private String password;
    @NotEmpty
    private String confirmPassword;
    .....
}
```

자동으로 값들을 검증해준다.

BeanValidation을 사용하기 위해선 OptionalValidationFactoryBean을 빈으로 등록해야한다.

```java
@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer{

}
```
사실 EnableWebMvc가 자동으로 추가해준다 ㅋㅋ

그후 @Valid를 붙이면 Bean ValidatioN이 작동한다.

글로벌 범위 Validation이 있다면 작동하지 않는다.

@AssertTrue : true인지 아닌지 검사. null은 유효하다고 판단
@DecimalMax(String value,boolean inclusive) : 지정한 값보다 큰지 검토
@Max
@Min(long value) : 지정한 값보다 크거나 작은지 검토. null 유효
@Digits(int integer) : 자릿수가 지정한 크기를 넘는지 검토.
@Size(int min,int max) : 길이나 크기가 범이ㅜ 안에 있는지 확인
@Null
@NotNull : null인지 아닌지 검사.
@Patter(String regexp) : 정규식에 맞는지 검사.
@NotEmpty : qlwl dksgdkdigka.
@NotBlank : 공백이 아니어야함.
@Email : 이메일 주소 유효 
@Positive 
@Negative
@Future : 미래 시간인지 검사.
@Past : 과거 시간인지 검사.