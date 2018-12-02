import React, {Component} from "react";
import { regionService, showModal } from "../../services";

class Places extends Component {

    constructor(props){
        super(props);
        this.state = {
            region: {},
            errorMsg: null,
            placeList: [],
        }
    };

    
    invokeRegionDetailService(uid){
        console.log('=====');
        regionService.fetchRegionDetail(uid).then(data => {
            if(data.errorMsg){
                showModal.showErrorMsg(data.errorMsg);
            }
            else{
                console.log(data);
                this.setState({
                    region: data, 
                    placeList: data.placeList,
                    errorMsg: null
                });
            }
        })
        .catch(err => {
            this.setState({
                errorMsg: err.message
            })
        })
    }

    componentDidMount(){
        console.log('--- Did Mount');
        this.invokeRegionDetailService('pQDvRf13FAVV');
    }

    UNSAFE_componentWillMount(){
        console.log('--- Will Mount');
        this.invokeRegionDetailService('pQDvRf13FAVV');
    }

    componentWillUnmount(){
        this.isCancelled = true;
    }

    render(){
        return(
             <div style={{ width: "30%", height: "100%", visibility: 'visible', background: "white", float: "right" }}>
                <p>{this.state.region.title}</p>

                {this.renderPlace()}
            </div>
        );
    }

    renderPlace = () => [
        this.state.placeList.map(item => {
            return(
                <ul>
                    <li>
                        {item.name}
                    </li>
                </ul>
            )
        })
    ]
}
export default Places;