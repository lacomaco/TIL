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