import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import ShowInfo from './showInfo'

class BaseConfigure extends Component{
    constructor(props){
        super(props);
        this.returnBaseInfo=this.returnBaseInfo.bind(this);
    }
    /**返回基础数据部分*/
    returnBaseInfo(){
        this.props.history.push({pathname:'/precursorCostBasisData'});
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));

        return(
            <div>
                <Blockquote menu={current.menuParent} name='基础配置' menu2='返回' returnDataEntry={this.returnBaseInfo} flag={1}/>
                <ShowInfo/>
            </div>
        );
    }
}
export default BaseConfigure;