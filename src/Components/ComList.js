import React from 'react';
import { Link } from 'react-router-dom';
//input: post is the newPost post user create
// add new listItem to the currentPostList
export function AddPostToList(props){
    let postObjArray = props.postObjArray || [];    
    const postList = postObjArray.map((post) => {
        return <PostElement key={post.postId} post={post} />;
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
