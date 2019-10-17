의존자동주입

@Autowired 애노테이션으로 수행함.

빈 컨텍스트에 올라온 빈중 타입과 일치하는 객체를 찾아 할당함. 빈의 이름이 아닌 타입을 기준으로 찾는다는것에 주목해야함.

```java
@Autowired
public void setMemberDao(MemberDao memberDao){
    this.memDao=memberDao;
}
```

객체가 아닌 메소드위에 올라온 Autowired 애노테이션은 매개변수에 자동 주입됨.

만약 일치하는 빈이 없다면 오류를 뱉어냄.

2개 이상 해당하는 타입이 있어도 오류를 뱉어냄 이럴 경우 @Qualifier을 통해 객체를 강제적으로 선택해줘야함. Bean 선언할때

```java
@Bean
@Qualifier("DAO")
public MemberDao memberDao(){
    return new MemberDao();
}
```

Autowired시킬때

```java
@Autowired
@Qualifier("DAO")
public void setMemberDao(MemberDao memberDao){
    this.memDao=memberDao;
}
```

Qualifier 지정자를 해두지 않으면 기본값으로 빈의 이름을 한정자로 지정됨.

Autowired시 타입을 기준으로 주입된다고 하였다.

정확한 타입만을 요구하는것이 아닌, 객체 상속된 객체도 같은 타입으로 요구한다. [마치 다형성처럼]

빈 컨텍스트에 객체와 , 그 객체가 상속되서 만들어진 객체가 존재하면 에러가 난다. 이는 Qualifier을 통해 에러에서 벗어나게 해야한다.

@Autowired 필수 여부 지정하기.

기본적으로 @Autowired가 지정된 객체가 없다면 익셉션을 낸다.

이를 방지하기 위해서 필수 여부를 해제할 수 있다.

@Autowired(required=false)

또는

```java
@Autowired
public void setDateFormatter(Optional<BEANS> formatterOPT)
```

Optional을 통해서 만들 수 있다. Optional은 해당 객체가 널인지 아닌지를 .isPresent()를 통해 알 수 있다.

일치하는 빈이 없다면 NULL이 들어간다. 대신 익셉션이 발생하지 않는다.

또는
```java
@Autowired
public void setDateFormatter(@Nullable BEANS formatterOPT)
```

으로 하면된다.

Nullable은 자동주입할 대상이 없어도 해당 함수가 실행된다. 반면 @Autowired(required=false) 한 객체는 실행 자체를 하지 않는다.
