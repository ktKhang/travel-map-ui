import React, { Component } from "react";
import {regionService, showModal} from '../../../services';
import { Container, Row, Col } from 'react-grid-system';
import { Button, Card, CardBody, Table } from 'reactstrap';

class Region extends Component{
    constructor(props){
        super(props);
        this.state = {
            region: {},
            errorMsg: null,
            isUpdate: false,
        }
    }

    invokeRegionDetailService(uid){
        regionService.fetchRegionDetail(uid).then(data => {
            if(data.errorMsg){
                showModal.showErrorMsg(data.errorMsg);
            }
            else{
                this.setState({
                    region: data, 
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
        this.invokeRegionDetailService(this.props.match.params.uid);
    }

    componentWillUnmount(){
        this.isCancelled = true;
    }

    render() {
        return(
            <div className="animated fadeIn">
                <Container fluid>
                <br/>
                <Row>
                    <Col lg={3}>
						<a href={'#/admin/region/' + this.props.match.params.uid + '/places'}> Place List </a>
					</Col>
                </Row>
                <br />
                <Row>
                    <Col lg={8}>
                    <Card>
                        <CardBody>
                        <Table responsive striped hover>
                            <tbody>{this.renderRegionDetails()}</tbody>
                        </Table>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }

    renderRegionDetails = () => [
        <tr key="0">
            <td>ID</td>
            <td>{this.state.region.id}</td>
        </tr>,
        <tr key="1">
            <td>Region</td>
            <td>{this.state.region.name}</td>
        </tr>,
        <tr key="2">
            <td>Title</td>
            <td>{this.state.region.title}</td>
        </tr>,
        <tr key="3">
            <td>Created Date</td>
            <td>{new Date(this.state.region.createdDate).toLocaleDateString()}</td>
        </tr>,
    ]
    
}
export default Region;