Spring MVC 1.요청 매핑, 커맨드 객체, 리다이렉트 , 폼 태그, 모델

1. 요청매핑 어노테이션
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

2. 요청 파라미터에 접근하는 방법

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

