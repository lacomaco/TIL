# 컴포넌트 반복

vue 의 for , jsp 의 태그 반복같이 리액트에서도 배열형태의 어떤 값을 반복해서 값을 만들어 내는 것이 가능하다.

```js
import React, {useState,Component,Fragment} from 'react';

/*
자바스크립트 배열 map 함수. 요소를 일관적으로 변경

for each 와 map 의 차이점

map => 콜백 함수에 각 원소가 들어가 나온 결과값으로 아예 새로운 배열을 만들어냄

for_each => ㅂ열을 건들지 않음, 콜백만 수행하고 리턴값의 영향을 받지 않음.

arr.map(callback, [args])

[args] : callback 함수 내부에서 사용할 레퍼런스

callback(currentValue,index,array) 

array : 원본 배열
index : 실행중인 인덱스
currentValue : 실행중인 배열의 인덱스에 있는 값

이런 배열형식으로 렌더링을 다룰때에는 key가 반드시 있어야 한다.

만약 key가 없다면,  모든 virtual dom을 비교하기 때문이다. key가 있다면 key에 해당하는 부분만 변화를 감시하기 때문이다. key 설정은 다음과 같다.
*/

class IterationSample extends Component{
    state = {
        inputText:'',
        names:[{id:1,text:'눈사람'},{id:2,text:'얼음'},{id:3,text:'눈'},{id:4,text:'바람'}],
        nextId:5,
    };

    
    nameList = () =>  (this.state.names.map((element)=>{return <li key={element.id} onClick={()=>{return this.onRemove(element.id)}}>{element.text}</li>}));
    
    onChange = (e)=>{
        let state = {
            ...this.state,
            inputText:e.target.value,
        };
        console.log(e.target.value);

        this.setState(state);
    }

    onRemove = (id) =>{
        const names = this.state.names.filter((element)=>{return element.id !== id});
        const state = {
            ...this.state,
            names:names,
        }
        this.setState(state);
    }

    onClick = () =>{
        let state = {
            ...this.state,
            names:this.state.names.concat({id:this.state.nextId,text:this.state.inputText}),
            nextId:this.state.nextId+1,
            inputText:'',
        };
        console.log(state);
        this.setState(state);
    }

    render(){

        return(
        <Fragment>
            <input value={this.state.inputText} onChange={this.onChange}/>
            <button onClick={this.onClick}>추가</button>
            <ul>{this.nameList()}</ul>
        </Fragment>
        );

    }
}

export default IterationSample;
```

위의 코드는 공부하면서 조금 삽질한 코드이다.

# map 함수

우선 자바스크립트의 배열 foreach와 map 함수를 알아보자.

foreach는 , 각 배열 인덱스를 돌면서 어떤 연산을 수행하고

map은 foreach 처럼 각 배열 인덱스를 돌면서 어떤 연산을 수행하면서 리턴값으로 나오는 값들을 다시 모아 아예 새로운 배열을 만들어 낸다.

map 함수는 map(callback,[args]) 로 이루어져 있고

callback함수는 (currentValue,index,array) 
currentValue : 현재 인덱스의 값
index : 현재 인덱스 위치
array : 원본 배열 을 의미한다

[args] 들은 callback 함수 내부에 사용할 this 래퍼런스라고 하느데 .. 먼소리람 참 ;

아무튼 우리가 주목해야 할 부분은 

```js
    state = {
        inputText:'',
        names:[{id:1,text:'눈사람'},{id:2,text:'얼음'},{id:3,text:'눈'},{id:4,text:'바람'}],
        nextId:5,
    };
    ....
    nameList = () =>  (this.state.names.map((element)=>{return <li key={element.id} onClick={()=>{return this.onRemove(element.id)}}>{element.text}</li>}));
```

이부분이다.

nameList는 , state의 names 배열을 map 함수로 돌려 , jsx 형태의 태그가 li인 코드를 만들어내는 함수이다. 

jsx 태그 li에 나오는 key가 중요한데 , 이런 배열을 이용해서 랜더링 할때 react에서는 무조건 key라는 항목이 필요하다. 랜더링 최적화를 위해서 쓰이는데

만약 key가 없다면 모든 요소를 돌며 변경된 key를 찾기 때문에 비효율적으로 변한다.

nameList 함수의 결과로 나오는 배열을 { } 에 넣어 랜더링한다.

nameList에서 jsx 태그에 onClick = { } 부분도 눈여겨 봐야한다.

이전까지는 onClick = { 함수명 } 만 써왔기에 매개변수를 넣을수가 없었다.

이를 해결하기 위해서 익명함수인 

```js 
() = > {return this.onRemove(element.id)}
```

를 넣은것이다. 이 onClick이 실행되면 이 익명함수가 실행되면서 this.onRemove(element.id) 이 실행되는 꼴이 된다.

