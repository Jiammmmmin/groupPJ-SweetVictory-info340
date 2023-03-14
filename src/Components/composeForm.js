import { useState } from "react";
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

export function ComposeForm(props) {
  const howToHandleClick = props.addNewPost;
  let title = '';
  let content = '';
  let postId = '';
  const post = props.post;

  if (post != null) {
    title = post.title;
    content = post.content;
    postId = post.postId;
  }
  
  const [typedTitle, setTypedTitle] = useState(title); 
  const [typedContent, setTypedContent] = useState(content);
  const [disabledBtn, setDisabledBtn] = useState(true);
  

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
            if (postId == post.postId) {
                const postObj = ref(db, "postList/" +  objKeys[objArray.indexOf(post)]);
                firebaseSet(postObj, null);
            }
        }
    });   
  }

  // handle click function: after clicking add new object to the community list 
  function handleClick(event) {
    event.preventDefault();
    if (typedTitle !== '') {
      howToHandleClick(typedTitle, typedContent);
      setTypedTitle('');
      setTypedContent('');
      deletePost();
    }
  }

  

  // update the new title from the input 
  function handleTitle(event) {
    if (event.target.value !== '') {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
    const newTitle = event.target.value;
    setTypedTitle(newTitle);
  }

  // update the new content from the input
  function handleContent(event) {
    if (event.target.value !== '') {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
    const newContent = event.target.value;
    setTypedContent(newContent);
  }
  return (
    <form>
      <div className="d-flex justify-content-between">
        <label htmlFor="title-rect" className="form_label">Post Title</label>
        <p className="text-end date fs-6">{new Date().toLocaleString() + ""}</p>
      </div>
      {/* The title form */}
      <textarea 
        value={typedTitle} 
        onChange={handleTitle}
        className="title-rect" 
        placeholder="Title">
      </textarea>
      <label htmlFor="title-rect" className="form_label">Post Content</label>
      {/* The content form */}
      <textarea 
        value={typedContent} 
        onChange={handleContent} 
        className="rect" 
        placeholder="How do you feel today?">
      </textarea>

        <button disabled={disabledBtn} onClick={handleClick} className="btn btn-primary submit-button">
          <Link to='/PersonalPosts'>
            Submit
          </Link>
        </button>
    </form>
  )
  
}