import React, {useReducer} from 'react';

function reducer(state,action){
    switch(action.type){
        case 'INCREMENT':
            return {value:state.value+1};
        case 'DECREMENT':
            return {value:state.value-1};
        default:
            return state;
    }
}

function reducer2(state,action){
    switch(action.type){
        case 'DOUBLE':
            return {value:state.value*2};
        case 'HALF':
            return {value:state.value/2};
        default:
            return state;
    }
}

const Counter = ()=>{
    const [state,dispatch]=useReducer(reducer,{value:0});
    const [state2,dispatch2]=useReducer(reducer2,{value:1});
    return(
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>입니다.
                현재 카운터 값은 <b>{state2.value}</b>입니다.
            </p>
            <button onClick={()=>dispatch({type:'INCREMENT'})}>+1</button>
            <button onClick={()=>dispatch({type:'DECREMENT'})}>-1</button>
            <button onClick={()=>dispatch2({type:'DOUBLE'})}>*2</button>
            <button onClick={()=>dispatch2({type:'HALF'})}>/2</button>
        </div>
    );
};

export default Counter;