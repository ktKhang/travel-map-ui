import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

    /*
    Created by Luan on 2018-08-07
    A Common Modal to be used in whole project.
    */
    class CommonModal extends Component{ 

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
                yesLabel: props.yesLabel != null? props.yesLabel : null,
                noLabel: props.noLabel != null? props.noLabel : "No",
                yesFunc: props.yesFunc,
                noFunc: this.props.noFunc
            }
        
            this.toggleModal = this.toggleModal.bind(this);
            this.clickNoFunc = this.clickNoFunc.bind(this);
        }

        dangerClass =  {className: "modal-danger"
                                , buttonPrimaryClassName: "danger"
                                , buttonSecondaryClassName: "secondary"      
                            };
        infoClass =  {className: "modal-info"
                                , buttonPrimaryClassName: "primary"
                                , buttonSecondaryClassName: "secondary"      
                            };
        warningClass =  {className: "modal-warning"
                                , buttonPrimaryClassName: "warning"
                                , buttonSecondaryClassName: "secondary"      
                            };

    toggleModal() {
    this.setState({
        isOpen: !this.state.isOpen,
    });
    }

    clickNoFunc(){
        this.toggleModal();
    }

    render(){
        console.log('render....');
        return(<Modal isOpen={this.state.isOpen} toggle={this.toggleModal}
        className={this.state.modalClass.className}>
            <ModalHeader toggle={this.toggleModal}>{this.state.modalHeader}</ModalHeader>
            <ModalBody>
                {this.state.modalContent}
            </ModalBody>
            <ModalFooter>
                {this.state.yesLabel != null &&
                 <Button color={this.state.modalClass.buttonPrimaryClassName} onClick={this.state.yesFunc}>{this.state.yesLabel}</Button>   
                }
                <Button color={this.state.modalClass.buttonSecondaryClassName} onClick={this.clickNoFunc}>{this.state.noLabel}</Button>
            </ModalFooter>
        </Modal>)
    }

}
export default CommonModal;
