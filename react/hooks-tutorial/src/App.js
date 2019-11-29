import React,{useState} from 'react';
import Counter from './Counter';
import Info from './Info';
import Average from './Average';
const App=()=>{
  const[visible,setVisible] =useState(false);

  return (
    <Average/>
  )
}
export default App;
