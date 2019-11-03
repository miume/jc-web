import React,{Component} from 'react'
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import ProductStatistical from './productStatistical/productStatistical'
import CycleComparsion from './cycleComparsion/cycleComparsion'
import ProductComparsion from './productComparsion/productComparsion'
const {TabPane}=Tabs;
class ProcessStatisticalAnalysis extends Component{//在制品统计的统计分析
    constructor(props){
        super(props);
        this.returnProcess=this.returnProcess.bind(this);
    }
    returnProcess(){//点击返回在制品统计界面
        this.props.history.push({pathname:'/productStorage'})
    }
    render(){
        return(
            <div>
                <Blockquote name='成品入库统计分析' menu='成品入库' menu2='前驱体成本核算管理' returnDataEntry={this.returnProcess}/>
                <Tabs defaultActiveKey='1'>
                    <TabPane key='1' tab='按产线统计'> <ProductStatistical/> </TabPane>
                    <TabPane key='2' tab='周期对比曲线'> <CycleComparsion/> </TabPane>
                    <TabPane key='3' tab='产线对比曲线'> <ProductComparsion/> </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ProcessStatisticalAnalysis