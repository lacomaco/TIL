import React,{Component} from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';

class TodoInsert extends Component{
    state ={
        value:'',
    }

    onChange=(e)=>{
        this.setState({
            value:e.target.value,
        });
    }

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.onInsert(this.state.value);
        this.setState({
            value:'',
        });
    };



    render(){
        const {value} = this.state;
        return(
            <form className="TodoInsert" onSubmit={this.onSubmit}>
                <input placeholder="할 일을 입력하세요." value={value} onChange={this.onChange}/>
                <button type="submit">
                    <MdAdd/>
                </button>
            </form>
        );
    }
}

export default TodoInsert;