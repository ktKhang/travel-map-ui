import React, { Component } from "react";
import { userService, showModal } from "../../services";
import { Container, Row, Col } from 'react-grid-system';
import { Button, Card, CardBody, Table } from 'reactstrap';

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            errorMsg: null,
            isUpdate: false,
        }
    }

    invokeUserDetailService(uid){
        userService.fetchUserDetailTest(uid).then(data => {
            if(data.errorMsg){
                showModal.showErrorMsg(data.errorMsg);
            }
            else{
                this.setState({
                    user: data, 
                    errorMsg: null
                });
            }
        })
        .catch(err => {
            this.setState({
                errorMsg: err.message
            })
        })
    }

    componentDidMount(){
        console.log('User Did Mount Detail' + this.props.match.params.uid);
        this.invokeUserDetailService(this.props.match.params.uid);
    }

    componentWillUnmount(){
        this.isCancelled = true;
    }

    render() {
        return(
            <div className="animated fadeIn">
                <Container fluid>
                <Row>
                    <Col lg={3}>
                    <Button color="primary" onClick={() => this.editUser()}>
                        <i className="fa fa-edit" />
                        &nbsp;Edit User
                    </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col lg={8}>
                    <Card>
                        <CardBody>
                        <Table responsive striped hover>
                            <tbody>{this.renderUserDetails()}</tbody>
                        </Table>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }

    renderUserDetails = () => [
        <tr key="0">
            <td>User name</td>
            <td>{this.state.user.userName}</td>
        </tr>,
        <tr key="1">
            <td>Email</td>
            <td>{this.state.user.email}</td>
        </tr>,
        <tr key="2">
            <td>Region Visited</td>
            <td>{this.state.user.regionVisited}</td>
        </tr>,
        <tr key="3">
            <td>Place Visited</td>
            <td>{this.state.user.placeVisited}</td>
        </tr>,
        <tr key="4">
            <td>Status</td>
            <td>{this.state.user.userStatus}</td>
        </tr>,
        <tr key="5">
            <td>User ID</td>
            <td>{this.state.user.userID}</td>
        </tr>,
    ]
    
}
export default User;