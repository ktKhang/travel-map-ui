import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { placeService, showModal } from '../../../services';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { CommonModal } from '../../../utils/CustomModals';
import { toastUtil } from '../../../utils/ToastUtil';
import GGTableAction from '../../../utils/GGTableAction';
import GGTable from '../../../utils/GGTable';
import { ggCommon } from '../../../utils/GGCommon';

const { SearchBar } = Search;
const actionsList = [{ label: 'VIEW', value: 'view' }, { label: 'DELETE', value: 'delete' }];
class Places extends Component {

	constructor(props) {
		super(props);
		this.state = {
			placeList: [],
			columns: [{
				dataField: '',
				text: ''
			}],
		};
	}

	showActionModal = async ({ headerIcon, modalContent, callBackFunction }) => {
		await ggCommon.closeModal();
		ReactDOM.render(<CommonModal
			modal={false}
			isOpen={true}
			actionLabel="OK"
			modalHeader={<i className={`fa icon-modal-header ic-${headerIcon}`}></i>}
			modalContent={modalContent}
			noLabel="CANCEL"
			noFunc={() => ggCommon.closeModal()}
			callBackFunction={callBackFunction}
		/>,
			document.getElementById('modalDiv'));

	}

	placeDetailFormatter = (cell, row) => {
		const placeLink = `#/admin/region/${this.props.match.params.regionid}/place/${row.uid}`;
		return (
			<p className='table-first-item'><a href={placeLink}>{cell}</a></p>
		);
	}

	viewPlaceDetail = (placeUid) => {
		this.props.history.push(`/admin/region//${this.props.match.params.regionid}/place/${placeUid}`);
	}

	placeStatusFormatter = (cell, row, rowIndex) => {
		return (
			<span>{row.placeStatus}</span>
		);
	}

	actionColumnFormatter = (cell, row, rowIndex) => {
		return (
			<GGTableAction
				actions={actionsList}
				row={row}
				doAction={this.onClickAction}
			/>
		)
	}

	openDeletePlaceModal = (row, action) => {
		let modalContent = (
			<div className="common-modal">
				<label className="modal-big-header">Are you sure?</label>
				<p className="common-modal-content">After click OK, place '{row.name}' will be removed.</p>
			</div>
		);
		this.showActionModal({
			headerIcon: action,
			modalContent: modalContent,
			callBackFunction: () => {
				this.clickYes(row);
			}
		})
	}

	clickYes = (place) => {
		console.log(place);
		// invoke api delete place here
		ggCommon.closeModal();
	}

	// Do all actions here
	onClickAction = (action, row) => {
		if (action === 'view') {
			this.viewPlaceDetail(row.uid)
		} else if (action === 'delete') {
			this.openDeletePlaceModal(row, action);
		}
	}

	loadPlacesList() {
		const regionUid = this.props.match.params.regionid;
		placeService.findPlaceByRegion(regionUid).then(data => {
			if (data && data.errorCode === 0) {
				console.log(data);
				data.data.map(element => {
					element.createdDate = new Date(element.createdDate).toLocaleDateString();
				});
				this.setState({
					placeList: data.data,
				});
				this.prepareData();
			}
		})
			.catch(err => {
				toastUtil.showErrorMsg(err.message);
			});
	}

	prepareData = () => {
		let data = this.state.placeList;
		let columns = [{
			dataField: 'name',
			text: 'Place',
			sort: true,
			formatter: this.placeDetailFormatter,
			headerStyle: {
				textAlign: 'left',
				paddingLeft: '32px',
				cursor: 'pointer'
			}
		}, {
			dataField: 'title',
			text: 'Title',
			sort: false,
			classes: 'style-classes',
			headerClasses: 'style-classes',
		}, {
			dataField: 'placeStatus',
			text: 'Status',
			sort: false,
			isDummyField: true,
			formatter: this.placeStatusFormatter,
			classes: 'style-classes',
			headerClasses: 'style-classes',
		}, {
			dataField: 'createdDate',
			text: 'Created Date',
			sort: true,
			classes: 'style-classes',
			headerClasses: 'style-classes',
		}, {
			dataField: '',
			text: 'Action',
			formatter: this.actionColumnFormatter,
			headerAlign: 'right',
			align: 'right',
			headerStyle: {
				paddingRight: '26px',
			},
			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex === 0) {
					return {
						borderTop: '0px'
					}
				}
			},
			classes: 'action-row table-action',
			csvExport: false
		}];

		this.setState({
			placeList: data,
			columns: columns,
		})
	}

	componentDidMount() {
		console.log('start load data');
		this.loadPlacesList();
	}

	render() {
		return (
			<div className="animated fadeIn" >
				<Container fluid>
					<Card className="table-card">
						<GGTable
							headerLabel="PLACES LIST"
							data={this.state.placeList}
							columns={this.state.columns}
						/>
					</Card>
				</Container>
			</div >
		)
	}
}

export default Places;