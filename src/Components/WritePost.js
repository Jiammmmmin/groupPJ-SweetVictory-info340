import React from 'react';
import { ComposeForm } from './composeForm';

export function WritePost(props) {
    const howToAddNewPost = props.howToAddNewPost; // the method for adding new post, passed from App
    
    return ( 
        <div className="post-content">
            <div className="row flex-grow-1">
                <ComposeForm addNewPost={howToAddNewPost} />
            </div>
        </div>
        
    );
}

