AOP(Aspect Oriented Programming)
쓸려면 모듈 필요함 artifactId:aspectjweaver

프록시로 여러 객체에 공통으로 쓸 코드를 분리하여 주입시켜 재사용성을 극대화 해줌.

알아두어야 할 용어

Advice : 언제 공통 관심 기능을 핵심 로직에 적용할 지를 정의함. ( Before Advice, After Returning Advice, After Throwing Advice,After Advice,Around Advice)
AroundAdvice가 가장 많이 쓰임. 대상 객체의 구체적 실행 지점을 지정할 수 있기 때문에.

JoinPoint : Advice를 적용 가능한 지점을 지정함.
PointCut : Joinpoint 부분집합. Advice가 적용되는 JoinPoint.
Weaving : Advice를 로직코드에 적용하는것
Aspect : 공통으로 적용되는 기능

```java
@Aspect
public class ExeTimeAspect{

    @Pointcut("execution(public * chap07..*(..))")
    private void publicTarget(){

    }

    @Around("publicTarget()")
    public Object measure(ProceedingJoinPoint joinPoint) throws Throwable{
        long start=System.nanoTime();
        try{
            Object result=joinPoint.proceed();
            return result;
        }finally{
            long finish=System.nanoTime();
            Signature sig=joinPoint.getSignature();
        }
    }
}
```
먼저 @Aspect 어노테이션으로 이것이 Aspect임을 선언해줍니다.
@Pointcut 어노테이션은. Advice가 적용될 지점을 어노테이션 값으로 지정하고 있습니다. 위의 경우엔
chap07의 public 의 모든 리턴타입을 가진 함수중 chap07 패키지 안의 모든 함수를 지정하고 있습니다.

사실 Public은 생략이 가능합니다. ASPECT는 public에만 적용이 가능 하거든요.

execution은 다음과 같은 형식을 가집니다.
execution(수식어패턴? 리턴타입패턴 클래스이름퍁턴?메서드이름패턴(파라미터패턴))
public은 수식어패턴이고 리턴타입 패턴은 \*입니다. 사실상 리턴타입은 신경쓰지 않는다는 의미이죠.
클래스 이름패턴은 chap07입니다. chap07 하위 패키지에 있는것을 가리키며
메서드 이름패턴은 \*입니다.메서드 이름은 신경쓰지 않는다는것을 의미하며
파라미터 패턴은 ..입니다. 이는 0개 이상의 파라미터를 가진 메서드를 호출한다 라는 의미를 가집니다.

@Around어노테이션에 다른 패키지 클래스에 있는 포인트컷을 끌어오는것도 가능합니다. 패키지명과 클래스명 메서드명이 담긴 풀네임을 어노테이션 value에 넣어주면 됩니다.

ex) @Around("aspect.ExeTimeAspect.publicTarget") // aspect패키지의 ExeTimeAspect 클래스의 publicTarget 포인트컷을 끌어와 씁니다.

@Around 어노테이션은 위에서 나온 AroundAdvice입니다.

@Around 어노테이션의 값으로 publicTarget이 들어갔는데. 이는 publicTarget으로 지정된 메소드들에 이 Aspcet(measure)를 적용한다는 의미입니다.

measure 메소드엔 ProceedingJoinPoint joinPoint 변수가 들어있습니다. 이곳에 PointCut으로 지정된 클래스의 메소드가 들어 있습니다. proceed()로 호출할 수 있습니다.

getSignature는 joinPoint를 통해 얻을 수 있습니다. pointCut으로 가져온 이 메소드가 어느 클래스의 어느 메서드인지 구별할 수 있습니다.

사용은 이렇게 하지만, Aspcet를 사용하기 위해선 설정 클래스도 변경해주어야합니다.

```java
@Configuration
@EnableAspectJAutoProxy
public class AppCtx{
    @Bean
    public ExeTimeAspect exeTimeAspect(){
        return new ExeTimeAspect();
    }
}
```

@EnableAspectJAutoProxy를 선언해줘야 Aspect가 적용됩니다.

보통 Enable이 붙으면 해당 기능을 하기 위핸 설정을 스프링에서 자동으로 진행해줍니다. 자매품으로 @EnableWebMvc가 있습니다.

스프링은 임의의 프록시 객체를 만들어 ASPECT를 실행시킵니다.

@EnableAspectJAutoProxy(proxyTargetClass=true) 로 지정하면 프록시가 인터페이스가 아닌 클래스를 상속받습니다.

원래 프록시를 생성시 클래스가 인터페이스를 가지고 있다면 그 인터페이스만 상속하지만, 저런 설정을 두면 아닙니

Aspect의 실행순서는
@Order 애노테이션으로 조정이 가능하다.
@Order(1)

@Order(2)

숫자가 낮을수록 우선순위가 높다.
