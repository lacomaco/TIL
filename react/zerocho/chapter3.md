# import vs require
```js
const {React} = require('react');
import React,{Component} from 'react'; //React는 export default , Component는 export const Component 식으로 되어있다.

module.exports = React;

export default React;
```

둘이 같은 의미를 가진 코드이다. require는 node의 문법 , import는 es5의 문법이다.

export default가 붙어있으면 / import React로 가져올 수 있다.

default는 한 파일에서 한번만 쓸 수 있다.

# React.Memo

Memo 는 memorization의 줄임말임.

```js
import React,{memo} from 'react';
const Try = memo( ({tryInfo}) =>{
    return (
        <li>
        ...
        </li>
    )
});
```

memo로 감싸진 부분은 클래스형 리액트의 shouldComponentReact나 PureComponent처럼 동작하게되어서 쓸데없는 렌더링을 방지하게된다.

# React.createRef , useRef

어차피 hooks위주로 쓸태니 useRef만 기억해두자.

```js
import React,{useRef} from 'react';
...
const input = useRef();
...
<div ref={input}>
...

input.current.focus();
```

이런식으로 쓰면 댐 

# React state와 props를 연결하는방법.

