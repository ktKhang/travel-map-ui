import React, { Component } from 'react';
import Map from '../FeatureComponents/Map';
// custom GGTab component
import GGTab from '../../utils/GGTab';
// childrent component
import Intro from './Intro';
import Contact from './Contact';
import Feedback from './Feedback';


class AboutUs extends Component {
   constructor(props) {
      super(props);
      this.state = {
         appStyle: {
            height: window.innerHeight,
            overflow: 'auto'
         },
      }
   }

   render() {
      return (
         <div className="map-content">
            <div className="app-content" style={this.state.appStyle}>
               <GGTab
                  tabNav={['Intro', 'Contact', 'Feedback']}
               >
                  <Intro />
                  <Contact />
                  <Feedback />
               </GGTab>
            </div>
            <Map />
         </div>
      );
   }
}

export default AboutUs;