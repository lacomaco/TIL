import React , {Component} from 'react';

class EventPractice extends Component{
    state={
        message:'',
        username:'',
    };

    constructor(props){
        super(props);
        /* 바인드는 왜 한거고 , this.handleClick은 왜 다시 컨스트럭트에서 넣은걸까*/

        /* 
            함수는 함수가 호출될때 this가 결정된다.
            만약 bind를 하지 않는다면 . this는 window에 엮이게 될것이다.
            실험해본 결과 undefined를 가리키게 된다. 또는 

            그냥 this.handleChange나 , this.handleClick으로 넣어도 된다.
        */
    }

    handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            this.handleClick();
        }
    }

    handleChange2=(e)=>{
        this.setState({
            //객체 안에서 키를 []로 감싸면 , 해당 키가 가리키는 레퍼값을 가리키게 됩니다. 이경우엔 e.target.name의 값인 username이나 message 등이 됩니다.
            /*
            const name='gg';
            const object={
                [name]:'hi'
            }
            는 
            const object={
                gg:hi
            }

            가 됩니다.
            */
            [e.target.name]:e.target.value,
        });
    }

    handleClick2=()=>{
        alert(this.state.username+': '+this.state.message);
        this.setState({
            message:'',
            username:'',
        });
    }

    /*
    위 handleChange 들은 일반 함수이기 때문에 함수가 호출되는 시점에서 this가 변한다. 따라서 bind로 강제로 묶었지만
    그냥 화살표 함수를 사용하면 모든것이 해결된다.
    */
    
    render(){
        return(
            <div>
                <h1>이벤트 연습</h1>

                <input
                type='text'
                name='username'
                placeholder='사용자명'
                value={this.state.username}
                onChange={this.handleChange2}
                />

                <input
                type='text'
                name='message'
                placeholder='아무거나 입력해 보세요.'
                value={this.state.message}
                onChange={this.handleChange2}
                onKeyPress={this.handleKeyPress}
                />

                <button onClick={
                    this.handleClick2
                }>확인</button>
            </div>
        );
    }
}

export default EventPractice;

/*
이벤트를 실행할 자바스크립트 코드를 전달하는 것이 아니라 함수 형태의 값을 전달한다 ... ?

이벤트 처리시 , 렌더링과 동시에 함수를 만들어서 전달한다!
*/