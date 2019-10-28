import React from 'react';
import {Tabs} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import LineStatistics from './lineStatistics';
import CycleComparison from "./cycleComparison";
import ProductionLineComparison from "./productionLineComparison";
import BlockQuote from "../../../BlockQuote/blockquote";

const {TabPane} = Tabs;

class StatisticalAnalysis extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote name={'统计分析'} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-content'}>
                    <Tabs defaultActiveKey={'1'}>
                        <TabPane tab={'按产线统计'} key={'1'}>
                            <LineStatistics url={this.url}/>
                        </TabPane>
                        <TabPane tab={'周期对比曲线'} key={'2'}>
                            <CycleComparison url={this.url}/>
                        </TabPane>
                        <TabPane tab={'产线对比曲线'} key={'3'}>
                            <ProductionLineComparison url={this.url}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }

    /**点击统计分析按钮*/
    handleClick() {
        this.setState({
            visible: true
        })
    }

    /**点击返回上一级*/
    handleCancel() {
        this.props.history.push({pathname: '/rawMaterial'})
    }
}

export default StatisticalAnalysis;
