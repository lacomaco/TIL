# 3장 리액트의 컴포넌트 props,state에 관한 내용.

결론 : Component (파편요소) 리액트는 컴포넌트들을 만들어 조립하는 형식으로 개발이 진행된다.
props : properties의 단축어, 부모 컴포넌트에서 자식 컴포넌트에게 값을 지정해서 활용할 수 있게 한다.
자식 요소에서는 props를 변경하는것이 불가능하다.

state : 자기 자신이 만들어 활용하는 값 , 클래스 컴포넌트 , 함수형 컴포넌트 일경우 2경우 문법적으로 다르다.

리액트 자체가 클래스형 , 함수형 이 2가지 표현식에 따라 , 기능은 같지만 문법이 아예 달라진다. 이점을 조금 조심해서 봐야할 것 같다.

# 1. Component

함수형 형식
```js
import React from 'react';
const Compo = (props)=>{
    return (
        <div>{props.doyans}</div>
    );
}
export default Compo
```
클래스형 형식

```js
import React,{Component} from 'react';
class Compo extends Component{
    static state={
        doyans:1,
    }
    render(){
        const name='melong';
        return(
            <div>{this.state.doyans}.{name}</div>
        )
    }
}
```

차이점이 보이는가? , 함수형은 Component를 상속받지 않는다.

하지만 클래스형은 Component를 상속받아 render라는 함수에서 Component를 구현한다.

리액트에서 이렇게 구현한 Component들은 , 다른 리액트에서 재활용 하는것이 가능하다.

```js
import React from 'react';
import Compo from './Compo';
function App(){
    return(
        <Compo/>
    )
}
```

참고로 App.js도 일종의 컴포넌트이다. 

### 화살표 함수와 , 일반 함수의 차이점

화살표 함수는 인스턴스에 종속되고 일반 함수는 객체에 종속된다.

예를들어 다음과 같은 화살표 함수와 일반 함수가 있다고 생각하자

```js
function temp(){
    this.name='temp';
    return{
        this.name='temp1',
        say:function(){
            console.log(this.name);
        }
    }
} //temp1이 출력

function temp2(){
    this.name='temp2';
    return{
        this.name='temp3',
        say:()=>{
            console.log(this.name);
        }
    }
} //temp2가 출력
```

두 경우 출력되는 값이 다르다. 그 이유를 여기에 정리해보겠다.

화살표 함수는 인스턴스에 종속된다고 했다. 인스턴스는 객체에 의해 생성되는 어떤 것들을 말한다.

function은 객체이고 temp2는 function의 인스턴스이다. 따라서 화살파횸사 say는 인스턴스 temp2의 this에 종속된다.

따라서 temp2 인스턴스의 this.name이 상속되어진다.

반면 일반 함수는 자신이 속해있는 객체에 종속된다. 

temp는 객체를 내뱉기 때문에 이 객체에 this가 종속 되어진다.

### 다시 컴포넌트로

```js
export default Compo;
```

이 코드의 의미는 Component를 내보내는것을 이미한다. es6 문법이고, 나는 Module.exports, exports= 에 익숙할것이다. 저것은 단일 객체를 내보낼때 주로 쓰인다.

# props

properties의 줄임말 , 부모 컴포넌트에서 다음과 같이 props를 지정해주어야 한다.

```js
//참고로 props에 숫자를 넣기 위해서는 name={1} 처럼 중괄호로 묶어 자바스크립트 식으로 표현하여 넣어줘야한다.
import React from 'react';
import TestComponent from './testComponent';
const App=()=>{
    return <TestComponent name="ulala">lalala<TestComponent>
}
```

부모 컴포넌트 App에서 자식 컴포넌트 TestComponent에게 props.name 으로 ulala를 보내주었다.

위와같이 위에서 아래 방향으로 데이터를 전달한다.

### props 기본값 설정

props가 부모로부터 내려오지 않았을때 스스로 기본값을 설정하는것도 가능하다. 함수형 , 클래스형 둘의 형식이 다르다.

클래스형

```js
import React , {Component} from 'react';
import PropTypes from 'prop-types';

class TestComponent extends Component{
    /*
    아래의 defaultProps, propTypes들을 클래스 내부에 넣는것도 가능함
    static으로 넣으면 됨.

    statis defaultProps={
        name:'기본이름',
    };
    static propTypes={
        name:PropTypes.string.isRequired,
    };
    */
    constructor(props){
        super(props);
    }
    render(){
        cosnt {name,children} = this.props;
        return (
            <div>{name} + {children}</div>
        )
    }
}

TestComponent.defaultProps={
    name:'기본이름',
};

TestComponent.propTypes={
    name:PropTypes.string.isRequired,
};

export default TestComponent;
```

함수형
```js
import React from 'react';
import PropTypes from 'prop-types';
const TestComponent=(props)=>{
    const {name,children}=props;
    //or props.name 비구조화 할당으로 정리해서 사용하는것이 보편적이다.
    return (<div>{name}+{children}</div>)
};

TestComponent.defaultProps={
    name:'기본값',
};

//스펠링 주의 propTypes임
TestComponent.propTypes={
    name:PropTypes.string.isRequired,
}
```

children은 부모태그에서 자식 태그 사이에 넣는 text의 값들이다.
props을 통해 넘어온다.

.defaultProps로 예상되는 props의 값들의 기본값을 넣을 수 있으며

.propTypes로 props들의 타입을 강제하는것도 가능하다 .어기면 브라우저 콘솔에서 에러가 나옴

자세한건 여기서

https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html

# State

컴포넌트 내부에서 자체적으로 변경할 수 있는 값, 이벤트를 줘서 변경할 수 있습니다.

단 , State는 클래스형 컴포넌트에서만 공식적으로 지원합니다. 함수형 컴포넌트는 Hooks, useState 같은걸로 사용이 가능합니다.

클래스형
```js
import React, {Component} from 'react';

class Counter extends Component{
    /*
    state={
        number:0,
    }
    이런식으로 constructor 바깥에 빼서 필드로 넣어도 됩니다. 저는 이게 더 이쁘다고 생각해요
    */

   state={
       number:0,
   };

    constructor(props){
        super(props);
        
        this.state={
            number:0,
        };
    }

    render(){
        const {number}=this.state;
        return(
            <div>
                <h1>{number}</h1>
                <button onClick={()=>{
                    this.setState({number:number+1});
                }}>
            </div>
        )
    }
}
```
onClick 버튼을 누르면 state인 number가 하나씩 증가합니다. props는 증가할수가 없습니다.

this.setState 함수를 통해서 증가하고 , 또한 Counter 컴포넌트를 constructor로 초기화하는것도 눈여겨 봐야합니다. super(props)로 Component 생성자를 호출하고

state 초기값을 설정해줬습니다.

render 메서드에서 비구조화 할당을 통해서 number을 가져왔고, setState에 객체로 변경될 state를 지정하면 값이 변경됩니다.

여기서 중요한점은 state 값을 변경하는것은 비동기식으로 처리가 됩니다 만역 버튼이

```js
<button onClick={()=>{
    this.setState({number:number+1});
    this.setState({number:this.state.number+1});
}}>
```

이라면 비동기로 인해서 둘다 현재 number을 짚고 계산되기 떄문에 우리가 의도한 2개의 값이 올라가는 그런 현상은 일어나지 않습니다.

컴포넌트이기 때문에 number는 현재 state의 number을 짚고 있기 때문입니다. 둘다 같은 number을 짚는것 입니다.

이를 해결할려면 다음처럼 변경해야합니다

```js
<button
onClick={()=>{
    this.setState((prevState,props)=>{
        return{
            number:prevState.number+1,
        };
    });
    this.setState((prevState,props)=>{
        return{
            number:prevState.number+1,
        };
    });
}}>
```

prevState는 이전 State , props 는 현 재 props를 의미합니다.

기존상태에서 값을 더하고 , 다시 기존상태에서 값을 더하는 식으로 비동기 문제를 해결할 수 있습니다.

(async await은 해결책이 안됩니다. 실제로 넣어도 , 영향이 없다고 나올뿐더라 async await은 promise의 편리한 문법일뿐입니다. promise가 되는 곳에서만 돌아간다구요)

### this.setState가 끝나고 다른 특정작업을 실행하기

값이 변경되고 바로 다음 값을 하도록 콜백 함수를 등록할 수 있습니다. setState의 2번째 파라미터로 보통 넣습니다.

```js
onClick={()=>{
this.setState({
state ...
},()=>{
second parameter ... 
}
}
```

### 함수형에서 State 쓰는법 , useState
useState는 array를 결과로 리턴합니다. 배열 비구조화 할당으로 이를 분해해서 씁니다. 배열의 0번째는 state , 1번째는 그 state을 변경하는 setter 함수가 나오고
useState 함수의 매개변수는 state의 초기값을 의미합니다.
```js
import React,{useState} from 'react';

const Say=()=>{
    const [message,messageSetter] = useState('');// 초기값이 없는 message state와 , messageSetter 함수를 받았습니다.
    const onClickEnter = ()=>{messageSetter('하염')} // 이벤트를 등록하는 부분을 눈여겨 봅시다

    return(
        <div>
            <button onClick={onClickEnter}>doyans</button> 
        </div>
    )

    //doynas 버튼이 클릭되면 message가 하염으로 변경됩니다.
}
export default Say;
```

# State의 주의사항

state값이 변경되는 이벤트들은 비동기적입니다.

state를 변경할때는 setter 함수를 사용해야합니다. (ex ) this.setState , useState 의 setter 함수

일반 값들은 이해가 되는데, 

배열이나 객체값들은 어떻게 될까요? 이런것들은 보통 참조만 하는데 ...

보통 이런순으로 진행이 됩니다.

1. 배열이나 객체의 " 사본 " (매우중요) 를 만듭니다.

2. " 사본 " 을 업데이트합니다.

3. " 사본 " 을 setState나 useState을 통해 업데이트합니다. (바꿔치기)

객체는 spread, 배열은 다른 내장함수를 쓴다고 합니다. 나중에 깊게 나온다고 하니 우선은 여기까지만 하겠습니다.
