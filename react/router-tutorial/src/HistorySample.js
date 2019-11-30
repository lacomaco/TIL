import React, {Component} from 'react';

class HistorySample extends Component{
    handleGoBack=()=>{
        this.props.history.goBack();
    };

    handleGoHome=()=>{
        this.props.history.push('/');
    };

    componentDidMount(){
        this.unblock=this.props.history.block('정말 떠나실 건가요?');
    }
    
    componentWillMount(){
        //언블록이 있으면 언블록호출해서 질문을 멈춤
        if(this.unblock){
            this.unblock();
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>
        );
    }
};

export default HistorySample;