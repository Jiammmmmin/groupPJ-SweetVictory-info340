import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export function NavBar(props) {
    const currentUser = props.currentUser;
    let notSigned = false;
    if (!currentUser || !currentUser.userId) {
        notSigned = true;
    }
    const handleSignOut = (event) => {
        signOut(getAuth());
      }
    return (
            <header>
                <nav>
                    <div className="social-links">
                        <Link  to='/about'>Home</Link >
                        {currentUser && currentUser.userId && <Link to='/community'> Community </Link>}
                        {currentUser && currentUser.userId && <Link to='/writePost'> Write A Post </Link>}
                        {currentUser && currentUser.userId && <Link to='/PersonalPosts'> Personal Posts </Link>}
                        {currentUser && currentUser.userId && <Link to='/about'> <button  onClick={handleSignOut}>Sign Out</button> </Link>}
                        {notSigned && <Link to='/signIn'> Account </Link>}
                    </div>
                </nav>
                <h1>Sweet Victory</h1>
            </header>
    
    );
}