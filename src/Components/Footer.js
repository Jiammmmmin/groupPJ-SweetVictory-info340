import React from 'react';
import footerImage from '../img/sweetvictorybrown.png';

export function Footer(props){

    return(
        <footer>
            <h3> Contact Us</h3>
            <p>University of Washington, Seattle</p>
            <p>&copy;INFO 340 Group BA2, Winter 2023</p>
            <p><img src={footerImage} alt="A brown and slightly larger version of the favicon on the tab of the page."/></p>
        </footer>
    );
     
}
