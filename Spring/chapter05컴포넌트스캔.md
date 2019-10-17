@ComponentScan애노테이션이 컴포넌트 스캔을 해주는 어노테이션
@Component 애노테이션이 컴포넌트임을 선언해주는 어노테이션.

왜 쓰는가? 컴포넌트스캔 어노테이션에 있는 주소의 컴포넌트 클래스를 스프링이 인식하여 스프링 빈으로 컨텍스트에 올리기 때문에 설정 클래스의 크기가 줄어든다.

@Component(name) 으로 name의 값으로 스프링 빈에 올라감. 없다면 기본값인 클래스 이름으로 올라감 단 첫글자는 소문자로 강제로 변환되서 올라간다.

```java
@Component("test")
public class test{
    @Autowired
    private tempo hi;
}
```

ComponentScan(지정자)
```java
@Configuration
@ComponentScan(basPackages={"test"},excludeFilters=@Filter(type=FilterType.ASPECTJ,pattern="test.*Dao"))
public class configClass{
    @Bean
    @Qualifier("test2")
    public MemberDao memberDao(){
        return new MemberDao();
    }
}
```

지정자에 위치한 하위 패키지 목록을 대상으로 지정하고, 하위 패키지에 잇는 @Component들을 모두 스캔하여 빈으로 올린다.

excludeFilters는 하위 패키지중에서 스캔하고 싶지 않은곳을 지정할떄 쓴다.

위의 경우엔 test패키지에서 Dao로 끝내는 컴포넌트들을 스캔하지 않는다는 의미이고

ASPECTJ는 aspectjweaver 모듈을 추개하줘야 사용할 수 있다.

패턴이 아닌 어노테이션으로 제외하는것도 가능하다.
excludeFilters=@Filter(type=FilterType.ANNOTATION,classes={NoProduct.class,ManualBean.class});

이경우엔 @NoProduct, @ManualBean 어노테이션이 붙은 클래스는 스캔대상에서 제외가 된다.

@Component가 붙은 클래스 이외에도
@Controller,@Service,@Repository,@Aspect,@Configuration 등도 스캔되어 올라간다.
@Controller는 MVC,@Repository는 DB연동과 관련이 있다.
