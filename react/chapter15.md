# ContextAPI

리액트에서 전역적으로 사용할 데이터를 관리하는 라이브러리이다.

보통 리액트에서는 props, 리액트 컴포넌트가 자체적으로ㅓ 관리할 데이터는 state로 위에서 아래로 흐르는 방식으로 데이터를 관리한다.

전역적으로 사용할 데이터는 리액트 컴포넌트의 가장 최상단 root 컴포넌트의 state에 넣고 props로 전달하는 방식을 썼지만 너무 많으면 관리에 부담이 간다 . 그럴대 사용하는 라이브러리이다.

## 사용법

```js
import {createContext} from 'react';

const ColorContext=createContext({color:'black'});

export default ColorContext;
```

위 코드가 ContextAPI를 사용한 코드이다. react 라이브러리에서 가져와 객체형식으로 보관할 데이터를 넣으면 된다. 사용방법은 아래와 같다.

```js
import React from "react";
import ColorContext from "../contexts/color";
const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {value => {
        return (
          <div
            style={{ width: "64px", height: "64px", background: value.color }}
          />
        );
      }}
    </ColorContext.Consumer>
  );
};
export default ColorBox;
```

import 형식으로 ColorContext를 가져온후, ColorContext안의 Consumer 컴포넌트로 감싼후 value를 통해서 사용한다.

기존에는 props로 받았겠지만 ContextAPI를 사용하면 이렇게 하는것이 가능하다. 

주목해야할점은 Consumer 컴포넌트에 jsx를 함수의 형태로 넘겨줬다는점이다.

```js
import React from 'react';

const RenderPropsSample = ({children}) =>{
    return <div>결과: {children(5)}</div>
};

export default RenderPropsSample;


after ....

<RenderPropsSample> {value => 2* value }<RenderPropsSample>
```
RenderPropsSample 컴포넌트는 children을 props로 전달받은다. 일반적으로 우리가 여태까지 본 children은 문자열이거나 jsx이다. 하지만 여기서 넘겨지는 children은 함수이다.

랜더링 하는부분도 함수로써 쓰고 있다. ContextAPI에서 children을 함수 (Render Props) 형태로 넘겨줘야만 한다는 것은, ContextAPI가 위처럼 코드가 설계되어있다고 충분히 상상할 수 있다.

또한 ContextAPI로 넘겨주는 props에서 value.color에서 color는 Context에 저장된 객체의 요소값인것도 인지하고 있자. Context에 저장된 상태 객체를 value로 주입받아서 다시 렌더링하는것이다.

# Provider로 하위 Context 값 임시로 변경하기

```js
import React from 'react';
import ColorBox from './components/ColorBox';
import ColorContext from './contexts/color';

const App = ()=>{
  return(
    <>
    <ColorContext.Provider value={{color:'red'}}>
      <div>
        <ColorBox/>
      </div>
    </ColorContext.Provider>
    <ColorBox/>
    </>
  )
};

export default App;
```

ColorContext의 Provider 컴포넌트로 value를 하위 컴포넌트에서만 변경하는것이 가능하다.

ContextAPI의 상태를 영구적으로 변경하는것이 아니다. 또한 Provider를 사용할경우에는 반드시 value를 명시해줘야만한다.

# 동적 Context로 Context 상태 업데이트하기.



