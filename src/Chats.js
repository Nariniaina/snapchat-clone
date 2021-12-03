import React, { useState, useEffect } from 'react'
import './Chats.css'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import {db, auth} from './firebase'
import Chat from './Chat'
import { selectUser } from './features/appSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage } from './features/cameraSlice'

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const history = useNavigate();

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history("/");
    }

    const signOut = () => {
        auth.signOut();
        history("/");
    }

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setPosts(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
    }, [])

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} className='chats__avatar' onClick={signOut}/>
                <div className="chats__search">
                    <SearchIcon className="chats__SearchIcon" />
                    <input placeholder="Friends" type="text"/>
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>

            <div className="chats___posts">
                {posts.map(
                    ({
                        id, 
                        data: {profilePic, username, timestamp, imageUrl, read}, }) => (
                            <Chat 
                                key={id}
                                id={id}
                                username={username}
                                timestamp={timestamp}
                                imageUrl={imageUrl}
                                read={read}
                                profilePic={profilePic}
                            />
                        )
                )}
            </div>

            <RadioButtonUncheckedIcon
                className='chats__takePicIcon'
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
    )
}

export default Chats
