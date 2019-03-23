import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { regionService, showModal } from '../../../services';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { toastUtil } from '../../../utils/ToastUtil';
import GGTable from '../../../utils/GGTable';
import GGTableAction from '../../../utils/GGTableAction';

const { SearchBar } = Search;
const actionsList = [{ label: 'VIEW', value: 'view' }];
class Regions extends Component {

	constructor(props) {
		super(props);
		this.state = {
			regionList: [],
			columns: [{
				dataField: '',
				text: ''
			}],
		};
	}

	regionDetailFormatter = (cell, row) => {
		const regionLink = `#/admin/region/${row.uid}`;
		return (
			<p className='table-first-item'><a href={regionLink}>{cell}</a></p>
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

	// Do all actions here
	onClickAction = (action, row) => {
		if (action === 'view') {
			this.viewRegionDetail(row.uid)
		}
	}

	viewRegionDetail = (regionUid) => {
		this.props.history.push(`/admin/region/${regionUid}`);
	}

	loadRegionsList() {
		regionService.loadRegionList().then(data => {
			if (data && data.errorCode === 0) {
				data.data.map(element => {
					element.createdDate = new Date(element.createdDate).toLocaleDateString();
				});
				this.setState({
					regionList: data.data,
				});
				this.prepareData();
			}
		})
			.catch(err => {
				toastUtil.showErrorMsg(err.message);
			});
	}

	prepareData = () => {
		let data = this.state.regionList;
		let columns = [{
			dataField: 'name',
			text: 'Region',
			sort: true,
			formatter: this.regionDetailFormatter,
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
			regionList: data,
			columns: columns,
		})
	}

	componentDidMount() {
		this.loadRegionsList();
	}

	componentWillUnmount() {
		this.isCancelled = true;
	}

	render() {
		return (
			<div className="animated fadeIn" >
				<Container fluid>
					<Card className="table-card">
						<GGTable
							headerLabel="REGIONS LIST"
							data={this.state.regionList}
							columns={this.state.columns}
						/>
					</Card>
				</Container>
			</div >
		)
	}
}

export default Regions;