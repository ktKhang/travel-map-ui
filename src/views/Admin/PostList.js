import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { Container } from 'react-grid-system';
import GGTable from '../../utils/GGTable';
import { userService } from '../../services';
import { toastUtil } from '../../utils/ToastUtil';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';

class PostList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
         columns: [{
            dataField: '',
            text: ''
         }],

         showPost: null,
      };
   }

   componentDidMount() {

      this.loadData();
   }

   loadData = () => {
      userService.getAllPost().then(data => {
         if (data && data.errorCode === 0) {
            console.log(data);
            this.setState({
               data: data.data,
            });
            this.prepareColumns();
         } else {

         }
      })
         .catch(err => {
            toastUtil.showErrorMsg(err);
         });
   }

   firstFormatter = (cell, row, rowIndex) => {
      return (
         <div className="post-1">
            <label className="post-1-label">{cell}</label>
            <label className="post-1-label-2">{new Date(row.createdDate).toLocaleDateString()}</label>
         </div>
      );
   }

   topicFormatter = (cell, row, rowIndex) => {
      return (
         <div style={{ fontSize: '15px', textAlign: 'left' }}>{cell}</div>
      );
   }

   statusFormatter = (cell, row, rowIndex) => {
      return (
         <div style={{ fontSize: '15px', textAlign: 'left' }}>{row.feelingStatus}</div>
      )
   }

   actionColumnFormatter = (cell, row, rowIndex) => {
      return (
         <div style={{ display: 'flex' }} onClick={() => { console.log(row); }}>
            <button type="button" className="btn-khang btn btn-primary btn-block active"
               onClick={() => this.viewPost(row)}>
               <span className="glyphicon glyphicon-chevron-left">View content</span>
            </button>
            {
               row.feelingStatus !== 'REMOVED' &&
               <button type="button" className="btn-khang btn btn-danger btn-block active"
                  onClick={() => this.removePost(row)}>
                  <span className="glyphicon glyphicon-chevron-left">Delete</span>
               </button>
            }
         </div>
      )
   }

   viewPost = (row) => {
      this.setState({
         showPost: row.content,
      })
   }

   removePost = (post) => {
      console.log(post);
      userService.removePost(post.uid).then(data => {
         if (data && data.errorCode === 0) {
            console.log(data);
            this.loadData();
         } else {

         }
      })
         .catch(err => {
            toastUtil.showErrorMsg(err);
         });
   }

   prepareColumns = () => {
      let columns = [{
         dataField: 'userName',
         text: 'Created by',
         sort: true,
         formatter: this.firstFormatter,
         headerStyle: {
            textAlign: 'left',
            paddingLeft: '24px',
            cursor: 'pointer'
         }
      }, {
         dataField: 'topic',
         text: 'Topic',
         sort: true,
         formatter: this.topicFormatter,
         headerStyle: {
            textAlign: 'left',
            paddingLeft: '12px',
            cursor: 'pointer'
         }
      }, {
         dataField: 'location',
         text: 'Location',
         sort: false,
         formatter: this.topicFormatter,
         headerStyle: {
            textAlign: 'left',
            paddingLeft: '12px',
            cursor: 'pointer'
         }
      }, {
         dataField: 'feelingStatus',
         text: 'Status',
         sort: true,
         formatter: this.statusFormatter,
         isDummyField: true,
         headerStyle: {
            textAlign: 'left',
            paddingLeft: '12px',
            cursor: 'pointer'
         }
      }, {
         dataField: 'uid',
         text: 'Action',
         isDummyField: true,
         formatter: this.actionColumnFormatter,
         headerAlign: 'center',
      }];
      this.setState({
         columns: columns,
      })
   }

   closeViewPost = () => {
      this.setState({
         showPost: false,
      })
   }

   render() {
      return (
         <div className="animated fadeIn" >
            <Container fluid>
               <Card className="table-card">
                  <GGTable
                     headerLabel="POSTS LIST"
                     data={this.state.data}
                     columns={this.state.columns}
                  />
               </Card>
            </Container>
            {
               this.state.showPost &&
               <Modal isOpen={true} toggle={this.closeViewPost}
                  className={`border-modal-legend`}>
                  <ModalHeader>Post content</ModalHeader>
                  <ModalBody className="post-content-khang">
                     {ReactHtmlParser(this.state.showPost)}
                  </ModalBody>
               </Modal>
            }
         </div >
      );
   }
}

export default PostList;