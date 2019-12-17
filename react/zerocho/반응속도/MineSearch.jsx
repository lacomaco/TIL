import React,{useReducer,createContext,useMemo} from 'react';
import MTable from './MTable';
import Form from './Form';
const initialState = {
    tableData:[],
    timer:0,
    result:'',
    halted:false,
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE='CLICK_MINE';
export const NORMALIZE_CELL='NORMALIZE_CELL';
export const FLAG_CELL='FLAG_CELL';
export const QUESTION_CELL='QUESTION_CELL';

const reducer = (state,action)=>{
    switch(action.type){
        case START_GAME:
            return{
                ...state,
                tableData:plantMine(action.row,action.cell,action.mine),
                halted:false,
            };
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            return {
                ...state,
                tableData,
            }
        }

        case CLICK_MINE : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted : true,
            };
        }

        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell]===CODE.MINE){
                tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }

            return{
                ...state,
                tableData,
            };
        }

        case QUESTION_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell]===CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }

            return{
                ...state,
                tableData,
            };

        }

        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell]===CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }

            return{
                ...state,
                tableData,
            };
        }
        default:{
            return state;
        }
    }
};

export const CODE = {
    MINE:-7,
    NORMAL:-1,
    QUESTION: -2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MINE:-5,
    CLICKED_MINE:-6,
    OPENED:0, // 0 이상이면 다 opened
};

const plantMine=(row,cell,mine)=>{
    console.log(row,cell,mine);
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle=[];
    while(candidate.length>row*cell-mine){
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i=0;i<row;i++){
        const rowData = [];
        data.push(rowData);
        for(let j=0;j<cell;j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k=0;k<shuffle.length;k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k]%cell;
        data[ver][hor]=CODE.MINE;
    }
    console.log(data);
    return data;
};

//1. react의 createContext로 Context를 사용한다.
//createContext의 인자로는 초기값이 들어간다. 아래는 모양만 맞춰놓은것 , 
// 다른 파일에서 접근이 가능하게 export 시켜야한다.
export const TableContext = createContext({
    tableData :[],
    dispatch:()=>{},
});


const MineSearch = ()=>{
    const [state,dispatch]=useReducer(reducer,initialState);

    const value = useMemo(()=>{
        return {
            tableData : state.tableData,
            dispatch,
        }
    },[state.tableData]);

    return(
        //2. Context가 적용될 부분을 Context.Provider로 감싼다. value에는 공유된 컨텍스트에 들어갈 값 객체들을 넣는다.
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <MTable/>
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;