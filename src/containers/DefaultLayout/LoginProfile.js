import React, { Component } from 'react';
// import FacebookLogin from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Container, Row, Col } from 'react-grid-system';
import { loginService, userService, showModal } from '../../services'
import { decodeJWT } from '../../utils/DecodeJWT';
import { constant } from '../../utils/Constant';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

class LoginProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: {
                userID: '',
                userName: 'aaa',
                email: '',
                avatar: '',
            },
            errorMsg: null
        }
    }

    responseFacebook = response => {
        let userDetail = this.state.userDetail;
        userDetail.userID = response.userID;
        userDetail.userName = response.name;
        userDetail.email = response.email;
        userDetail.avatar = response.picture.data.url;

        loginService.login(this.state.userDetail).then(data => {
            if (data.errorCode !== 0) {
                showModal.showErrorMsg(data.message);
            } else {
                localStorage.mapToken = data.data;
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

    componentClicked = () => {
        console.log('clicked!');
    }

    logout = () => {
        localStorage.removeItem('mapToken');
        window.location.reload();
    }

    componentDidMount() {
        console.log('did  mount')
        const token = localStorage.mapToken;
        if (token !== undefined && token !== null) {
            const decodedToken = decodeJWT.decodeToken(token);
            console.log(decodedToken);
            if (decodedToken.role === constant.ROLE_USER) {
                userService.fetchUserDetail(decodedToken.sub).then(data => {
                    if (data.errorCode !== 0) {
                        showModal.showErrorMsg(data.message);
                    } else {
                        let userDetail = data.data;
                        let user = this.state.userDetail;
                        user.userID = userDetail.userID;
                        user.userName = userDetail.userName;
                        user.email = userDetail.email;
                        user.avatar = userDetail.avatar;
                        console.log(this.state.userDetail)
                        this.setState({
                            userDetail: user
                        })
                    }
                })
                    .catch(err => {
                        console.error(err);
                        this.setState({ errorMsg: err.message });
                    });
            }
        } else {
            console.log('No token');
        }
    }

    render() {
        let profileContent = '';
        if (localStorage.mapToken) {
            console.log(this.state.userDetail);
            profileContent = (
                <div className="profile-name-logged-in">
                    <div className="profile-info">
                        <img src={this.state.userDetail.avatar} className="profile-avatar" alt={this.state.userDetail.email} />

                        <label className="profile-label">{this.state.userDetail.userName}</label>
                    </div>
                    <button className="btn-logout-fb" onClick={this.logout}>Logout</button>
                </div>
            )
        } else {
            profileContent = (
                // <Container>
                <div className="profile-name">
                    <FacebookLogin
                        appId="284174652429987"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass="btn btn-block btn-profile"
                        render={renderProps => (
                            <button className="btn-login-fb" onClick={renderProps.onClick}><i className="fa icon-login-tralvelmap-custom icon-facebook"></i></button>
                        )}
                    />
                </div>
                // </Container>
            )
        }

        return (
            <div className="profile-login">
                {profileContent}
                <div id="modalDiv"></div> {/* To inject CommonModal here*/}
            </div>
        );
    }
}

export default LoginProfile;