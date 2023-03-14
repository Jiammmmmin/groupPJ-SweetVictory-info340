import React, { useState, useEffect} from 'react';
import { NavBar } from './NavBar.js';
import { Footer } from './Footer.js';
import { ViewPost } from './ViewPost.js';
import { AddPostToList } from './ComList.js';
import { WritePost } from './WritePost.js';
import { ViewPersonal } from './viewMyPosts.js';
import { AddPersonalToList } from './postPage.js';
import LoginPage from './login.js';
import About from './About.js';
import { Routes, Route } from 'react-router-dom';
import Community from './Community.js';
import { Navigate, Outlet } from "react-router-dom";
import { WritePostForEdit } from './WritePostForEdit.js';


// import firebase functions and data
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DEFAULT_USERS from '../data/test_user.json';

export default function App(props) {
    // access all the post from the database
    const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[0]); //initially null;
    const [postObjArray, setPostObjArray] = useState();    
    const [editedPost, setEditedPost] = useState();


    useEffect(() => {
        //log in a default user
        onAuthStateChanged(getAuth(), function(firebaseUser) {
            if(firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                
            }
            setCurrentUser(firebaseUser);
        })
        
        const db = getDatabase();
        const allPostRef = ref(db, "postList");
        onValue(allPostRef, function(snapshot) {
        const allPostObj = snapshot.val();
            const objKeys = Object.keys(allPostObj);
            const objArray = objKeys.map((keyString) => {
                allPostObj[keyString].key = keyString;
                return allPostObj[keyString];
            })
            setPostObjArray(objArray);
        });
    }, [])
    
    const addNewPost = (typedTitle, typedContent) => {
        const db = getDatabase();
        const allPostRef = ref(db, "postList");
        const newPostObj = {
            "userId": currentUser.userId,
            "userName": currentUser.userName,
            "content": typedContent,
            "title": typedTitle,
            "timeStamp": Date().toLocaleString(),
            "postId": Date.now()
             
        }
        firebasePush(allPostRef, newPostObj);
        const newPostArray = [...postObjArray, newPostObj];
        setPostObjArray(newPostArray);
    }
    
    const handleEditPost = (post) => {
        setEditedPost(post);
    }

    return (
        <div className='main-body'>
            <NavBar currentUser={currentUser}/>
            <Routes>
                <Route path="about" element={<About />} />

                <Route path="community" element={<Community />}>
                    <Route path=":postId" element={<ViewPost currentUser={currentUser}/>} />
                    <Route index element={<AddPostToList postObjArray={postObjArray} />} />
                </Route>

                <Route path="writePost" element={<WritePost howToAddNewPost={addNewPost} />} />
                
                <Route path="PersonalPosts" element={<Community />} >
                    <Route path=":postId" element={<ViewPersonal postObjArray={postObjArray} handleEditePost={handleEditPost}/>} >
                    </Route>
                    <Route index element={<AddPersonalToList currentUser={currentUser} postObjArray={postObjArray} />} />
                </Route> 

                <Route path="WritePostForEdit" element={<WritePostForEdit howToAddNewPost={addNewPost} post={editedPost}/>} />
                <Route path="signIn" element={<LoginPage />} currentUser={currentUser} />
                <Route element={<ProtectedPage currentUser={currentUser} />} ></Route>
                <Route path="*" element={<Navigate to="/about" />} />
            </Routes>

            <Footer />
        </div>
    );
}



function ProtectedPage(props) {
    //...determine if user is logged in
    if(props.currentUser === null) { //not undefined at all (no user)
      return <Navigate to="/signin"/>
    }
    else if(props.currentUser.userId === null){ //starting null user
      return <p>Spinner</p>;
    }
    else { //otherwise, show the child route content
      return <Outlet />
    }
  }
  
  