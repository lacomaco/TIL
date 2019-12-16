```js
import React , {useState,useRef,useEffect,useMemo,useCallback} from 'react';
import Ball from './Ball';
import { runInThisContext } from 'vm';


const Lotto = ()=>{
    const getWinNumbers=useCallback(()=>{
        console.log('getWinNumbers');
        const candidate = Array(45).fill().map((v,i)=>i+1);
        const shuffle=[];
        while(candidate.length > 0){
            shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length-1];
        const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
        return [...winNumbers,bonusNumber];
    },[]); // useCallback은 함수 자체를 기억 , 

    const timeouts = useRef([]);
    const lottoNumbers = useMemo(()=>getWinNumbers(),[timeouts.current]); //useMemo => 함수의 리턴값을 기억하는것 , 값을 기억함

    const [winNumbers,setWinNumbers] = useState(lottoNumbers);
    const [winBalls,setWinBalls] = useState([]);
    const [bonus,setBonus] = useState(null);
    const [redo,setRedo] = useState(false);

    const onClickRedo = useCallback(()=>{
        setWinNumbers(lottoNumbers);
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current= [];
    },[]);

    const startRotto = ()=>{
        console.log('startRotto');
        for(let i=0;i<winNumbers.length-1;i++){
            console.log(winNumbers[i]);
            timeouts.current[i]=setTimeout(()=>{
                console.log(i+'*****');
                setWinBalls((prevwinBalls)=>{
                    return [...prevwinBalls,winNumbers[i]];
                });
            },(i+1)*1000);
        }

        timeouts.current[6]=setTimeout(()=>{
            console.log(6+'*****')
            setRedo(true);
            setBonus(winNumbers[6]);
        },7000);
    };

    useEffect(()=>{
        console.log('useEffect');
        startRotto();
        return ()=>{
            console.log('end');
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        }
    },[timeouts.current]); //ComponentDidUpdate , winBalls가 변경될때마다 수행함. ( 첫 시작일떄도 )
    // 이코드에서 timeouts.current가 바뀌는것이 아님, 그 이유는 . 참조하는 배열 주소는 같기 때문에

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v)=><Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number = {bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더 !</button>}
        </>
    );
};
export default Lotto;
```