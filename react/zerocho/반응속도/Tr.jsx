import React from 'react';
import Td from './Td';

const Tr=({rowData,rowIndex,dispatch,win})=>{
    return(
        <tr>
            {Array(rowData.length).fill().map((td,i)=>
            (<Td win = {win} cellData={rowData[i]} dispatch={dispatch} cellIndex={i} rowIndex={rowIndex} key={i} />))}
        </tr>
    );
};

export default Tr;