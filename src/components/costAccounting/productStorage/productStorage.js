import React from 'react';
import {Button, Spin, Tabs} from "antd";
import BlockQuote from "../../BlockQuote/blockquote";
import NewButton from "../../BlockQuote/newButton";
import Submitted from './submit/submit';
import Statistics from './statistics/statistics';
import Search from "../rawMaterial/search";
import axios from "axios";
import moment from "moment";
import {getSecondsOperations, judgeOperation} from "../../commom/getOperations";

const {TabPane} = Tabs;
// const data = [{
//     code: 1,
//     index: 1,
//     periodName: '周',
//     lineName: 2,
//     start: '2019-10-01',
//     end: '2019-10-01',
//     name:"前驱体",
//     productType:"5503",
//     weight:"360",
//     Ni:"7.5",
//     Co:"7.1",
//     Mn:"7.6"
// }]

class ProductStorage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            flag: false, //用来表示当前所在tab页
            staticPeriod: [],
            periodCode: '',
            submittedData: [],
            unSubmittedData: [],
            startTime: '',
            endTime: '',
            currentStaticPeriod: {}
        };
        this.pagination = {
            pageSize: 10,
            current: 1
        };  //记录待提交的pagination
        this.pagination1 = {
            pageSize: 10,
            current: 1
        }; //记录已统计的pagination
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.endDateChange =this.endDateChange.bind(this);
        this.startDateChange =this.startDateChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getAllStaticPeriod = this.getAllStaticPeriod.bind(this);
        this.getUnSubmittedData = this.getUnSubmittedData.bind(this);
        this.statisticalAnalysis = this.statisticalAnalysis.bind(this);
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let {loading,currentStaticPeriod,staticPeriod,unSubmittedData,submittedData,startTime,endTime,addFlag,deleteFlag,updateFlag} = this.state;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={loading} wrapperClassName='rightDiv-content'>
                    <span className={addFlag ? '' : 'hide'}>
                        <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
                    </span>
                    <Button type='primary' onClick={this.statisticalAnalysis}>统计分析</Button>
                    <Search flag={true} currentStaticPeriod={currentStaticPeriod} staticPeriod={staticPeriod} startTime={startTime} endTime={endTime}
                            selectChange={this.selectChange} reset={this.reset} getTableData = {this.getUnSubmittedData} endDateChange={this.endDateChange}
                            startDateChange={this.startDateChange} search={this.search} reset={this.reset}/>
                    <div className='clear' ></div>
                    <Tabs defaultActiveKey={'1'} onChange={this.tabChange}>
                        <TabPane tab={'待提交'} key={'1'}>
                            <Submitted data={unSubmittedData} handleClick={this.handleClick} url={this.url} getUnSubmittedData={this.getUnSubmittedData}
                                       deleteFlag={deleteFlag} updateFlag={updateFlag}/>
                        </TabPane>
                        <TabPane tab={'已统计'} key={'2'}>
                            <Statistics data={submittedData} url={this.url} getUnSubmittedData={this.getUnSubmittedData}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        this.getAllStaticPeriod();
        let {menuId} = this.current, operations = getSecondsOperations(menuId);
        this.setState({
            addFlag: judgeOperation(operations,'SAVE'),
            updateFlag: judgeOperation(operations,'UPDATE'),
            deleteFlag: judgeOperation(operations,'DELETE')
        })
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
                    },periodCode = currentStaticPeriod ? currentStaticPeriod.code : '';
                this.setState({
                    staticPeriod: res,
                    currentStaticPeriod: currentStaticPeriod,
                });
                if(periodCode) {
                    this.getUnSubmittedData(false,{
                        periodCode: periodCode
                    });
                }
            }
        })
    }

    /**界面加载获取未提交数据*/
    getUnSubmittedData(flag,data = {},pagination) {
        flag = flag === undefined ? this.state.flag : flag;
        if(flag && pagination) {
            this.pagination1 = pagination;
        }
        if(!flag && pagination) {
            this.pagination = pagination
        }
        let {currentStaticPeriod,startTime,endTime} = this.state,
            temp = (flag ? this.pagination1 : this.pagination),
            {pageSize, current} = temp,
            periodCode = currentStaticPeriod ? currentStaticPeriod.code : '',
            time = currentStaticPeriod ? currentStaticPeriod.startTime : '00:00:00',
            params = {
                size: pageSize,
                page: current,
                flag: flag
            };
        data['startTime'] = data['startTime'] === '' ? '' : (startTime ? startTime + ' ' + time : '');
        data['endTime'] = data['endTime'] === '' ? '' : (endTime ? endTime + ' ' + time : '');
        data['periodCode'] = data['periodCode'] ? data['periodCode'] : periodCode;
        this.unSubmittedData(params,data);
    }

    /**获取待提交数据*/
    unSubmittedData(params,da) {
        this.setState({
            loading: true
        });
        let url = params['flag'] ? `${this.url.productStorage.getPageCommit}` : `${this.url.productStorage.getPageUnCommit}`;
        axios({
            url: `${url}?page=${params.page}&size=${params.size}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: da
        }).then((data) => {
            let res = data.data.data;
            if(res && res.list) {
                res['list']['total'] = res.total;
                for(let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = (res.page - 1) * 10 + i + 1;
                }
                if(params['flag']) {  //已统计数据
                    this.setState({
                        submittedData: res.list
                    })
                } else {   //待提交数据
                    this.setState({
                        unSubmittedData: res.list
                    })
                }
            }
            this.setState({
                loading: false
            })
        })
    }

    /**标签页切换*/
    tabChange(key) {
        let flag = false;
        if(key === '2') {
            flag = true;
        }
        this.setState({
            flag: flag
        });
        this.getUnSubmittedData(flag);
    }

    statisticalAnalysis() {
        this.props.history.push({
            pathname:'/storageStatistical',
            state: {
                staticPeriod: this.state.staticPeriod
            }
        })
    }

    /**点击新增按钮
     * record用来区分编辑和新增
     * */
    handleClick(code) {
        let pathName = typeof code === 'number' ? `/productAddModal/${code}` : '/productAddModal';
        this.props.history.push({
            pathname: pathName,
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
            endTime: dateString ? moment(end).format('YYYY-MM-DD') : ''
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
        this.getUnSubmittedData('',{
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
            periodCode: code
        });
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProductStorage
