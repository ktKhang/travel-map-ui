import React, { Component} from 'react';
import { FacebookProvider, ShareButton   } from 'react-facebook';
 
export default class ShareMap extends Component {
    render() {
        return (
          <FacebookProvider appId="738293439691315">
            <ShareButton href="https://gody.vn/map/get_all_country/nguyenquanghuyqng19974806">
              Share
            </ShareButton>
          </FacebookProvider>
        );
      }
} 