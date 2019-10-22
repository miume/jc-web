/**
 * author：ym
 * date：2019/10/15
 * */

import React from 'react';
import {Button, Spin, Tabs} from "antd";
import AddModal from './addModal/addModal';
import BlockQuote from "../../BlockQuote/blockquote";
import home from "../../commom/fns";
import StatisticalAnalysis from "./statisticalAnalysis/statisticalAnalysis";
import Search from "./search";
import './rawMaterial.css';
import UnSubmitted from './unsubmitted/unsubmitted';
import Statistics from './statistics/statistics';
import NewButton from "../../BlockQuote/newButton";

const {TabPane} = Tabs;
const data = [{
    code: 1,
    index: 1,
    periodName: '周',
    dataType: '补料',
    density:1,
    lineName: 2,
    start: '2019-10-01',
    end: '2019-10-01',
    materialName: '混合盐',
    weight: 20,
    NiConcentration: 1,
    CoConcentration: 1,
    MnConcentration: 1
}];
class RawMaterial extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            flag: 1, //用来表示当前所在tab页
        };
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
        this.getUnSubmittedData = this.getUnSubmittedData.bind(this);
        this.getStatisticsData = this.getStatisticsData.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
                    <Button onClick={this.handleAnalysisClick} type='ant-btn ant-btn-primary'>统计分析</Button>
                    <Search flag={true}/>
                    <div className='clear' ></div>
                    <Tabs defaultActiveKey={'1'} onChange={this.tabChange}>
                        <TabPane tab={'待提交'} key={'1'}>
                            <UnSubmitted data={data} handleClick={this.handleClick}/>
                        </TabPane>
                        <TabPane tab={'已统计'} key={'2'}>
                            <Statistics data={data}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
            )
    }

    componentDidMount() {
        this.getUnSubmittedData();
    }

    /**界面加载获取未提交数据*/
    getUnSubmittedData() {

    }

    /**获取已统计数据*/
    getStatisticsData() {

    }

    /**标签页切换*/
    tabChange(key) {
        console.log('标签页切换为：',key)
        this.setState({
            flag: key
        });
        if(key === '1') {
            this.getUnSubmittedData();
        } else {
            this.getStatisticsData();
        }
    }

    /**点击新增按钮
     * record用来区分编辑和新增
     * */
    handleClick(record = {}) {
        let pathName = record && record.code ? `/addModal/${record.code}` : '/addModal'
        this.props.history.push({pathname: pathName})
    }

    /**点击统计分析*/
    handleAnalysisClick() {
        this.props.history.push({pathname: '/statisticalAnalysis'})
    }


}

export default RawMaterial;
