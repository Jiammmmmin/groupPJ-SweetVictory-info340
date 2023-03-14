import { useState } from 'react';
import { CommentForm } from "./CommentForm";
import { CommentList } from './CommentList'; 
import { EditPost } from './EditPost';
import { DeletePost } from './DeletePost';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database';

export function ViewPost(props) {  
    const [commentObjArray, setCommentObjArray] = useState([]); // should import data from dataBase
    const currentUser = props.currentUser;
    const paramsObj = useParams();
    const postId = paramsObj.postId || '/community'; 
    let thePost = null;
    

    

    const db = getDatabase();
    const allPostRef = ref(db, "postList");
    onValue(allPostRef, (snapshot) => {
        const allPostObj = snapshot.val();
        const objKeys = Object.keys(allPostObj);
        const objArray = objKeys.map((keyString) => {
            allPostObj[keyString].key = keyString;
            return allPostObj[keyString];
        })
        
        for (const post of objArray) {

            if (postId == post.postId) {
                thePost = post;
                return post;
            }
        }
    });
    
    const addComment = (comment) => {
        const db = getDatabase();
        const allCommentRef = ref(db, "commentList");
        const newCommentObj = {
            "userName": currentUser.userName,// who comment it
            "content": comment,
            "timeStamp": Date.now(),
            "postId": postId
        }

        firebasePush(allCommentRef, newCommentObj);
        const newCommentArray = [...commentObjArray, newCommentObj];
        setCommentObjArray(newCommentArray);
    }
    
    if(!thePost) {
       return <h2 className="text-center">No Post specified</h2>
    }
    

    if (currentUser.userId === thePost.userId) {
        return (
            <div>
                <BackButton/> 
                {/* Date */}
                <div className="main-body"> 
                    <div className="post-content"> 
                        <h3>{thePost.title}</h3>
                        <p> {thePost.content} </p>
                    </div>
                    <div className='operation-btn'>
                        <EditPost postId={postId}/>
                        <DeletePost postId={postId}/>
                    </div>
                    <div>
                        <CommentList newCommentIdsPostID={postId}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <BackButton/> 
                <div className="main-body"> 
                    <div className="post-content"> 
                        <h3>{thePost.title}</h3>
                        <p> {thePost.content} </p>
                    </div>
                    <CommentForm addComment={addComment}/>
                    <CommentList newCommentIdsPostID={postId}/>
                </div>
            </div>
        )
    }
}

function BackButton(props) {
    return (
        <button className="back-button"> 
            <Link to='/community'>
                <span className="fa fa-arrow-left"></span> 
                Back 
            </Link>
        </button>
    )
}