```js
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

위는 리액트의 컴포넌트 코드이다. App이라는 이름을 가진 컴포넌트 코드이다.

return으로 반환되는 것들은 모두 HTML Tag가 아닌 JSX 코드들이다. HTML과 완전히 비슷한데, 사실 이것들은 다시 자바스크립트로 리 랜더링된다.

책에서 나온 몇가지 중요 사항을 여기에 적을것이다.

## 1. JSX는 HTML이 아니라 자바스크립트이다.

따라서 자바스크립트 변수나  표현식을 사용하고 싶다면 el태그처럼 { } 안에 넣으면 된다.

ex)

```javascript
function App(){
  const name='hi';
  return render(
    <div> {name} </hi>
  );
}
```

## 2. JSX는 2개 이상의 컴포넌트를 리턴할 수 없다.

```javascript
function App(){
  return (
    <div>hi/div>
    <div>Bye</div>
  )
}
```

꼭 한개만 리턴할 수 있으며, 2개를 리턴하고 싶다면

```javascript
import {Fragment} from 'react';
function App(){
  return (
    <Fragment>
      <div>hi</div>
      <div>bye</div>
    </Fragment>
  );
}
```

Fragment를 거쳐서 리턴하면 된다.

## 3. JSX에서 주석은 모두 브라우저에서 볼 수 잇다.

// /* */ 모두 다 ...

안보이게 코드상에서만 볼 수 잇는 주석을 만들기 위해서는 {/* */} 이런형태로 해야함

## 4. 리액트 컴포넌트는 undefined를 리턴하는것을 불허한다.

우리가 여태까지 만들어온 

```js 
function App(){
  ...
}
```
이것이 컴포넌트이고 return뒤에 나오는 태그와 비슷한것들이 JSX이다.

```js
function App(){
  return undefined;
}
```

시 에러가 발생한다. 하지만 다음과 같은 경우는 가능하다

```js
function App(){
  return undefined || 'hi';
}
```

컴포넌트가 undefined일경우 , 사용할 다른 값을 지정 함으로 오류를 방지할 수 있다.

반면 JSX에서 undefined를 렌더링 하는것은 혀용한다.

```js
function App(){
  const name=undefined;
  return (
    <div> {name} </div>;
  )
}
```

이경우 렌더링 하지않기 때문에 화면에서 볼 수 없게 된다.

## 5. 인라인 스타일링 넣기

```js
function App(){
  const style={
    background-color:'tomato',
    color:'antiquewhite',
    fontSize:'240020202020202020202002020202020202020px',
    padding:'2394i19284918228190183401920391',
  };
  return (
    <div style={style}>hi</div>
  )
}
```

## 6. 리액트에서 class는 없다. className만이 존재한다.
App.css 다른 파일에 이런 css 코드가 잇다고 가정한다.
```css
.container{
  float:right;
  padding:20px;
  width:100px;
  height:100px;
}
```
```js
import 'App.css'
function App(){
  const name='리액트';
  return(
    <div className="react">{name}</div>
  )
}

```