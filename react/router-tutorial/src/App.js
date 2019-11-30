import React from 'react';
import {Route,Link} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profile from './Profile';
import Profiles from './Profiles';
import HistorySample from './HistorySample';
const App = ()=>{
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
      <hr/>
      <Route path="/" component={Home} exact={true}/>
      <Route path={["/about","/info"]} component={About} exact={true}></Route>
      <Route path="/profile/:username" component={Profile} />
      <Route path="/profiles" component={Profiles}/>
      <Route path="/history" exact={true} component={HistorySample}/>
    </div>
  )
};

export default App;