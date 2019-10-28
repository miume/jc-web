import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import { Tabs } from 'antd';
import MainMaterial from './mainMaterial'
import AuxiliaryMaterial from './auxiliaryMaterial'
const { TabPane } = Tabs;
class CostAccount extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Tabs defaultActiveKey="1" tabBarGutter={32}>
                    <TabPane tab="主材" key="1">
                        <MainMaterial/>
                    </TabPane>
                    <TabPane tab="辅材" key="2">
                        <AuxiliaryMaterial />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default CostAccount