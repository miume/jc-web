import React, { Component } from 'react'
import { Select, Input, DatePicker, Tabs, message,Spin } from 'antd'
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
const otherData=[{
    id:1,
    alkPotency: 0,
    alkValue: 0,
    alkaliFlag: 0,
    ammPotency: 0,
    ammValue: 0,
    ammoniaFlag: 0,
    co: 1,
    coPotency: 0,
    code: 0,
    dataType: 1,
    index: 1,
    materialName: '',
    mn: 1,
    mnPotency: 0,
    monPotency: 0,
    ni: 1,
    niPotency: 0,
    processCode: 6,
    solidContent: 0,
    types: 0,
    valueType: 0,
    volume: 0,
    weiOrVol: 0,
    weight: 0
}]
class CostProcessAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            startTime: '',
            endTime: '',
            startDate: '',
            endDate: '',
            periodCode: '',//下拉框选择周期id
            inputPeriod: '',
            period:'',
            lineName:'',
            tabKey: '1',
            startSecondTime: '',//周期对应的时分秒
            length: '',
            tagTableData: [],
            staticPeriod: [],
            process: [],
            addData: {},
            statisticId: '',
            flagConfirm: false,
            otherFlag:true,//判断other页的新增有没有被点击，如果被点击了，表格的输入，下拉框内容必须填上
            otherData:otherData
        }
        this.returnProcess = this.returnProcess.bind(this);
        this.addConfirm = this.addConfirm.bind(this);
        this.startChange = this.startChange.bind(this);
        this.endChange = this.endChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.getChange = this.getChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
        this.save = this.save.bind(this);
        this.handleOtherAdd=this.handleOtherAdd.bind(this);
        this.otherSelectChange=this.otherSelectChange.bind(this);
        this.editData=this.editData.bind(this);
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }
    componentDidMount() {
        if(this.props.location.editFlag){
            this.editData()
        }
       else{
        let { location } = this.props
        let staticPeriod = location.staticPeriod
        let process = location.process
        let periodCode = staticPeriod && staticPeriod[0] ? staticPeriod[0].code : ''
        let length = staticPeriod && staticPeriod[0] ? staticPeriod[0].length : ''
        let startTime = staticPeriod && staticPeriod[0] ? staticPeriod[0].startTime : ''
        this.setState({
            staticPeriod: staticPeriod,
            process: process,
            length: length,
            periodCode: periodCode,
            startSecondTime: startTime
        })
        this.getLineNameByPeriod(periodCode ? periodCode : null)
       }

    }
    returnProcess() {//点击返回在制品统计界面
        this.props.history.push({ pathname: '/processStatistics' })
    }
    editData(){//获取编辑数据
        this.setState({
            loading:true
        })
        axios({
            url:`${this.url.precursorGoodIn.commitDetail}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                stasticId:this.props.location.code
            }
        }).then((data)=>{
            let tagTable = data.data.data;
            console.log(data)
           console.log(tagTable)
            if(tagTable){
                if (tagTable && tagTable.goodInProcessDTOS) {
                    this.setState({
                        tagTableData: tagTable.goodInProcessDTOS,
                        addData: tagTable,
                        editDataOrigin:[]
                    })
                }
                this.setState({
                    startTime:tagTable.startTime,
                    endTime:tagTable.endTime,
                    period:tagTable.period,
                    inputPeriod:tagTable.lineName,
                    endDate:tagTable.endTime.split(' ')[0],
                    startDate:tagTable.startTime.split(' ')[0],
                    loading:false
                })
            }
        })
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
                    inputPeriod: res,
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
        name = name.props.name.split('-')
        let time = name[0],
            length = name[1]
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
        this.setState({
            loading:true
        })
        let { startTime, endTime, periodCode, inputPeriod } = this.state
        if(!startTime|| !endTime|| !periodCode|| !inputPeriod){
            message.info('信息不完整!') //在点确定的时候做下判断，必须4个都填了，才能点击确定
            return
        }
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
            let res = data.data.data;
            if (res === null || res === undefined) {
                message.info('存在不一致的统计周期，需要进行修改！')
            }
            else {
                this.setState({
                    statisticId: res
                })
                if (startTime && endTime && periodCode && inputPeriod) {//点击确定后不可再修改
                    this.setState({
                        flagConfirm:true
                    })
                }
                axios({
                    url: `${this.url.precursorGoodIn.afterComfirm}`,
                    method: 'post',
                    headers: {
                        'Authorization': this.url.Authorization
                    }
                }).then((data) => {
                    let tagTable = data.data.data;
                    if (tagTable && tagTable.goodInProcessDTOS) {
                        this.setState({
                            tagTableData: tagTable.goodInProcessDTOS,
                            addData: tagTable,
                            loading:false
                            //addDataOrigin: JSON.parse(JSON.stringify(tagTable.goodInProcessDTOS)) 深拷贝值
                        })
                    }
                })
            }
        })
    }

    tabChange(key) {
        this.setState({
            tabKey: key
        })
    }
    handleOtherAdd(data){//其他标签页的新增放到父组件来处理 
        this.setState({
            otherFlag:true,
            otherData:data
        })
    }
 
    getChange(tabKey, inputData, selectData) {  //获取到下拉框，输入框填的值
        let {addData,otherData,otherFlag}=this.state
        if (inputData) {
            inputData = inputData.split('-');
            let index = inputData[0],    //定位到是第几条数据
                name = inputData[1],     //输入框内容变化的字段
                value = inputData[2];
            if(otherFlag){
                otherData[index - 1][name]=value
                addData.goodInProcessDTOS[tabKey - 1].materialDetails=otherData
            }
            else{
                addData.goodInProcessDTOS[tabKey - 1].materialDetails[index - 1][name] = value
            }
        }
        if (selectData) {
            selectData= selectData.split('-')
            let codeSelect = selectData[0],    //第几个下拉框
                        id = selectData[1]     //下拉框的哪个option
           addData.goodInProcessDTOS[tabKey - 1].lineProDTOS[codeSelect-1]['product'] = id
        }
        if (inputData && selectData) {
            inputData=inputData.split('-')
            let index = inputData[0],    //物料名字的编码
                 name = inputData[1] ,   //输入框内容变化的字段
                value = inputData[2]
            addData.goodInProcessDTOS[tabKey - 1].materialDetails[index - 1][name] = value
            selectData=selectData.split('-')
            let codeSelect = selectData[0],  //第几个下拉框
                        id = selectData[1]    //下拉框的哪个option
            addData.goodInProcessDTOS[tabKey - 1].lineProDTOS[codeSelect-1]['product'] = id
        }
        this.setState({
            addData:addData
        })

    }
    otherSelectChange(tabKey,name,value){
     //name是下拉框对应的第几条记录,value对应的是选的option的value即code
        let {otherData}=this.state
        let codeRecord=name.props.name
        let materialName=name.props.children
        otherData[codeRecord-1]['materialName']=materialName
        otherData[codeRecord-1]['code']=value
        this.setState({
           otherData:otherData
        })
    }

    save(f) {
        this.setState({
            loading:true
        })
        let flag=(f===1?1:0)
        this.state.addData['periodId'] = this.state.periodCode
        this.state.addData['lineName'] = this.state.inputPeriod
        axios({
            url: `${this.url.precursorGoodIn.saveOrCommit}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                statisticId: this.props.location.editFlag?this.props.location.code:this.state.statisticId,
                flag: flag
            },
            data: this.state.addData

        }).then(data => {
            message.info(data.data.data)
            if(data.data.code===0){
                this.setState({
                    loading:false
                })
                this.props.history.push({pathname:'/processStatistics'})
            }

        }).catch(()=>{
            message.info('新增失败!')
        })

    }
    submit() {//提交需要所有空缺都填完整
        let {addData,otherFlag,otherData}=this.state
        let data=addData.goodInProcessDTOS
        for(let i=0;i<data.length;i++){//第一层是遍历哪个tag
                if(i===0){//单晶体
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['monPotency']){
                            message.info('单晶体配置信息填写不完整!')
                            return
                        }
                    }
                }
                if(i==1||i==2){
                    for(let j=0;j<data[i].lineProDTOS.length;j++){
                        if(!data[i].lineProDTOS[j]['product']){
                            message.info('单晶体配置信息填写不完整!')
                            return
                        }
                    }
                }
                else if(i===3){//陈化
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['mnPotency']||!data[i].materialDetails[j]['coPotency']||!data[i].materialDetails[j]['niPotency']){
                            message.info('陈化工序信息填写不完整!')
                            return
                        }
                    }
                    for(let j=0;j<data[i].lineProDTOS.length;j++){
                        if(!data[i].lineProDTOS[j]['product']){
                            message.info('陈化工序信息填写不完整!')
                            return
                        }
                    }
                }
                else if(i===4){//烘干
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['weight']||!data[i].materialDetails[j]['mnPotency']||!data[i].materialDetails[j]['coPotency']||!data[i].materialDetails[j]['niPotency']){
                            message.info('烘干工序信息填写不完整!')
                            return
                        }
                    }
                    for(let j=0;j<data[i].lineProDTOS.length;j++){
                        if(!data[i].lineProDTOS[j]['product']){
                            message.info('烘干工序信息填写不完整!')
                            return
                        }
                    }                 
                }
                else if(i===5&&otherFlag){
                    for(let j=0;j<otherData.length;j++){
                        if(!otherData[j]['materialName']||!otherData[j]['weight']||!otherData[j]['mnPotency']||!otherData[j]['coPotency']||!otherData[j]['niPotency']){
                            message.info('其他信息填写不完整!')
                            return
                        }
                    }
                }
            }
       this.save(1)
    }
    cancel() {
       this.props.history.push('/processStatistics')
    }
    render() {
       // console.log(this.state.addDataOrigin)
        this.url = JSON.parse(localStorage.getItem('url'))
        this.dataComponent = [{
            component: <SingleCrystal tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getSingleCrystal={this.getChange} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <MixSalt tagTableData={this.state.tagTableData} url={this.url} getMix={this.getChange} processId={this.state.tabKey} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <SyntheticProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getSynthesis={this.getChange} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <AgingProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getAge={this.getChange} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <DryProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getDry={this.getChange} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <Other tagTableData={this.state.tagTableData} url={this.url} getOther={this.getChange} otherSelectChange={this.otherSelectChange} processId={this.state.tabKey} handleOtherAdd={this.handleOtherAdd}  flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }]
        return (
            <div >
                <Blockquote name={this.props.location.editFlag ? '编辑数据' : '新增数据'} menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess} />
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddSearch flag={true} editFlag={this.props.location.editFlag} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm} staticPeriod={this.state.staticPeriod} periodCode={this.state.periodCode} period={this.state.period} selectChange={this.selectChange} search={this.addConfirm} startChange={this.startChange} endChange={this.endChange} inputChange={this.inputChange} inputPeriod={this.state.inputPeriod} endDate={this.state.endDate} startDate={this.state.startDate}/>
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        {
                            this.props.location.process ? this.props.location.process.map((data, index) => {
                                return (
                                    <TabPane key={data.code} tab={data.processName}>{this.dataComponent[index]&&this.dataComponent[index].component?this.dataComponent[index].component:''}</TabPane>
                                )
                            }) : null
                        }
                    </Tabs>
                </Spin>
                <div>
                        <span style={{ bottom: '10px', position: 'absolute', left: '15px' }}>
                            <CancleButton handleCancel={this.cancel} />
                        </span>
                        <span style={{ bottom: '0', position: 'absolute', right: '15px' }}>
                            <span >
                                <SaveButton handleSave={this.save} flagConfirm={this.props.location.editFlag?false:!this.state.flagConfirm}/>
                                <NewButton name='提交' handleClick={this.submit} flagConfirm={this.props.location.editFlag?false:!this.state.flagConfirm}/>
                            </span>
                        </span>
                </div>
            </div>
        )
    }
}
export default CostProcessAdd;
