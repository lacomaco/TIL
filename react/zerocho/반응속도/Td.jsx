import React,{useCallback,memo, useEffect} from 'react';
import {CLICK_CELL,SET_TURN} from './reducer_Type';

const Td = memo(({rowIndex,cellIndex,dispatch,cellData,win})=>{
    const onClickTd=useCallback(()=>{
        console.log(rowIndex,cellIndex);
        if(cellData!==''){
            return;
        }
        console.log(win);
        if(win!==''){
            console.log('winner has selected');
            return;
        }
        dispatch({type:CLICK_CELL,row:rowIndex,cell:cellIndex}); //비동기임
        dispatch({type:SET_TURN});

    },[cellData,win]);
    console.log('td rendered');

    return(
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;