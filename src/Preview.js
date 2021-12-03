import React, { useEffect } from 'react'
import './Preview.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectCameraImage, resetCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { storage, db } from './firebase';
import firebase from 'firebase/compat/app'; //v9

// This is how we import our uuid
import { v4 as uuid } from "uuid";
import { selectUser } from './features/appSlice';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const history = useNavigate();
    const dispatch = useDispatch();

    // realtime effect
    // If there is no image, return to the home page
    useEffect(() => {
        if (!cameraImage) {
            history("/");
        }
    }, [cameraImage, history]);

    const closePreview = () => {
        dispatch(resetCameraImage());
        history("/");
    }

    const user = useSelector(selectUser);

    const sendPost = () => {
        const id = uuid();

        // ==== Here UPLOAD To DATABASE =====
        const uploadTask = storage
            .ref(`posts/${id}`)
            // reference point for when we push on our database
            .putString(cameraImage, 'data_url');
            // Remember base64 image = long massive data so we need putString
        uploadTask.on(
            'state_changed', 
            null, 
            (error) => {
                // ERROR Function
                console.log(error)
            }, () => {
                // COMPLETE Function
                //  ====== AFTER UPDLOAD ====== DOWNLOAD URL =========
                storage.ref('posts')
                    .child(id)
                    .getDownloadURL()
                    // when we have the url
                    .then((url) => {
                        db.collection('posts').add({
                            imageUrl: url,
                            username: user.username,
                            read: false,
                            // Because on the post created, 
                            // you need to see the post and turn to true
                            profilePic: user.profilePic, 
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                        history("/chats");
                    });
            });
    }

    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className='preview__close' />
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendIcon" />
            </div>
        </div>
    )
}

export default Preview
