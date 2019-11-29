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
    // 이를 해결하기 위해서 setTodos에 함수를 넣었다. 기존에는 그냥 새로운 업데이트할 객체를 넣었지만 이번에는 업데이트 하는 함수를 넣었다 이렇게 되면
    // 업데이트를 해당 함수로 하기 때문에 매번 onRemove , onToggle을 생성하지 않는다. 이를 함수형 업데이트라고 부른다. 또는 reducer를 이용해도 된다. 나는 reducer를 이용하는 방법으로가자.
  },[]);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}
export default App;