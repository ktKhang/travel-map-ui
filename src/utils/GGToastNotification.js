import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { constant } from "./Constant";


class GGToastNotification extends Component {

   actionMethod = (msg, type, processTime) => {
      if (type === constant.TOAST_TYPE_ERROR) {
         return this.showErrorMsg(msg, processTime);

      } else if (type === constant.TOAST_TYPE_SUCCESS) {
         return this.showSuccessMsg(msg, processTime);
      } else {
         return this.showInfoMsg(msg, processTime);
      }
   }
   showErrorMsg = (msg, processTime) => {
      if (processTime === undefined) {
         toast(msg, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
      } else {
         toast(msg, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
            autoClose: processTime,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
      }
   }

   showInfoMsg = (msg, processTime) => {
      if (processTime === undefined) {
         toast(msg, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.INFO,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
      } else {
         toast(msg, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.INFO,
            autoClose: processTime,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
      }
   }

   showSuccessMsg = (msg, processTime) => {
      if (processTime === undefined) {
         toast(msg, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.SUCCESS,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
      } else {
         toast(msg, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.SUCCESS,
            autoClose: processTime,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
      }
   }

   render() {
      const { message, type, processTime } = this.props;
      return (
         <div className="animated fadeIn">
            {this.actionMethod(message, type, processTime)}
            <ToastContainer
               closeButton={false}
               transition={Slide}
               newestOnTop={true}
            />
            {/* </div> */}
         </div>
      )
   }
}

export default GGToastNotification;