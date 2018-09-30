import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { loginService, showModal } from '../../../services'

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
        user: {}
    }
    this.state.user = { // for testing only
      userName: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);

    this.nameRef = React.createRef();

  }

  componentDidMount() {
    console.log('Component DID MOUNT!')
  }

  handleChange(event) {
    let currentUser = this.state.user;
    currentUser[[event.target.id]] = event.target.value;
    this.setState({
        user: currentUser
    });
  }

  login() {
    console.log(this.state.user);
    loginService.login(this.state.user).then(data => {
      if (data && data.errorCode > 200) {
        showModal.showErrorMsg(data.message);
        console.log(data.message);
        return;
      } else if (data && data.errorCode === 0) {
        console.log('login succsess');
        // showModal.showSuccessMsg("Success.");
        let token = data.data.token;
        console.log(token);
        window.sessionStorage.setItem('EDC-token', token);
        this.props.history.push(`/createCrf`);
      }
      console.log(data);
    })
      .catch(err => {
        alert(err.message);
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="userName" placeholder="Username" autoComplete="userName" 
                          value={this.state.user.userName} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" 
                           value={this.state.user.password} onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4"
                            onClick={this.login}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        <div id="modalDiv"></div> {/* To inject CommonModal here*/}
      </div>
    );
  }
}

export default Login;
