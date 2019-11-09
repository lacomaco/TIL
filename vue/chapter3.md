이벤트 핸들러 => 이벤트의 처리 내용
핸들 => 이벤트 핸들러를 , 이벤트에 접착시키는것
v-on === $ === addEventListener === @ (@으로 생략 가능)

# section 13. 이벤트를 핸들링하기

v-on:click , v-on:scroll 등의 디렉티브를 통해서 이벤트를 핸들링하는것이 가능하다.
https://kr.vuejs.org/v2/guide/events.html


이벤트 핸들링은 인라인도 가능하고 독특한것이

```html
<button v-on:click="handler('$event',item)">
```

$event 수식어를 이용해서 이벤트 매개변수를 함수로 전달하는것이 가능하다.

헷갈렸던것

```html
<img src="image.png" v-on:load="show=true" v-bind:class="{hide:!show}>
```

{hide:!show}
의 의미는 show가 false라면 클래스 hide를 추가 , 아니라면 삭제하는 코드가된다.

인라인 이벤트 핸들러에는 수식어를 넣는것이 가능하다.

이벤트 장식자 모음

.stop => stopPropagation() 호출 //이벤트 버블링 막음
.prevent => e.preventDefault() //기존 이벤트 행동 막음
.caputre => 캡쳐링 할때 먼저 이벤트가 핸들링 되도록함
.self => 이벤트가 해당 요소에서 직접 발생했을 경우에만 이벤트 시동
.native => 컴포넌트의 루트 요소 위에 있는 네이티브 이벤트를 핸들링 (컴포넌트 위에 정의된 네이티브 이벤트도 쓸 수 있도록 조작한다는것 같음)
.once => 한번만 호출
.passive => preventDefault()를 사용하지 않다고 명시함

이벤트 장식자는 v-on:click.stop 처럼 체이닝 형식으로 여러개를 쓰는것이 가능함

키 장식자는 

v-on:keydown.enter 처럼 이벤트 장식자랑 유사함.
https://kr.vuejs.org/v2/guide/events.html

# section 14 v-model로 입력 양식 동적으로 변경하기

v-model="val" 이 디렉티브는 Vue가 감시하고 있는 리엑티브 데이터의 변경을 감지하여 실시간으로 업데이트해준다.

기존엔 v-on:change, 같은 이벤트를 통해서 강제로 변경했다면 v-model 디렉티브 하나로 대체가 가능하다.

v-model은 기본적으로 문자열을 다루지만 checkbox처럼 복수개의 입력 형식에선 배열로 처리하는것도 가능하다.

## 텍스트 에러이너는 Mustache가 안된다

말그대로 안됨 . 반드시 v-bind:value나 v-model로 데이터를 바인딩 해야함

```html
<textarea v-model="hi">
```

```js
...
data:{
    hi:'',
},
```

체크 박스의 경우 여러 조건이 있따.

### 1. 하나의 요소 선택시

```html
<input type="checkbox" v-model="val">{{val}}
```
해당 체크박스가 선택되면 데이터의 val이 true , 아니라면 false로 강제로 선택된다.

true false가 아닌 다른 입력값을 넣고 싶다면

```html
<input type="checkbox" v-model="val" true-value="TRUEDEATH" false-value="FALSE-DEATH">
```

true-value 속성과 , false-value 속성으로 조정이 가능하다.


### checkbox 여러개 입력

```html
<input type="checkbox" v-model="val" value="A">
<input type="checkbox" v-model="val" value="A">
<input type="checkbox" v-model="val" value="A">
```

```js
new Vue({
    el:'#app',
    data:{
        val:[],
    }
});
```

체크박스가 true가 될 때마다 , value값이 배열의 요소요소로 들어가게된다.

라디오 버튼은 기본적으로 checkbox와 유사하다.

select 태그는 multiple 일경우엔 위의 checkbox와 같고

아니라면 싱글 checkbox랑 비슷하다.

### 이미지 변경 감지

이미지 변경은 v-model이 불가능하고 , v-on:change 로 변경을 감지해서 데이터를 바인딩한다.

```js
var app = new Vue({
    el: '#app',
    data:{
        message:'Hello!',
        val:[],
        preview:'',
    },
    methods:{
        handleChange:function(event){
            var file=event.target.files[0];
            this.preview=window.URL.createObjectURL(file);
        }
    }
});
```

```html
<input type="file" v-on:change="handleChange">
<img v-bind:src="preview">
```

v-model은 

.lazy => input 대신 change (focusing , enter input)에 대응해서 변경
.number => 숫잘로 받음( 기본적으로 문자열로 받앗었음)
.trim =>트림해줌!

# section 15 컴포넌트가 아닌것들 이벤트 조작하는 방법!

우리는 여태까지 vue에 마운트된 요소들의 이벤트를 감지하는것만 했지 window, body같은 전역 객체들은 하지 않앗다. 아니 하지 못한다,

이럴 경우엔 라이프 사이클중에 훅을 걸어서 쓰고싶은 이벤트를 강제 마운트 해주는 방법으로 해야한다.

```js
var app = new Vue({
    el: '#app',
    data:{
        message:'Hello!',
        val:[],
        preview:'',
        timer:null,
        scrollY:0,
    },
    created:function(){
        window.addEventListener('scroll',this.handleScroll);
    },
    beforeDestroy:function(){
        window.removeEventListener('scroll',this.handleScroll);
    },
    methods:{
        handleChange:function(event){
            var file=event.target.files[0];
            this.preview=window.URL.createObjectURL(file);
        },
        handleScroll:function(){
            console.log('handle');
            if(this.timer==null){
                console.log('handle');
                this.timer=setTimeout(function(){
                    this.scrollY=window.scrollY;
                    clearTimeout(this.timer);
                    this.timer=null;
                }.bind(this),200);
            }
        }
    }
});
```
created , destroyed 라이프사이클에 훅을 걸어서 이벤트를 추가 삭제하였음을 주목하자.

```html
<header v-bind:class="{compact:scrollY>200,test:scrollY<=200}">
    200px 이상 스크롤 했으면, .compact 클래스 추가.
</header>
```

클래스 2개 이렇게 넣어도 됨 신기방기