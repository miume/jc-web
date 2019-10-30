import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import { Tabs } from 'antd';
import PositiveMainMaterial from './mainMaterial'
import PositiveAuxiliaryMaterial from './auxiliaryMaterial'
const { TabPane } = Tabs;
class PositiveCostAccount extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="主材" key="1">
                        <PositiveMainMaterial/>
                    </TabPane>
                    <TabPane tab="辅材" key="2">
                        <PositiveAuxiliaryMaterial />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default PositiveCostAccount