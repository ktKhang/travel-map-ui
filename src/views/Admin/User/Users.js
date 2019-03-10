import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { userService, showModal } from '../../../services';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { CommonModal } from '../../../utils/CustomModals';

const { SearchBar } = Search;

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            errorMsg: null,
            modal: false,
            isOpen: false,
            columns: [{
                dataField: '',
                text: 'No',
                sort: false,
                formatter: this.sortableIndex
            }, {
                dataField: 'userName',
                text: 'Username',
                sort: true,
                formatter: this.userDetailFormatter
            }, {
                dataField: 'email',
                text: 'Email',
                sort: true
            }, {
                dataField: 'userStatus',
                text: 'Status',
                sort: true
            }, {
                dataField: 'createdDate',
                text: 'Created Date',
                sort: true
            }, {
                dataField: 'uid',
                text: 'Action',
                formatter: props => <this.Delete deleteFunc={this.deleteUser.bind(this, props)}></this.Delete>,
                csvExport: false
            }]
        };
    }

    deleteUser(userUid) {
        const isOpen = true;

        ReactDOM.render(<CommonModal modal={this.state.modal}
            isOpen={isOpen}
            modalType="danger"
            modalContent="Do you want to delete this record?"
            modalHeader="Confirmation"
            yesLabel="Yes"
            noLabel="No"
            yesFunc={this.clickYes.bind(this, userUid)}
            noFunc={this.clickNo}
        />
            , document.getElementById('modalDiv'));
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

    clickYes(userUid) {
        userService
            .deleteUser(userUid)
            .then(data => {
                if (data && data.errorCode > 200) {
                    showModal.showErrorMsg(data.message);
                    return;
                } else if (data && data.errorCode === 0) {
                    console.log('show data' + data);
                    showModal.showSuccessMsg("Delete Success.");
                    setTimeout(() => {
                        showModal.closeModal();
                        this.loadUserList();
                    }, 5000);
                }
            })
            .catch(err => {
                showModal.showErrorMsg(err.message);
            });
    }

    sortableIndex = (cell, row, rowIndex) => {
        rowIndex++;
        return (<p>{rowIndex}</p>)
    }

    userDetailFormatter = (cell, row) => {
        const userLink = `#/admin/user/${row.uid}`;
        return (
            <p><a href={userLink}>{cell}</a></p>
        );
    }

    loadUserList() {
        userService.loadUserList().then(data => {
            if (data.errorMsg) {
                showModal.showErrorMsg(data.errorMsg);
            } else {
                data.forEach(element => {
                    element.createdDate = new Date(element.createdDate).toLocaleDateString();
                });
                !this.isCancelled && this.setState({
                    userList: data,
                    errorMsg: null,
                })
            }
        })
            .catch(err => {
                this.setState({ errorMsg: err.message });
            });

    }

    componentDidMount() {
        this.loadUserList();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }


    render() {
        return (
            <div className="animated fadeIn" >
                <ToolkitProvider
                    keyField="id"
                    data={this.state.userList}
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
                                                    <i className="fa fa-align-justify"></i> User <small className="text-muted">List</small>
                                                </Col>
                                                <br />
                                                <Col md={4} offset={{ md: 4 }}>
                                                    <SearchBar {...props.searchProps} />
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <BootstrapTable keyField="id"
                                                {...props.baseProps}
                                                striped hover condensed
                                                bordered={false}
                                                pagination={paginationFactory()}
                                                noDataIndication={this.state.errorMsg}
                                            />
                                        </CardBody>
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

export default Users;