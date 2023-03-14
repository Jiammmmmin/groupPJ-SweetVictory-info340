import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

export function DeletePost(props) {
   
    const deletePost = () => {
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
                if (props.postId == post.postId) {
                    const postObj = ref(db, "postList/" +  objKeys[objArray.indexOf(post)]);
                    firebaseSet(postObj, null);
                }
            }
        });
        
    }

    const handleClick = () => {
        deletePost();
    };

    return (
        <div>
            <button onClick={handleClick} className="btn btn-secondary" type="button">
                <Link to='/PersonalPosts'>
                    <span className="material-icons">Delete</span>
                </Link>
            </button>
        </div>
    );
}


