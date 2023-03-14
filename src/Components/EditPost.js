import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';


export function EditPost(props) {
    const handleEdit = props.handleEdit;

    const editPost = () => {
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

                if (props.postId == post.postId) {
                    thePost = post;                    
                }
            }
        });
        handleEdit(thePost);
    }


    const handleClick = (event) => {
        editPost();
    }

    return (
        <div>
            <Link to='/WritePostForEdit'>
                <button onClick={handleClick} className="btn btn-secondary" type="button">
                        <span className="material-icons">Edit</span>
                </button>
            </Link>
        </div>
    );
}