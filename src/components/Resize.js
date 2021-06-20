import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Draggable from 'react-draggable';

import resizeFile from '../services/resize';
import "./resize.css";

const Resize = forwardRef(({displayResult, takeInput}, ref) => {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [ratio, setRatio] = useState(undefined);

    function changeWidth(value){
        setWidth(value);
        if(ratio)
            if(Math.round(value/ratio) !== (value/ratio))
                setHeight((value/ratio).toFixed(2));
            else
                setHeight(value/ratio)
    }
    function changeHeight(value){
        setHeight(value);
        if(ratio)
            if(Math.round(value/ratio) !== (value/ratio))
                setWidth((value/ratio).toFixed(2));
            else
                setWidth(value/ratio)
    }

    function process(){
        const input = takeInput();
        if(!input){
            alert("Please upload an image first !");
            return;
        }
        resizeFile(input, width, height).then(result =>{
            displayResult(result);
            let a = document.createElement("a");
            a.href = result
            a.download = "Resized image.jpg";
            window.downloader = a;
        })
    }

  useImperativeHandle(ref, () => ({
    injectRatio(newRatio, newWidth){
      setRatio(newRatio);
      setWidth(newWidth);
      if(Math.round(newWidth/newRatio) !== (newWidth/newRatio))
          setHeight((newWidth/newRatio).toFixed(2));
      else
          setHeight(newWidth/newRatio)
    }
  }));

    return (
        <Draggable bounds="parent" className="item">
            <div className="item" onClick={e=>e.stopPropagation()} id="resizer">
                <center>
                    <br/><br/>
                    Width: <input type="number" value={width} onChange={e=>changeWidth(e.target.value)}/>
                    <br/><br/>
                    Height: <input type="number" value={height} onChange={e=>changeHeight(e.target.value)} />
                    <br/><br/>
                    <button onClick={process}>
                        Resize
                    </button>
                </center>
            </div>
        </Draggable>
    )
});

export default Resize