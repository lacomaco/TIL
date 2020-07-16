## TIP 1. for in vs for of

for in : 객체의 속성들을 반복하여 작업할때 사용. 자바슼크립트 객체 속성엔 Enumerable 속성이 있으며, 이 Enumerable 속성이 true인 객체 속성을 찾아서 반복문을 수행한다.

for of : 컬랙션 전용 반복문. iterable 한 컬렉션을 반복문 돌릴때 사용한다.

## TIP 2. Map을 통해서 키-값 구조의 데이터를 저장하라.

```js
const ob = {
    "keys":"hi",
}

ob["keys"]; /// hi
```

위와같이 객체를 통해서도 key-value 구조의 데이터를 만들어 손쉽게 사용할 수 있다.

하지만 코드상으로는 O(1)이지만 , JIT 브라우저 JS 컴파일러 과정을 보면 선형시간 O(N)을 통해서 key값을 불러와 값을 가져오는 구조를 가지고 있다.

키-값 데이터 구조가 자주 추가 삭제가 일어난다면 반드시

```js
const obj = new Map();
obj.set("keys","hi");
obj.get("keys"); //hi
```

위와 같이 Map객체를 통해서 사용하라. 해쉬맵을 내부적으로 사용하고 있기에 O(N)보다는 적은 소요시간을 가진다.

객체 다룰때에는 자바처럼 다루는 편이 좋다! 동적인 객체의 장점도 있지만 단점도 많다!

## TIP 3. 맵과 펼침 연산자를 사용하여 키-값 데이터를 순회하라.

객체의 key값을 순회할때는 

```js
const obj = {...};
const keys = Object.keys(obj);
```

Object.keys를 사용하여 키값을 접근하여 사용한다.

하지만 이 방법에는 문제가 있는데

바로 keys로 가져온 객체 키값은 순서를 보장하지 않는다는점이다.

이는 객체를 Map으로 사용함으로써 해결 가능하다.

Map객체는 iterable 하다.

```js
const obj = new Map();
obj.set(...);
...

for(const e of obj){
    console.log(e) // obj의 key-value 쌍들이 모두 찍힌다.
}

or

obj.entries(); // key-value 으로 이루어진 iterable 배열을 리턴한다.
```

## TIP 4. Map을 깊은 복사해보자.

Map 인스턴스를 사용하면 발생하는 문제점.

1. 맵의 사본 생성이 어렵다.

```js
const map = new Map();

const newMap = new Map([...map]);
```


map인 iterable 하기 때문에 배열 펼침 연산자로, 배열을 만드는것이 가능하다.

배열 펼침 연산자로 펼친 값을 Map 생성자에 넣으면 , 똑같은 Map을 복사하는것이 가능하다.

# 조건식을 정리하는 자바스크립트 스킬

## 자바스크립트 false

null , undefined , 0 , '',NaN,"" 은 false로 취급된다.

# 클래스로 인터페이스를 간결하게 유지하라

## 
