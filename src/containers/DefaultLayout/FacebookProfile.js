import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import { Container, Row, Col } from 'react-grid-system';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

class FacebookProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            avatar: ''
          }
    }

    responseFacebook = response => {
        console.log('response!');
        console.log(response);
        this.setState({
            isLoggedIn: true,
            userId: response.userID,
            name: response.name,
            email: response.email,
            avatar: response.picture.data.url
        })
    }

    componentClicked = () => {
        console.log('clicked!');
    }
    
    logout = () =>{
        this.setState({
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            avatar: ''
        })
        console.log('removed')
    }
    
    render() {
        let profileContent = '';
        if(this.state.isLoggedIn){
            console.log('yes')
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
        }else{
            console.log('no')
            profileContent = (
                <Container>
                    <div className="profile-name">
                        <FacebookLogin
                        appId="284174652429987"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook} 
                        // icon="fa-facebook"
                        cssClass="btn btn-block btn-dark btn-profile"
                        // icon={<TiSocialFacebookCircular />}
                        />
                    </div>
                </Container>
            )
        }

        return (
            <div className="profile-login">
                {profileContent}
            </div>
        );
    }
}

export default FacebookProfile;