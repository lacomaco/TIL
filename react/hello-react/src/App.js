import React,{Fragment} from 'react';
import EventPractice from './EventPractice';
/*
컴포넌트 생성방식 2가지 , 1. 함수형 컴포넌트 , 2. 클래스형 컴포넌트
아래의 방식은 함수형 컴포넌트 선언 방식

클래스형은 
import {Component} from 'react';
class App extends Componen{
  //render에서 컴포넌트를 보여줄 JSX를 반환해야함.
  render(){
    const name='리액트';
    return (...); 
  }
}

둘의 차이점은 클래스형은 state (상태),와 라이프 사이클을 사용할 수 있다던데 ... 무슨 의미지 대체

함수형 컴포넌트는 크기가 더 작다고하다.. 하지만 state와 라이프사이클 API를 쓸 수없지만 Hook 으로 어느정도 보완이 가능하다고 한다.

props = > properties의 줄인말

props는 부모 컴포넌트에서 설정이 가능하다.

props.children , 태그 사이 내용을 보여주는 , 태그 사이의 값을 넘겨준다.

*/
function App() {
  const name='리액트'
  return (
    <EventPractice/>
  );
}

export default App;
