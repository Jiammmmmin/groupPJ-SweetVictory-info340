// the back button need the link to community list page
// Currently, the post content is from the first object in the example database
// we need the value passed from the communityList that allows us to find the particular value from the dataBase such as use a id. 
import { useState } from 'react';
import { CommentList } from './CommentList'; 
import { EditPost } from './EditPost';
import { DeletePost } from './DeletePost';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export function ViewPersonal(props) {  

    const [commentObjArray, setCommentObjArray] = useState([]); // should import data from dataBase
    const handleEdit = props.handleEditePost;
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

    if(!thePost) {
       return <h2 className="text-center">No Post specified</h2>
    }

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
                    <EditPost postId={postId} handleEdit={handleEdit}/>
                    <DeletePost postId={postId}/>
                </div>
                <div>
                    <CommentList newCommentIdsPostID={postId}/>
                </div>
            </div>
        </div>
    )
}

function BackButton(props) {
    return (
        <button className="back-button"> 
            <Link to='/PersonalPosts'>
                <span className="fa fa-arrow-left"></span> 
                Back 
            </Link>
        </button>
    )
}
 