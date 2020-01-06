import React,{Component} from 'react'
import CommonBaseData from '../../BlockQuote/baseData';

class InspectionManagement extends Component {

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        return (
            <CommonBaseData current={this.current}/>
        );
    }
}
export default InspectionManagement
