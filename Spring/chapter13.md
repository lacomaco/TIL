세션,인터셉터,쿠키

# 컨트롤러에서 HTTP SESSION 이용하기.
세션 : 서버 메모리에 데이터를 올림 반 영구적 상호작용적인 정보 교환 ??
쿠키 : 서버에서 브라우저로 토큰을 발급. 프론트로 노출됨.

Session을 쓰는법 

방법 1. HttpSession 객체를 컨트롤러 메소드 인자에 삽입한다.
```java
@PostMapping
public String form(LoginCommac loginCommand,Errors errors,HttpSession session){
    ...
}
```

방법 2. HttpServletRequest의 getSession()을 사용한다.

```java
@PostMapping
public String submit(LoginCommand loginCommand,Erros errors,HttpServletRequest req){
    HttpSession session=req.getSession();
    ....
}
```

세션은 session.setAttribute("key",value); 쌍으로 key-value형식으로 데이터를 저장한다.

세션을 파기하고 싶다면 session.invalidate()를 호출하면된다.

# 인터셉터.

HandlerInterceptor를 다수 컨트롤러에게 동일한 기능을 사용해야할때 인터셉터를 활용한다.

인터셉터는 preHandler,postHandler,afterCompletion등이 있다.
preHandle(HttpServletRequest request,HttpServletResponse response,Object handler) throws Exception;
postHandle(HttpServletRequest request,HttpServletResponse response,Object handler,ModelAndView modelAndView) throws Exception;
afterCompletion(HttpServletRequest request,HttpServletResponse response,Object handler,Exception ex) throws Exception;

preHandle이 false를 리턴하면 다음것은 실행하지 않음.
post는 컨트롤러가 발생하고 실행됨
afterCompletion은 컨트롤러가 뷰를 발생시키면 실행됨.
dispatcher -> handleInter -> HandleAdapter->view 순으로 동작하고. 인터셉터가 필터링 역할을 수행함.

적용하고자 하는 클래스에 HandlerInterceptor를 적용한 핸들러 객체를 만들고

@EnableWebMvc가 있는 WebMvcCOnfigurer 클래스에 인터페이스가 어디에 적용될것인지 설정하면 된다.

```java
@Configuration
@EnableWebMvc
....
@Override
public void addInterceptors(InterceptorRegistry registry){
    registry.addInterceptor(authCheckInterceptor()).addPathPatterns("/edit/**"); //어디에 적용될것인지 Pattern적용
    //authCheckInterceptor 인터셉터 객체가 적용될것이라고 선언
}

@Bean
public AuthCheckInterceptor authCheckInterceptor(){
    return new AuthCheckInterceptor();
}

```

# 컨트롤러에서 쿠키 쓰기
@CookieValue 애노테이션을 사용.
컨트롤러에 쿠키 애노테이션이 붙은 메서드를 씀

```java
@GetMapping
public String form(LoginCommand loginCommand,@CookieValue(value="REMEMBER",required=false) Cookie rCookie){
    if(rCookie!=null){
        ....
    }
    ...
}
```

rCookie라는 쿠키 애노테이션이 붙은 쿠키를 타입으로 받는다.
쿠키 이름이 REMEMBER인 쿠키를 전달받는다. 없다면 null값이 들어온다.

쿠키를 생성하는 방법
```java
@PostMapping
public String submit(LoginCommand loginCommand,Errors errors,HttpSession session,HttpServletResponse response){
    ...
    Cookie rememberCookie=new Cookie("name",value);
    rememberCookie.setPath("/");
    rememberCookie.setMaxAge(60*60*24*30);
    response.addCookie(rememberCookie);
}
```
HttpServletResponse 있어야함.
