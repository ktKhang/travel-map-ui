import React, { Component } from 'react';
import GGTab from '../../utils/GGTab';
import Intro from './Intro';
import Contact from './Contact';
import Feedback from './Feedback';


class AboutUs extends Component {

   render() {
      return (
         <div className="map-content">
            <div className="user-app-content">
               <GGTab
                  tabNav={['Intro', 'Contact', 'Feedback']}
               >
                  <Intro />
                  <Contact />
                  <Feedback />
               </GGTab>
            </div>
         </div>
      );
   }
}

export default AboutUs;