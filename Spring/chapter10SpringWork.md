```java
@Configuration
@EnableWebMvc
//EnableWebMvc 어노테이션을 붙이면 , HandlerMapping, HandlerAdapter와 관련된 설정이 자동으로 추가된다.
public class MvcConfig implements WebMvcConfigurer{
    //WebMvcConfigurer 인터페이스를 상속하여서 MvcConfig 클래스는 WebMvcConfigurer 타입 민이 된다.
    //왜 이런식으로 하냐면 스프링에선 @EnableWebMvc애노테이션을 사용하면 WebMvcConfigurer 타입 빈 객체의 메서드를 호출해서 MVC 설정을 추가하기 때문에
    //이 MvcConfig 클래스가 WMC 타입인 빈일 필요성이 있다. 
    @Override
    //viewResolver가 아닌 모든 요청은 이 DefaultServletHandling이 처리한다.
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer){
        configurer.enable();
    }

    @Override
    //ViewResolver 설정. prefix인 WEB-INF/view + 뷰 이름 + suffixdls .jsp 인 뷰 코드를 요청한다.
    //컨트롤러에서 넘어오는 값은 ModelAndView 객체에 key-value 쌍으로 넘어오는데 이를 ViewResolver가
    //request 영역에 속성으로 저장하게된다. View 들은 해당 속성에 접근해서 값을 가져오는것이 가능하다.
    public void configureViewResolvers(ViewResolverRegistry registry){
        registry.jsp("/WEB-INF/view/",".jsp");
    }
}
```

스프링 MVC가 동작하는 구조.

1. 웹브라우저에게 리퀘스트가 오면 스프링의 dispatcherServlet이 받는다.
2. 리퀘스트에 해당하는 컨트롤러가 있는지 HandlerMapping을 통해 찾는다.
3. 컨트롤러에게 일을 위임하기 위해 HandlerAdapter를 호출한다. Adapter는 컨트롤러에게 일을 시키고 받은 결과를 servlet에 반환한다.
4. 반환된 값은 ModelAndView 객체를 통해서 리턴되는데, 이 값을 ViewResolver에 설정된 뷰를 호출하고 값을 적용한다.
5. view를 생성하면 사용자에게 응답을 보낸다.

중앙에서 DispatcherServlet이 모든 일에 대해 관여하고 조율한다.

HandlerMapping은 모든 컨트롤러에 대한 정보를 담고 적절한 컨트롤러를 요청한다.

HandlerAdapter는 여러 핸들러 타입을 처리하기 위한 추상 인터페이스이다.

ViewResolver는 뷰 이름에 맞는 객체를 찾는다. 맨위의 코드중 configureViewResolvers가 뷰가 위치한 기본적 위치를 지정하 ㄴ것이고

DefaultSefvletHandling은 css js같은 뷰가 아닌 다른 파일을 찾기 위한 설정이라고 이해하면 된다.

DispatcherServlet은 실행이 되면 web.xml 설정에 따라 이루어진다.

```xml
<servlet>
    <!-- servlet dispatcher 선언. 디스패쳐가 있는곳을 servlet-class로 지정하고 init-param에 파라미터를 넣어준다.-->
		<servlet-name>dispatcher</servlet-name>
		<servlet-class>
			org.springframework.web.servlet.DispatcherServlet
		</servlet-class>
		<init-param>
        <!-- 자바 설정을 사용하는 경우 AnnotationConfigWebApplicationContext 클래스를 사용한다.-->
			<param-name>contextClass</param-name>
			<param-value>
				org.springframework.web.context.support.AnnotationConfigWebApplicationContext
			</param-value>
		</init-param>
		<init-param>
        <!-- 스프링 설정 클래스를 contextConfigLocation에 지정한다. 이를 스프링이 읽어 스프링 MVC용 빈으로 올린다.
        우리 코드는 config 패키지 내의 MvcConfig, ControllerConfig만 Config 클래스로 인지하고 읽어들인다.
        줄바꿈은 컴마나 일반적인 줄바꿈으로 한다.
        -->
			<param-name>contextConfigLocation</param-name>
			<param-value>
				config.MvcConfig
				config.ControllerConfig
			</param-value>
		</init-param>
        <!-- 웹 서버가 동작하면 이 서블릿도 같이 실행된다.-->
		<load-on-startup>1</load-on-startup>
	</servlet>
```
servlet으로 설정된 xml에 따라 이루어진다. 스프링 빈이 자동으로 설정되는 것도 우리가 contextClass로 스프링 어노테이션을 쓴다는것을 선언하고
초기 설정을 담은 MvcConfig와 ControllerConfig도 contextConfigLocation이라는 이름으로 설정의 이름과 위치를 선언해 주었기 때문에
dispatcherServlet에서 이 소스를 끌어와 스프링 빈으로 만들어 낸것이다.

