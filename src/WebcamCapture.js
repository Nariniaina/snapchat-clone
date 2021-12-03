import React, { useRef, useCallback /*, useState */ } from 'react';
import Webcam from "react-webcam";
import './WebcamCapture.css';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
};
  
function WebcamCapture() {
    // its like a pointer
    const webcamRef = useRef(null);

    // test camera
    // const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    // History from react-router-dom help us from redirecting or 
    // > push into another webpage
    const history = useNavigate();

    const capture = useCallback(() => {
        // launch function 1 > save the output on the output
        const imageSrc = webcamRef.current.getScreenshot({width: videoConstraints.width, height: videoConstraints.height});
        // test camera
        // console.log(imageSrc);
        // setImage(imageSrc);

        dispatch(setCameraImage(imageSrc));
        history("/preview");  
    // This line in commentary MUST BE WRITE >>>>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [webcamRef])

    return (
        <div className="webcamCapture">
            <CloseIcon className="webcampCapture__close" onClick={() => history("/chats")} />
    
            <Webcam
                audio={false}
                width={videoConstraints.width}
                height={videoConstraints.height}
                ref={webcamRef}
                style={{
                    objectFit: "cover",
                 }}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />

            {/* test camera */}
            {/* <img src={image} alt=""/> */}
        </div>
    )
}

export default WebcamCapture
