import React, { Component } from 'react';
import { Transition } from "react-spring";

class GGTableAction extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showAction: false,
      };
   }

   handleCollapse = () => {
      this.setState({
         showAction: !this.state.showAction
      })
   }

   doAction = (e, action, row) => {
      this.props.doAction(action, row);
   }

   render() {
      const { actions, row, showIcon = true } = this.props;
      return (
         <div>
            <button className="btn-action"
               // onMouseEnter={this.handleCollapse}
               onClick={this.handleCollapse}>
               <i className="fa icon-action-custom icon-pre-page-false"></i>
            </button>
            <Transition
               config={{ tension: 250 }}
               items={this.state.showAction}
               from={{ width: 0 }}
               enter={{ width: 'auto' }}
               leave={{ width: 0 }}
            >{showAction =>
               showAction
                  ? props => <div className="action-content action-positions" style={props}
                     //onMouseLeave={this.handleCollapse}  
                     onClick={this.handleCollapse}
                  >
                     {
                        actions.map((item, index) => {
                           return (
                              <div className="action-item" key={index} onClick={e => this.doAction(e, item.value, row)}>
                                 <label className="action-item-label">{item.label}</label>
                              </div>
                           )
                        })
                     }
                     <button className="btn-action-collapse"
                        onClick={this.handleCollapse}>
                        <i className="fa icon-action-custom icon-next-page-true"></i>
                     </button>
                  </div>
                  : null
               }
            </Transition>
         </div>
      );
   }
}

export default GGTableAction;