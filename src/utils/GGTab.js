import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

class GGTab extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeTab: '0'
      }
      this.toggle = this.toggle.bind(this);
   }

   toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab,
         });
      }
   }

   render() {
      const { tabNav } = this.props
      return (
         <div className="travel-tab">
            <Nav tabs className="travel-tab-nav">
               {
                  tabNav.map((item, index) => {
                     return (
                        <NavItem className={this.state.activeTab === index.toString() ? 'travel-tab-nav-item-active' : 'travel-tab-nav-item'} key={index}>
                           <NavLink
                              onClick={() => { this.toggle(index.toString()); }}
                           >
                              <span> {item} </span>
                           </NavLink>
                        </NavItem>
                     )
                  })
               }
            </Nav>
            <TabContent className="travel-tab-content" activeTab={this.state.activeTab}>
               {
                  React.Children.map(this.props.children, (child, index) => {
                     return (
                        <TabPane tabId={index.toString()}>
                           {child}
                        </TabPane>
                     );
                  })
               }
            </TabContent>
         </div>
      );
   }
}

export default GGTab;