import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
    input3 = React.createRef();
  state = {
      input:[{
        password: "",
        clicked: false,
        validated: false
      },{
        password: "",
        clicked: false,
        validated: false
      }],
  };

  handleChange = (e) => {
      let input = [
          ...this.state.input,
      ];

      if(e.target===this.input){
          input[0]={
              ...this.state.input[0],
              password:e.target.value,
          }

      }else if(e.target===this.input2){
          input[1]={
              ...this.state.input[1],
              password:e.target.value,
          };
      }

      this.setState({
          input,
      })
  };

  handleButtonClick = (e) => {
      let input = [
          ...this.state.input,
      ]

      input[0]={
          ...this.state.input[0],
          clicked:true,
          validated:input[0].password==='0000',
      };

      input[1]={
          ...this.state.input[1],
          clicked:true,
          validated:input[1].password==='1111',
      };
      console.log(input);

      console.log(input[0].password);
      console.log(input[1].password);

      console.log(input[0].password==='0000');
      console.log(input[1].password==='1111');

      this.setState({
          input,
      });
  };

  render() {
    return (
      <div>
        <input
          ref={ref => (this.input = ref)}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.input[0].clicked ? (this.state.input[0].validated? "success": "failure") : ""
          }
        />

        <input
            ref={ref=>(this.input2=ref)}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.input[1].clicked ? (this.state.input[1].validated   ? "success"   : "failure") : ""
          }
        />

        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
