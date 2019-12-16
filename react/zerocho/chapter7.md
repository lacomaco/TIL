# useReducer

Reduce의 기능을 따온 리액트 함수

state를 변경시키기 위해서는 반드시 Action을 거쳐가야한다. 

## 사용법 

```js
import React,{useReducer} from 'react';

....

const initialState = {
    winner:'',
    turn:'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']],
};

//배열 reducer , state는 state들 , action으로 state 변경을 지시함 
const reducer = (state,action)=>{
    switch(action.type){
        case SET_WINNER:
            return{
                ...state,
                winner:action.winner,
            };
        case CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[action.row]=[...tableData[action.row]]; //immer 라이브러리로 가독성 해결 가능함
            tableData[action.row][action.cell] = state.turn;
            return{
                ...state,
                tableData,
            };
        case SET_TURN:
            return{
                ...state,
                turn:state.turn === 'O' ? 'X' : 'O',
            };
        case RESET:
            return{
                ...initialState,
            }
    }
};

const TicTacToe = ()=>{
    const [state,dispatch]=useReducer(reducer,initialState);
    ...

        const winner = useCallback((ans)=>{
        console.log('winner',ans);
        dispatch({type:SET_WINNER,winner:ans});
    },[state.tableData]);

    const reset = useCallback(()=>{
        dispatch({type:RESET});
    },[]);

    ....
};

export default TicTacToe;
```

useReducer의 첫번째 매개변수에는 액션을 처리할 reducer함수, 그리고 두번째 매개변수에는 state의 초기값을 넣어주면 배열이 반환된다.
배열의 0번째 인덱스에는 state가 , 2번째에는 dispatch가 전달된다.

dispatch는 함수이고 함수인자에 action객체를 넣으면 우리가 정의한 reducer 함수를 거쳐 state를 변경하게 된다.

### 팁

dispatch는 다른곳에서도 쓸 가능성이 있기 때문에 아예 전용 js파일을 둬서 빼놓는것이 좋다.

```js
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL='CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET ='RESET';
```

