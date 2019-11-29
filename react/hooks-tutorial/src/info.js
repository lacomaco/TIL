import React , {useReducer} from 'react';

function reducer(state,action){
    return{
        ...state,
        [action.name]:action.value,
    };
}

const Info = ()=>{
    const [state,dispatch]=useReducer(reducer,{name:'',nickname:''});

    return (
        <div>
            <div>
                <input value={state.name} onChange={(e)=>{dispatch({name:'name',value:e.target.value})}} />
                <input value={state.nickname} onChange={(e)=>dispatch({name:'nickname',value:e.target.value})}/>
            </div>
            <div>
                <div>
                    <b>이름:</b>{state.name}
                </div>
                <div>
                    <b>닉네임:</b>{state.nickname}
                </div>
            </div>
        </div>
    );
};
export default Info;