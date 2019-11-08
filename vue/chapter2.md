# 모르는 용어 정리.

리액티브 데이터 : vue js에서 get,set,hook 처리가 등록되어 반응하는 데이터.

데이터 바인딩을 하기 위해서는 데이터를 리엑티브 데이터로 정의해야한다. (data : 에 등록되는 것들은 모두 리액티브 데이터로 바뀐다!)

# section 8 , 데이터 바인딩. v-bind:

Vue에서 데이터 바인딩은 {{data}} 라는 2중 중괄호속에 위치한 데이터와 우리가 생성한 Vue 인스턴스 내부의 data 필드의 이름과 일치하는 

값으로 자동으로 바인딩 된다.

{{}} 를 Mustache 라고 부르는것 같다.

일치하는 el, Vue 인스턴스의 데이터와 바인딩한다. 이 바인딩 하는 과정은 초기에 한번만 진행되기 때문에 추가적으로 실행하는것은 불가능하기 때문에 

아직 쓰지 않는다고 해도 빈값이라도 넣어서 정의해둬야한다.

```js
new Vue({
    el:'data',
    data:{
        Text:'',
        TextList:[],
        mellong:null,
    },
});
```

Mustache {{}} 내부는 , 문자열이 아닌 자바스크립트 표현식이 들어간다.(자바스크립트 우측값을 말함)

{{1+1}} 이라면 , 2로 표기된다.

또한 Mustache는 list를 출력하는것도 가능하다.

{{textList[1]}}

```js
new Vue({
    el:'#data',
    data:{
        textList:['hi','bye','mellong'],
    }
});
```

Mustache는 객체, 배열등 모든 data 바인딩을 지원한다.

### 속성에 바인딩하기.

Mustache는 텍스트에 주로 바인딩한다.
DOM 속성에 값을 바인딩 하고 싶다면

v-bind: 디렉티브를 써야한다. 

ex)
```html
<input type="text" v-bind:value="{{dataMessage}}">
<!-- binding <input text="text" value="blah"> -->
```

v-bind에는 3가지 장식자가 있다.

.prop : 속성 대신에 DOM 속성 바인딩 ( 무슨차이지 ... );
.camel : 속성 이름을 카멜케이스로 변환
.sync = 양방향 바인딩

```html
<div v-bind:text-content.prop="message">
    <!-- 이경우 DOM의 text-content를 바인딩 하기 때문에.  값이 data.message로 변환된다.-->

```

### 데이터 변경하기.

data에 들어간 값들은 리액티브 데이터이기 때문에, 변경되면 즉각적으로 반응해서 뷰에서 변경된다.

v-on 디렉티브를 이용하면, 태그에 간편하게 이벤트를 넣을 수 있다.

```html
<button v-on:click="increment"> 카운트하기</button>
```

```js
new Vue({
    el:'#app',
    data:{
        count:0,
    },
    methods:{
        increment:function(){
            this.count+=1;
        }
    }
});
```

우리가 Vue의 methods에서 선언한 increment가 자동으로 주입된다.

여기서 주목해야할점은 this이다. 보통 vue의 this는 자기 vue 객체를 가리킨다. 객체의 count속성으로 바로 접근할 수 있도록 뷰프레임워크에서 지원하고 있어
this.data.count가 아닌 this.count로 접근이 가능하다

또한, this가 바인딩되는 시점도 조심해야한다 만약

```js
increment:function(){
    hi(function(){
        this.count+=1;
    });
}
```

이런식이라면 , hi 내부에 있는 콜백함수의 this는 Vue가 아닌 window를 가리키게 된다. this가 바인딩 되는 시점을 주목해야한다.

hi 콜백 내부에서 increment의 this가 vue인것처럼 똑같은 this를 가지고 싶다면 화살표 함수를 써야한다.

반대로 increment가 화살표 함수로 정해져 있어도 안된다.

increment 함수가 화살표 함수로 정해져 있다면, 동적 바인딩에 의해서 window를 가리키게된다.

```js
{
    increment:function(){
        //ok
    },
    increment:()=>{
        ///no!
    }
}
```

클래스는 dom의 attr 취급이다. v-bind로 동적으로 클래스 바인딩이 가능하다

```html
<div v-bind:class="melongs:isTT, 'is-Active':isActive"></div>
```

```js
new Vue(){
    el:'#data',
    data:{
        isTT:true,
        isActive:true
    }
}
```

결과물

```html
<div class="melongs is-Active">
```

클래스 이름에 하이픈(-) 가 들어가면 반드시 ' ' 로 감싸야한다. 아니면 인식을 못함.

바인딩 되는 값이 객체라면, 객체 필드의 값이 true인것만 바인딩된다.

```html
<div v-bind:class="melongs" v-bind:style="babos"></div>
```

```js
new Vue({
    el:'#data',
    data:{
        melongs:{
            hh:true,
            ff:false,
            zz:true,
        },
        babos:{
            color:'red',
            backgroundColor:'tomato',
        },
    },
});
```

결과물

```html
<div class="hh zz" style="color:red;backgroundColor:tomato">
```

여러개 한번에 바인딩

```html 
<img v-bind:src="item.src" v-bind:alt="item.alt"....>
```

```js
new Vue({
    el:'#data',
    data:{
        item:{
            src:'gjgjg',
            alt:'oooo',
            ....
        }
    }
})
```

자동으로 attr이 맞는것을 찾아 바인딩한다. 매우 편함

# SECTION 9 템플릿 조건 분기

v-if , v-show 디렉티브를 이용해서 분기처리를 한다.

```html
<div v-if="hi"> blah </div>
<div v-show="temper"> halb</div>
```

둘의 차이점은 v-show 의경우 temper가 false라면 display : none이 되지만 
v-if는 아예 존재 자체가 사라진 주석처리가 되어버려 보이지 않는다.
따라서 v-if는 Vue 인스턴스에 의해서 감시자체도 되지 않는 상태가 되지만 v-show는 감지가 된다.

v-if의 경우 template로 묶어 컴포넌트를 보이게 하거나 안보이게 하는것이 가능하다.

```html
<template v-if="melongs">
    <div> babodeath</div>
    <div> mungchung</div>
</template>
```

v-if 말고 v-else-if , v-else 등도 존재한다.

```html
<div v-if=" status === 'babo'" key="status"></div>
<div v-else-if=" status === 'mungchung'" key="status"></div>
<div v-else key="status">smart</div>
```

v-if가 여러개 섞이게 되면 어떤것이 if 군에 있는지 구분할 수 없음으로, key를 통해 설정해서 분간할 수 있게 한다.

# section 10 list를 vue로 출력하자

나온 디렉티브들 v-for , v-model, v-bind: 들 .

공부하면서 JSP 느낌이 났다 .

사용법은 대략 이렇다

```html
<div v-for="(item,index) in list" v-bind:key="item.id"> {{item.id}} ... </div>
```

Vue 인스턴스의 값 list 배열원소를 item에 대입하여 하나씩 풀어서 렌더링 하는것이 가능하다.

이때 중요해야할점이 list에는 키값을 가지는 유니크한 id값이 있어야 한다는 점이다. 만약 유니크한 id 값이 없다면

vue의 list는 리액티브 데이터여서 list 값이 하나 바뀌면 모든 list들을 다시 렌더링 하게되고

유니크 id가 있다면 ,해당 요소만 수정하거나 삭제한다고 한다. 키는 v-bind:key 를 통해서 바인딩한다.

v-for 디렉티브 옆에 v-if 같은 디렉티브를 놓아 선택적으로 렌더링 하는것도 가능ㅎ다ㅏ.

같은 부모 컴포넌트 내부에서 키가 중복 사용되는 2가지 v-for 디렉티브가 있으면 안좋다고 한다. 왜 그런지는 모르겠음

list 내부의 배열 값은 리엑티브 데이터여서 감시가 가능하지만

만약 list가 객체 배열이라면 list 원소 객체는 감시가 불가능하다.

이럴경우엔 $set(변경할 데이터, 인덱스 or 키 , 새로운 값) 을 통해서 변경하는게 가능하다.

```js
this.$set(this.list,0,{id:4,name:'melongs'});
```


$set을 통해서 객체가 변경되면 리액티브로 감지하여 즉각적으로 값을 변경하는 것이 가능하다.

# section 11

요소의 위치 , 높이 속성등을 알기 위해서는 DOM에 직접 접근해야한다.

$el , $ref ($refs) 를 통해 접근하는것이 가능하다..

$el은 루트 요소의 DOM을 가리킨다. $el과 일치하는 값에 vue가 바인딩된다.

루트 요소가 아닌 것은 $ref을 통해 접근한다.

```html
<p ref="hello">Hello</p>
```
```js
new Vue({
    el:'#app',
    mounted:function(){
        console.log(this.$refs.hello);
    }
});
```

html에 ref로 hello를 줬고

Vue 코드에선 this.$refs.hello를 통해 접근하는것이 가능하다.

여기서 $ref로 접근해서 값을 바꾸면 가상 DOM이 아닌 진짜 DOM을 조작하게된다.

Vue는 가상 돔을 통해서 데이터를 바꾸고 조작하기 때문에, 진짜 DOM을 조작하고 업데이트를 통해 모든게 다시 렌더링 된다면 ,

값이 또 변해있을 것이다. 가상돔을 더 우선시 하기 때문이다.

# 12 section 템플릿을 제어하는 디렉티브들

v-pre(템플릿 생략하기),v-once(한번만 바인딩),v-text(Mustache 대신),v-html : html 태그 그대로, v-cloak : 인스턴스 준비끝나면 제거.

v-pre 예제

```html
<a v-bind:href="melongs/gg" v-pre>
{{message}}
</a>
```
결과물
```html
<a href="melongs/gg">{{message}}</a>
```

{{message}}가 바인딩 되지 않고 있는 그대로 반영된다.

v-once => 템플릿을 단 한번만 컴파일 하고 이후에는 바인딩을 하지 않습니다.

v-text : mustache처럼 동작함

v-html : 

innerHTML 처럼, html이 바인딩됩니다.

```html
<span v-html="message">
```

결과물

```html
<span> <strong>hi</strong> </span>
```

v-clock : 인스턴스 준비가 끝나면 사라짐 .

렌더링이 느릴때 유용함