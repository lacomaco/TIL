import React from 'react';
import Tr from './Tr';

const Table=({onClick,tableData,dispatch,win})=>{
    return(
        <table>
            {Array(tableData.length).fill().map((tr,i)=><Tr win = {win} dispatch={dispatch} key={i} rowIndex={i} rowData={tableData[i]}/>)}
        </table>
    );
};

export default Table;