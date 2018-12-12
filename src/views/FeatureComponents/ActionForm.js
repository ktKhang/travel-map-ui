import React, { Component } from 'react';
import { decodeJWT } from '../../utils/DecodeJWT';
import { constant } from '../../utils/Constant';
import { connect } from 'react-redux';
import { regionService, showModal } from '../../services';

class ActionForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         topic: '',
         content: ''
      }
      this.onSubmit = this.onSubmit.bind(this)
      this.onFieldChange = this.onFieldChange.bind(this)
   }

   onFieldChange = (event) => {
      console.log(event.target.id);
      console.log(event.target.value);
      this.setState({
         [event.target.id]: event.target.value
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
            regionId: this.props.regionReducer.selectedRegion
         }
         regionService.addPost(newPost).then(data => {
            console.log(data);
            if (data.errorCode !== 0) {
               showModal.showErrorMsg("Submit error!")
            } else {
               console.log(data);
            }
            const { dispatch } = this.props
            dispatch({
               type: 'ADD_POST',
               value: false
            })
         })
      } else if (this.props.type === 'place') {
         let newPost = {
            topic: this.state.topic,
            content: this.state.content,
            userUid: userUid
         }

      }

   }

   onCancel = () => {
      const { dispatch } = this.props
      dispatch({
         type: 'ADD_POST',
         value: false
      })
   }

   renderSubmitAction = () => {
      let content
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

const mapStateToProps = (state, ownProps) => {
   return {
      regionReducer: state.regionReducer,
      placeReducer: state.placeReducer,
      actionReducer: state.actionReducer
   }
}

export default connect(mapStateToProps)(ActionForm);