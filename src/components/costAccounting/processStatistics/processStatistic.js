import React, { Component } from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import { Spin, Table, Button, Tabs } from 'antd'
import moment from 'moment'
import axios from 'axios'
import NewButton from '../../BlockQuote/newButton'
import Search from './search'
import PendSubmit from './pendSubmit/pendSubmit'
import StatisticDone from './statisticDone/ststisticDone'
import { getSecondsOperations, judgeOperation } from '../../commom/getOperations';

const { TabPane } = Tabs;

class ProcessStatistics extends Component {
    componentDidMount() {
        this.getStaPeriod()
        this.getAllProcess()
        let {menuId}=this.current,operations=getSecondsOperations(menuId)
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
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
            loadingSubmit: false,
            loadingStatis: false
        }
        this.getStaPeriod = this.getStaPeriod.bind(this);
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
            let res = data.data.data, periodCode = '', length = -1,time=''
            if (res && res.length) {
                periodCode = res[0].code
                length = res[0].length
                time=res[0].startTime
            }
            this.setState({
                staticPeriod: res,
                periodCode: periodCode,
                length: length,
                startSecondTime: time,
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
                })
            }
            this.setState({
                loadingSubmit: false
            })
        })
    }
    getStatisticPage(params = {}, periodCode) {//获取已统计表格数据
        if (!periodCode) return
        this.setState({
            loadingStatis:true
        })
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
            if (res && res.list) {
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = (res.page - 1) * res.size + (i + 1)
                }
                this.setState({
                    dataStatistic: res.list,
                    paginationStatis: { current: res.page, total: res.total ? res.total : 0 }
                })
            }
            this.setState({
                loadingStatis: false
            })
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
            endDate: dateString ? endDate : ''
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
        let { staticPeriod ,tabKey} = this.state
        let periodCode=staticPeriod && staticPeriod[0]?staticPeriod[0].code:''
        this.setState({
            startDate: '',
            endDate: '',
            periodCode: staticPeriod && staticPeriod[0] ? staticPeriod[0].code : ''
        })

        if(tabKey==='1'){
            this.getPendSubmit({size:10,page:1}, periodCode)
        }
        else{
            this.getStatisticPage({size:10,page:1}, periodCode)
        }
    }


    handleAdd() {
        let { process, staticPeriod} = this.state
        this.props.history.push({
            pathname: '/costProcessAdd',
            process: process,
            staticPeriod: staticPeriod
        })
    }
    statisticalAnalysis() {
        let {staticPeriod, process } = this.state
        this.props.history.push({
            pathname: '/processStatisticalAnalysis',
            staticPeriod: staticPeriod,
            process: process
        })
    }
    getAllProcess() {//获取新增标签页的所有工序标签
        axios({
            url: `${this.url.precursorProcessType.getByType}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                flag:0
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
        this.current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path ===this. current.path)[0].operations : null;
        this.url = JSON.parse(localStorage.getItem('url'))
        let {staticPeriod,periodCode,startDate,endDate,deleteFlag,updateFlag,loadingSubmit,pagination,dataSubmit,
            startTime,endTime,process,paginationStatis,loadingStatis,dataStatistic}=this.state
        return (
            <div>
                <Blockquote name={this.current.menuName} menu={this.current.menuParent} />
                <div className='rightDiv-content'>
                    <span className={this.state.addFlag?'':'hide'}>
                          <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd} />
                    </span>
                    <Button type='primary' onClick={this.statisticalAnalysis} >统计分析</Button>
                    <Search flag={true} staticPeriod={staticPeriod} periodCode={periodCode} dateStartChange={this.dateStartChange} dateEndChange={this.dateEndChange} 
                    search={this.search} reset={this.reset} selectChange={this.selectChange} startDate={startDate} endDate={endDate} />
                    <div className='clear'></div>
                    <Tabs defaultActiveKey="1" onChange={this.tabsChange}>
                        <TabPane tab='待提交' key='1'>
                            <PendSubmit deleteFlag={deleteFlag} updateFlag={updateFlag} history={this.props.history} getPagination={this.getPagination} 
                            getPendSubmit={this.getPendSubmit} loadingSubmit={loadingSubmit} pagination={pagination} url={this.url} periodCode={periodCode}
                             dataSubmit={dataSubmit} startTime={startTime} endTime={endTime} search={this.search} handleTableChange={this.handleTableChange} 
                             process={process} staticPeriod={staticPeriod} />
                        </TabPane>
                        <TabPane tab='已统计' key='2' >
                            <StatisticDone getStatisticPage={this.getStatisticPage} getPagination={this.getPagination} pagination={paginationStatis} 
                            url={this.url} handleTableChange={this.handleTableChange} periodCode={periodCode} loadingStatis={loadingStatis} 
                            dataStatistic={dataStatistic} startTime={startTime} endTime={endTime} search={this.search} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default ProcessStatistics;
