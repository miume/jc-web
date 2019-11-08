/**
 * author：ym
 * date：2019/10/15
 * */

import React from 'react';
import {Button, Spin, Tabs} from "antd";
import axios from 'axios';
import BlockQuote from "../../BlockQuote/blockquote";
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
            staticPeriod: [],
            periodCode: ''
        };
        this.reset = this.reset.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
        this.getUnSubmittedData = this.getUnSubmittedData.bind(this);
        this.getStatisticsData = this.getStatisticsData.bind(this);
        this.getAllStaticPeriod = this.getAllStaticPeriod.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let {loading,currentStaticPeriod,staticPeriod} = this.state;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={loading} wrapperClassName='rightDiv-content'>
                    <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
                    <Button onClick={this.handleAnalysisClick} type='ant-btn ant-btn-primary'>统计分析</Button>
                    <Search flag={true} currentStaticPeriod={currentStaticPeriod} staticPeriod={staticPeriod}
                            selectChange={this.selectChange} reset={this.reset}/>
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
        this.getAllStaticPeriod();
    }

    /**获取所有统计周期数据*/
    getAllStaticPeriod() {
        axios({
            url:`${this.url.staticPeriod.all}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                let {code,startTime,length} = res[0],
                    currentStaticPeriod = {
                        code: code,
                        startTime: startTime,
                        length: length
                    };
                this.setState({
                    staticPeriod: res,
                    currentStaticPeriod: currentStaticPeriod,
                })
            }
        })
    }

    /**界面加载获取未提交数据*/
    getUnSubmittedData() {

    }

    /**获取已统计数据*/
    getStatisticsData() {

    }

    /**标签页切换*/
    tabChange(key) {
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
        let pathName = record && record.code ? `/addModal/${record.code}` : '/addModal';
        this.props.history.push({
            pathname: pathName,
            state: {
                staticPeriod: this.state.staticPeriod
            }
        })
    }

    /**点击统计分析*/
    handleAnalysisClick() {
        this.props.history.push({
            pathname: '/statisticalAnalysis',
            state: {
                staticPeriod: this.state.staticPeriod
            }
        })
    }

    /**监控统计周期下拉框的变化*/
    selectChange(value,option) {
        let name = option.props.name.split('-'), {currentStaticPeriod} = this.state;
        currentStaticPeriod['code'] = value;
        currentStaticPeriod['startTime'] = name[0];
        currentStaticPeriod['length'] = name[1];
        console.log(currentStaticPeriod)
        this.setState({
            currentStaticPeriod: currentStaticPeriod
        })
    }

    /**搜索重置事件*/
    reset() {
        let {staticPeriod} = this.state;
        let {code,startTime,length} = staticPeriod[0],
            currentStaticPeriod = {
                code: code,
                startTime: startTime,
                length: length
            };
        this.setState({
            currentStaticPeriod: currentStaticPeriod
        })
    }
}

export default RawMaterial;
