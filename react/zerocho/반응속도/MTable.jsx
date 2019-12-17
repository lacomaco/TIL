import React,{useContext} from 'react';
import MTr from './ MTr';
import {TableContext} from './MineSearch';

const MTable = ()=>{
    const { tableData } = useContext(TableContext);
    console.log(tableData);
    return(
        <table>
            {Array(tableData.length).fill().map((tr,i)=><MTr rowIndex={i} />)}
        </table>
    )
};

export default MTable;