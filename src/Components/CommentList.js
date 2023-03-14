import { getDatabase, ref, onValue } from 'firebase/database';

export function CommentList(props) {
    const postId = props.newCommentIdsPostID;
    const db = getDatabase();
        const allCommentRef = ref(db, "commentList");
        let commentObjArray = [];
        onValue(allCommentRef, (snapshot) => {
            const allCommentObj = snapshot.val();
            const objKeys = Object.keys(allCommentObj);
            const objArray = objKeys.map((keyString) => {
                allCommentObj[keyString].key = keyString;
                return allCommentObj[keyString];
            })
            for (const comment of objArray) {
                if (postId === comment.postId) {
                    commentObjArray.push(comment);                  
                }
            }
        });

    
    const commentArrayElem = commentObjArray.map((commentObj, index) => {
        const commentElem = <CommentItem 
            userName={commentObj.userName}
            content={commentObj.content}
            key={index}
        />
        return commentElem;
    })


    return (
        <div className="comment-bar"> 
            <h3> Comments </h3>
            <ul className="comment">
                {commentArrayElem}
            </ul>
        </div>
    )
}

function CommentItem(props) {
    const userName = props.userName;
    const content = props.content;

    return (
        <div className="comment mb-3">
            <li>
                <h4>{userName}</h4>
                <p>{content}</p>
            </li>
        </div>
    )
}