import React , {Component} from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

class TodoList extends Component{

    state ={
        todo:[],
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(prevState.todo!==nextProps.todos){
            const {onRemove,todo} = nextProps;
            const onToggle = nextProps.onToggle;
            return {
                todo:nextProps.todos.map(
                    (todo)=>{
                        return <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />;
                    }
                )
            }
        }
    }

    
    render(){
        return(
            <div className="TodoList">
                { this.state.todo }
            </div>
        )
    }
}

export default TodoList;