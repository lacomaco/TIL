import React,{useContext} from 'react';
import MTd from './MTd';
import {TableContext} from './MineSearch';

const MTr = ({rowIndex})=>{
    const {tableData} = useContext(TableContext);
    return(
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((arr,i)=>(<MTd rowIndex={rowIndex} cellIndex={i}/>))}
        </tr>
    )
};

export default MTr;