import React, { Component } from "react";
import {placeService, showModal} from '../../../services';
import { Container, Row, Col } from 'react-grid-system';
import { Button, Card, CardBody, Table,	CardFooter,
	CardHeader, FormGroup, Label, } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class NewPlace extends Component {
    constructor(props){
        super(props);
        this.state = {
            placeList: []
        };
    }

    loadPlacesList(){
        const regionUid = this.props.match.params.regionid;
        placeService.findPlaceByRegion(regionUid).then(data => {
            if(data.errorMsg){
                showModal.showErrorMsg(data.errorMsg);
            }else{
                data.forEach(element => {
                    element.createdDate = new Date(element.createdDate).toLocaleDateString();
                });
                !this.isCancelled && this.setState({
                    placeList: data,
                    errorMsg: null,
                })
            }
        })
        .catch(err => {
            this.setState({errorMsg: err.message});
        });
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {
        this.loadPlacesList();
    }

    getValidationSchema = values => {

    };

    submitNewPlace(place, setSubmitting){

    }

    render() {
        return(
            <div>
                <Col xs="12" sm="6">
                    <Formik 
                        initialValues={{

                        }}
                        validationSchema={this.getValidationSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            this.submitNewPlace(values, setSubmitting);
                        } }
                    >
                    {
                        props => (
                            <Form className="form-horizontal">
                                <Card>
                                    <CardHeader>
                                        <strong>Place</strong>
                                        <small>Create a new one</small>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Label htmlFor="name">Place Name</Label>
                                            <Field type="text" name="name" className={`form-control ${props.errors.name && props.touched.name && 'is-invalid'}`} />
                                            <ErrorMessage className="invalid-feedback" name="name" component="div" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="title">Place Title</Label>
                                            <Field type="text" name="title" className={`form-control ${props.errors.title && props.touched.title && 'is-invalid'}`} />
                                            <ErrorMessage className="invalid-feedback" name="title" component="div" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="latitude">Latitude</Label>
                                            <Field type="number" name="latitude" className={`form-control`}/>
                                            <ErrorMessage className="invalid-feedback" name="latitude" component="div" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="longitude">Longitude</Label>
                                            <Field type="number" name="longitude" className={`form-control`} />
                                            <ErrorMessage className="invalid-feedback" name="longitude" component="div" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="svgPath">Svg Path</Label>
                                            <Field type="text" name="title" className={`form-control ${props.errors.svgPath && props.touched.svgPath && 'is-invalid'}`} />
                                            <ErrorMessage className="invalid-feedback" name="svgPath" component="div" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="status">Status</Label>
                                            <this.CustomSelect value={props.values.placeStatus} data={this.state.status}
                                                onChange={props.handleChange} onBlur={props.handleBlur} />
                                        </FormGroup>
                                    </CardBody>
                                    <CardFooter>
                                        <Button type="submit" size="sm" color="primary"
                                            disabled={props.isSubmitting} ><i className="fa fa-dot-circle-o"></i> {props.isSubmitting ? 'Submitting' : 'Submit'}
                                        </Button>
                                        <Button type="reset" size="sm" color="danger"
                                            onClick={() => this.cancelUpdate()}><i className="fa fa-ban"></i> Cancel</Button>
                                    </CardFooter>
                                </Card>
                            </Form>
                        )
                    }
                    </Formik>
                </Col>
                <div id="modalDiv"></div>
            </div>
        );
    }
}
export default NewPlace;