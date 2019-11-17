import React,{Fragment,Component} from 'react';
import EventPractice from './EventPractice';
import ValidationSample from './ValidationSample';
import ScrollBox from './ScrollBox';

class App extends Component {
  render(){
    return (
    <div>
      <ScrollBox ref={(ref)=>{return this.scrollBox=ref}}/>
      <button onClick={()=>{this.scrollBox.scrollToBottom()}}>맨 밑으로</button>

    </div>
  );
  }
  
}
export default App;
