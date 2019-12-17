# ContextAPI

사용법

1. 
createContext 함수를 import 합니다.
```js
import React , {createContext} from 'react';
...
```

2. createContext 함수를 Context를 생성합니다.

```js
...

export const TableContext = createContext({
    tableData :[],
    dispatch:()=>{},
});

...

```

createContext의 매개변수는 컨텍스트 객체의 초기값이 들어갑니다. 중요한것은 createContext로 생성한 context를 export 로 모듈화 시켜
다른 파일에서 참조할 수 잇게 해야합니다. 우리는 이 파일의 TableContext 모듈을 끌어와 다른 파일에서 다이렉트로 사용할 수 있게 합니다. 

3. Context가 들어갈 컴포넌트 부분을 createContext로 생성한 컴포넌트.Provider로 묶습니다. 컨텍스트에서 공유할 객체는 value 프로퍼티에 들어가게 됩니다.

```js
...
    const value = useMemo(()=>{
        return {
            tableData : state.tableData,
            dispatch,
        }
    },[state.tableData]);

        return (<TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <MTable/>
            <div>{state.result}</div>
        </TableContext.Provider>);
...

```

위 코드에서 value는 useMemo로 메모라이징한 값들입니다. 전체 코드를 올리는건 가독성이 안좋아서 하지 않았습니다.

state와 dispatch는 useReducer로 생성한 reducer입니다. reducer를 contextAPI에 넣어서 공유할 계획입니다. 전체 state를 공유하는것이 아닌 state.tableData만 넣었습니다.

### Usage 


1. createContext가 아닌 useContext가 필요합니다.

```js
import React,{useContext,useCallback} from 'react';
...
```

2. Context가 선언되고 모듈로 배출되는 파일을 import 해야합니다.

```js
import {TableContext,CODE, OPEN_CELL,CLICK_MINE,FLAG_CELL,NORMALIZE_CELL,QUESTION_CELL} from './MineSearch';
```

TableContext가 그 파일입니다.

3. 끌어온 Context를 useContext에 넣으면 사용이 가능합니다. 파괴자 문법으로 해체해서 사용합니다.

```js
    const {tableData,dispatch} = useContext(TableContext);
```
