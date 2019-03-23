import React, { } from 'react';
import ReactDOM from 'react-dom';
import GGToast from './GGToastNotification';
import { constant } from "./Constant";

const showToastMsg = (msg, processTime) => {
   if (msg === undefined) {
      msg = 'Success.';
   }
   if (processTime === true) {
      processTime = 3000
   }
   ReactDOM.render(<GGToast message={msg} processTime={processTime} />
      , document.getElementById('toastDiv'));

}

const showErrorMsg = (msg, processTime) => {
   if (msg === undefined) {
      msg = 'Error.';
   }
   ReactDOM.render(<GGToast message={msg} type={constant.TOAST_TYPE_ERROR} />
      , document.getElementById('toastDiv'));

}
const showSuccessMsg = (msg, processTime) => {
   if (msg === undefined) {
      msg = 'Success.';
   }
   ReactDOM.render(<GGToast message={msg} type={constant.TOAST_TYPE_SUCCESS} />
      , document.getElementById('toastDiv'));

}

export const toastUtil = {
   showToastMsg,
   showErrorMsg,
   showSuccessMsg
}