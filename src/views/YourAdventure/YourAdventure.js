import React, { Component } from 'react';
import adventureImg from '../../assets/img/adventure.svg'
import { constant } from '../../utils/Constant';
import { loginService, showModal } from '../../services'
import { decodeJWT } from '../../utils/DecodeJWT';
import GGLoginFacebook from '../../utils/GGLoginFacbook';
class YourAdventure extends Component {

   handleResponse = response => {
      let userDetail = {};
      userDetail.userID = response.userID;
      userDetail.userName = response.name;
      userDetail.email = response.email;
      userDetail.avatar = response.picture.data.url;

      loginService.login(userDetail).then(data => {
         if (data.errorCode !== 0) {
            showModal.showErrorMsg(data.message);
         } else {
            localStorage[constant.TOKEN_VARIABLE_NAME] = data.data;
            if (decodeJWT.decodeToken(data.data).role === constant.ROLE_ADMIN) {

            } else {
               window.location.reload();
            }
         }
      })
         .catch(err => {
            console.error(err);
            this.setState({ errorMsg: err.message });
         });
   }

   render() {
      let adventureContent = <div></div>;
      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {

      } else {
         adventureContent = (
            <div className="adventure-content">
               <img className="adventure-img" src={adventureImg} width="100" height="50" alt="gogo.vn" />
               <span className="adventure-text">You don't have any adventure. Login to continue</span>
               <div className="adventure-fb-login">
                  <GGLoginFacebook
                     onResponse={this.handleResponse.bind(this)}
                  />
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