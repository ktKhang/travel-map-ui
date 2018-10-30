import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import { Container, Row, Col } from 'react-grid-system';
import { loginService, showModal } from '../../services'
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

class FacebookProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            userName: '',
            email: '',
            avatar: ''
        }
    }

    responseFacebook = response => {
        this.setState({
            userID: response.userID,
            userName: response.name,
            email: response.email,
            avatar: response.picture.data.url
        })
        loginService.login(this.state).then(data => {
            if (data.errorCode !== 0) {
                showModal.showErrorMsg(data.message);
            } else {
                localStorage.mapToken = response.accessToken;
                localStorage.userID = data.data.uid;
                window.location.reload();
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
        localStorage.removeItem('userID');
        window.location.reload();
    }

    componentDidMount() {

    }

    render() {
        let profileContent = '';
        if (localStorage.mapToken) {
            profileContent = (
                <Container>
                    <Row>
                        <img src={this.state.avatar} className="img-avatar" alt={this.state.email} />
                    </Row>
                    <Row>
                        <div className="profile-name">
                            <button className="btn btn-block btn-light btn-profile">{this.state.name}</button>
                        </div>
                    </Row>
                    <Row>
                        <div className="profile-name">
                            <button className="btn btn-block btn-dark btn-profile"
                                onClick={this.logout}>Logout</button>
                        </div>
                    </Row>
                </Container>
            )
        } else {
            profileContent = (
                <Container>
                    <div className="profile-name">
                        <FacebookLogin
                            appId="284174652429987"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            // icon="fa-facebook"
                            cssClass="btn btn-block btn-profile"
                        // icon={<TiSocialFacebookCircular />}
                        />
                    </div>
                </Container>
            )
        }

        return (
            <div>
                <div className="profile-login">
                    {profileContent}
                </div>
                <div id="modalDiv"></div> {/* To inject CommonModal here*/}
            </div>
        );
    }
}

export default FacebookProfile;