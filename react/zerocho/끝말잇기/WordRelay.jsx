const React = require('react');

class WorldRelay extends React.Component{
    state= {
        word:'메롱스',
        value:'',
        result:'',
    }

    onSubmitForm = (e)=>{
        e.preventDefault();
        if(this.state.word[this.state.word.length-1] === this.state.value[0]){
            this.setState({
                ...this.state,
                word:this.state.value,
                value:'',
                result:'딩동댕'
            });
            this.input.focus();

        }else{
            this.setState({
                ...this.state,
                result:'땡',
                value:'',
            });
            this.input.focus();
        }
    };

    onChange = (e)=>{
        this.setState({value:e.currentTarget.value});
    }

    onRefInput = (c)=>{
        this.input = c;
    }



    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit = {this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChange}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WorldRelay;