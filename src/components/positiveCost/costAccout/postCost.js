import React,{Component} from 'react';
import CommonBaseData from '../../BlockQuote/baseData'
/**火法成本*/
class PositiveCostAccount extends Component{

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        return (
            <CommonBaseData current={this.current}/>
        );
    }
}
export default PositiveCostAccount;
