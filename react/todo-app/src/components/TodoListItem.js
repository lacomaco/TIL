import React,{Component} from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';

import './TodoListItem.scss';

class TodoListItem extends Component{

    render(){
        const {text,checked,id} = this.props.todo;
        const onToggle = this.props.onToggle;
        return (
            <div className="TodoListItem">
                <div className = {cn('checkbox',{checked})} onClick={()=>onToggle(id)}>
                    {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                    <div className = "text">{text}</div>
                </div>
                <div className = "remove" onClick={()=>this.props.onRemove(id)}>
                    <MdRemoveCircleOutline/>
                </div>
            </div>
        );
    }
};

export default TodoListItem;