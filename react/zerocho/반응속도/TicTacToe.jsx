import React,{useState,useEffect,useReducer,useCallback} from 'react';
import Table from './Table';
import {SET_WINNER,CLICK_CELL,SET_TURN,RESET} from './reducer_Type';
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

    const winner = useCallback((ans)=>{
        console.log('winner',ans);
        dispatch({type:SET_WINNER,winner:ans});
    },[state.tableData]);

    const reset = useCallback(()=>{
        dispatch({type:RESET});
    },[]);

    useEffect(()=>{
        let first;
        const tableData = state.tableData;
        for(let i=0;i<3;i++){
            first=tableData[i][i];
            let columnWin = true;
            let rowWin=true
            //행 테스트
            for(let j=0;j<3;j++){
                if(first !== tableData[j][i]||first===''||tableData[j][i]===''){
                    columnWin = false;
                    break;
                }
            }

            //열 테스트
            for(let j=0;j<3;j++){
                if(first !== tableData[i][j]||first === '' ||tableData[i][j]===''){
                    rowWin=false;
                }
            }

            if(rowWin||columnWin){
                winner(first);
                return;
            }
        }

        //대각선 1 테스트
        first = tableData[0][0];
        if(first !== '' && (first==tableData[1][1]&&first==tableData[2][2])){
            winner(first);
            return;
        }
        //대각선 2 테스트
        first=tableData[0][2];
        if(first!==''&&first==tableData[1][1]&&first==tableData[2][0]){
            winner(first);
            return;
        }

        //draw 테스트
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(tableData[i][j]===''){
                    console.log('not full');
                    return;
                }
            }
        }

        winner('DRAW');
        console.log('not winner counted');
    },[state.tableData]);
    const onClickTable = useCallback(()=>{
        dispatch({type:SET_WINNER,winner:'O'});//dispatch안에 들어가는것이 action 객체임
    },[]);

    return (
        <>
            <Table win = {state.winner} onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}></Table>
            {state.winner && <div>{state.winner}님의 승리</div>}
            {state.winner && <button onClick={reset}>RESET</button>}
        </>
    );
};

export default TicTacToe;