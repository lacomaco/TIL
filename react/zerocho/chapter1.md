1-1

React class Component는 레거시이다. 이런것이 있었다 정도로만 기억해두자.
```js
// <script type="text/babel">
const e =React.createElement;

class LikeButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            like:false,
        };
    }

    render(){
        //아래의 문법 형식은 HTML이 아니라 JSX이다. JSX를 사용하기 위해선 바벨이 필수적이다.
        return <button type="submit" 
        onClick={()=>{
            this.setState({like:true});
            }}>
            {this.state.like===true ? 'true ' : 'false' } </button>
        //return e('button',{onClick:()=>{
        //    console.log('clicked');
        //    this.setState({like:true}); //state 변경
        //    },type:'submit'},this.state.like===true?'true':'false');
        // createElement메소드의 첫번째 인자는 태그명 , 두번째 인자는 이벤트와 태그의 attribute를 입력 , 3번째는 textChild이다.
    };
};

ReactDOM.render(<LikeButton />,document.querySelector('#root'));
//ReactDOM의 render메소드로 reactElement를 렌더링한다. id가 root인 곳에 렌더링된다.
```