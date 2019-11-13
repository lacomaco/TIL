import React , {Component} from 'react';

class Counter extends Component{
    /*
    꼭 constructor 생성자에서 state를 선언할 필요는 없다. 
    그냥 필드에 
    state={
        number:0,
        fixedNumber:0,
    };
    처럼 ㅐ도 됨.
    */
    constructor(props){
        super(props);
        /*
        state 등장

        */
        this.state={
            number:0,
            fixedNumber:0
        };
    }
    render(){
        const{number,fixedNumber} = this.state;
        return(
            <div>
                <h1>{number}</h1>
                <h2>{fixedNumber}</h2>
                <button onClick={async ()=>{
                    await this.setState({number:number+1});
                    await this.setState({number:number+1});
                }}>
                    +1
                </button>
            </div>
        );
    }
}

export default Counter;

/*
state 행동 제약
항상 constructor에서 state들을 생성해야한다. state 객체 형식에 state 요소들을 만들어줘야한다.

함수형 컴포넌트의 constructor에서는 항상 super을 호출해주어야 한다.
super(props)가 호출되면 현재 컴포넌트가 상속하고 있는 Component 클래스의 생성자를 호출해준다.

state는 setState라는 함수를 통해서 변경한다.

state를 조회할때는 this.state를 통해서 접근이가능하다 보통은 위에처럼 비구조화 할당으로 쓸 state를 꺼내놓는다.

state는 리액티브 데이터이다.

this.setState 함수로 state를 업데이트 하는것은 비동기적으로 업데이트가 된다.

따라서 다음과 같이

onClick={()=>{
    this.setState({number:number+1});
    this.setState({number:this.state.number+1});
}}

시 , 1이 2번 올라가지 않고 1번올라간다.

왜냐하면 현재 넘버에서 +1 을 하는 와중에 ,
두번쨰 코드에서 현재 넘버에서 1을 완료하고 , 첫번째 코드가 완료가 되면

결론적으로는 number+1 밖에 되지 않기 때문이다.

this.setState 함수에 인자로 함수를 넣을 수 있다.
이를 통해서 비동기를 처리할 수 있다.
this.setState((prevState,props)=>{
return {
    .... 업데이트 내용
}
});

<button onClick={()=>{
    this.setState((prevState,props)=>{
        return {
            number : prevState.number+1
        }
    
    this.setState((prevState,props)=>{
        return {
            number : prevState.number+1,
        }
    })
}}>

코드가 이런식이라면 2번씩 올라간다.

prevState는 이전 State 정보, props는 현재 지니고 있는 props를 나타낸다.

함수형 컴포넌트에서 useState

원랜 함수형에선 쓸 수 없었ㅅ다. 하지만 이제 useState와 Hooks를 통해서 쓸 수 있게 되었다.



    

*/