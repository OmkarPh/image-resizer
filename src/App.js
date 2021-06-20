import './App.css';
import React, { useRef } from 'react'

import Input from './components/Input';
import Output from './components/Output';
import Resize from './components/Resize';

function App() {
  const outputModule = useRef(null);
  const inputModule = useRef(null);
  const resizeModule = useRef(null);

  return (
    <div className="App">
      <div className="box" style={{height: '90vh', width: '98%', position: 'relative', padding: '0', border: '2px solid black'}}>
        
            <Input
              ref={inputModule} 
              injectRatio={(ratio,w) => resizeModule.current.injectRatio(ratio,w)} />

            <Resize
              ref={resizeModule}
              takeInput={()=>inputModule.current.getImg()} 
              displayResult={resizedIMG => outputModule.current.changeImage(resizedIMG)} />

            <Output ref={outputModule} />

        </div>
    </div>
  );
}

export default App;
