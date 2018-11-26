import React, { Component } from 'react';
// lib FacebookLogin
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class FBLogin extends Component {

   responseFacebook = response => {
      this.props.onResponse(response);
   }

   render() {
      return (
         <FacebookLogin
            appId="284174652429987"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass="btn btn-block btn-profile"
            render={renderProps => (
               <button className="btn-login-fb" onClick={renderProps.onClick}><i className="fa icon-login-tralvelmap-custom icon-facebook"></i></button>
            )}
         />
      );
   }
}

export default FBLogin;