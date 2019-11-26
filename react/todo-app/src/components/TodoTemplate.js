import React,{Component} from 'react';
import './TodoTemplate.scss';

class TodoTemplate extends Component{

    render(){
        const {children} = this.props;
        return(
            <div className="TodoTemplate">
                <div className="app-title">일정 관리</div>
                <div className="content">{children}</div>
            </div>
        );
    }
}

export default TodoTemplate;