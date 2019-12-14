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
import moment from "moment";

const {TabPane} = Tabs;
// const data = [{
//     code: 1,
//     index: 1,
//     periodName: '周',
//     dataType: '补料',
//     density:1,
//     lineName: 2,
//     start: '2019-10-01',
//     end: '2019-10-01',
//     materialName: '混合盐',
//     weight: 20,
//     NiConcentration: 1,
//     CoConcentration: 1,
//     MnConcentration: 1
// }];
class RawMaterial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            key: 0, //用来表示当前所在tab页
            staticPeriod: [],
            periodCode: '',
            data: [],
            startTime: '',
            endTime: '',
            committedData: []
        };
        this.pagination = {};
        this.pagination1 = {};
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.endDateChange =this.endDateChange.bind(this);
        this.startDateChange =this.startDateChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
        this.getUnSubmittedData = this.getUnSubmittedData.bind(this);
        this.getStatisticsData = this.getStatisticsData.bind(this);
        this.getAllStaticPeriod = this.getAllStaticPeriod.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleUnSubmittedTableChange = this.handleUnSubmittedTableChange.bind(this);
        this.unSubmittedData = this.unSubmittedData.bind(this);
        this.handleSubmittedTableChange = this.handleSubmittedTableChange.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let {loading,currentStaticPeriod,staticPeriod,data,startTime,endTime,committedData} = this.state;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={loading} wrapperClassName='rightDiv-content'>
                    <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
                    <Button onClick={this.handleAnalysisClick} type='ant-btn ant-btn-primary'>统计分析</Button>
                    <Search flag={true} currentStaticPeriod={currentStaticPeriod} staticPeriod={staticPeriod} startTime={startTime} endTime={endTime}
                            selectChange={this.selectChange} reset={this.reset} getTableData = {this.getUnSubmittedData} endDateChange={this.endDateChange}
                            startDateChange={this.startDateChange} search={this.search}/>
                    <div className='clear' ></div>
                    <Tabs defaultActiveKey={'0'} onChange={this.tabChange}>
                        <TabPane tab={'待提交'} key={'0'}>
                            <UnSubmitted data={data} handleClick={this.handleClick}
                                         handleTableChange={this.handleUnSubmittedTableChange} url={this.url}/>
                        </TabPane>
                        <TabPane tab={'已统计'} key={'1'}>
                            <Statistics data={committedData} url={this.url} handleTableChange={this.handleSubmittedTableChange}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
            )
    }

    componentDidMount() {
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
                });
                this.getUnSubmittedData(0,{
                    periodCode: currentStaticPeriod ? currentStaticPeriod.code : '',
                });
            }
        })
    }

    /**界面加载获取未提交数据*/
    getUnSubmittedData(flag,params = {}) {
        this.setState({
            loading: true
        });
        let {currentStaticPeriod,startTime,endTime,type} = this.state,
            periodCode = currentStaticPeriod ? currentStaticPeriod.code : '',
            time = currentStaticPeriod ? currentStaticPeriod.startTime : '00:00:00';
        flag = flag === undefined ? type : flag;
        params['startTime'] = params['startTime'] === '' ? '' : (startTime ? startTime + ' ' + time : '');
        params['endTime'] = params['endTime'] === '' ? '' : (endTime ? endTime + ' ' + time : '');
        params['periodCode'] = params['periodCode'] ? params['periodCode'] : periodCode;
        if(flag) {
            let {pageSize, current} = this.pagination1;
            params['size'] = pageSize ? pageSize : 10;
            params['page'] = current ? current : 1;
            this.getStatisticsData(params);
        } else {
            let {pageSize, current} = this.pagination;
            params['size'] = pageSize ? pageSize : 10;
            params['page'] = current ? current : 1;
            this.unSubmittedData(params);
        }
    }

    /**获取待提交数据*/
    unSubmittedData(params) {
        axios({
            url: `${this.url.rawMaterial.getUncommittedData}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            let res = data.data.data;
            if(res && res.list) {
                for(let i = 0; i < res.list.length; i++) {
                    res['list'][i]['index'] = (res.page-1) * 10 + i + 1;
                }
                res.list.total = res['total'];
                this.setState({
                    data: res.list
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    handleUnSubmittedTableChange(pagination) {
        this.pagination = pagination;
        this.getUnSubmittedData(0);
    }

    handleSubmittedTableChange(pagination) {
        this.pagination1 = pagination;
        this.getUnSubmittedData(1);
    }

    /**获取已统计数据*/
    getStatisticsData(params) {
        axios({
            url: `${this.url.rawMaterial.getCommittedData}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            let res = data.data.data;
            if(res) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] = (res.page-1) * 10 + i + 1;
                }
                res.list.total = res['total'];
                this.setState({
                    committedData: res
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    /**标签页切换*/
    tabChange(key) {
        this.setState({
            type: parseInt(key)
        });

        this.getUnSubmittedData(parseInt(key));
    }

    /**点击新增按钮
     * record用来区分编辑和新增
     * */
    handleClick(code) {
        let pathName = typeof code === 'number' ? `/addModal/${code}` : '/addModal';
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

    /**date时间范围变化监控*/
    startDateChange(date, dateString) {
        //根据this.props.length来确定end的默认值
        let length = this.state.currentStaticPeriod ? this.state.currentStaticPeriod.length : 0,
            end = new Date(dateString).getTime() + length * 24 * 3600 * 1000;
        this.setState({
            startTime: dateString,
            endTime: moment(end).format('YYYY-MM-DD')
        })
    }

    endDateChange(date, dateString) {
        this.setState({
            endTime: dateString
        })
    }

    /**搜索时间*/
    search() {
        this.getUnSubmittedData();
    }

    /**监控统计周期下拉框的变化*/
    selectChange(value,option) {
        let name = option.props.name.split('-'), {currentStaticPeriod} = this.state;
        currentStaticPeriod['code'] = value;
        currentStaticPeriod['startTime'] = name[0];
        currentStaticPeriod['length'] = name[1];
        this.setState({
            currentStaticPeriod: currentStaticPeriod
        });
        this.getUnSubmittedData({
            periodCode: currentStaticPeriod ? currentStaticPeriod.code : '',
        });
    }

    /**搜索重置事件*/
    reset() {
        let {staticPeriod} = this.state;
        let {code,startTime,length} = staticPeriod.length ? staticPeriod[0] : {},
            currentStaticPeriod = {
                code: code,
                startTime: startTime,
                length: length
            };
        this.setState({
            startTime: '',
            endTime: '',
            currentStaticPeriod: currentStaticPeriod
        });
        this.getUnSubmittedData(undefined,{
            startTime: '',
            endTime: '',
        });
    }

    /**销毁组件*/
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default RawMaterial;
