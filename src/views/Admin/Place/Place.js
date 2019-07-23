import React, { Component } from "react";
import { placeService, showModal } from '../../../services';
import { Container, Row, Col } from 'react-grid-system';
import {
    Button, Card, CardBody, Table, CardFooter,
    CardHeader, FormGroup, Label,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Place extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: {},
            placeList: [],
            errorMsg: null,
            isUpdate: false,
            status: [
                { label: 'AVAILABLE', value: 'AVAILABLE' },
                { label: 'UNAVAILABLE', value: 'UNAVAILABLE' },
            ]
        }
    }

    invokePlaceDetailService(uid) {
        placeService.fetchPlaceDetail(uid).then(data => {
            if (data.errorMsg) {
                showModal.showErrorMsg(data.errorMsg);
            }
            else {
                this.setState({
                    place: data,
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

    loadPlaceExisted(uid) {
        placeService.findPlaceByRegion(uid).then(data => {
            if (data && data.errorCode === 0) {
                this.setState({
                    placeList: data.data,
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

    componentDidMount() {
        this.invokePlaceDetailService(this.props.match.params.uid);
        this.loadPlaceExisted(this.props.match.params.regionid);
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    editPlace() {
        this.setState({
            isUpdate: true
        });
    }

    cancelUpdate() {
        this.setState({
            isUpdate: false
        })
    }

    render() {
        if (this.state.isUpdate) {
            return this.updatePlaceData();
        } else {
            return this.placeData();
        }
    }

    updatePlace(place, setSubmitting) {
        placeService.updatePlace(place).then(data => {
            if (data && data.errorCode > 200) {
                showModal.showErrorMsg(data.message);
                setSubmitting(false);
                return;
            } else if (data && data.errorCode === 0) {
                showModal.showSuccessMsg("Success.");
                setTimeout(() => {
                    setSubmitting(false);
                    showModal.closeModal();
                    this.props.history.push(`/admin/region/` + this.props.match.params.regionid + `/places`);
                }, 1000);
            }
        })
            .catch(err => {
                alert(err.message);
            });
    }

    getValidationSchema = (values) => {
        return Yup.object().shape({
            name: Yup.string()
                .required('Place name is required')
                .notOneOf(this.state.placeList, 'Place name already exists'),
            title: Yup.string()
                .required('Place title is required')
                .notOneOf(this.state.placeList, 'Place title already exists')
        });
    }


    updatePlaceData() {
        return (
            <div className="animated fadeIn">
                <Col md={8}>
                    <Formik initialValues={{
                        uid: this.state.place.uid,
                        name: this.state.place.name,
                        title: this.state.place.title,
                        description: this.state.place.description,
                        latitude: this.state.place.latitude,
                        longitude: this.state.place.longitude,
                        placeStatus: this.state.place.placeStatus,
                        svgPath: this.state.place.svgPath,
                        regionUid: this.props.match.params.regionid
                    }}
                        validationSchema={this.getValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            this.updatePlace(values, setSubmitting)
                        }}
                    >
                        {props => (
                            <Form className="form-horizontal">
                                <Card>
                                    <CardHeader>
                                        <Row className="align-items-left mt-3">
                                            <Col xs={9} className="text-left">
                                                <i className="icon-info pr-1"></i>Update Place: {props.values.name}
                                            </Col>
                                        </Row>
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
                                            <Label htmlFor="title">Description</Label>
                                            <Field type="text" name="description" className={`form-control`} />
                                            <ErrorMessage className="invalid-feedback" name="description" component="div" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="latitude">Latitude</Label>
                                            <Field type="number" name="latitude" className={`form-control`} />
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
                        )}
                    </Formik>
                </Col>
                <div id="modalDiv"></div>
            </div>
        );
    }

    CustomSelect(props) {
        const statusList = props.data;
        return (
            <select className="select form-control" id="placeStatus" value={props.value} onChange={props.onChange} >
                {
                    statusList.map((status, index) =>
                        <option key={index.toString()} value={status.value}>{status.label}</option>
                    )
                }
            </select>
        )
    }

    placeData() {
        return (
            <div className="animated fadeIn">
                <Container fluid>
                    <br />
                    <Row>
                        <Col lg={3}>
                            <a href={'#/admin/region/' + this.props.match.params.regionid + '/places'}> Place List </a>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg={3}>
                            <Button color="primary" onClick={() => this.editPlace()} >
                                <i className="fa fa-edit"></i>&nbsp;Edit Place
                        </Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardBody>
                                    <Table responsive striped hover>
                                        <tbody>{this.renderPlaceDetails()}</tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderPlaceDetails = () => [
        <tr key="0">
            <td>Place name</td>
            <td>{this.state.place.name}</td>
        </tr>,
        <tr key="1">
            <td>Title</td>
            <td>{this.state.place.title}</td>
        </tr>,
        <tr key="2">
            <td>Description</td>
            <td>{this.state.place.description}</td>
        </tr>,
        <tr key="3">
            <td>Latitude</td>
            <td>{this.state.place.latitude}</td>
        </tr>,
        <tr key="4">
            <td>Longitude</td>
            <td>{this.state.place.longitude}</td>
        </tr>,
        <tr key="5">
            <td>Status</td>
            <td>{this.state.place.placeStatus}</td>
        </tr>,
        <tr key="6">
            <td>Svg Path</td>
            <td>{this.state.place.svgPath}</td>
        </tr>,
        <tr key="7">
            <td>Created Date</td>
            <td>{new Date(this.state.place.createdDate).toLocaleDateString()}</td>
        </tr>,
    ]

}
export default Place;