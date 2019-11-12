import React, { Component } from 'react'
import { Select, Input, DatePicker, Tabs, message } from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import CancleButton from '../../../BlockQuote/cancleButton'
import SaveButton from '../../../BlockQuote/saveButton'
import NewButton from '../../../BlockQuote/newButton'
import AddSearch from './addSearch'
import SingleCrystal from './singleCrystal/singleCrystal'
import MixSalt from './mixSalt/mixSalt'
import AgingProcess from './agingProcess/agingProcess'
import DryProcess from './dryingProcess/dryProcess'
import SyntheticProcess from './syntheticProcess/syntheticProcess'
import Other from './other/other'
import axios from 'axios'
import moment from 'moment'

const { Option } = Select;
const { TabPane } = Tabs;


class CostProcessAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
            startDate: '',
            endDate: '',
            periodCode1: -1,//下拉框选择年月日
            inputPeriod: '',
            tabKey: '1',
            startSecondTime: '',//周期对应的时分秒
            length: -1,
            tagTableData: [],
            staticPeriod:[],
            process:[],
            addData:{},
            statisticId:-1
        }

        this.returnProcess = this.returnProcess.bind(this);
        this.addConfirm = this.addConfirm.bind(this);
        this.reset = this.reset.bind(this);
        this.startChange = this.startChange.bind(this);
        this.endChange = this.endChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.getChange = this.getChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
        this.save = this.save.bind(this);

    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
      }
    componentDidMount() {
        let staticPeriod=this.props.location.staticPeriod
        let process=this.props.location.process
        let length=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]&&this.props.location.staticPeriod[0].length?this.props.location.staticPeriod[0].length:-1
        let periodCode=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]&&this.props.location.staticPeriod[0].code?this.props.location.staticPeriod[0].code:-1
        let startTime=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]&&this.props.location.staticPeriod[0].startTime?this.props.location.staticPeriod[0].startTime:-1
        this.setState({
            staticPeriod:staticPeriod,
            process:process,
            length:length,
            periodCode:periodCode,
            startSecondTime:startTime
        })
        this.getLineNameByPeriod(periodCode?periodCode:null)
    }
    returnProcess() {//点击返回在制品统计界面
        this.props.history.push({ pathname: '/processStatistics' })
    }

    getLineNameByPeriod(periodCode) {//根据周期类型id获取期数
        axios({
            url: `${this.url.precursorGoodIn.getLineNameByPeriod}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                periodId: periodCode
            }
        }).then(data => {
            let res = data.data.data
            if (res) {
                this.setState({
                    inputPeriod: res
                })
            }
        })
    }
    startChange(date, dateString) {
        let { startSecondTime, length } = this.state
        let time = new Date(Date.parse(dateString) + 3600 * 24 * 1000 * length)//将日期转为毫秒
        let endDate = moment(time).format('YYYY-MM-DD')
        this.setState({
            startDate: dateString,
            endDate: endDate,
            startTime: `${dateString} ${startSecondTime}`,
            endTime: `${endDate} ${startSecondTime}`,
        })
    }
    endChange(date, dateString) {
        let { startSecondTime } = this.state
        this.setState({
            endTime: `${dateString} ${startSecondTime}`,
            endDate: dateString
        })
    }
    selectChange(value, name) {
        let time = name.props.name.split('-')[0]
        let length = name.props.name.split('-')[1]
        this.setState({
            periodCode: value,
            length: length,
            startSecondTime: time
        })
        this.getLineNameByPeriod(value)
    }
    inputChange(e) {
        let content = e.target.value;
        this.setState({
            inputPeriod: content
        })
    }
    addConfirm() {//点击确定
        let { startTime, endTime, periodCode, inputPeriod } = this.state
        let param = {//将params的值传给后台
            startTime: startTime,
            endTime: endTime,
            periodId: periodCode,
            lineName: inputPeriod
        }
        axios({
            url: `${this.url.precursorGoodIn.addComfirm}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                ...param
            }
        }).then((data) => {
            console.log(data)
            let res = data.data.data;
            console.log(res)
            if (res === null ||res === undefined) {
                message.info('存在不一致的统计周期，需要进行修改！')
            }
            else {
                this.setState({
                    statisticId:res
                })
                axios({
                    url: `${this.url.precursorGoodIn.afterComfirm}`,
                    method: 'post',
                    headers: {
                        'Authorization': this.url.Authorization
                    }
                }).then((data) => {
                    let tagTable = data.data.data;
                     console.log(tagTable)
                    if (tagTable && tagTable.goodInProcessDTOS) {
                        this.setState({
                            tagTableData: tagTable.goodInProcessDTOS,
                            addData:tagTable
                        })
                    }
                })
            }
        })
    }
    reset() {//重置清空搜索框的值
        this.setState({
            beginTime: '',
            endTime: '',
            periodCode: 1,
            inputPeriod: ''
        })
    }
    tabChange(key) {
        this.setState({
            tabKey: key
        })
    }

    getChange(tabKey,inputData,selectData) {
        if (inputData) {
            console.log(inputData)
            let index=inputData.split('-')[0] //定位到是第几条数据
            let name=inputData.split('-')[1] //输入框内容变化的字段
            let value=inputData.split('-')[2]
            this.state.addData.goodInProcessDTOS[tabKey-1].materialDetails[index-1][name]=value
        }
        if(selectData){
            console.log(selectData)
            let codeSelect=selectData.split('-')[0]//第几个下拉框
            let id=selectData.split('-')[1] //下拉框的哪个option
            this.state.addData.goodInProcessDTOS[tabKey-1].lineProDTOS[codeSelect-1]['product']=id
        }
        if(inputData && selectData){
            console.log(inputData,selectData)
            let index=inputData.split('-')[0] //物料名字的编码
            let name=inputData.split('-')[1] //输入框内容变化的字段
            let value=inputData.split('-')[2]
            this.state.addData.goodInProcessDTOS[tabKey-1].materialDetails[index-1][name]=value
            let codeSelect=selectData.split('-')[0]//第几个下拉框
            let id=selectData.split('-')[1] //下拉框的哪个option
            this.state.addData.goodInProcessDTOS[tabKey-1].lineProDTOS[codeSelect-1]['product']=id
        }
        
    }
    
    save() {
        console.log(this.state.statisticId)
        this.state.addData['periodId']=this.state.periodCode
        this.state.addData['lineName']=this.state.inputPeriod
        console.log(this.state.periodCode,this.state.inputPeriod)
        axios({
            url:`${this.url.precursorGoodIn.saveOrCommit}`,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                statisticId:this.state.statisticId,
                flag:0
            },
            data:{
                goodInTableDTO:this.state.addData
            }
        }).then(data=>{
            console.log(data.data)
        })
    }
    submit() {

    }
    cancel() {

    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'))
        this.dataComponent = [{
            component: <SingleCrystal tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getSingleCrystal={this.getChange} />
        }, {
            component: <MixSalt tagTableData={this.state.tagTableData} url={this.url} getMix={this.getChange} processId={this.state.tabKey}/>
        }, {
            component: <SyntheticProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getSynthesis={this.getChange} />
        }, {
            component: <AgingProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getAge={this.getChange} />
        }, {
            component: <DryProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getDry={this.getChange} />
        }, {
            component: <Other tagTableData={this.state.tagTableData} url={this.url} getOther={this.getChange} />
        }]
        return (
            <div >
                <Blockquote name='新增数据' menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess} />
                <div className='rightDiv-content'>
                    <AddSearch flag={true} staticPeriod={this.state.staticPeriod} periodCode={this.state.periodCode} selectChange={this.selectChange} search={this.addConfirm} startChange={this.startChange} endChange={this.endChange} inputChange={this.inputChange} inputPeriod={this.state.inputPeriod} endDate={this.state.endDate} />
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        {
                            this.props.location.process ? this.props.location.process.map((data, index) => {
                                return (
                                    <TabPane key={data.code} tab={data.processName}>{this.dataComponent[index].component}</TabPane>
                                )
                            }) : null
                        }
                    </Tabs>
                    <span style={{ bottom: '10px', position: 'absolute', left: '15px' }}>
                        <CancleButton handleCancel={this.cancel} />
                    </span>
                    <span style={{ bottom: '0', position: 'absolute', right: '15px' }}>

                        <span >
                            <SaveButton handleSave={this.save} />
                            <NewButton name='提交' handleClick={this.submit} />
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}
export default CostProcessAdd;