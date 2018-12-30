import React, { Component } from "react";
import {placeService, showModal, regionService} from '../../../services';
import { Col } from 'react-grid-system';
import { Button, Card, CardBody, CardFooter,
	CardHeader, FormGroup, Label, } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Map from '../../Admin/Map';
import ReactDOM from 'react-dom';
class NewPlace extends Component {
    constructor(props){
        super(props);
        this.state = {
            placeList: [],
            place: {
                name : '',
                title : '',
                latitude : '',
                longitude : '',
                regionUid : ''
            },
            appStyle: {
                width: '61.3%',
                height: window.innerHeight -108,
                minHeight: '518px',
             }
        };
    }

    closeModal() {
        ReactDOM.unmountComponentAtNode(document.getElementById('modalDiv'));
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
        // if (this.props.regionReducer.clickRegion) {
        //     dispatch(Types.ADD_PLACE)
        //     dispatch({ type: 'CLICK_REGION' })
        // }
        // this.isCancelled = true;
    }

    componentDidMount() {
        this.loadPlacesList();
    }

    getValidationSchema = (values) => {
		return Yup.object().shape({
			name: Yup.string()
				.required('Place name is required')
				.notOneOf(this.state.placeList, 'Place name already exists'),
            title: Yup.string()
                .required('Place title is required')
                .notOneOf(this.state.placeList, 'Place title already exists'),

		});
    }
    
    addNewPlace(place, setSubmitting) {
        const regionId = this.props.addPlaceReducer.payload.id;
        if( regionId!= null){
            regionService.fetchRegionById(regionId).then(data => {
                if(data && data.errorCode > 200){
                    showModal.showErrorMsg(data.message);
                }else if(data && data.errorCode === 0){
                    this.setState({
                        place: {
                            name : place.name,
                            title : place.title,
                            latitude : this.props.addPlaceReducer.coordinate.latitude,
                            longitude : this.props.addPlaceReducer.coordinate.longitude,
                            regionUid : data.data.uid
                        }
                    })
                    placeService.addNewPlace(this.state.place).then(data =>{
                        if(data && data.errorCode > 200){
                            showModal.showErrorMsg(data.message);
                            setSubmitting(false);
                            return;
                        }else if(data && data.errorCode === 0){
                            showModal.showSuccessMsg('Success');
                            // setTimeout(() => {
                                setSubmitting(false);
                                // this.closeModal();
                                this.props.history.push(`/admin/region/` + this.state.place.regionUid + `/places`);
                            // });
                        }
                    })
                }
            })
        }
    }

    render() {
        console.log('Hello Huy === ');
        console.log(this.props.addPlaceReducer.payload);
        console.log(this.props.addPlaceReducer.coordinate);
        console.log(this.props.addPlaceReducer.payload.id);

        return(
            <div>
                <div className="app-content" style={this.state.appStyle}>
                    <Map style = {{ width: '-webkit-fill-available', maxWidth: '-webkit-fill-available', webkitAnimationName: 'example' }}></Map>
                </div>
                <div className="form-data">
                    <Col>
                        <Formik initialValues = {{
                            name: this.state.place.name,
                            title: this.state.place.title,
                            latitude: this.state.place.latitude,
                            longitude: this.state.place.longitude,
                            regionUid: this.props.addPlaceReducer.payload.id
                        }} 
                        validationSchema = {this.getValidationSchema}
                        onSubmit = {(values, {setSubmitting}) => {
                            this.addNewPlace(values, setSubmitting)
                        }}
                        >
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
                                                    <Field type="number" name="latitude" className={`form-control`} value = {this.props.addPlaceReducer.coordinate.latitude}/>
                                                    <ErrorMessage className="invalid-feedback" name="latitude" component="div" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="longitude">Longitude</Label>
                                                    <Field type="number" name="longitude" className={`form-control`} value = {this.props.addPlaceReducer.coordinate.longitude}/>
                                                    <ErrorMessage className="invalid-feedback" name="longitude" component="div" />
                                                </FormGroup>
                                            </CardBody>
                                            <CardFooter>
                                                <Button type="submit" size="sm" color="primary"
                                                    disabled={props.isSubmitting} ><i className="fa fa-dot-circle-o"></i> {props.isSubmitting ? 'Submitting' : 'Submit'}
                                                </Button>
                                                <Button
                                                    type="reset"
                                                    size="sm"
                                                    color="danger"
                                                    onClick={props.handleReset}
                                                    disabled={!props.dirty || props.isSubmitting}
                                                    >
                                                    <i className="fa fa-ban" /> Cancel
                                                    </Button>
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
       pageReducer: state.pageReducer,
       addPlaceReducer: state.addPlaceReducer,
    }
}

export default connect(mapStateToProps)(NewPlace);