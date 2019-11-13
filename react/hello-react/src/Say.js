import React,{useState} from 'react';

const Say = ()=>{
    //useState 초기값 설정. useState가 호출되면, 배열이 반환되고 첫번째 배열은 현재 상태, 두번째 원소는 상태를 변경하는 함수이다. (setter)
    const [message,setMessage] = useState('');
    const onClickEnter = ()=>setMessage('안녕하세요');
    const onClickLeave = ()=>setMessage('안녕히 가세요!');

    return(
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );
};

export default Say;