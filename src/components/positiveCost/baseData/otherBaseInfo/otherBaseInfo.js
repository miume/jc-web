import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import ShowInfo from './showInfo'

class OtherBaseInfo extends Component{
    constructor(props){
        super(props);
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
    }

    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'))
        
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name='其他基本数据' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <ShowInfo current={this.current}/>
            </div>
        );
    }
}
export default OtherBaseInfo;