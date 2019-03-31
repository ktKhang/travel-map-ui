import React, { Component } from 'react';
import adventureImg from '../../assets/img/adventure.svg'
import { constant } from '../../utils/Constant';
import GGLoginFacebook from '../../utils/GGLoginFacbook';
class YourAdventure extends Component {

   render() {
      let adventureContent = null;
      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {

      } else {
         adventureContent = (
            <div className="adventure-content">
               <img className="adventure-img" src={adventureImg} width="100" height="50" alt="gogo.vn" />
               <span className="adventure-text">You don't have any adventure. Login to continue</span>
               <div className="adventure-fb-login">
                  <GGLoginFacebook />
               </div>
            </div>
         )
      }
      return (
         <div className="map-content">
            <div className="user-app-content">
               {adventureContent}
            </div>
         </div>
      );
   }
}

export default YourAdventure;