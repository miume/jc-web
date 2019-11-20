import React, { Component } from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import { Spin, Table, Button, Tabs } from 'antd'
import moment from 'moment'
import axios from 'axios'
import NewButton from '../../BlockQuote/newButton'
import Search from './search'
import PendSubmit from './pendSubmit/pendSubmit'
import StatisticDone from './statisticDone/ststisticDone'

const { TabPane } = Tabs;

class ProcessStatistics extends Component {
    componentDidMount() {
        this.getStaPeriod()
        this.getAllProcess()
    }
    constructor(props) {
        super(props);
        this.state = {
            staticPeriod: [],
            periodCode: '',
            dataSubmit: [],
            dataStatistic: [],
            startTime: '',
            endTime: '',
            startDate: '',
            endDate: '',
            tabKey: '1',
            startSecondTime: '',//時分秒
            length: -1,//根据选择的开始日期用长度计算结束日期
            time: '',
            process: [],
            pagination: {},
            paginationStatis: {},
            loadingSubmit: true,
            loadingStatis: true
        }
        this.getStaPeriod = this.getStaPeriod.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.statisticalAnalysis = this.statisticalAnalysis.bind(this);
        this.getPendSubmit = this.getPendSubmit.bind(this);
        this.getStatisticPage = this.getStatisticPage.bind(this);
        this.tabsChange = this.tabsChange.bind(this);
        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.dateStartChange = this.dateStartChange.bind(this);
        this.dateEndChange = this.dateEndChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.getAllProcess = this.getAllProcess.bind(this);
        this.getPagination = this.getPagination.bind(this);
    }

    getStaPeriod() {//获取统计周期
        axios({
            url: `${this.url.staticPeriod.all}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data, periodCode = '', length = -1
            if (res && res.length) {
                periodCode = res[0].code
                length = res[0].length
            }
            this.setState({
                staticPeriod: res,
                periodCode: periodCode,
                length: length,
                startSecondTime: res[0].startTime,
            })
            this.getPendSubmit({}, periodCode)

        })

    }
    getPagination(tabKey, pagination) {
        if (tabKey === '1') {
            this.setState({
                pagination: pagination
            })
        }
        else {
            this.setState({
                paginationStatis: pagination
            })
        }

    }
    getPendSubmit(params = {}, periodCode) {//获取待提交表格数据
        if (!periodCode) return
        this.setState({
            loadingSubmit: true
        })
        axios({
            url: `${this.url.precursorGoodIn.getPendSubmit}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                ...params,
                periodId: periodCode
            }
        }).then((data) => {
            let res = data.data.data, temp = [];
            if (res && res.list) {
                for (let i = 0; i < res.list.length; i++) {
                    let goodsInProcessStatisticHead = res.list[i].goodsInProcessStatisticHead//goodsInProcessStatisticHead是一个对象
                    goodsInProcessStatisticHead['index'] = (res.page - 1) * res.size + (i + 1)
                    goodsInProcessStatisticHead['period'] = res.list[i].period
                    temp.push(goodsInProcessStatisticHead)//temp是一个对象数组
                }
                this.setState({
                    dataSubmit: temp,
                    pagination: { current: res.page ? res.page : 0, total: res.total ? res.total : 0 },
                    loadingSubmit: false
                })
            }
        })
    }
    getStatisticPage(params = {}, periodCode) {//获取已统计表格数据
        if (!periodCode) return
        axios({
            url: `${this.url.precursorGoodIn.getStatisticPage}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                ...params,
                periodId: periodCode
            }
        }).then((data) => {
            let res = data.data.data;
            //console.log(res)
            if (res && res.list) {
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = (res.page - 1) * res.size + (i + 1)
                }
                this.setState({
                    dataStatistic: res.list,
                    loadingStatis: false,
                    paginationStatis: { current: res.page, total: res.total ? res.total : 0 }
                })
            }
        })
    }
    tabsChange(key) {//标签页变化调用
        this.setState({
            tabKey: key
        })
        if (key === '1') {
            this.getPendSubmit({}, this.state.periodCode)

        }
        if (key === '2') {
            this.getStatisticPage({}, this.state.periodCode)
        }
    }
    selectChange(value, name) {
        let startSecondTime = name.props['name'].split('-')[0]
        let length = name.props['name'].split('-')[1]
        this.setState({
            periodCode: value,
            startSecondTime: startSecondTime,
            length: length
        })
    }
    dateStartChange(date, dateString) {
        let { length, startSecondTime } = this.state
        //将给定日期转为毫秒，再与间隔天数（转为毫秒）相加
        let time = new Date(Date.parse(dateString) + 3600000 * 24 * length)
        let endDate = moment(time).format('YYYY-MM-DD')
        this.setState({
            startDate: dateString,
            startTime: `${dateString} ${startSecondTime}`,
            endTime: `${endDate} ${startSecondTime}`,
            endDate: endDate
        })

    }
    dateEndChange(date, dateString) {
        let { startSecondTime } = this.state
        this.setState({
            endDate: dateString,
            endTime: `${dateString} ${startSecondTime}`
        })
    }
    search() {
        let { tabKey, startTime, endTime, periodCode } = this.state
        let params = {
            startTime: startTime,
            endTime: endTime
        }
        if (tabKey === '1') {
            this.getPendSubmit(params, periodCode)
        }
        else {
            this.getStatisticPage(params, periodCode)
        }
    }

    handleTableChange(params = {}) {//如果没有传参数，按钮监听onCLick事件的参数e,传了参数，会显示参数
        let { tabKey, startTime, endTime, periodCode } = this.state
        if (tabKey === '1') {
            this.getPendSubmit({
                ...params,
                startTime: startTime,
                endTime: endTime
            }, periodCode)
        }
        else {
            this.getStatisticPage({
                ...params,
                startTime: startTime,
                endTime: endTime
            }, periodCode)
        }

    }
    reset() {//重置清空搜索框的值,调用获取表格数据接口
        let { staticPeriod } = this.state
        let periodCode=staticPeriod && staticPeriod[0]?staticPeriod[0].code:''
        this.setState({
            startDate: '',
            endDate: '',
            periodCode: staticPeriod && staticPeriod[0] ? staticPeriod[0].code : ''
        })
        this.getPendSubmit({size:10,page:1}, periodCode)
    }

    judgeOperation(operation, operationCode) {
        var flag = operation ? operation.filter(e => e.operationCode === operationCode) : []
        return flag.length ? true : false
    }
    handleAdd() {
        let { process, staticPeriod, periodCode, startSecondTime, length } = this.state
        this.props.history.push({
            pathname: '/costProcessAdd',
            process: process,
            staticPeriod: staticPeriod
        })
    }
    statisticalAnalysis() {
        let { periodCode, startSecondTime, staticPeriod, process, length } = this.state
        this.props.history.push({
            pathname: '/processStatisticalAnalysis',
            staticPeriod: staticPeriod,
            process: process
        })
    }
    getAllProcess() {//获取新增标签页的所有工序标签
        axios({
            url: `${this.url.precursorProcessType.all}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if (res) {
                this.setState({
                    process: res
                })
            }
        })
    }
    render() {
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        this.url = JSON.parse(localStorage.getItem('url'))
        return (
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent} />
                <div className='rightDiv-content'>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd} />
                    <Button type='primary' onClick={this.statisticalAnalysis} >统计分析</Button>
                    <Search flag={this.judgeOperation(this.operation, 'QUERY')} staticPeriod={this.state.staticPeriod} periodCode={this.state.periodCode} dateStartChange={this.dateStartChange} dateEndChange={this.dateEndChange} search={this.search} reset={this.reset} selectChange={this.selectChange} startDate={this.state.startDate} endDate={this.state.endDate} />
                    <div className='clear'></div>
                    <Tabs defaultActiveKey="1" onChange={this.tabsChange}>
                        <TabPane tab='待提交' key='1'>
                            <PendSubmit history={this.props.history} getPagination={this.getPagination} getPendSubmit={this.getPendSubmit} loadingSubmit={this.state.loadingSubmit} pagination={this.state.pagination} url={this.url} periodCode={this.state.periodCode} dataSubmit={this.state.dataSubmit} startTime={this.state.startTime} endTime={this.state.endTime} search={this.search} handleTableChange={this.handleTableChange} process={this.state.process} staticPeriod={this.state.staticPeriod} />
                        </TabPane>
                        <TabPane tab='已统计' key='2' >
                            <StatisticDone getStatisticPage={this.getStatisticPage} getPagination={this.getPagination} pagination={this.state.paginationStatis} url={this.url} handleTableChange={this.handleTableChange} periodCode={this.state.periodCode} loadingStatis={this.state.loadingStatis} dataStatistic={this.state.dataStatistic} startTime={this.state.startTime} endTime={this.state.endTime} search={this.search} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default ProcessStatistics;