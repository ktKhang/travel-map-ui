import React, { Component } from "react";
import { placeService } from '../../../services';
import { Col } from 'react-grid-system';
import {
	Button, Card, CardBody, CardFooter,
	CardHeader, FormGroup, Label,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GGMap from "../../../utils/GGMap v2.0/GGMap";
import { ggMapCommon } from "../../../utils/GGMap v2.0/common";
import { toastUtil } from "../../../utils/ToastUtil";
class NewPlace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: '',
			longitude: '',
			appStyle: {
				width: '61.3%',
				height: window.innerHeight - 108,
				minHeight: '518px',
			}
		};
	}

	getValidationSchema = (values) => {
		return Yup.object().shape({
			name: Yup.string()
				.required('Place name is required'),
			title: Yup.string()
				.required('Place title is required'),
		});
	}

	addNewPlace = (place, setSubmitting) => {
		if (ggMapCommon.getSelectedRegion() !== null) {
			const regionUid = ggMapCommon.getSelectedRegion().uid;
			place.regionUid = regionUid;
			place.latitude = this.state.latitude;
			place.longitude = this.state.longitude;
			place.rating = 0;
			console.log(place);
			if (regionUid != null) {
				placeService.addNewPlace(place).then(data => {
					if (data && data.errorCode === 0) {
						toastUtil.showToastMsg(`Add '${place.title}' successfully`);
						this.props.history.push(`/admin/region/` + regionUid + `/places`);
					}
				})
					.catch(err => {
						toastUtil.showErrorMsg(err.message);
					});
			}
		} else {
			toastUtil.showErrorMsg('Please select a region first.')
		}
		setSubmitting(false);
	}

	hangleClickOnRegion = (selectedObj) => {
		ggMapCommon.setSelectedRegion(selectedObj.id);
	}

	handleGetPlaceCoordinates = (event) => {
		if (ggMapCommon.getSelectedRegion !== null) {
			this.setState({
				latitude: event.latitude,
				longitude: event.longitude,
			})
		}
	}

	hanldeClickHomeBtn = () => {
		this.onCancel();
	}

	onCancel = () => {
		this.setState({
			latitude: '',
			longitude: '',
		})
	}

	render() {
		return (
			<div>
				<div className="admin-app-content" style={this.state.appStyle}>
					<GGMap
						className='admin-map'
						onClickRegion={this.hangleClickOnRegion}
						onClickHomeBtn={this.hanldeClickHomeBtn}
						onShiftClickMapObj={this.handleGetPlaceCoordinates}
					/>
					{/* <Map style={{ width: '-webkit-fill-available', maxWidth: '-webkit-fill-available', webkitAnimationName: 'example' }}></Map> */}
				</div>
				<div className="form-data">
					<Col>
						<Formik initialValues={{
							name: '',
							title: '',
							description: '',
							mapSrc: '',
						}}
							validationSchema={this.getValidationSchema}
							onSubmit={(values, { setSubmitting }) => {
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
													<ErrorMessage className="invalid-feedback" name="name" component="div" />
												</FormGroup>
												<FormGroup>
													<Label htmlFor="title">Place Title</Label>
													<Field type="text" name="title" className={`form-control ${props.errors.title && props.touched.title && 'is-invalid'}`} />
													<ErrorMessage className="invalid-feedback" name="title" component="div" />
												</FormGroup>
												<FormGroup>
													<Label htmlFor="description">Description</Label>
													{/* <Field type="textarea" name="description" className={`form-control ${props.errors.description && props.touched.description && 'is-invalid'}`} /> */}
													<textarea name="description" className={`form-control ${props.errors.description && props.touched.description && 'is-invalid'}`}
														onChange={props.handleChange}
														onBlur={props.handleBlur}
														value={props.values.description}
														rows={6.5}
													></textarea>
													<ErrorMessage className="invalid-feedback" name="description" component="div" />
												</FormGroup>
												<FormGroup>
													<Label htmlFor="mapSrc">Map location</Label>
													<Field type="text" name="mapSrc" className={`form-control ${props.errors.mapSrc && props.touched.mapSrc && 'is-invalid'}`} />
													<ErrorMessage className="invalid-feedback" name="mapSrc" component="div" />
												</FormGroup>
												<FormGroup>
													<Label htmlFor="latitude">Latitude</Label>
													<input type="number" name="latitude" value={this.state.latitude} className={`form-control`} readOnly />
												</FormGroup>
												<FormGroup>
													<Label htmlFor="longitude">Longitude</Label>
													<input type="number" name="longitude" value={this.state.longitude} className={`form-control`} readOnly />
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
													onClick={() => {
														props.handleReset();
														this.onCancel();
													}}
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
				</div>
			</div>
		);
	}
}

export default NewPlace;