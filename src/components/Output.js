import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import Draggable from 'react-draggable';

const Output = forwardRef((props, ref) => {

  const [outputImage, setoutputImage] = useState(undefined);
  const resizedImage = useRef(null);

  function downloadImage(){
    if(window.downloader)
      window.downloader.click();
  }

  useImperativeHandle(ref, () => ({
    changeImage(resizedImg){
      setoutputImage(resizedImg);
    }    
  }));



  return (
      <Draggable bounds="parent" className="item">
            <div className="item">

                <div className="titlebar">
                  <div className="title">
                      Resized image
                  </div>
                  <button className="inputImage" onClick={downloadImage}>Download !</button>
                </div>

                <div className="thumbnail">
                  <center>
                    <img 
                      src={outputImage}
                      alt="Resized image" 
                      accept="image/*" 
                      ref={resizedImage} />
                  </center>
                </div>
                
            </div>
          </Draggable>
  )
});

export default Output