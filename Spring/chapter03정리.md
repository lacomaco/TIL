스프링은 DI를 지원함.

DI는 @Autowired로 이용할 수 있고 스프링 컨텍스트에 Bean으로써 올라가있는것만 끌어올 수 있음.

따라서 @Autowired 하고 싶다면 스프링 빈을 컨텍스트에 올려야함.

(@Autowired는 의존 주입 대상을 스프링 컨텍스트에서 찾아 자동으로 주입해줌. 설정 클래스에서도 사용할 수 잇는데 , 스프링은 설정 클래스를 내부적으로 스프링 빈으로 등록시키고 다른빈과 마찬가지로 @Autowired가 붙은 대상을 주입 시켜줌.)

스프링 빈은 @Bean annotation을 이용해 만듬.

```java
    @Bean
    public MemberDao memberDao(){
        return new MemberDao();
    }
```

리턴되는 객체를 스프링 빈에 올림.

스프링 Bean은 @Configuration에서 어노테이션이 올라간 스프링 설정 클래스에 넣어줘야한다.

스프링 app을 실행시킬려면 스프링 설정 클래스를 스프링 컨테이너에 넣어야한다.

ApplicationContext ctx= new AnnotationConfigApplicationContext([@Configuration class]);으러 넣어주면

어노테이션 설정 어플리케이션 컨텍스트가 생성되어 컨택스트에 올라가게 된다.

설정클래스 내의 빈들이 모두 컨텍스트에 올라오면

ctx.getBean("BeanName",Bean.class); 를 통해서 얻어오는것이 가능하다.
ex) ctx.getBean("Controller",Controller.class);

Bean의 이름은 @Bean 어노테이션을 올린 메소드의 이름이다.

또한 스프링은 기본적으로 싱글톤 방식으로 컨텍스트에 올린다.

@Bean으로 올라간 클래스가 여러번 호출된다고 매번 새로운 객체가 생성되는것이 아니다.

===
스프링 설정파일을 합치는 방법

@Import 를 사용하면 된다.

```java
@Configuration
@Import(AppConf2.class)
public class AppCtx{
    @Bean
    public MemberDao memberDao(){
        return new MemberDao();
    }
}
```
