import React, { Component } from 'react';
import { loginService, userService, showModal } from '../../services'
import { decodeJWT } from '../../utils/DecodeJWT';
import { constant } from '../../utils/Constant';
import FBLogin from '../../views/FeatureComponents/FBLogin';

class LoginProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: {
                userID: '',
                userName: '',
                email: '',
                avatar: '',
            },
            errorMsg: null
        }
    }

    handleResponse = response => {
        let userDetail = this.state.userDetail;
        userDetail.userID = response.userID;
        userDetail.userName = response.name;
        userDetail.email = response.email;
        userDetail.avatar = response.picture.data.url;

        loginService.login(this.state.userDetail).then(data => {
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

    logout = () => {
        localStorage.removeItem(constant.TOKEN_VARIABLE_NAME);
        window.location.reload();
    }

    componentDidMount() {
        const token = window.localStorage.getItem(constant.TOKEN_VARIABLE_NAME);
        if (token !== undefined && token !== null) {
            const decodedToken = decodeJWT.decodeToken(token);
            console.log(decodedToken);
            if (decodedToken.role === constant.ROLE_USER) {
                userService.fetchUserDetail(decodedToken.sub).then(data => {
                    if (data.errorCode !== 0) {
                        localStorage.removeItem(constant.TOKEN_VARIABLE_NAME);
                        window.location.reload();
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
            }

        }
    }

    render() {
        let profileContent = '';
        if (localStorage[constant.TOKEN_VARIABLE_NAME]) {
            console.log(this.state.userDetail);
            profileContent = (
                <div className="profile-name-logged-in">
                    <button className="btn-logout-fb" onClick={this.logout}></button>
                    <div className="profile-info">
                        <span className="profile-label">{this.state.userDetail.userName}</span>
                        <span className="profile-des">1.200 follow</span>
                    </div>
                    <img src={this.state.userDetail.avatar} className="profile-avatar" alt={this.state.userDetail.email} />
                </div>
            )
        } else {
            profileContent = (
                <div className="profile-name">
                    <label className="profile-label2">Login with&nbsp;<span className="login-profile-fb-label">facebook</span></label>
                    <FBLogin
                        onResponse={this.handleResponse.bind(this)}
                    />
                </div>
            )
        }

        return (
            <div className="profile-login">
                {profileContent}
                <div id="modalDiv"></div>
            </div>
        );
    }
}

export default LoginProfile;