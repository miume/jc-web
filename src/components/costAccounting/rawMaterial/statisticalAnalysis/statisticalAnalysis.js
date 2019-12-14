import React from 'react';
import {Tabs} from "antd";
import axios from 'axios';
import LineStatistics from './lineStatistics';
import CycleComparison from "./cycleComparison";
import ProductionLineComparison from "./productionLineComparison";
import BlockQuote from "../../../BlockQuote/blockquote";
import ProductComparsion from "../../productStorage/statisticalAnalysis/statisticalAnalysis";

const {TabPane} = Tabs;

class StatisticalAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let {staticPeriod,periodsCode,productionLineData} = this.state;
        return (
            <div>
                <BlockQuote name={'统计分析'} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-content'}>
                    <Tabs defaultActiveKey={'1'}>
                        <TabPane tab={'按产线统计'} key={'1'}>
                            <LineStatistics url={this.url} staticPeriod={staticPeriod} periodCode={periodsCode}/>
                        </TabPane>
                        <TabPane tab={'周期对比曲线'} key={'2'}>
                            <CycleComparison url={this.url} staticPeriod={staticPeriod} periodCode={periodsCode} productionLineData={productionLineData}/>
                        </TabPane>
                        <TabPane tab={'产线对比曲线'} key={'3'}>
                            <ProductionLineComparison url={this.url} staticPeriod={staticPeriod} periodCode={periodsCode} productionLineData={productionLineData}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }

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

    /**点击返回上一级*/
    handleCancel() {
        this.props.history.push({pathname: '/rawMaterial'})
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default StatisticalAnalysis;
