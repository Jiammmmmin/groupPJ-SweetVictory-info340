import React from 'react';
import { ComposeForm } from './composeForm';

export function WritePostForEdit(props) {
    const howToAddNewPost = props.howToAddNewPost; // the method for adding new post, passed from App
    const post = props.post;
    
    return ( 
        <div className="post-content">
            <div className="row flex-grow-1">
                <ComposeForm addNewPost={howToAddNewPost} post={post} />
            </div>
        </div>
        
    );
}