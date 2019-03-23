import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { userService, showModal } from '../../../services';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import { CommonModal } from '../../../utils/CustomModals';
import { toastUtil } from '../../../utils/ToastUtil';
import GGTable from '../../../utils/GGTable';
import GGTableAction from '../../../utils/GGTableAction';
import { ggCommon } from '../../../utils/GGCommon';

const actionsList = [{ label: 'DELETE', value: 'DELETE' }];
class Users extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userList: [],
			columns: [{
				dataField: '',
				text: ''
			}],
		};
	}

	// deleteUser(userUid) {
	// 	const isOpen = true;

	// 	ReactDOM.render(<CommonModal modal={this.state.modal}
	// 		isOpen={isOpen}
	// 		modalType="danger"
	// 		modalContent="Do you want to delete this record?"
	// 		modalHeader="Confirmation"
	// 		yesLabel="Yes"
	// 		noLabel="No"
	// 		yesFunc={this.clickYes.bind(this, userUid)}
	// 		noFunc={this.clickNo}
	// 	/>
	// 		, document.getElementById('modalDiv'));
	// }

	showActionModal = async ({ headerIcon, modalContent, callBackFunction }) => {
		await ggCommon.closeModal();
		ReactDOM.render(<CommonModal
			modal={false}
			isOpen={true}
			actionLabel="OK"
			modalHeader={<i className={`fa icon-modal-header ic-${headerIcon.toLowerCase()}`}></i>}
			modalContent={modalContent}
			noLabel="CANCEL"
			noFunc={() => ggCommon.closeModal()}
			callBackFunction={callBackFunction}
		/>,
			document.getElementById('modalDiv'));

	}

	clickYes(user) {
		let userUid = user.uid;
		userService.deleteUser(userUid)
			.then(data => {
				if (data && data.errorCode > 200) {
					toastUtil.showErrorMsg(data.message);
					ggCommon.closeModal();
				} else if (data && data.errorCode === 0) {
					toastUtil.showToastMsg("Delete Successfully.");
					ggCommon.closeModal();
					this.loadUserList();
				}
			})
			.catch(err => {
				toastUtil.showErrorMsg(err.message);
				ggCommon.closeModal();
			});
	}

	openDeleteUserModal = (row, action) => {
		console.log(row);
		let modalContent = (
			<div className="common-modal">
				<label className="modal-big-header">Are you sure?</label>
				<p className="common-modal-content">After click OK, user '{row.userName}' will be removed.</p>
			</div>
		);
		this.showActionModal({
			headerIcon: action,
			modalContent: modalContent,
			callBackFunction: () => {
				this.clickYes(row)
			}
		})
	}

	// Do all actions here
	onClickAction = (action, row) => {
		if (action === 'DELETE') {
			this.openDeleteUserModal(row, action);
		}
	}

	userDetailFormatter = (cell, row, rowIndex) => {
		const userLink = `#/admin/user/${row.uid}`;
		return (
			<p className='table-first-item'><a href={userLink}>{row.userName}</a></p>
		);
	}

	userStatusFormatter = (cell, row, rowIndex) => {
		return (
			<span>{row.userStatus}</span>
		);
	}

	actionColumnFormatter = (cell, row, rowIndex) => {
		// console.log(row);
		return (
			<GGTableAction
				actions={actionsList}
				row={row}
				doAction={this.onClickAction}
			/>
		)
	}

	loadUserList() {
		userService.loadUserList().then(data => {
			if (data && data.errorCode === 0) {
				data.data.map(element => {
					element.createdDate = new Date(element.createdDate).toLocaleDateString();
				});
				this.setState({
					userList: data.data,
				})
				this.prepareData();
			}
		})
			.catch(err => {
				toastUtil.showErrorMsg(err.message);
			});
	}

	prepareData = () => {
		console.log(this.state.userList);
		let data = this.state.userList;
		let columns = [{
			dataField: 'userName',
			text: 'Username',
			sort: true,
			formatter: this.userDetailFormatter,
			headerStyle: {
				textAlign: 'left',
				paddingLeft: '32px',
				cursor: 'pointer'
			}
		}, {
			dataField: 'email',
			text: 'Email',
			sort: false,
			classes: 'style-classes',
			headerClasses: 'style-classes',
		}, {
			dataField: 'userStatus',
			text: 'Status',
			sort: false,
			isDummyField: true,
			formatter: this.userStatusFormatter,
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
			// isDummyField: true,
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
			userList: data,
			columns: columns,
		})
	}

	componentDidMount() {
		this.loadUserList();
	}

	render() {
		console.log(this.state.userList);
		console.log(this.state.columns);
		return (
			<div className="animated fadeIn" >
				<Container fluid>
					<Card className="table-card">
						<GGTable
							headerLabel="USERS LIST"
							data={this.state.userList}
							columns={this.state.columns}
						/>
					</Card>
				</Container>
			</div >
		)
	}
}

export default Users;