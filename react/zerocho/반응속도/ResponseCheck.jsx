import React,{Component} from 'react';

class ResponseCheck extends Component {
    state = {
        state : 'waiting',
        message:'클릭해서 시작하세요.',
        result:[],
    };
    timeout;
    startTime;
    endTime;
    onClickScreen=(e)=>{
        const {state,message,result} = this.state;
        if(state==='waiting'){
            this.setState({
                state:'ready',
                message:'초록색이 되면 클릭하세요.',
            });
            this.timeout=setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 클릭',
                });
                this.startTime = new Date();
            },Math.floor(Math.random()*1000)+2000);
        }else if(state==='ready'){ //성급하게 클릭
            this.setState({
                state:'waiting',
                message:'너무 성급했습니다!',
               result:[], 
            });
            clearTimeout(this.timeout);
        }else if(state==='now'){ //반응속도 체크
            this.endTime=new Date();
            
            this.setState((prevState)=>({
                state:'waiting',
                result:[],
                message:'클릭해서 시작하세요!',
                result:[...prevState.result,this.endTime-this.startTime],
            }));
        }
    };

    renderAverage = () =>{
        return this.state.result.length === 0
        ? null
        : <div>평균 시간 : { this.state.result.reduce((a,c)=>a+c)/this.state.result.length}ms</div>
    }

    render(){
        const {state,message} = this.state;
        return (
            <>
                <div id="screen"
                className={state}
                onClick={this.onClickScreen}>
                    {message}
                </div>
                <p>시도 : {this.state.result.length}</p>
                {this.renderAverage()}
            </>
        );
    }
};

export default ResponseCheck;