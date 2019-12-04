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
