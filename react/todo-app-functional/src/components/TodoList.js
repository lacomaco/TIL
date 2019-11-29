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