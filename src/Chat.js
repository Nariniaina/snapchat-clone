import React from 'react'
import './Chat.css'
import { Avatar } from '@material-ui/core'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage } from './features/appSlice'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'

function Chat({id, username, timestamp, read, imageUrl, profilePic}) {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            // set or update => use "set" 
            db.collection("posts").doc(id).set({
                read: true,
            }, { merge: true });
            // merge : true is the same as the update where the id = id;
            // So if you don't write this : this chage all the post to true
            history("/chats/view");
        }
    }
    
    return (
        <div onClick={open} className='chat'>
            <Avatar className='chat__avatar' src={profilePic} />
            <div className="chat__info">
                <h4>{username}</h4>
                {/* No react-timeago */}
                {/* <p>Tap to view - {new Date(timestamp?.toDate()).toUTCString()}</p> */}
                {/* with No react-timeago */}
                <p>
                    {/* If read = true don't show tap to view */}
                    {!read && "Tap to view -"} {" "}
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
                </p>
            </div>
            {!read && <StopRoundedIcon className='chat__readIcon'/>}
        </div>
    )
}

export default Chat
