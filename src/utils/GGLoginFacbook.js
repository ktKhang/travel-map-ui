import React, { Component } from 'react';
// lib FacebookLogin
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { loginService, showModal } from '../services';
import { constant } from './Constant';
import { decodeJWT } from './DecodeJWT';

class GGLoginFacebook extends Component {

   onResponse = (response) => {
      let userDetail = {
         userID: response.userID,
         userName: response.name,
         email: response.email,
         avatar: response.picture.data.url,
      };

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
            showModal.showErrorMsg(constant.ERROR_SERVER_BAD_RESPONSE);
         });
   }

   render() {
      return (
         <FacebookLogin
            appId="738293439691315"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.onResponse}
            cssClass="btn btn-block btn-profile"
            render={renderProps => (
               <button className="btn-login-fb" onClick={renderProps.onClick}><i className="fa icon-login-tralvelmap-custom icon-facebook"></i></button>
            )}
         />
      );
   }
}

export default GGLoginFacebook;