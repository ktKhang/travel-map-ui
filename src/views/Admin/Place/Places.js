import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CommonModal from '../../CustomModals/CommonModal'
import {placeService, showModal} from '../../../services';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const { SearchBar } = Search;

class Places extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeList: [],
            errorMsg: null,
            modal: false,
            isOpen: false,
            columns : [{
                dataField: '',
                text: '#',
                sort: false,
                formatter: this.sortableIndex
                }, {
                dataField: 'name',
                text: 'Place',
                sort: true,
                formatter: this.placeDetailFormatter
                }, {
                dataField: 'title',
                text: 'Title',
                sort: true
                }, {
                dataField: 'placeStatus',
                text: 'Status',
                sort: true
                }, {
                dataField: 'createdDate',
                text: 'Created Date',
                sort: true
                }, {
                dataField: 'uid',
                text: 'Action',
                formatter: props => <this.Delete deleteFunc = {this.deletePlace.bind(this, props)}></this.Delete>,
                csvExport: false
            }]
        };
    }

	deletePlace(placeUid) {
		const isOpen = true;

		ReactDOM.render(<CommonModal modal={this.state.modal}
			isOpen={isOpen}
			modalType="danger"
			modalContent="Do you want to delete this record?"
			modalHeader="Confirmation"
			yesLabel="Yes"
			noLabel="No"
			yesFunc={this.clickYes.bind(this, placeUid)}
			noFunc={this.clickNo}
		/>
			, document.getElementById('modalDiv'));
    }
    
    // Delete 
    Delete = (props) => {
        return(
        <div className="row">
            <div className="col-xs-5 previous">
            <button type="button" className="btn btn-danger btn-block active" 
                onClick={props.deleteFunc}>
                <span className="glyphicon glyphicon-chevron-left">Delete</span>
                </button>
            </div>
        </div> 
    )}

    sortableIndex = (cell, row, rowIndex) => {
        rowIndex ++;
        return(<p>{rowIndex}</p>)
    }

    placeDetailFormatter = (cell, row) => {
        const placeLink = `#/admin/region/${this.props.match.params.regionid}/place/${row.uid}`;
        return (
          <p><a href={placeLink}>{cell}</a></p>
        );
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

    componentDidMount() {
        this.loadPlacesList();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    clickNewPlace(){
            
    }
    
    render() {
        return (
            <div className = "animated fadeIn" >
            <ToolkitProvider 
                keyField="id"
                data={this.state.placeList}
                columns={this.state.columns}
                search>
                {
                    props => (
                        <div>
                            <Container fluid >
                                <br/>
                                <Row>
                                    <Col md={1}>
                                        <Button color="primary" onClick={() => this.clickNewPlace()} >
                                        <i className="fa fa-plus"></i>&nbsp;New
                                        </Button>
                                    </Col>
                                </Row>
                                <br/>
                                <Card>
                                    <CardHeader>
                                        <Row>
                                        <Col md={4}>
                                            <i className="fa fa-align-justify"></i> Place <small className="text-muted">List</small>
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
    )}
}

export default Places;