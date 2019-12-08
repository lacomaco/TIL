import React from 'react';

const Try = ({v,i})=>{
    return (
        <li>
            {v.try} {v.result}
        </li>
    );
}

export default Try;