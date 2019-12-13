import React,{Component} from 'react'
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import ProductStatistical from './productStatistical/productStatistical'
import CycleComparsion from './cycleComparsion/cycleComparsion'
import ProductComparsion from './productComparsion/productComparsion'
import axios from "axios";
const {TabPane}=Tabs;
class ProcessStatisticalAnalysis extends Component{//在制品统计的统计分析
    constructor(props){
        super(props);
        this.state = {
            staticPeriod: [],
            productionLineData: []
        };
        this.returnProcess=this.returnProcess.bind(this);
        this.precursorProductionLine = this.precursorProductionLine.bind(this);
    }

    render() {
        let {staticPeriod,periodsCode,productionLineData} = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <Blockquote name='统计分析'  menu={this.current.menuParent} menu2='前驱体成本核算管理' returnDataEntry={this.returnProcess}/>
                <div className='rightDiv-content'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane key='1' tab='按产线统计'><ProductStatistical staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url}/></TabPane>
                        <TabPane key='2' tab='周期对比曲线'><CycleComparsion staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url} productionLineData={productionLineData}/></TabPane>
                        <TabPane key='3' tab='产线对比曲线'><ProductComparsion staticPeriod={staticPeriod} periodCode={periodsCode} url={this.url} productionLineData={productionLineData}/></TabPane>
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
        this.precursorProductionLine();
    }

    /**获取前驱体所有工序*/
    precursorProductionLine() {
        axios({
            url: `${this.url.precursorProductionLine.all}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    productionLineData: res
                });
            }
        })
    }

    returnProcess(){//点击返回在制品统计界面
        this.props.history.push({pathname:'/productStorage'})
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default ProcessStatisticalAnalysis
