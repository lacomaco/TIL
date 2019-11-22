import React,{Fragment,Component} from 'react';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  getRandomColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  state = {
    color:'#000000',
    error:false,
  }

  handleClick = ()=>{
    this.setState({
      color:this.getRandomColor(),
    });

  }

  componentDidCatch(error,info){
    this.setState({
      error:true,
    });
    console.log('App.js');
    console.log({error,info});
  }

  render(){
    if(this.state.error){
      console.log('started');
      return (<div>에러 발생! 호에</div>)
    }

    return (
      <Fragment>
        <button onClick={this.handleClick}>랜덤 색생</button>
        <LifeCycleSample color={this.state.color}/>
      </Fragment>
  );
  }
}

export default App;
