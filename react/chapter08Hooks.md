# Hooks 

함수형 컴포넌트에서 상태 관리를 할 수 있도록 useState,useEffect 등의 기능을 제공하는 라이브러리입니다

# useState

```js
import React,{useState} from 'react';
...
const [value,setValue] = useState(0);
```

useState의 인자로 들어가는 값은 state의 초기값입니다. 배열의 첫번째 인자인 value는 state의 값,
두번쨰 인자인 setValue는 value값을 변경하는 Setter 함수입니다.

useState는 여러번 쓰는것이 가능합니다.

# useEffect

componentDidMount , componentDidUpdate 처럼
매번 랜더링시 특정 작업을 수행하도록 설정할 수 있는 Hook 기능입니다.

```js
import React,{useState,useEffect} from 'react';
...
    useEffect(()=>{
        console.log('렌더링 완료');
        console.log({
            name,
            nickname,
        });
    });
```

useEffect의 첫번째 인자는 실행할 콜백 함수이고

두번째 인자의 값이 변경됨을 감지하고 첫번째 인자가 콜백됩니다. 두번째 인자는 배열이 들어갑니다.

마운트될때만 실행하고 싶으면 첫번째 인자에 함수를 넣고

두번째 인자에 빈 배열을 넣으면 , 감시할 상태값이 없음으로 mount 시에만 해당 콜백이 실행되고 종료됩니다.

```js
import React,{useState,useEffect} from 'react';

...

useEffect(()=>{
    console.log('mounted');
},[]);
```

두번째 배열에 값이 있다면 해당 state가 변경됨을 감지하여 첫번째 콜백을 실행시킨다.

```js
import React,{useState,useEffect} from 'react';

...

useEffect(()=>{
    console.log('hi');
},[name,hi]);
```

name,hi 가 변경되면 hi가 찍힙니다.

컴포넌트가 언마운트되기 전이나 업데이트 되기전에 어떤 작업을 수행하고 싶다면 useEffect 의 첫번째 인자의 리턴값에 콜백함수를 넣어주면 됩니다.

```js
useEffect(()=>{
    console.log('effect');
    console.log(name);
    return()=>{ //여기서 언마운트나 업데이트되기 전에 실행이 됩니다.
        console.log('im die');
        console.log(name);
    }
},[name]);
```

# useReducer

Reducer는 현재 state, 업데이트를 위한 정보 (action) 을 받아, 새로운 상태로 업데이트 하는 함수입니다.

리듀서는 불변상태를 지켜줘야합니다.

```js
function reducer(state,action){
    ...
    return {...}
}
```
state , action 둘다 어떤 값이고, reducer라는 함수가 실행되면서 값을 변경하나봅니다.

action으로 들어온 값과 state를 적절히 섞어 새로운값을 만들어 업데이트 하는것 같습니다.

```js
import React,{useReducer} from 'react';
function reducer(state,action){
    switch(action.type){
        case 'INCREMENT':
            return { value:state.value+1};
        case 'DECREMENT':
            return {value:state.value-1};
        default:
            return state;
    }
}

const Counter = ()=>{
    const [state,dispatch] = useReducer(reducer,{value:0});

    return(
        <div>
            <p>현재 카운터 값은<b>{state.value}</b>입니다.</p>
            <button onClick={()=>{return dispatch({type:'INCREMENT'})}}>+1</button>
            <button onClick={()=>{return dispatch({type:'DECREMENT'})}}>-1</button>
        </div>
    )
}
export default Counter;
```

주목해야할 부분은 

```js
    const [state,dispatch] = useReducer(reducer,{value:0});
    <button onClick={()=>{return dispatch({type:'DECREMENT'})}}>-1</button>
```

부분입니다. reducer라는 이름으로 선언한 함수를 useReducer의 첫번째 파라미터로, 그리고 두번째 파라미터로 어떠한 값을 넣엇습니다.

아마 두번째 파라미터의 값이 state가 된다는것을 유추할 수 있습니다.

state가 되어 배열[state,dispatch] 의 첫번째 원소의 state.value가 되어 나옵니다.

dispatch는 이 state을 컨트롤 하는 매개체입니다. dispatch를 콜하면 reducer가 실행이됩니다.

이때 dispatch 함수의 인자로 객체를 넣어주는데, 이것이 액션입니다.

정리를 하면

1. reducer에 쓸 함수를 따로 선언해야한다.
2. [state,dispatch] = useReducer(reducer,{value:0}); 을 이용해서 리듀서를 쓸 수 잇게 합니다.
useReducer 함수의 2번째 인자로 들어가는 값이 state가됩니다. state.value로 값을 가져오는것이 가능합니다.
dispatch는 reducer를 실행하는 함수가 됩니다. 이 함수의 인자로 action이 들어갑니다. dispatch는 액션을 실행시키는 함수입니다.

응용

```js
import React, {useState,useEffect,useReducer} from 'react';

function reducer(state,action){
    return{
        ...state,
        [action.name] : action.value,
    };
}

const Info=()=>{
    const [state,dispatch] = useReducer(reducer,{
        name:'',
        nickname:'',
    });

    const {name,nickname} = state;
    const onChange = (e)=>{
        dispatch(e.target);
    };

    return(
        <div>
            <div>
                <input name="name" value={name} onChange = {onChange}/>
                <input name="nickname" value={nickname} onChange={onChange}/>
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```

reducer로 한번에 여러개의 state를 생성하고

이 state를 공통 reducer 함수로 제어하는것에 주목합시다.

state가 여러개이지만 이 state는 동일한 함수로 제어가 가능하다면 reducer를 이용하면 굉장히 코드를 짧게 줄일 수 있습니다.

# useMemo

컴포넌트 내부에서 발생하는 연산을 최적화 한다는데 먼소리람?

```js
import React,{useState,useEffect,useMemo} from 'react';
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

    const onChange=(e)=>{
        console.log('onChange');
        setNumber(e.target.value);
    };

    const avg=useMemo(()=>{return getAverage(list);},[list]);

    useEffect(()=>{
        console.log('useEffect');

        if(list.length===0){
            console.log(list.length);
            setValues(0);
        }else{
            console.log(list.length);
            const sum = list.reduce((a,b)=>{return a+b;})/list.length;
            console.log('sum : '+sum);
            setValues(sum);
        }
    },[list]);

    const onInsert = (e)=>{
        console.log('onInsert');
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }

    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index)=>{
                    return <li key={index}>{value}</li>
                })}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    );
};
export default Average;
```

useEffect처럼 첫번째 인자에 콜백함수를 넣고, 두번째 인자에 감시할 state 값을 넣어주면
감시할 state값이 변경되면 콜백함수를 통해 연산을 수행할 수 있습니다. 이런 식으로 최적화를 할 수 잇습니다.

# useCallback

useMemo와 비슷한 함수입니다. 렌더링 성능 최적화하는 상황에서 쓰입니다.

```js
const onChange = useCallback((e)=>{
    setNumber(e.target.value);
});

const onInsert=useCallback(()=>{
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
},[number,list]);
```

useCallback 함수의 첫번째 인자는 실해앟고 싶은 콜백함수를 넣어야 합니다.
두번째 파라미터에는 배열을 넣고 이 파라미터의 배열을 조회할 수 있게 됩니다. 어떻게 사용해야할지 감이 안온다

아마 컴포넌트가 매번 랜더링 될 때마다 JS에서 함수도 재 생성하는것 같다.

이를 막기위해서 useCallback을 쓰나봄

# useRef

ref를 쉽게줄 수 있도록 합니다.

클래스형 컴포넌트에서는

```js
<div ref={ref=>this.input=ref}>
```
식으로 아주 쉽게 ref를 지정해줬지만 함수형은 할 수 없기 때문에 이 useRef를 활용합니다.

```js
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
```

여기서 주목해야할 부분은

```js
const inputEl=useRef(null);
inputEl.current.focus();
<input ... ref={inputEl}>
```

입니다. ref를 주고싶은 태그에 ref={inputEl} 로 ref를 설정하고

ref를 담을 변수는 useRef() 를 활용해서 ref를 담아줍니다.

inputEl ref의 current로 현재 ref DOM에 접근이 가능하고, focus로 포커싱을 주는것도 가능합니다.


# custom Hooks

이건 나중에 커스텀 Hooks 이 필요할때 찾아보도록 합시다. 아직은 그냥 이런것이 있다 정도로만 넘어갑시다.

```js
import {useReducer} from 'react';

function reducer(state,action){
    return{
        ...state,
        [action.name]:action.value,
    };
}

export default function useInputs(initialForm){
    const [state,dispatch] = useReducer(reducer,initialForm);
    const onChange = e =>{
        dispatch(e.target);
    };
    return [state,onChange];
}
```

```js
const [state,onChange] = useInputs({
    name:'',
    nickname:'',
});
const {name,nickname} = state;
```

Hooks의 reducer를 아예 다른 파일로 빼돌려 재활용한 코드입니다.

useInputs에는 reducer로 initialForm을 state로 가지고 내부에 선언된 reducer를 콜할 수 있는 dispatch를 만들고

이 dispatch 함수와 state 를 다시 배열로 리턴하는 함수입니다.

2번째 js 파일에서 이 모듈을 끌어와 사용하고 잇습니다.

아직 잘 모르겠습니다. 나중에 코딩하면서 문서를 보는게 더 나을것 같음