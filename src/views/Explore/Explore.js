import React, { Component } from 'react';
import { Container } from 'react-grid-system';
import { connect } from 'react-redux';

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class Explore extends Component {
   constructor(props) {
      super(props);
      this.state = {
         appStyle: {
            width: '500px',
            height: window.innerHeight,
            overflow: 'auto'
         }
      }
   }
   componentDidMount() {
      let { dispatch } = this.props
      console.log(this.props.regionReducer);
      dispatch({ type: 'GET_EXPLORE_PAGE' })
   }
   componentWillUnmount() {
      let { dispatch } = this.props
      dispatch({ type: 'GET_EXPLORE_PAGE' })
      if (this.props.regionReducer.clickRegion) {
         dispatch({ type: 'CLICK_REGION' })
      }
   }

   render() {
      console.log();
      console.log(this.props.pageReducer.isExplore);
      return (
         <div className="map-content" style={{ width: 'fit-content' }}>
            <div className="app-content" style={this.state.appStyle}>

            </div>
         </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      regionReducer: state.regionReducer,
      pageReducer: state.pageReducer
   }
}

export default connect(mapStateToProps)(Explore);