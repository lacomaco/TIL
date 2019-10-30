# 스프링 MVC에서 JSON요청 처리하고, JSON으로 응답하기

1. Jackson 의존 설정 필요. (JSON을 자바 객체로, 자바 객체를 JSON으로 처리하는 라이브러리.)

메이븐에 jackson-databind, jackson-datatype-jsr310 추가

# @RestController로 JSON 응답 처리

```java
@RestController //붙여야함 JSON 응답하고 싶다면.
public class RestControl{
    ...
    @GetMapping("...")
    public Rest hi(){
        ...
        return new Rest();
    }
}
```

@RestController를 붙이면 
해당 레스트 콘트롤러에서 리턴하는 객체를 JSON으로 바꾸어 응답하게된다. (Jackson이 있어서)

# @JsonIgnore로 제외처리하기.

간단하다. Json으로 변형될 객체내의 제외시킬 파라미터위에

@JsonIgnore 를 붙이면 끝

```java
public class ignore{
    ...
    @JsonIgnore
    String password;
}
```

# 날짜 형식 처리하기 @JsonFormat

```java
public class JSON{
    ...
    @JsonFormat(shape=Sahpe.STRING)
    private LocalDateTime regDateTime;
    @JsonFormat(pattern="yyyyMMddHHmmss")
    private LocalDateTime time2;
}
```

regDateTime이 yyyy-mm-dd hh:mm:ss 형식의 스트링으로 저장된다.


# @RequestBody로 JSON 요청 처리하기.

JSON 형식의 요청 데이터를 자바 객체로 변환하자.

요청이 들어오는 곳에 @RequestBody를 붙이기만하면된다. 

```java
@PostMapping("...")
public void Member(@RequestBody @Valid register reg,HttpServletResponse response){
    ...
}
```

@RequestBody를 붙인 register 타입과 유사한 JSON을 register로 강제로 포매팅해서 값을 넣어준다.

이때 요청 컨텐츠는 항상 application/json 타입이어야 처리가된다.

# ResponseEntity 사용하기.

```java
@GetMapping("...")
public ResponseEntity<Object> member(@PathVariable Long id){
    ...
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Error()); //Error json 리턴.

    or

    return ResponseEntity.status(HttpStatus.OK).body(member)//member json 리턴.
}
```

ResponseEntity는 .status로 상태를 생성하고 .body로 응답보낼 JSON객체를 보낸다.

# @ExceptionHandler로 ResponseEntity 응답.

@ExcepHandler(value)

value로 오는 타입의 에러타입일 경우 이 컨트롤러로 이동해서 에러가 처리됨.