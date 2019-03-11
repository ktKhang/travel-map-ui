import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import markPlaceImg from '../../assets/img/mark-place.svg'
import picSharingImg from '../../assets/img/picture-sharing.svg'
import postFeelingImg from '../../assets/img/post-feeling.svg'

class Intro extends Component {
   render() {
      return (
         <div className="intro-content">
            <Row className="intro-row">
               <Col md={8}>
                  <div className="intro-text">
                     <span className="intro-title">Mark your place</span>
                     <span className="intro-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of  classical Latin literature from 45 BC, making it over 2000 years old.
                     </span>
                  </div>
               </Col>
               <Col md={4}>
                  <a href="#"><img className="intro-img" src={markPlaceImg} width="100" height="50" alt="gogo.vn" /></a>
               </Col>
            </Row>
            <Row className="intro-row">
               <Col md={8}>
                  <div className="intro-text">
                     <span className="intro-title">Add your picture</span>
                     <span className="intro-title">&amp; Sharing</span>
                     <span className="intro-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of  classical Latin literature from 45 BC, making it over 2000 years old.
                     </span>
                  </div>
               </Col>
               <Col md={4}>
                  <a href="#"><img className="intro-img" src={picSharingImg} width="100" height="50" alt="gogo.vn" /></a>
               </Col>
            </Row>
            <Row className="intro-row">
               <Col md={8}>
                  <div className="intro-text">
                     <span className="intro-title">Post your feel!</span>
                     <span className="intro-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of  classical Latin literature from 45 BC, making it over 2000 years old.
                     </span>
                  </div>
               </Col>
               <Col md={4}>
                  <a href="#"><img className="intro-img" src={postFeelingImg} width="100" height="50" alt="gogo.vn" /></a>
               </Col>
            </Row>
         </div>
      );
   }
}

export default Intro;