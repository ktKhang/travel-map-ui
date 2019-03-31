import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import {
	AppSidebar,
	AppSidebarNav,
} from '@coreui/react';

// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import LoginProfile from './LoginProfile';
import GGSearch from '../../utils/GGSearch'
import { connect } from 'react-redux';
import { constant } from '../../utils/Constant';
// import GGMap from '../../utils/GGMap';
import GGMap from '../../utils/GGMap v2.0/GGMap';
import { ggMapCommon } from '../../utils/GGMap v2.0/common';
import PlaceMapModel from '../../Models/PlaceMapModel';
import { ggCommon } from '../../utils/GGCommon';
class DefaultLayout extends Component {
	Logo = () => {
		return (
			<div>
				<img className="logo" src={logo} width="100" height="50" alt="gogo.vn" />
			</div>
		)
	}

	hangleClickOnRegion = (selectedObj) => {
		console.log(selectedObj)
		// set to selectedRegion
		ggMapCommon.setSelectedRegion(selectedObj.id);

		if (window.location.hash !== constant.HASH_EXPLORE) {
			setTimeout(() => {
				window.location = '#explore'
			}, 500);
		}
	}

	handleClickOnPlace = (selectedObj) => {
		let currentPlace = new PlaceMapModel(selectedObj);
		ggMapCommon.setSelectedPlace(currentPlace);
	}

	hanldeClickHomeBtn = (event) => {
		ggCommon.cancelAddPost();
		ggCommon.cancelAddAlbum();
	}

	render() {
		return (
			<div className="app">
				<div className="app-body">
					<AppSidebar fixed display="lg">
						<this.Logo />
						<GGSearch />
						<AppSidebarNav navConfig={navigation} {...this.props} />
						<LoginProfile />
					</AppSidebar>
					<main className="main" style={(window.location.hash === constant.HASH_EXPLORE) ?
						{ flexDirection: 'row-reverse' } : { flexDirection: 'initial' }}
					>
						<Switch>
							{routes.map((route, idx) => {
								return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
									<route.component {...props} />
								)} />)
									: (null);
							},
							)}
							<Redirect from={constant.ROUTE_HOME} to={constant.ROUTE_ABOUT} />
						</Switch>
						<GGMap
							className={(window.location.hash === constant.HASH_EXPLORE) ? 'map-explore' : 'map-general'}
							reload={this.props.regionReducer.reloadMap}
							onClickRegion={this.hangleClickOnRegion}
							onClickPlace={this.handleClickOnPlace}
							onClickHomeBtn={this.hanldeClickHomeBtn}
						/>
						<div id="modalDiv"></div> {/* To inject CommonModal here*/}
						<div id="toastDiv"></div>
					</main>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		regionReducer: state.regionReducer,
	}
}

export default connect(mapStateToProps)(DefaultLayout);
