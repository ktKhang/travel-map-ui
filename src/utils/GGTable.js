import React, { Component } from 'react';
import { ggCommon } from './GGCommon';
// lib for Table
import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { Container, Row, Col } from 'react-grid-system';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

const { SearchBar } = Search;

class GGTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: this.props.data.length !== 0 ? this.props.data : [],
         columns: this.props.columns || [{
            dataField: '',
            text: ''
         }],
         tableLoading: false,
         noDataMsg: 'No data',
      }
   }

   componentDidUpdate(previousProps, previousState) {
      if (previousProps.data !== this.props.data || previousProps.columns !== this.props.columns) {
         console.log('update');
         console.log(this.props.data);
         this.setState({
            data: this.props.data,
            columns: this.props.columns,
            tableLoading: true,
         })
      }
      if (previousProps.columns !== this.props.columns) {
         this.setState({
            columns: this.props.columns,
         })
      }
   }

   render() {
      console.log(this.state.data);
      console.log(this.state.columns);
      if (this.state.data.length !== 0 && this.state.columns.length !== 1) {
         console.log('render data');
         return (
            <div>
               <ToolkitProvider
                  keyField="id"
                  data={this.state.data}
                  columns={this.state.columns}
                  search>
                  {
                     props => (
                        <div>
                           <CardHeader className="card-header-table">
                              <Row>
                                 <Col md={4}>
                                    <div className="table-header-label">
                                       <i className="fa fa-align-justify"></i>
                                       <span className="table-label">{this.props.headerLabel}</span>
                                    </div>
                                 </Col>
                                 <br />
                                 <Col md={4} offset={{ md: 4 }}>
                                    <SearchBar {...props.searchProps} />
                                 </Col>
                              </Row>
                           </CardHeader>
                           <BootstrapTable keyField="id"
                              {...props.baseProps}
                              hover condensed
                              bordered={false}
                              pagination={paginationFactory()}
                              noDataIndication={this.state.noDataMsg}
                              rowClasses="row-class-light-table"
                              headerClasses="header-table"
                           />
                        </div>
                     )
                  }
               </ToolkitProvider>
            </div>
         );
      } else {
         return null;
      }

   }
}

export default GGTable;