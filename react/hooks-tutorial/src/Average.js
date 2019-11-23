import React,{useState,useEffect,useMemo,useRef,useCallback} from 'react';
const getAverage = (numbers)=>{
    console.log('평균값 계산 중...');
    if(numbers.length===0){
        return 0;
    }
    //reduce 함수 array.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);
    // 결과는 누적값으로 들어간다.
    const sum = numbers.reduce((a,b)=>{return a+b;});
    return sum/numbers.length;
};
const Average = () =>{
    const [values,setValues]=useState(0);
    const [list,setList]=useState([]);
    const [number,setNumber]=useState('');
    const inputEl = useRef(null); //중요
    const avg=useMemo(()=>{return getAverage(list);},[list]);

    const onChange = useCallback((e)=>{
        setNumber(e.target.value);
    },[]);

    const onInsert = useCallback(()=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus(); //중요
    },[number,list]);

    return (
        <div>
            <input value={number} onChange={onChange}  ref={inputEl}/>
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index)=>{
                    return <li key={index}>{value}</li>
                })}
            </ul>
            <div>
                <b>평균값:</b>{values}
            </div>
        </div>
    );
};
export default Average;