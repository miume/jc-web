import React,{Component} from 'react'
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import RegionStatis from './regionStatis/regionStatis'
import ProductLineStatis from './producuLineStatis/productLineStatis'
import RegionCompare from './regionCompare/regionCompare'
import ProductLineCompare from './productLineCompare/productLineCompare'
const {TabPane}=Tabs;
class ExcipientStatisticalAnalysis extends Component{//辅料统计的统计分析
    constructor(props){
        super(props);
        this.returnProcess=this.returnProcess.bind(this);
    }
    returnProcess(){//点击返回辅料统计界面
        this.props.history.push({pathname:'/excipientStatistics'})
    }
    render(){
        return(
            <div>
                <Blockquote name='统计分析' menu='前驱体成本核算管理' menu2='辅料统计' returnDataEntry={this.returnProcess}/>
                <Tabs defaultActiveKey='1'>
                    <TabPane key='1' tab='区域统计列表'> <RegionStatis/> </TabPane>
                    <TabPane key='2' tab='产线统计列表'> <ProductLineStatis/> </TabPane>
                    <TabPane key='3' tab='区域统计曲线'> <RegionCompare/> </TabPane>
                    <TabPane key='4' tab='产线统计曲线'> <ProductLineCompare/> </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ExcipientStatisticalAnalysis