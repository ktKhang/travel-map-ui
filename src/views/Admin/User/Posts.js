import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { userService, showModal } from '../../../services';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { CommonModal } from '../../../utils/CustomModals';
import { ggCommon } from '../../../utils/GGCommon';
import { toastUtil } from '../../../utils/ToastUtil';

const { SearchBar } = Search;
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            errorMsg: null,
            modal: false,
            isOpen: false,
            columns: [{
                dataField: '',
                text: 'No',
                sort: false,
                formatter: this.sortableIndex
            }, {
                dataField: 'topic',
                text: 'Topic',
                sort: true,
            }, {
                dataField: 'content',
                text: 'Content',
                sort: true
            }, {
                dataField: 'feelingStatus',
                text: 'Status',
                sort: true
            }, {
                dataField: 'createdDate',
                text: 'Created Date',
                sort: true
            }, {
                dataField: 'uid',
                text: 'Action',
                formatter: props => <this.Delete deleteFunc={this.deletePost.bind(this, props)}></this.Delete>,
                csvExport: false
            }]
        };
    }

    showActionModal = async ({modalHeader, modalContent, callBackFunction }) => {
		await ggCommon.closeModal();
		ReactDOM.render(<CommonModal
			modal={false}
			isOpen={true}
			actionLabel="OK"
			modalHeader={modalHeader}
			modalContent={modalContent}
			noLabel="CANCEL"
			noFunc={() => ggCommon.closeModal()}
			callBackFunction={callBackFunction}
		/>,
			document.getElementById('modalDiv'));
	}

    deletePost(postUid) {
        let modalContent = (
			<div className="common-modal">
				<label className="modal-big-header">Are you sure?</label>
				<p className="common-modal-content">After click OK, this post will be removed.</p>
			</div>
        );
        let modalHeader = (
            <div>
                <b style={{ color: "red" }}>REMOVE</b>
            </div>
        );
        this.showActionModal({
            modalHeader: modalHeader,
			modalContent: modalContent,
			callBackFunction: () => {
				this.clickYes(postUid)
			}
		})
    }

    // Delete 
    Delete = (props) => {
        return (
            <div className="row">
                <div className="col-xs-5 previous">
                    <button type="button" className="btn btn-danger btn-block active"
                        onClick={props.deleteFunc}>
                        <span className="glyphicon glyphicon-chevron-left">Delete</span>
                    </button>
                </div>
            </div>
        )
    }

    clickYes = (postUid) => {
		userService.deleteFeeling(postUid)
			.then(data => {
				if (data && data.errorCode > 200) {
					toastUtil.showErrorMsg(data.message);
					ggCommon.closeModal();
				} else if (data && data.errorCode === 0) {
					toastUtil.showToastMsg("Delete Successfully.");
					ggCommon.closeModal();
					this.loadPostList();
				}
			})
			.catch(err => {
				toastUtil.showErrorMsg(err.message);
				ggCommon.closeModal();
			});
	}

    sortableIndex = (cell, row, rowIndex) => {
        rowIndex++;
        return (<p>{rowIndex}</p>)
    }

    loadPostList() {
        userService.loadPostList(this.props.match.params.userid).then(data => {
            if (data.errorMsg) {
                showModal.showErrorMsg(data.errorMsg);
            } else {
                if (data != null) {
                    data.forEach(element => {
                        element.createdDate = new Date(element.createdDate).toLocaleDateString();
                    });
                    !this.isCancelled && this.setState({
                        postList: data,
                        errorMsg: null,
                    })
                }
            }
        })
            .catch(err => {
                this.setState({ errorMsg: err.message });
            });

    }

    componentDidMount() {
        this.loadPostList();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }


    render() {
        return (
            <div className="animated fadeIn" >
                <ToolkitProvider
                    keyField="id"
                    data={this.state.postList}
                    columns={this.state.columns}
                    search>
                    {
                        props => (
                            <div>
                                <Container fluid >

                                    <br />
                                    <Card>
                                        <CardHeader>
                                            <Row>
                                                <Col md={4}>
                                                    <i className="fa fa-align-justify"></i> Post <small className="text-muted">List</small>
                                                </Col>
                                                <br />
                                                <Col md={4} offset={{ md: 4 }}>
                                                    <SearchBar {...props.searchProps} />
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <BootstrapTable
                                            keyField="id"
                                            {...props.baseProps}
                                            striped hover condensed
                                            bordered={false}
                                            pagination={paginationFactory()}
                                            noDataIndication={this.state.errorMsg}
                                            rowClasses="row-class-light-table"
                                            headerClasses="header-table"
                                        />
                                    </Card>
                                </Container>
                            </div>
                        )
                    }
                </ToolkitProvider>
                <div id="modalDiv"></div> {/* To inject CommonModal here*/}
            </div >
        )
    }
}

export default Posts;