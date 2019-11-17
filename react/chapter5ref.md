# ref

보통 HTML 특정 태그에 이름을 달고 싶을때는 id라는 요소를 사용한다.

id 요소를 달면 document.querySelector 를 통해서 접근하여 직접적으로 조절할 수 있다.

react에서는 ref을 이용하여 이름을 단다.

리액트는 컴포넌트 기반이고, 컴포넌트는 중복 사용되는것을 가정하고 만들어지기 때문에 id를 왠만하면 안쓴다고 한다. 보통 state로 구현도 가능하고..

따라서 DOM을 직접 건드려야 하는 그러한 불가피한 상황에서만 써야한다.

참고로 함수형 리액트에서 ref을 사용하기 위해서는 Hooks를 사용해야한다.

state 만으로 해결할 수 없고 , DOM에 직접 접근해야 하는 상황

1. "특정" input에 포커스 주기
2. 스크롤 박스 조작하기
3. Canvas에 그림 그리기

# ref 사용법

ref를 달고자 하는 요소에 ref 콜백 함수를 props로 전달한다. ref 값을 파라미터로 전달받는다. 내무 파라미터로 받은 ref를 컴포넌트 멤버 변수로 설정해준다 . 무슨의미지?

<input ref={(ref)=>{this.input=ref}}/> 라는데 대체 뭔소리야 시발
this.input이 ref을 가리키는건 알겠는데 그램 래퍼는 언제 발동되는데?

이게 어떻게 DOM에 이름을 다는거지? ref가 어떻게들어오는지도 모르는데 사용자가 어떻게 이름을 단다는말이지? 

실험으로 특정 input에 포커싱을 주기 위해서 ref을 달았지만 먹히지 않았다.

ref를 이해하기 위해 삽질을 했다. 솔직히 책의 내용만으로는 그래서 ref가 무엇인지 어떻게 쓰고 이름은 또 뭔지 이해하기 힘들다.

```js
import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
    input3 = React.createRef();
  state = {
      input:[{
        password: "",
        clicked: false,
        validated: false
      },{
        password: "",
        clicked: false,
        validated: false
      }],
  };

  handleChange = (e) => {
      let input = [
          ...this.state.input,
      ];

      if(e.target===this.input){
          input[0]={
              ...this.state.input[0],
              password:e.target.value,
          }

      }else if(e.target===this.input2){
          input[1]={
              ...this.state.input[1],
              password:e.target.value,
          };
      }

      this.setState({
          input,
      })
  };

  handleButtonClick = (e) => {
      let input = [
          ...this.state.input,
      ]

      input[0]={
          ...this.state.input[0],
          clicked:true,
          validated:input[0].password==='0000',
      };

      input[1]={
          ...this.state.input[1],
          clicked:true,
          validated:input[1].password==='1111',
      };
      console.log(input);

      console.log(input[0].password);
      console.log(input[1].password);

      console.log(input[0].password==='0000');
      console.log(input[1].password==='1111');

      this.setState({
          input,
      });
  };

  render() {
    return (
      <div>
        <input
          ref={ref => (this.input = ref)}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.input[0].clicked ? (this.state.input[0].validated? "success": "failure") : ""
          }
        />

        <input
            ref={ref=>(this.input2=ref)}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.input[1].clicked ? (this.state.input[1].validated   ? "success"   : "failure") : ""
          }
        />

        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
```
책의 ValidationSample을 조금 삽질했다. ref을 정확히 이해하기 위해 input에 2개의 ref을 걸었다.

ref의 이림은

<input ref = {ref=>{this.input2=reff}}>

에서 this.input2의 input2가 ref가 된다. 이를 props로 넘겨주었다고 말한것이다.

props로 정확히 언제 어떻게 넘겨준지는 아직 이해가 안가지만 input 태그또한 하나의 컴포넌트로 준다면

ref props에 우리 컴포넌트의 this.input2에 ref를 넣고 이를  {}  자바스크립트 표현식으로 넘겨서 어찌어찌 props로 넘어간것 같다. 자세한건 더 연구해야한다

this.input2 , this.input을 통해서 ref를 통제할 수 있다.

이벤트 객체인 e.target === this.input , e.target===this.input2로 이 지금 현재 일어난 이벤트의 타겟과 ref가 일치하는지 체크하는것이 가능하다.

글로 적으니 생각보다 적다. 근데 삽질은 대게 오랫동안 했는데 ..

또한 이 삽질에서 state에서 객체 state를 변경하는법을 제대로 공부한것 같다.

state 변경은 반드시 

1. 사본을 복제

2. 사본을 업데이트

3. 사본을 setState로 넘겨 업데이트

식으로 진행햐아한다.

배열내부의 객체를 비구조화 할당으로 찢어 아예 새로운 객체를 만들어 넘겼다.

# 컴포넌트에 ref 달기

```js
<MyComponent ref = {(ref)=>{this.myComponent = ref}}>
```
이런식으로 달면 되더라.

ref을 통해 myComponent의 내부 변수, 내부 ref에도 접근이 가능합니다.

또한 ref도 class에서만 동작하는것 같다. APP이 함수형 리액트였지만 , 인식을 못하였음