import { useState } from "react";

export function CommentForm(props) {
    const [typedValue, setTypedValue] = useState('');
    const addComment = props.addComment;
    function handleClick (event){
        if (typedValue !== '') {
            addComment(typedValue);
            setTypedValue('');
            
        } else {
            event.preventDefault();
            alert("Empty comment is not allowed");
        }
    }

    function handleChange(event){
        const whatUserTyped = event.target.value;
        setTypedValue(whatUserTyped);
    }

    return (
        <form className="my-2">
            <div className="input-group">
                <label htmlFor="form-control"></label>
                <textarea 
                    onChange={handleChange}
                    value={typedValue}
                    className="form-control" rows="2" placeholder="Leave some comments...">
                </textarea>
                <button onClick={handleClick} className="btn btn-secondary" type="button">
                    <span className="material-icons">Comment</span>
                </button>
            </div>
        </form>
    )
}