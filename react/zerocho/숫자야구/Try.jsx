import React,{Component} from 'react';

class Try extends Component{
    render(){
        const {v,i} = this.props;
        return(
            <li>
                {v.try} {v.result}
            </li>
        );
    }
}

export default Try;