import React, { Component } from 'react';
import { decodeJWT } from './DecodeJWT';
import { constant } from './Constant';
import { regionService, placeService } from '../services';
import { toastUtil } from './ToastUtil';
import { ggMapCommon } from './GGMap v2.0/common';
import { ggCommon } from './GGCommon';

class GGActionForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         topic: '',
         content: ''
      }
   }

   onFieldChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value,
      })
   }

   onSubmit = () => {
      const decodedToken = decodeJWT.decodeToken(localStorage[constant.TOKEN_VARIABLE_NAME]);
      const userUid = decodedToken.sub
      if (this.props.type === 'region') {
         let newPost = {
            topic: this.state.topic,
            content: this.state.content,
            userUid: userUid,
            regionId: ggMapCommon.getSelectedRegion().id,
         }
         regionService.addPost(newPost).then(data => {
            if (data.errorCode === 0) {
               toastUtil.showToastMsg('Post feeling success! Please waiting for approved');
               ggMapCommon.setReloadMap();
            }
            ggCommon.cancelAddPost();
         })
            .catch(err => {
               toastUtil.showErrorMsg(constant.ERROR_SERVER_BAD_RESPONSE);
            });

      } else if (this.props.type === 'place') {
         let newPost = {
            topic: this.state.topic,
            content: this.state.content,
            userUid: userUid,
            placeUid: ggMapCommon.getSelectedPlace().uid,
         }
         placeService.addPost(newPost).then(data => {
            if (data.errorCode === 0) {
               toastUtil.showToastMsg('Post feeling success! Please waiting for approved');
               ggMapCommon.setReloadMap();
            }
            ggCommon.cancelAddPost();
         })
            .catch(err => {
               toastUtil.showErrorMsg(constant.ERROR_SERVER_BAD_RESPONSE);
            });

      }

   }

   onCancel = () => {
      ggCommon.cancelAddPost();
   }

   renderSubmitAction = () => {
      let content = null;
      if (this.state.topic.trim() === '' || this.state.content.trim() === '') {
         content = <button className="btn-action-submit" disabled>POST</button>
      } else (
         content = <button className="btn-action-submit" onClick={this.onSubmit}>POST</button>
      )
      return (
         content
      )
   }

   render() {
      return (
         <div>
            <div className="action-form-container">
               <input type="text" id="topic" className="action-form-text" placeholder="Topic"
                  onChange={e => this.onFieldChange(e)} value={this.state.topic}
               />
               <textarea className="action-form-textarea" id="content" placeholder="Your feeling"
                  onChange={e => this.onFieldChange(e)} value={this.state.content}
               />
            </div>
            <div className="action-form-btn-container">
               {this.renderSubmitAction()}
               <button className="btn-action-cancel" onClick={this.onCancel}>CANCEL</button>
            </div>
         </div>
      );
   }
}

export default GGActionForm;