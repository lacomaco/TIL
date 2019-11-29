# REACT 컴포넌트가 리 랜더링 되는 상황
1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 변경될 때
3. 부모 컴포넌트가 리 랜더링 될 때
4. forceUpdate로 강제 업데이트가 진행될 때 

# React.memo
```js
export default React.memo(TodoListItem,(prevProps,nextProps)=>prevProps.todo===nextProps.todo);

or

export default React.memo(TodoList);
```

이처럼 React.memo를 활용하면, 매번 props가 바뀌지 않으면 리 렌더링 하지 않게 합니다. 기존의 경우엔 해당 컴포넌트의 props가 변경되지 않았어도 부모 컴포넌트에서 업데이트가 진행되면 다같이 업데이트가 이뤄져서 
최적화가 되지 않앗습니다.

두번째 인자에는 함수가 들어갑니다. 해당 함수가 true라면 렌더링을 하지 않는것 같습니다.

# 불변성
immer 라이브러리를 도움을 받읍시다. 보통 ...같은 배열 객체 해체자들은 shallowCopy를 사용하기 때문에 객체안의 객체는 shallowCopY되고 객체안의 정수나 문자열들은 shallowCopy 되지 않습니다.

# Toggle,Remove 최적화

setTodos에 함수를 넣는 방법, 그리고 reducer를 사용하는 2가지 방법이 있는데 저는 reducer가 더 편합니다. 방법은 다음과 같습니다.

```js
import React,{useState,useRef,useCallback,useReducer} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
function createBulkTodos(){
  const array=[];
  for(let i=1;i<=2500;i++){
    array.push({
      id:i,
      text:`할 일 ${i}`,
      checked:false,
    });
  }
  return array;
}

function todoReducer(todos,action){
  switch(action.type){
    case 'INSERT':
      //{type:'INSERT',todo:{id:1,text:'todo',checked:false}}
      return todos.concat(action.todo);
    case 'REMOVE':
      //{type:'REMOVE',id:1}
      return todos.filter(todo=>todo.id!==action.id);
    case 'TOGGLE':
      //{type:'TOGGLE', id :1}
      return todos.map(todo=> todo.id === action.id ? {...todo,checked:!todo.checked} : todo);
    default :
      return todos;
  }
}

const App=()=>{
  /*
  왜 State들을 App에서 지정해준것일까? todoList가 아니라?
  그것은 , todos 상태변화는 TodoInsert 컴포넌트에서 일어나기 때문이다.
  todoInsert의 상태변환 기능들도 App 루트에서 시작하게 만들어야 한다.
  리액트에서 데이터는 무조건 위에서 아래로 흐르기 때문이다.
  */

  //undefined는 뭘까? . useReducer의 2번째 파라미터는 state의 초기값이다. 우리는 undefined를 넣어주고 3번째에 초기값을 만들어주는 함수를 넣으면 해당 함수의 결과값이 undefined가 된다.
  // 이렇게 해주면 컴포넌트가 처음 렌더링될때만 createBulkTodos 가 실행된다. 실험해본 결과, 2번째 파라미터엔 함수가 들어가면 안된다.
  //reducer 방식이 더 좋다. 하나의 함수가 여러개의 인풋을 지 멋대로 하는건 헷갈리게만 만든다.
  const [todos,dispatch] = useReducer(todoReducer,undefined,createBulkTodos);
  const nextId = useRef(2501);
  const onInsert = useCallback(
    (text)=>{
      const todo={
        id:nextId.current,
        text,
        checked:false,
      };
      nextId.current=nextId.current+=1;
      //setTodos(todos.concat(todo));
      dispatch({type:'INSERT',todo});
    }
  ,[]);

  const onRemove = useCallback((id)=>{
    //setTodos(todos.filter(todo=>todo.id!==id));
    dispatch({type:'REMOVE',id});
  },[todos]);

  const onToggle = useCallback((id)=>{
    //setTodos(todos.map((todo)=>{
    //  return todo.id===id ? {...todo,checked:!todo.checked} : todo;
    //}));
    dispatch({type:'TOGGLE',id});
    // 왜 이런식으로 하지? , 왜냐하면 onIsert, onRemove는 todos가 변경될 떄마다 , 새롭게 생성되기 때문이다.
    // 왜 생성되냐면 , todos를 항상 최신 버전으로 참조하기 위해서 그런식으로 만들어졌다.
  },[]);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}
export default App;
```

기존 toggle,remove 함수는 매번 todos가 변경되면 재생성되었습니다. useCallback을 사용하고 있어 최신 todos를 참조하기 위해서 어쩔 수 없이 매번 함수를 재생성 하였는데 이를 reducer로 교체함으로써 
최적화 하는것이 가능합니다.

주목해야할곳은 useReducer의 2번째 매개변수에 undefined가 들어갑니다.

useReducer의 2번째 매개변수는 객체나 값인 상태값만 들어갈 수 있습니다. 함수로 초기값을 생성하는 경우에는 3번재 인자에 함수를 넣어야합니다.

# react-virtualized

```js
import React,{useCallback} from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
import {List} from 'react-virtualized';

const TodoList=(props)=>{
    const onRemove = props.onRemove;
    const onToggle = props.onToggle;
    // 최적화하는 함수, 첫번째 인자로 함수, 두번째 인자로 참조할 값들이 들어간다.
    const rowRenderer = useCallback(({index,key,style})=>{
        const todo = props.todos[index];
        return(
            <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle = {onToggle} style={style} />
        );
    },[onRemove,onToggle,props.todos]);
    return (
        <List
        className="TodoList"
        width={512} //전체크기
        height={513} //전체 높이
        rowCount={props.todos.length} //항목의 갯수
        rowHeight={57} //항목의 크기
        rowRenderer={rowRenderer} //항목을 랜더링할때 쓸 함수
        list={props.todos} //항목의 배열
        style={{outline:'none'}} //항목에 적용될 기본 스타일,
        />
    );
};
export default React.memo(TodoList);
```

```js
import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline
} from "react-icons/md";
import "./TodoListItem.scss";
import cn from "classnames";

const TodoListItem = props => {
  const { text, checked, id } = props.todo;
  const onRemove = props.onRemove;
  const onToggle = props.onToggle;
  const style = props.style;
  console.log(style);
  return (
    <div style={style}>
      <div className="TodoListItem">
        <div
          className={cn("checkbox", { checked })}
          onClick={() => {
            onToggle(id);
          }}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};
export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo
);
```
1. 각 항목 크기를 px 단위로 알아내기
2. useCallBack으로 컴포넌트를 생성하는 함수 만들어내기
3. react-virtualized 의 List 컴포넌트를 꺼내와 위처럼 넣기
4. 랜더링하는 컴포넌트를 div로 감싸고 해당 div에는 props로 주는 style을 넘겨줍니다. 이것이 핵심입니다. 자동으로 계산된 크기만큼 다시 랜더링되거든요

우리의 경우 1만개의 컴포넌트를 생성하는데, 사실 이용자는 10개의 컴포넌트만 보면됩니다. 나머지는 스크롤뒤에 숨겨져 있거든요

이를 모두 보여줄 필요는 없습니다. 스크롤을 내릴때마다 생성하여 붙이면 됩니다. 이를 도와주는것이 react-virtualized입니다.

https://github.com/bvaughn/react-virtualized/tree/master/docs#documentation

필요할때마다 책이나 위 document를 참고합시다. 기본적으로 List에 컴포넌트의 정보를 넣고, 랜더링 하는 함수를 만들고, 또 style을 props로 넘겨주고 랜더링 되는 컴포넌트를 div로 감싸고 style을주는것이 핵심입니다.

계산된 style이 주어지고 이 style로 크기를 나누기 때문입니다. 

정리 :

1. 각 항목을 px단위로 구분하기
2. List 정의하기
3. 랜더링할 컴포넌트를 생성하는 함수 만들기 이 함수는 인자로 index,key,style 받고 index는 배열의 위치, key는 배열 키, style는 virtualzied가 계산한 css 를 넘겨줍니다.
4. 랜더링하는 컴포넌트를 div로 감싸고 props로 넘어온 style을 씌워줘야 깨지지 않습니다.

