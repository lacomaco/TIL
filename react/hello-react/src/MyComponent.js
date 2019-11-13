import React from 'react';
import PropTypes from 'prop-types';

const MyComponent=(props)=>{
    const {name,children } = props;
    return(<div>나의 새롭고 멋진 컴포넌트.{name}, == {children}</div>);
};

 MyComponent.defaultProps={
     name:'기본값',
 };

 MyComponent.propTypes={
     name:PropTypes.string.isRequired,
 }

export default MyComponent;

/*
이것이 만든 컴포넌트, 구조를 자세히 보자 , MyComponent는 jsx를 리턴하는 단순한 함수이다. 함수형 컴포넌트이다.

화살표 함수의 this는 자기 자신이 속한 인스턴스의 this에 종속된다.

일반 함수의 this는 자기 자신이 속한 객체의 this에 종속된다.

화살표 함수를 뽑아내는 코드 

function hi(){
    this.name='hi';
    return {
        name:'melongs',
        say:()=>{
            console.log(this.name);
        }
    }
}
와 일반 함수가 있는 코드 

function hi(){
    this.name='hi';
    return {
        name:'melongs',
        say:()=>{
            console.log(this.name);
        }
    }
}

가 있다.

화살표 함수의 경우 hi() 메소드에 의해서 인스턴스가 생성되는데, 

hi는 function 객체에 의해서 생성된 인스턴스이다.

또한 화살표 함수는 코드에서 hi 인스턴스에 종속되어져 있고

hi 인스턴스의 this는 window이다. 따라서 화살표 함수도 window를 상속받고있다.

hi 함수에서 this.name에 (window.name) hi를 넣었음으로 화살표 함수에서도 똑같이 접근하는것이 가능하다.

일반 함수의 경우엔 

자신이 속한 함수 

return {
    ...
}

을 this가 가리키므로 , this.name은 melongs가 된다.

PropTypes => props 타입이 올바르게 들어왔는지를 검문 prop-types에서 PropTypes를 import 해와야한다.

타입이 맞지 않으면 브라우저에서 경고 메시지 띄어줌

isRequired는 필수지정임

타입은 너무 많으니 

https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html

여기서 참고할것


*/

