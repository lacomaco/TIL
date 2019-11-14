https://reactjs.org/docs/events.html
# 리액트 이벤트 핸들링 

### 주의 사항.

리액트에서 이벤트는 DOM 요소에만 가능합니다. 우리가 만든 컴포넌트에는 이벤트가 들어가지 않습니다. 예를들어서

```js
const doSomething = () => console.log('doSomething');
<Component OnClick={doSomething}/>
```

이라면 props 이름이 onClick으로 객체가 들어갈 뿐입니다. 

하지만 props 로 받아서 컴포넌트 내부에서 자체적으로 DOM 이벤트를 걸 수 있습니다 .예를들어 Component 에서

```js
const Component = ()=>{
    return (<div onClick={this.props.onClick}> ... </div> )
}
```

이런식으로요.

또한 jsx에선 자바스크립트 표현식을 쓰기 위해선 {} 를 사용해야 한다는것을 상기합시다. 저건 HTML 코드가 아니에요 JSX입니다. 따라서 
props나 우리가 외부에 설정한 자바스크립트 이벤트 함수를 넣고 싶다면 {} 에 넣어야합니다.

### 이벤트 핸들링

### 객체버전

```js
class EventPractice extends Component{
    state={
        message:'',
        username:'',
    };

    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    function handleChange(){
        ...
    }

    function handleClick(){
        ...
    }

    handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            this.handleClick();
        }
    }

    handleChange2=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    handleClick2=()=>{
        alert(this.state.username+': '+this.state.message);
        this.setState({
            message:'',
            username:'',
        });
    }
    
    render(){
        return(
            <div>
                <h1>이벤트 연습</h1>

                <input
                type='text'
                name='username'
                placeholder='사용자명'
                value={this.state.username}
                onChange={this.handleChange2}
                />

                <input
                type='text'
                name='message'
                placeholder='아무거나 입력해 보세요.'
                value={this.state.message}
                onChange={this.handleChange2}
                onKeyPress={this.handleKeyPress}
                />

                <button onClick={
                    this.handleClick2
                }>확인</button>
            </div>
        );
    }
}

export default EventPractice;

```


### 함수 버전

```js
import React,{useState} from 'react';

const EventPractice = ()=>{
    const [form,setForm]=useState({
        username:'',
        message:'',
    });

    const {username,message} = form;
    const onChange = e =>{
        const nextForm={
            ...form,
            [e.target.name]:e.target.value,
        };
        setForm(nextForm);
    };

    const onClick=()=>{
        alert(username+': '+message);
        setForm({
            username:'',
            message:'',
        })
    };

    const onKeyPress= (e)=>{
        if(e.key==='Enter'){
            onClick();
        }
    }

};

export default EventPractice;
```
<hr>

이책은 too verbose하다. 자바스크립트 꼼수도 많이 들어가있어서 , 자바스크립트 기초를 모른다면 보기 어려울것 같다.

우선 나는 순수 자바스크립트만을 썼을 때에는 주로 addEventListener로만 이벤트를 넣었다.

onClick, onChange, onKeyPress 단 한번도 써본적이 없지만 이 책을 보니 리액트에서는 이게 주류인것 같다 익숙해져야한다. 안익숙해서 어지러운것뿐 ...

우선 주목해야할 부분은 

```js
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    function handleChange(){
        ...
    }

    function handleClick(){
        ...
    }
```

이 파트이다. 자바스크립트의 함수는 호출을 어디서 하느냐에 따라서 this가 동적으로 바인딩된다.

자바와 비교하면 안된다 완전히 다른 언어이기 때문이다.

우리는 컴포넌트에 이런 이벤트를 달기때문에 , 가상 DOM에 달리는 것이다. 리액트가 HTML DOM 에 존재하는것이 아니다.

결과적으로 , 이벤트의 this는 undefined로 할당된다. 

따라서 bind로 리액트 객체를 강제적으로 바인딩해 묶어서 쓴다.

하지만 이는 화살표 함수로 완전히 상위호환으로 대체하는것이 가능하다

```js
    handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            this.handleClick();
        }
    }

    handleChange2=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    handleClick2=()=>{
        alert(this.state.username+': '+this.state.message);
        this.setState({
            message:'',
            username:'',
        });
    }
```

더럽게 constructor에 이것저것 더러운짓거리 하지 않아도 된다.

이제부터는 그냥 화살표 함수로만 선언하고 활용하자 저런 추잡한 짓거리 하던 시절도 있었구나 정도로 생각하고 교양 지식으로써 남겨두자.

이벤트는 JSX 태그에 onClick={함수} 등으로 선언한다.

다음으로 주목해야할 꼼수는 

```js
    handleChange2=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    }
```

이 부분이다.

자바스크립트의 객체 키값을 [] 로 감싸면 해당 변수의 값이 키로써 작동하게 된다.

handleChange2는 2번이나 우려먹지만 , 우려먹을 때 마다 값이 다른 state가 변경되어야 하기 때문에, e.target.name으로 현재 이벤트가 작동한 

태그의 이름의 state를 변경하는 식으로 해결했다.

다음은 함수형 부분을 보자

```js
    const [form,setForm]=useState({
        username:'',
        message:'',
    });

    const {username,message} = form;
    const onChange = e =>{
        const nextForm={
            ...form,
            [e.target.name]:e.target.value,
        };
        setForm(nextForm);
    };
```

useState로 state들을 만들때, 일반 변수가 아닌 객체를 state화 시킨것을 보자

이렇게 하면 우리가 클래스형에서

```js
state={
    username:'',
    message:'',
}
```
한것과 같이 동일한 역할을 수행하게 된다.

```js
    const onChange = e =>{
        const nextForm={
            ...form,
            [e.target.name]:e.target.value,
        };
        setForm(nextForm);
    };
```

자바스크립트의 ...패턴은 나머지 패턴이다.

form의 전체 나머지를 비구조화로 해체해서 객체에 집어넣고

[e.target.name] 으로 변경되는 값을 바꾸는 꼼수이다.

바꾸고 나서 해당 state를 다시 업데이트에 넣어준다

하나만 바꾸면 되는데 왜 객체 전체를 바꿀까요?

useState로 state 객체를 가져왔기 떄문입니다.

3장에서 봤듯이 , 객체는 객체원소 값이 바뀔뿐이지, 객체의 주소나 값은 그대로가 됩니다. 무엇이 바뀌는지 정의하기 어렵죠

그래서 보통 객체 state를 바꿀때는

1. 객체의 사본을 만들고

2. 객체 사본을 업데이트하고

3. setState나 기타 setter로 업데이트된 사본을 넣어 , 덮어씌웁니다.

이런 식으로 진행합니다.