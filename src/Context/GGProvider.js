import React, { Component } from 'react';
import { Provider } from './context';

class GGProvider extends Component {
   state = {
      clickMapObj: false
   };
   changeClickMapObj = (bool = true) => {
      this.setState({
         clickMapObj: bool
      })
   }

   render() {
      const { clickMapObj } = this.state;
      return (
         <Provider
            value={{
               clickMapObj: clickMapObj,
               changeClickMapObj: this.changeClickMapObj
            }}
         >
            {this.props.children}
         </Provider>
      );
   }
}

export default GGProvider;