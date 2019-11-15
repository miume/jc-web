import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import {Spin,Tabs} from 'antd'
import PositiveProcess from './processStatistic/processStatis'
import PositiveProductLine from './productLineStatis/productLineStatis'
import PositiveProcessCom from './processCompare/processCom'
import ProductLineCom from './productLineCom/productLineCom'
const {TabPane}=Tabs


 class PositiveStatistic extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.back=this.back.bind(this);
    }
    back(){
        this.props.history.push({pathname:'/positiveProcess'})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        return(
            <div>
                <Blockquote name='在制品统计分析' menu='正极成本'  menu2='在制品管理' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane key='1' tab='按产线统计'> <PositiveProductLine/> </TabPane>
                        <TabPane key='2' tab='按工序统计'> <PositiveProcess/> </TabPane>
                        <TabPane key='3' tab='产线对比分析'> <ProductLineCom/> </TabPane>
                        <TabPane key='4' tab='工序对比分析'> <PositiveProcessCom/> </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }
 }
 export default  PositiveStatistic