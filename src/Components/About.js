import React from 'react';
import childImage from '../img/child.jpg';
import familyImage from '../img/happy-family.jpg';
import olderManImage from '../img/happy-old-man.jpg';
import businessImage from '../img/businessman-with-money.jpg';
import familyImage2 from '../img/happy-family-2.jpg';
import teenImage from '../img/teens.jpg';
import logoImage from '../img/fullsweetlogobrown.png';

export default function About(props) {
    return(
        <div>
                <img src={logoImage} className='sweet-logo' alt="The logo of Sweet Victory!" />
                
                <p className='aboutImages'>
                <img src={familyImage} alt='A happy family holding hands walking through a field as the sun sets behind them.' />
                <img src={childImage} alt='A child smiling at the camera.' />
                <img src={olderManImage} alt='An elderly man showing both his hands to the camera in a thumbs-up position.' />
                </p>

                <p>According to a study by <a href="https://www.webmd.com/diabetes/type-2-diabetes-guide/diabetes-emotional-mental-health#1"> WebMD </a>, 
                people with diabetes are twice as likely to suffer from depression and are at an increased risk for suicide. 
                This highlights the importance of addressing the mental health needs of individuals with diabetes. 
                An online communication platform for diabetes patients can play a vital role in helping individuals adjust their mentality and improve their mental health. 
                Sweet Victory aims to provide a unique platform for people with diabetes to share their experience of battling illness. 
                They can also help each other out when they are depressed. When people know they are not by themselves, they gain more courage to overcome their difficulties. 
                We provide a safe and supportive space where individuals can share their experiences, connect with others who understand their struggles, 
                and access resources and information to help them manage the emotional and psychological aspects of living with diabetes. </p>

                <p className='aboutImages'>
                <img src={businessImage} alt='A businessman with sunglasses on a call, holding out a large number of American currency.' />
                <img src={teenImage} alt='A group of three teenagers looking at something on their phones.' />
                <img src={familyImage2} alt='A family posing for a picture in a park.' />

                </p>
                
                

        </div>
    )
}