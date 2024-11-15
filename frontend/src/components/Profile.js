import React from 'react';
import "./Profile.css";

const Profile = (props) => {
  const languageClass = getLanguageClass(props.desc.toLowerCase());

  const profileClassName = `container ${props.className} ${languageClass}`;

  return (
    <div className={profileClassName}>
      <div className="card">
      <div className="inner-card">
          <div className="front">
            <img src={props.img}/>
            
              
          </div>
              <div className="back">
                  {/* <img src="waving-hand.png"> */}
                  <h1>{props.name}</h1>
                  <p>{props.desc}</p>
                  <div className="row">
                      <div className="col">
                          <h2>12K</h2>
                          <p>Downloads</p>
                      </div>
                 
                  
                      <div className="col">
                          <h2>250</h2>
                          <p>Following</p>
                      </div>
                  
                  
                      <div className="col">
                          <h2>5K</h2>
                          <p>Likes</p>
                      </div>
                  </div>
                  <div className="row">
                      <button href="">Watch here</button>
               
                  </div>
              </div>
          
      </div>
    </div>
  </div>
  )
}

const getLanguageClass = (desc) => {
    if (desc.includes('python')) {
      return 'profile-python';
    } else if (desc.includes('java')) {
      return 'profile-java';
    } else if (desc.includes('javascript')) {
      return 'profile-javascript';
    } else if (desc.includes('c++')) {
      return 'profile-cplusplus';
    } else if (desc.includes('c')) {
      return 'profile-c';
    } else {
      return '';
    }
  }
  
  export default Profile;