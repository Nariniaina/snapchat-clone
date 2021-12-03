import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/appSlice';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout());
      }
    })
    // This line in commentary MUST BE WRITE >>>>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          // JSX Error if we don't wrapped this in empty element
          <>
          <img
            className="app__logo" 
            src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""/>
          <div className="app__body">
            <div className="app__bodyBackground">
              <Routes>
                <Route exact path="/preview" element={<Preview />}></Route>
                <Route exact path="/" element={<WebcamCapture />}></Route>
                <Route exact path="/chats" element={<Chats />}></Route>
                <Route exact path="/chats/view" element={<ChatView />}></Route>
              </Routes>
            </div>
        </div>
        </>
        )}
      </Router>
    </div>
  );
}

export default App;
