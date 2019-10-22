src/main/webapp폴더에 HTML CSS JS JSP등 을 배치함.
src/main/webapp/WEB-INF폴더에는 pom.xml을 배치한다. 이 xml을 통해서 메이븐에 프로그램을 설치한다.
javax.servlet-api,
javax.servlet.jsp-api
spring-webmvc등 개발에 필요한 의존을 설정한다. 서블릿 3.1부터 JSTL사용이 가능함.

ex)
```gradle
apply plugin:'java'
apply plugin:'war'

sourceCompatibility=1.8
targetCompatibility=1.8
compileJava.options.encoding='UTF-8'

repositores{
    mavenCentral()
}

dependencies{
    providedCompile 'javax.servlet:javax.servlet-api:3.1.0'
    providedRuntime 'javax:servlet.jsp:javax.servlet.jsp-api:2.3.2-b02'
    compile 'javax.servlet:jstl:1.2'
    compile 'org.springframework:spring-webmvc:5.0.2.RELEASE'
}

task wrapper(type: Wrapper){
    gradleVersion='4.4'
}
```

스프링 MVC를 위한 설정.

스프링 MVC를 설정하기 위해선 우선 스프링 DispatcherServlet설정과 MVC주요 설정들이 이루어져야한다.(viewResolver,HandlerMapping)

```java
@Configuration
//EnableWebMvc를 적용하면 스프링 MVC 설정을 자동으로 활성화시켜준다,
@EnableWebMvc
//WebMvcConfigurer 인터페이스를 적용한다.
public class MvcConfig implements WebMvcConfigurer{
    @Override
    //DispatcherServlet 매핑 경로에 대한 설정이다. HTML CSS같은 뷰리솔버에 검색되지 않는것을 자동으로 처리해준다. 디폴트 서블릿으로
    public void configureDefaultServletHandler(DefaultServletHandlerConfigurer configurer){
        configurer.enable();
    }

    @Override
    //기본 뷰 리솔버를 설정한다. .jsp붙은 것을 기본 뷰리솔버로 설정한다.
    public void configureViewResolvers(ViewResolverRegistry registry){
        registry.jsp("/WEB-INF/view/",".jsp");
    }
}
```

web.xml로 DispatcherServlet 처리하기.

web.xml과 pom.xml은 다르다. web.xml은 스프링 디스페쳐 서블릿을 설정하기 위한 xml파일이다.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
             http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
	version="3.1">

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
    <!-- servlet이 실행될 수 있도록 서블릿을 매핑한다. 위경우 /의 하위는 모두 서블릿의 영역이 된다.-->
	<servlet-mapping>
		<servlet-name>dispatcher</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>

	<filter>
    <!-- Character EncodingFilter는
    HTTP 요청 파라미터 인코딩을 위한 서블릿 필터다. 파라미터를 읽어들일때 이 서블릿 필더를 쓴다.-->
		<filter-name>encodingFilter</filter-name>
		<filter-class>
			org.springframework.web.filter.CharacterEncodingFilter
		</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>encodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

</web-app>
```

스프링 컨트롤러는 대략 이렇게 생겼다!

```java
@Controller
public class HelloController{
    @GetMapping("/hello")
    public String hello(Model model,@RequestParam(value="name",required=false) String name){
        model.addAttribute("greeting","hithere!"+name);
        return "hello!";
    }
}
```

@Controller 어노테이션은 이것이 스프링 MVC중 컨틀롤러임을 선언해준다.

@GetMapping으로 HTTP 요청 메소드를 지정한다. 자매품으로 @PostMapping 이 있다.

@Model은 컨트롤러에서 처리된 값이 뷰로 전달되어야 할 경우 Model 파라미터에 Key-Value 형식으로 값을 담아 출력한다.

@RequestParam은 HTTP GET으로 들어온 파라미터의 값을 축출하여 컨트롤러 인자로 값을 넘겨준다. 위경우 /hello?name='vla'가 왔다면
name은 vla가된다.

마지막으로 return문으로 무언가를 리턴했는데. 실제로 값이 리턴되는 것이 아닌 뷰를 리턴하게된다. 우리는 configureViewResolver로 jsp를 쓴다고

선언했기 때문에 hello.jsp를 찾아 클라이언트에게 보여지게 된다.

물론 이 컨트롤러 객체를 사용할려면 스프링 빈에 올라가야한다. 우리가 web.xml에서 

contextConfigLocation에 config.MvcConfig와 config.ControllerConfig를 선언했던것을 기억하자 ControllerConfig에

우리 컨트롤러를 올리면 스프링 서블릿이 이를 읽어 빈에 올리게 된다.

```java
@Configuration
public class ControllerConfig{
    @Bean
    public HelloController helloController(){
        return new HelloController();
    }
}
```

or

```java
@Configuration
@ComponentScan(basePackages={"controller"})
public class ControllerConfig{

}
```