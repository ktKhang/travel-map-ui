import React, { Component } from "react";
import {placeService, showModal} from '../../../services';
import { Container, Row, Col } from 'react-grid-system';
import { Button, Card, CardBody, Table,	CardFooter,
	CardHeader, FormGroup, Label, } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Map from '../../Admin/Map';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes';
class NewPlace extends Component {
    constructor(props){
        super(props);
        this.state = {
            placeList: [],
            appStyle: {
                width: '651px',
                height: '517px',
                // height: window.innerHeight,
                // overflow: 'auto'
             }
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
        // let { dispatch } = this.props
        // dispatch({ type: 'GET_EXPLORE_PAGE' })
        // if (this.props.regionReducer.clickRegion) {
        //    dispatch({ type: 'CLICK_REGION' })
        // }
        this.isCancelled = true;
    }

    componentDidMount() {
        this.loadPlacesList();
        // let { dispatch } = this.props
        // console.log(this.props.regionReducer);
        // dispatch({ type: 'GET_EXPLORE_PAGE' })
    }

    CustomSelect(props) {
        const attrs = props.data;
        return (
            <select className="select form-control" id={props.id} value={props.value} onChange={props.onChange} >
                {
                    attrs != null &&
                    attrs.map((a, index) =>
                        <option key={index.toString()} value={a.value}>{a.label}</option>
                    )
                }
            </select>
        )
    }

    render() {
        return(
            <div>
                <div className="app-content" style={this.state.appStyle}>
                    <Map style = {{ width: '-webkit-fill-available', maxWidth: '-webkit-fill-available', webkitAnimationName: 'example' }}></Map>
                </div>
                <div className="form-data">
                    <Col xs="12" sm="6">
                        <Formik>
                            {
                                props => (
                                    <Form>
                                        <Card>
                                            <CardHeader>
                                                <strong>Place</strong>
                                                <small>Create a new one</small>
                                            </CardHeader>
                                            <CardBody>
                                                <FormGroup>
                                                    <Label htmlFor="name">Place Name</Label>
                                                    <Field type="text" name="name" className={`form-control ${props.errors.name && props.touched.name && 'is-invalid'}`} />
                                                    <ErrorMessage className="invalid-feedback" name="name" component="div"/>
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
                                                {/* <FormGroup>
                                                    <Label htmlFor="status">Status</Label>
                                                    <this.CustomSelect value={props.values.placeStatus} data={this.state.status}
                                                        onChange={props.handleChange} onBlur={props.handleBlur} />
                                                </FormGroup> */}
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
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
       regionReducer: state.regionReducer,
       pageReducer: state.pageReducer
    }
}

export default connect(mapStateToProps)(NewPlace);