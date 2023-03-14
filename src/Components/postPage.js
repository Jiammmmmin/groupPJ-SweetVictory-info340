import React from 'react';
import { Link } from 'react-router-dom';

export function AddPersonalToList(props){
   
    let postObjArray = props.postObjArray || [];
    let userId = props.currentUser.userId;
    const postList = postObjArray.map((post) => {
       
        if (userId === post.userId) {
            return <PostElement key={post.postId} post={post} />;
        }
        
    })
    
    return (
        <div className='indexDiv'>
            {postList}
        </div> 
    );
}

function PostElement(props) {
    let post = props.post;
    return (
        <div className="indexForm">
            <Link to={"" + post.postId}><h2 className="title text-small">{post.title}</h2></Link>
            <p className="indexLabel">Posted on: {post.timeStamp}</p>
        </div>
    )
}