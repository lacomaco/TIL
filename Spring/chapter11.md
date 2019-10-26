Spring MVC 1.요청 매핑, 커맨드 객체, 리다이렉트 , 폼 태그, 모델

# 1. 요청매핑 어노테이션
(컨트롤러 범주에 포함됨)
@GetMapping,@PostMapping,@RequestMapping
애노테이션 내부에 들어간 값이 매핑 위치
ex)

```java
@Controller
@RequestMapping("/hello")
public class HelloController{
    @GetMapping("/hi")
    public String SayHi(Model model){
        model.addAttribute("say","hi");
        return "hi";
    }
}
// hello/hi Get Method로 호출.
// hi.jsp를 찾아 response
```

# 2. 요청 파라미터에 접근하는 방법

첫번째 방법 HttpServletRequest를 이용하는 방법.

```java
@Controller
@RequestMapping("/hello")
public class HelloController{
    @GetMapping("/hi")
    public String SayHi(Model model){
        model.addAttribute("say","hi");
        return "hi";
    }

    @PostMapping("/hi2")
    public String hi2(Model model,HttpServletRequest request){
        String temp=request.getParameter("get");
        model.addAttribute("gi",temp);
        return "hi2/hi2";
    }
}
```

일일히 getParameter로 파라미터를 모두 옮겨야하는 수고가 있다.

이를 @RequestParam 애노테이션을 이용해서 처리할 수 있따.

```java
@Controller
@RequestMapping("/hello")
public class HelloController{
    @GetMapping("/hi")
    public String SayHi(Model model){
        model.addAttribute("say","hi");
        return "hi";
    }
    @PostMapping("/hi2")
    public String hi2(Model model,@RequestParam(value="get",defaultValue="false") Boolean request){
        model.addAttribute("gi",request);
        return "hi2/hi2";
    }
}
```

직감적으로 알 수 있다. @RequestParam의 value값이 매핑되는 파라미터이다. 이를 request에 담아서 전달된다. defaultValue를 false로 지정했기에
만약 해당파라미터 값이 없다면 request는 Boolean false 값이 들어온다.

팔수 여부는 애노테아션 값으로 required로 지정하는겂이 가능하다. required는 기본값이 true이고 파라미터 값이 없고 defaultValue도 지정되지 않았다면
익셉션을 발효한다.

보통은 파라미터 값은 String으로 나오지만  Boolean,int,long등 타입을 지정해주면 타입에 맞게 형변환 시켜 값을 주입시켜준다.

# 3. 리다이렉트 처리
리턴으로 "redirect:경로" 넣어주면된다.
예를들어 

```java
@Controller
@RequestMapping("/hello")
public class HelloController{
    @GetMapping("/hi")
    public String SayHi(Model model){
        model.addAttribute("say","hi");
        return "hi";
    }
    @PostMapping("/hi2")
    public String hi2(Model model,@RequestParam(value="get",defaultValue="false") Boolean request){
        model.addAttribute("gi",request);
        return "hi2/hi2";
    }
    @GetMapping("/redirect")
    public String re(Model model){
        return "redirect:/hello/hi";
    }
}
```

redirect를 호출하게되면 hello/hi로 리다이렉트하게된다. /로 시작하면 절대경로롤, /로 시작하지 않으면 현재 기준 상대경로로 이동한다.


# 4. 커맨드 객체

커맨드 객체는, http 파라미터의 값을 자바 객체에 맞춰서 받아주는 편리한 기능이다. 커맨드 객체는 반드시 setter 함수가 부착되어야한다.

```java
class test{
    string hi;
    string there;
    public void setHi(String hi){
        ...
    }
    public void setThere(String there){
        ...
    }
}

@Controller
public class Test{
    @GetMapping("/tt/tt")
    public String tt(test test){
        ...
    }
}
```

이경우 test 객체에 맞춰서 파라미터가 주입되어 test객체를 통해서 값을 가져오는것이 가능하다.

# 5. JSP 코드에서 커맨드 객체 가져오기.
놀랍게도. model 객체에 넣어주지 않아도 스프링에선 커맨드 객체가 바로 뷰로 데이터를 넘긴다. 마법이다 마법
위경우 jsp 같은 템플릿에서 test (반드시 가장 첫번째 글자는 소문자로 바뀐다.) 로 접근해서 사용하는것이 가능하다.
# 6. modelAttribute로 커맨드 객체 속성 이름 변경하는법
@ModelAttribute("formData") 이런 애노테이션을 사용하면 커맨드 객체의 이름을 바꿀 수 있따 . 위 경우엔

```java
@Controller
public class Test{
    @GetMapping("/tt/tt")
    public String tt(@ModelAttribute("TTY") test test){
        ...
    }
}
```

뷰에서 tTY 를통해서 커맨드 객체에 접근할 수 있다.

# 7. 스프링 폼
스프링에선 <form:form> , <form:input> 과 같은 태그를 제공한다.
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

예를들어
<form:form action="step3" modelAttribute="registerRequest">
<form:input path="email"/>
<form:input path="name"/>
<form:input path="password"/>
<form:input path="confirmPassword"/>
</form>
이라면 
action은 리쿼스트 날릴 주소.
modelAttribute는 사용할 모델객체를 지정하는 것이고
아래 form:input의 path에 지정한 모델객체의 값이 input 태그의 value로 들어가서 자동으로 나오게 된다.

# 8. 컨트롤러 구현 없는 경로 매핑
그냥 단순히 페이지를 쏴주는 용도라면 컨트롤러가 필요하지 않다 . 그럴경우 스프링 WebMvcConfigurer 인터페이스의 addViewControlelrs()를 조작한다.
```java
@Override
public void addViewControllers(ViewControllerRegistry registry){
    registry.addViewController("/main").setViewName("main");
}
```
# 9. 중첩 콜렉션 프로퍼티.
```java
public class Respondent{
    private int age;
    private String location;
}

public class AnsweredData{
    private List<String> responses;
    private Respondent res;
}
```

위처럼 커맨드 객체에 , 커맨드 객체가 있고 커맨드 객체 필드가 List같은 가변 크기를 가진 경우엔 어떻게 될까?
스프링에선 이런 중첩프로퍼티도 처리할 수 있게 커맨드 객체를 설정해주는 기능을 제공한다.

1. HTTP request parameter가 프로퍼티이름[인덱스] 형식이라면, List 타입 프로퍼티로 인식하고 처리하게 한다.
2. HTTP request parameter가 프로퍼티이름.프로퍼티이름 이라면 중첩 프로퍼티로 인지하고처리한다.

단순하게 responses[0]이라면 위의 List 타입 프로퍼티로.
res.age=value 라면 res로 처리한다.

# 9. 주요 폼태그들
우리는 위에서 <form:form>,<form:input>을 보았다. 그 외에도 많다구!

<form:form> 태그에서 action 속성을 지정하지 않으면 method는 기본값으로 post, action은 현재 요청 URL로 된다.
modelAttribute로 커맨드객체를 선택해야한다.

<form:input> <form:password> <form:hidden>은 위와같다. path로 커맨드객체 필드를 지정하면된다.

<select> 태그들도 존재한다. <form:select>,<form:options>,<form:option>

<form:select path="loginType" items="${loginTypes}>

model 객체내부의 loginTypes객체를 끌어와 배치 select 태그의 이름은 loginType이된다.

<form:checkboxes> <form:checkbox>

<form:radiobuttons> <form:radiobutton> 등의 테그들도 있다. 궁금하면 검색해서 보는것이 나을듯
