객체 생성 -> 의존 설정 -> 초기화 -> 소멸 이라는 라이프 사이클을 가짐.

왜 이런 과정이 필요하냐면, 데이터베이스 커넥션 풀때문에 필요하다.

커넥션 풀을 위한 빈 객체를 만들고 초기화에서 DB와 연결후

DB와 연결이 끊어지면 소멸시킨다.

```java
@Bean(initMethod = "connect",destroyMethod="close")
@Scope("prototype")
```

빈에 initMethod, destroyMethod를 설정하면 초기화 작업에서 connect를 실행시키고 소멸 과정에서 close 메소드를 실행시킨다.

물론 빈에 해당 메소드가 반드시 구현되어 있어야 한다.

@Scope 애노테이션은 빈의 생성 관리범위를 지정한다. default는 singleton이고 우리는 prototype으로 지정하였다.
