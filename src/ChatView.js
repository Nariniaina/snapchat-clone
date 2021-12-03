import React, { useEffect } from 'react'
import './ChatView.css'
import { useSelector } from 'react-redux'
import { selectSelectedImage } from './features/appSlice'
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage);
    const history = useNavigate();

    useEffect(() => {
        if (!selectedImage) {
            exit();        
        }
        // This line in commentary MUST BE WRITE >>>>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage])

    const exit = () => {
        history("/chats");
    };

    return (
        <div className="chatView">
            <img onClick={exit} src={selectedImage} alt=""/>
            <div className="chatView__timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ["#004777", 0.33],
                        ["#F7B801", 0.33],
                        ["#A30000", 0.33],
                    ]}
                >
                    {({remainingTime}) =>  {
                        if (remainingTime === 0) {
                            exit();
                        }

                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
