import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import Draggable from 'react-draggable';

const Input = forwardRef(({injectRatio}, ref) => {

    const [image, setImage] = useState(undefined);
    const inputImage = useRef(null);

    function imageUploaded(event){
    
      // Display preview image
      inputImage.current.setAttribute("src", window.URL.createObjectURL(event.target.files[0]));

      setImage(event.target.files[0]);

      // Obtaining dimensions & aspect ratio of uploaded image
      let img = new Image();
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;
        injectRatio(width/height, width);
      }
    }

    useImperativeHandle(ref, () => ({
        getImg(){
            return image;
        }
    }));

    return (
        <Draggable bounds="parent" className="item">
            <div className="item">

                <div className="titlebar">
                    <div className="title">
                        Input image
                    </div>
                    <input type="file" className="inputImage" onChange={imageUploaded} />
                </div>

                <div className="thumbnail">
                    <center>
                        <img src="defaultImg.png" alt="Uploaded image" accept="image/*" ref={inputImage} />
                    </center>
                </div>
                
            </div>
        </Draggable>
    )
});

export default Input