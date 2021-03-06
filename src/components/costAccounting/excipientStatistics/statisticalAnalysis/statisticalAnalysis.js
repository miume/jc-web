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
        this.state = {
            staticPeriod: []
        };
        this.returnProcess=this.returnProcess.bind(this);
    }

    /**点击返回辅料统计界面*/
    returnProcess(){
        this.props.history.push({pathname:'/excipientStatistics'})
    }
    render() {
        let {staticPeriod,periodsCode} = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <Blockquote name='统计分析' menu='前驱体成本核算管理' menu2='辅料统计' returnDataEntry={this.returnProcess}/>
                <div className='rightDiv-content'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane key='1' tab='区域统计列表'><RegionStatis staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url}/></TabPane>
                        <TabPane key='2' tab='产线统计列表'><ProductLineStatis staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url}/> </TabPane>
                        <TabPane key='3' tab='区域统计曲线'><RegionCompare staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url}/> </TabPane>
                        <TabPane key='4' tab='产线统计曲线'><ProductLineCompare staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url}/> </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }

    /**获取路由传递的数据*/
    componentDidMount() {
        let location = this.props.location;
        if(location) {
            let staticPeriod = location.state.staticPeriod ? location.state.staticPeriod : [],
                periodsCode = staticPeriod ? staticPeriod[0]['code'] : undefined;
            this.setState({
                staticPeriod: staticPeriod,
                periodsCode: periodsCode
            });
        }
    }
}
export default ExcipientStatisticalAnalysis
