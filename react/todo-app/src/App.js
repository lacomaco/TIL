import React,{useState,useRef,useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () =>{

  const createBulkTodos=()=>{
    console.log('createBulkTodos called');
    const array=[];
    for(let i=0;i<=2500;i++){
      array.push({
        id:i,
        text:`할 일 ${i}`,
        checked:false,
      });
    }
    return array;
  }


  const [todos,setTodos] = useState(createBulkTodos);

  let nextId = useRef(2501);

  const onInsert = useCallback(
    (text)=>{
      const todo={
        id:nextId.current,
        text,
        checked:false,
      };
      setTodos(todos.concat(todo));
      nextId.current +=1;
    },
    [todos]
  );

  const onRemove = useCallback(
    (id)=>{
      console.log(' **** onRemove ****');
      console.log(id);
      console.log(todos);
      setTodos(todos.filter(todo => todo.id !== id));
      console.log(todos.filter(todo => todo.id !== id));
      console.log(' **** ****');
    },
    [todos]
  );
  const onToggle = useCallback(
    (id)=>{
      console.log(id);
      setTodos(
        todos.map((todo)=>{
          return todo.id === id ? {...todo,checked:!todo.checked} : todo
        })
      );
    },[todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove = {onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};
export default App;   