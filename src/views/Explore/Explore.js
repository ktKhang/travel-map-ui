import React, { Component } from 'react';
import { Container } from 'react-grid-system';
import { connect } from 'react-redux';

class Explore extends Component {
   constructor(props) {
      super(props);
      this.state = {
         appStyle: {
            height: window.innerHeight,
            overflow: 'auto'
         }
      }
   }
   UNSAFE_componentWillMount() {
      let { dispatch } = this.props
      console.log(this.props.regionReducer);
      dispatch({ type: 'CLICK_REGION' })
   }
   componentWillUnmount() {
      let { dispatch } = this.props
      dispatch({ type: 'CLICK_REGION' })
   }

   render() {
      console.log();
      return (
         <div className="map-content" style={this.props.regionReducer.clickRegion === true ? { width: '35%' } : {}}>
            <div className="app-content" style={this.state.appStyle}>
               {this.props.regionReducer.clickRegion &&
                  <p>Khang</p>
               }
            </div>
         </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      regionReducer: state.regionReducer
   }
}

export default connect(mapStateToProps)(Explore);