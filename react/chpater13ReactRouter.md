# 들어가기에 앞서서
이장은 그냥 순수하게 라이브러리를 소개하고 사용법만을 나열한 장이다.
그리고 여기서 대부분은 내가 쓸일이 거의 없을것 같다고 생각이 들엇다. 그래도 나중에 보기 편하게 정리를 최대한 해놨다 필요할때마다 보자

# ReactRouter로 SPA 개발하기

### SPA란 ?

Single Page Application의 줄임말, 일반적인 웹사이트는 라우터에 들어갈때마다 서버에서 렌더링한 페이지를 받아 뷰를 구성하는데

SPA에서는 초기에 HTML을 받고 나머지는 정보는 JSON 정보를 받아 구성하게 된다. 따라서 페이지 하나로 모든걸 대체하게됨 .

리액트에서는 react-router-dom 라이브러리를 통해서 리액트 라우터를 구성하는것이 가능하다.

react Router를 사용하면 props로 ,match , location , history객체가 전달됩니다.

### 프로젝트에 라우터 적용하는 방법
create react-app 으로 리액트 앱을 만들면 src파일에 index.js가 리액트를 랜더링하는 핵심 파일인데 이 부분을 
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'; // 새로 추가한 영역
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<BrowserRouter> 
    <App />
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

처럼 구성하면 된다. 

ReactDom.render가 렌더링 하는 함수인데 렌더링 할 루트 컴포넌트를 react-router-dom의 BrowserRouter로 감싸면 라우터가 적용되어 SPA 개발준비가 완료된다.

BrowserRouter 컴포넌트는 브라우저의 History API를 사용하여 페이지를 새로고침이나 이동 없이 변화하는게 가능하게 도와준다. 
( 라우터 하위 컴포넌트의 props로 history match location 객체등이 전달된다. )

### Router 사용법

```js
import {Route} from 'react-router-dom';
import TempComponent from './TempComponent';
...

<Route path={["/","/temp"]} exact={true} component={TempComponent}/>
```
Route 컴포넌트 태그를 이용해서 라우터를 랜더링 보여줄지 말지를 정의한다.

component에 랜더링할 라우터를 넣고

path에 라우터의 경로를 지정한다. 위 코드의 경우엔 루트 ( " / ") , "/temp" 를 방문할경우 이 라우터가 랜더링된다.

exact는 정확하게 루트에 위치한 경우에만 랜더링 되도록 하는것이다.

### Link
Link (anchor) 태그를 대신하는 태그이다. 앵커 태그를 클릭하면 해당 페이지로 강제로 이동하는데
Link 컴포넌트를 이용해서 해당 페이지로 강제로 이동이 아닌, 라우터로 이동하게 만드는것이다. 둘의 차이점은 앵커는 페이지로 강제로 이동하기 때문에 현재 페이지의 상태 정보를 모두 날리고
Link는 라우터만 이동하기 때문에 현재 페이지의 정보가 여전히 남아있다.

```js
import {Route,Link} from 'react-router-dom';
import TempComponent from './TempComponent';

...
<Link to="/">goHome</Link>
```

to로 이동할 라우터의 주소를 입력하면 된다.

### URL, 쿼리
(URL parameter)/profiles/hi
(URL query)/profiles?search=hi

둘의 차이점은 쿼리의 경우 검색하거나 , GET post로 정보를 옮길때 주로 쓰인다. 
search=hi를 key value 쌍으로 취급한다

### URL 파라미터의 경우 
/profiles/:say 로 취급이 가능하다. : 이 붙은것은 다른 문자로 변경이 가능하다 라는 뜻이다.

/profiles/:say의 라우터는 match라는 객체를 props로 받는데 이를 통해서 :say를 검출하는것이 가능하다.

```js
import React from 'react';
...

const Profiles=({match})=>{
    const {say} = match.params;
};
export default Profiles;
```

### URL 쿼리의 경우

/profiles?key=value 씽으로 들어오는 쿼리의 경우 쿼리 문자열을 객체로 변경하는 " qs " 라이브러리를 활용한다. (npm add qs)

쿼리는 props로 건너오는 location객체에 들어가 있는데 location 객체는 해당 라우터의 풀주소를 의미한다. ( http:// 까지 포함 )

따라서 location을 qs라이브러리를 적절히 파싱해야한다.

```js
import React from 'react';
import qs from 'qs';
...

const TempComponent = ({location,match})=>{
    const query=qs.parse(location.search,{
        ignoreQueryPrefix:true,
        // QueryPrefix는 쿼리의 가장 앞부분 ? 를 의미한다. ? 를 무시한다는 의미이다. search 해당하는 쿼리를 가져와 객체로 파싱해서 query에 넣는것이다.
    });

    console.log(query.key);

    // 중요한점은 query는 모두 문자열로 정리된단,ㄴ점이다.
};

export default TempComponent;
```

### History

history객체는 

https://developer.mozilla.org/ko/docs/Web/API/History_API

를 참조하는것이 좋다.

dom history api와 완전히 동일하다.

history.goBack()은 뒤로가기,

history.block()은 페이지를 블락시키기 (alert)

history.unblock()은 alert 삭제등을 의미한다.

페이지 이탈, 뒤로가기 등의 기록을 제어한다.

# withRouter => 

라우터가 아닌 객체에도 match,location,history API를 사용할 수 있도록 도와주는 라이브러리 

```js
import {withRouter} from 'react-router-dom';
const WithRouter = ({location,match,history}) =>{
    ...
};
export default withRouter(WithRouterSample) 
```

withRouter로 감싸주면 된다.

# Switch

Switch로 감싸면 일치하는 Router만 렌더링하게 허용한다.

```js
<Switch>
      <Route path="/" component={Home} exact={true}/>
      <Route path={["/about","/info"]} component={About} exact={true}></Route>
      <Route path="/profile/:username" component={Profile} />
      <Route path="/profiles" component={Profiles}/>
      <Route path="/history" exact={true} component={HistorySample}/>
</Switch>
```

Router path에 맞는 라우트만 렌더링한다. path가 지정되어 잇지 않다면 모든 영역을 렌더링한다.

# NavLink

Link와 일치

현재 경로 (path)가 Link의 path와 일치하면 그 부분을 CSS 스타일을 넣어 강조하는것이 가능하다.

```js
import React from 'react';
import {NavLink,Route} from 'react-router-dom';
import Profile from './Profile';

const Profiles = ()=>{
    const activeStyle={
        background:'black',
        color:'white'
    };

    return(
        <div>
            <h3>사용자 : 목록</h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/velopert">velopert</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/gildong">gildong</NavLink>
                </li>
            </ul>
            <Route
            path="/profiles"
            exact={true}
            render={()=><div>사용자를 선택해주세요.</div>}/>
            <Route path="/profiles/:username" component={Profile}/>
        </div>
    )
}

export default Profiles;
```

activeStyle에 스타일을 입히면 된다.

