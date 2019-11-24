import React,{Component} from 'react';
import './SassComponent.scss';

class SassComponent extends Component{
    state={
        color:['red','orange','yellow','green','blue','indigo','violet'],
    };

    colorList=this.state.color.map((color)=>{return <div className={`box ${color}`}> </div>})
    render(){
        return (
            <div className="SassComponent">
                {this.colorList}
            </div>
        )
    }
}

export default SassComponent;