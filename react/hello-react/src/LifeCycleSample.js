import React,{Component} from 'react';

class LifeCycleSample extends Component{
    state={
        number:0,
        color:null,
    }

    myRef=null;

    constructor(props){
        super(props);
        console.log('constructor');
    }

    //getDerivedStateFromProps는 들어온 props를 state에 동기화 시키는 메서드이다.
    static getDerivedStateFromProps(nextProps,prevState){
        console.log('getDerivedStateFromProps');
        // 다음 props와 현재 state가 일치하지 않으면 업데이트를 해줘야 한다.
        if(nextProps.color!==prevState.color){
            //리턴한 값이 다음 state로 동기화 된다.
            return {
                color:nextProps.color
            };
        }
        return null;
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate',nextProps,nextState);

        return nextState.number % 10 !== 4;
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    handleClick=()=>{
        this.setState({
            number:this.state.number+1,
        });
    }

    //getSnapshotBeforeUpdate는 업데이트 전에 업데이트할 컴포넌트의 정보를 snapshot으로 찍는것이다.
    // 이 메서드가 리턴하는 값을 componentDidUpdate의 3번째 인자에서 접근이 가능하다.
    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('getSnapshotBeforeUpdate');
        //만약 이전 props와 업데이트 할 props의 색이 다르다면 , prevProps는 이전 props, this.props는 업데이트후 반영될 props이다.
        if(prevProps.color!==this.props.color){
            return this.myRef.style.color;
        }
        return null;
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        console.log('componentDidUpdate',prevProps,prevState);

        if(snapshot){
            console.log('업데이트 되기 전 색상',snapshot);
        }
    }

    render(){
        console.log('render');
        const style={
            color:this.props.color,
        };

        return (
            <div>
                {this.props.missing.value}
                <h1 style={style} ref={ref=>this.myRef=ref}>{this.state.number}</h1>
                <p>color:{this.state.color}</p>
                <button onClick={this.handleClick}>더하기</button>
            </div>
        );
    }
}

export default LifeCycleSample;