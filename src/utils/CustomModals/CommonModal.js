import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class CommonModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: props.modal,
			modalType: props.modalType != null ? props.modalType : "other",
			modalClass: props.modalType === "info" ? this.infoClass
				: props.modalType === "warning" ? this.warningClass
					: props.modalType === "danger" ? this.dangerClass
						: this.infoClass,
			isOpen: props.isOpen,
			modalContent: props.modalContent != null ? props.modalContent : "Want to delete this record?",
			modalHeader: props.modalHeader != null ? props.modalHeader : " Deletion Confirmation",
			noFunc: this.props.noFunc,
			noLabel: this.props.noLabel,
			callBackFunction: this.props.callBackFunction,
			actionLabel: this.props.actionLabel,
			modalHeaderClass: "modal-confirmation-header"
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.clickNoFunc = this.clickNoFunc.bind(this);
	}

	dangerClass = {
		className: "modal-danger"
		, buttonPrimaryClassName: "danger"
		, buttonSecondaryClassName: "confirmation-btn-default"
	};
	infoClass = {
		className: "modal-info"
		, buttonPrimaryClassName: "primary"
		, buttonSecondaryClassName: "confirmation-btn-default"
	};
	warningClass = {
		className: "modal-warning"
		, buttonPrimaryClassName: "warning"
		, buttonSecondaryClassName: "confirmation-btn-default"
	};

	toggleModal() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	clickNoFunc() {
		this.toggleModal();
	}

	hanldeKeyPress = (event) => {
		let code = event.keyCode || event.which;
		if (code === 13) {    // 13 is the enter keycode
			this.state.callBackFunction()
		}
	}

	render() {
		return (
			<Modal isOpen={this.state.isOpen} toggle={!this.props.preventClose ? this.toggleModal : null} onKeyPress={this.hanldeKeyPress}
				className={this.props.className + ` ` + this.state.modalClass.className + `border-modal-legend`}>
				<ModalHeader toggle={this.toggleModal} className={this.state.modalHeaderClass}>{this.state.modalHeader}</ModalHeader>
				<ModalBody>
					{this.state.modalContent}
				</ModalBody>
				<ModalFooter>
					{this.state.noFunc != null &&
						<Button color={this.state.modalClass.buttonSecondaryClassName} onClick={this.state.noFunc}>{this.state.noLabel}</Button>
					}

					{this.state.callBackFunction != null &&
						<Button color={this.state.modalClass.buttonSecondaryClassName} onClick={this.state.callBackFunction}>{this.state.actionLabel}</Button>
					}
				</ModalFooter>
			</Modal>
		)
	}

}

export default CommonModal;
