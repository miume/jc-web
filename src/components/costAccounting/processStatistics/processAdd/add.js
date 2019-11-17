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


class CostProcessAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
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
            otherFlag:false,//判断other页的新增有没有被点击，如果被点击了，表格的输入，下拉框内容必须填上
            
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
        this.handleOtherAdd=this.handleOtherAdd.bind(this);
        this.otherSelectChange=this.otherSelectChange.bind(this);
        this.editData=this.editData.bind(this);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
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
    editData(){
        axios({
            url:`${this.url.precursorGoodIn.commitDetail}`,
            //url:'http://192.168.1.102:8082/goodIn/commitDetail',
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                stasticId:this.props.location.code
            }
        }).then((data)=>{
            let tagTable = data.data.data;
           // console.log(tagTable)
            if(tagTable){
                if (tagTable && tagTable.goodInProcessDTOS) {
                    this.setState({
                        tagTableData: tagTable.goodInProcessDTOS,
                        addData: tagTable
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
                    loading:false
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
            //url:'http://192.168.1.102:8082/goodIn/addComfirm',
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                ...param
            }
        }).then((data) => {
            let res = data.data.data;
            //console.log(res)
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
                    //url:'http://192.168.1.102:8082/goodIn/afterComfirm',
                    method: 'post',
                    headers: {
                        'Authorization': this.url.Authorization
                    }
                }).then((data) => {
                    let tagTable = data.data.data;
                   // console.log(tagTable)
                    if (tagTable && tagTable.goodInProcessDTOS) {
                        this.setState({
                            tagTableData: tagTable.goodInProcessDTOS,
                            addData: tagTable
                        })
                    }
                })
            }
        })
    }
    reset() {//重置清空搜索框的值
        this.setState({
            // startTime: '',
            // endTime: '',
            // periodCode: '',
            // inputPeriod: '',
            startDate:'',
            endDate:''
        })
    }
    tabChange(key) {
        this.setState({
            tabKey: key
        })
    }
    handleOtherAdd(){//其他标签页的新增放到父组件来处理
        let {tagTableData}=this.state
        tagTableData[5].materialDetails.push({
            index:tagTableData[5].materialDetails.length+1,
            name:'',
            weight:'',
            niPotency:'',
            coPotency:'',
            mnPotency:''
        })
        this.setState({
            tagTableData: tagTableData,
            otherFlag:true
        })
    }
    getChange(tabKey, inputData, selectData) {//获取到下拉框，输入框填的值
        let {addData}=this.state
        if (inputData) {
            let index = inputData.split('-')[0] //定位到是第几条数据
            let name = inputData.split('-')[1] //输入框内容变化的字段
            let value = inputData.split('-')[2]
            addData.goodInProcessDTOS[tabKey - 1].materialDetails[index - 1][name] = value
        }
        if (selectData) {
            let codeSelect = selectData.split('-')[0]//第几个下拉框
            let id = selectData.split('-')[1] //下拉框的哪个option
           addData.goodInProcessDTOS[tabKey - 1].lineProDTOS[codeSelect-1]['product'] = id
        }
        if (inputData && selectData) {
            let index = inputData.split('-')[0] //物料名字的编码
            let name = inputData.split('-')[1] //输入框内容变化的字段
            let value = inputData.split('-')[2]
            addData.goodInProcessDTOS[tabKey - 1].materialDetails[index - 1][name] = value
            let codeSelect = selectData.split('-')[0]//第几个下拉框
            let id = selectData.split('-')[1] //下拉框的哪个option
            addData.goodInProcessDTOS[tabKey - 1].lineProDTOS[codeSelect-1]['product'] = id
        }
        this.setState({
            addData:addData
        })
      
    }
    otherSelectChange(tabKey,name,value){
     //name是下拉框对应的dataIndex和第几条记录,value对应的是选的option的value
        let {addData}=this.state
        let codeRecord=name.split('-')[0]
        let maName=name.split('-')[1]
        addData.goodInProcessDTOS[tabKey-1].materialDetails[codeRecord-1][maName]=value
        this.setState({
            addData:addData
        })
    }

    save(f) {
        let flag=(f==1?1:0)
        this.state.addData['periodId'] = this.state.periodCode
        this.state.addData['lineName'] = this.state.inputPeriod
        axios({
            url: `${this.url.precursorGoodIn.saveOrCommit}`,
            //url:'http://192.168.1.102:8082/goodIn/saveOrCommit',
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
           // console.log(data.data)
            message.info(data.data.data)
        }).catch(()=>{
            message.info('新增失败!')
        })
    }
    submit() {
        let {addData,otherFlag}=this.state
        let data=addData.goodInProcessDTOS
        for(let i=0;i<data.length;i++){//第一层是遍历哪个tag
                if(i===0){//单晶体
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['monPotency']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                }
                if(i==1||i==2){
                    for(let j=0;j<data[i].lineProDTOS.length;j++){
                        if(!data[i].lineProDTOS[j]['product']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                }
                else if(i===3){//陈化
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['mnPotency']||!data[i].materialDetails[j]['coPotency']||!data[i].materialDetails[j]['niPotency']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                    for(let j=0;j<data[i].lineProDTOS.length;j++){
                        if(!data[i].lineProDTOS[j]['product']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                  
                }
                else if(i===4){//烘干
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['weight']||!data[i].materialDetails[j]['mnPotency']||!data[i].materialDetails[j]['coPotency']||!data[i].materialDetails[j]['niPotency']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                    for(let j=0;j<data[i].lineProDTOS.length;j++){
                        if(!data[i].lineProDTOS[j]['product']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                  
                }
                else if(i===5&&otherFlag){
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        if(!data[i].materialDetails[j]['weight']||!data[i].materialDetails[j]['mnPotency']||!data[i].materialDetails[j]['coPotency']||!data[i].materialDetails[j]['niPotency']){
                            message.info('信息填写不完整!')
                            return
                        }
                    }
                }
            }
       this.save(1)
    }
    cancel() {
        let {addData,otherFlag}=this.state
        for(let i=0;i<addData.goodInProcessDTOS.length;i++){
            if(i===0){
                for(let j=0;j<addData.goodInProcessDTOS[i].materialDetails.length;j++){
                    if(addData.goodInProcessDTOS[i].materialDetails[j]['monPotency']!==0){
                        addData.goodInProcessDTOS[i].materialDetails[j]['monPotency']=0
                    }
                }
            }
            else if(i===1||i===2){
              for(let j=0;j<addData.goodInProcessDTOS[i].lineProDTOS.length;j++){
                if(!addData.goodInProcessDTOS[i].lineProDTOS[j]['product']){
                    addData.goodInProcessDTOS[i].lineProDTOS[j]['product']=null
                }
              }
            }
            else if(i===3){
               for(let j=0;j<addData.goodInProcessDTOS[i].materialDetails.length;j++){
                if(addData.goodInProcessDTOS[i].materialDetails[j]['mnPotency']!==0||addData.goodInProcessDTOS[i].materialDetails[j]['coPotency']!==0||addData.goodInProcessDTOS[i].materialDetails[j]['niPotency']!==0){
                    addData.goodInProcessDTOS[i].materialDetails[j]['mnPotency']=0;
                    addData.goodInProcessDTOS[i].materialDetails[j]['coPotency']=0;
                    addData.goodInProcessDTOS[i].materialDetails[j]['niPotency']=0;
                }
               }
               for(let j=0;j<addData.goodInProcessDTOS[i].lineProDTOS.length;j++){
                   if(!addData.goodInProcessDTOS[i].lineProDTOS[j]['product']){
                    addData.goodInProcessDTOS[i].lineProDTOS[j]['product']=null
                   }
               }
            }
            else if(i===4){
               for(let j=0;j<addData.goodInProcessDTOS[i].materialDetails.length;j++){
                if(addData.goodInProcessDTOS[i].materialDetails[j]['weight'] !==0||addData.goodInProcessDTOS[i].materialDetails[j]['mnPotency']!==0||addData.goodInProcessDTOS[i].materialDetails[j]['coPotency']!==0||addData.goodInProcessDTOS[i].materialDetails[j]['niPotency']!==0){
                    addData.goodInProcessDTOS[i].materialDetails[j]['mnPotency']=0;
                    addData.goodInProcessDTOS[i].materialDetails[j]['coPotency']=0;
                    addData.goodInProcessDTOS[i].materialDetails[j]['niPotency']=0;
                    addData.goodInProcessDTOS[i].materialDetails[j]['weight']=0;
                }
               }
               for(let j=0;j<addData.goodInProcessDTOS[i].lineProDTOS.length;j++){
                if(!addData.goodInProcessDTOS[i].lineProDTOS[j]['product']){
                 addData.goodInProcessDTOS[i].lineProDTOS[j]['product']=null
                }
            }
            }
            else if(i===5 && otherFlag){
                for(let j=0;j<addData.goodInProcessDTOS[i].materialDetails.length;j++){
                 if(addData.goodInProcessDTOS[i].materialDetails[j]['weight']!==0||addData[i].materialDetails[j]['mnPotency']!==0||addData.goodInProcessDTOS[i].materialDetails[j]['coPotency']!==0||addData.goodInProcessDTOS[i].materialDetails[j]['niPotency']!==0){
                     addData.goodInProcessDTOS[i].materialDetails[j]['mnPotency']=0;
                     addData.goodInProcessDTOS[i].materialDetails[j]['coPotency']=0;
                     addData.goodInProcessDTOS[i].materialDetails[j]['niPotency']=0;
                     addData.goodInProcessDTOS[i].materialDetails[j]['weight']=0;
                 }
                }
             }
        }
        this.setState({
            addData:addData
        })

    }
    render() {
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
            component: <Other tagTableData={this.state.tagTableData} url={this.url} getOther={this.getChange} otherSelectChange={this.otherSelectChange} processId={this.state.tabKey} handleOtherAdd={this.handleOtherAdd} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
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
                                    <TabPane key={data.code} tab={data.processName}>{this.dataComponent[index].component}</TabPane>
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