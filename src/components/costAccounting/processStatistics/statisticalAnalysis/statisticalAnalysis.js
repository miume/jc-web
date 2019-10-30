import React,{Component} from 'react'
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import ProcessStatis from './processStatis/processStatis'
import ProductLineStatis from './productLineStatis/productLIneStatis'
import ProcessCompare from './processCompare/processCompare'
import ProductLineCompare from './productLineCompare/processLineCompare'
const {TabPane}=Tabs;
class ProcessStatisticalAnalysis extends Component{//在制品统计的统计分析
    constructor(props){
        super(props);
        this.returnProcess=this.returnProcess.bind(this);
    }
    returnProcess(){//点击返回在制品统计界面
        this.props.history.push({pathname:'/processStatistics'})
    }
    render(){
        return(
            <div>
                <Blockquote name='统计分析' menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess}/>
                <Tabs defaultActiveKey='1'>
                    <TabPane key='1' tab='按工序统计'> <ProcessStatis/> </TabPane>
                    <TabPane key='2' tab='按产线统计'> <ProductLineStatis/> </TabPane>
                    <TabPane key='3' tab='工序对比分析'> <ProcessCompare/> </TabPane>
                    <TabPane key='4' tab='产线对比分析'> <ProductLineCompare/> </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ProcessStatisticalAnalysis