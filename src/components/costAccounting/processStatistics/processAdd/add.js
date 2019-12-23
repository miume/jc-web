import React, { Component } from 'react'
import { Select, Tabs, message,Spin } from 'antd'
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
            otherFlag:false,//判断other页的新增有没有被点击，如果被点击了，表格的输入，下拉框内容必须填上,因为默认是有一行的，所以flag为true
            otherData:undefined,
            giveEndDate:undefined,
            disabledDateFlag:false,
            lengthSub:undefined,
            dataOrigin:undefined, //记录最开始没变的数据，使得做了修改颜色会变
            otherMaterial:undefined
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
        this.alterData=this.alterData.bind(this);
        this.weightAlterData=this.weightAlterData.bind(this);
        this.getLastPotency=this.getLastPotency.bind(this);
        this.disabledDate=this.disabledDate.bind(this);
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
            if(tagTable){
                if (tagTable && tagTable.goodInProcessDTOS) {
                    this.setState({
                        tagTableData: tagTable.goodInProcessDTOS,
                        addData: tagTable,
                        otherMaterial:tagTable.otherMaterials,
                        dataOrigin:JSON.parse(JSON.stringify(tagTable.goodInProcessDTOS))
                    })
                    if(tagTable.goodInProcessDTOS[5].materialDetails){
                        let re=tagTable.goodInProcessDTOS[5].materialDetails
                        for(let i=0;i<re.length;i++){
                            re[i]['id']=i+1
                        }
                        this.setState({
                            otherData:re,
                            otherFlag:true   //传过来的其他不为空
                        })
                    }
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
                    inputPeriod: res.period,
                    giveEndDate:res.endTime.split(' ')[0]
                })
            }
        })
    }
    startChange(date, dateString) {
        let { startSecondTime, length ,giveEndDate} = this.state
        let time = new Date(Date.parse(dateString) + 3600 * 24 * 1000 * length)//将日期转为毫秒
        let endDate = moment(time).format('YYYY-MM-DD')
        let date1=Date.parse(dateString),date2=Date.parse(giveEndDate),dateSub=Math.abs(date1-date2),
            lengthSub=Math.floor(dateSub / (24 * 3600 * 1000))
        if(lengthSub>1){//选择的开始时间与给的上一期结束时间间隔天数，大于1天要给提示
            this.setState({
                disabledDateFlag:true,
                lengthSub:lengthSub
            })
        }
        this.setState({
            startDate: dateString,
            endDate: endDate,
            startTime: `${dateString} ${startSecondTime}`,
            endTime: `${endDate} ${startSecondTime}`,
        })
    }
    disabledDate(current) {
        let {giveEndDate}=this.state
        //小于给定时间不能选
        return  current && current < moment(giveEndDate);
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
             if(res.code<=0){
                message.error(res.message)
                this.setState({
                    loading:false
                })
            }
            else {
                this.setState({
                    statisticId: res.code
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
                            otherMaterial:tagTable.otherMaterials,
                            loading:false
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
        console.log(data)
    }

    getChange(tabKey, inputData, selectData) {  //获取到下拉框，输入框填的值
        let {addData,otherData,otherFlag}=this.state
        if (inputData) {
            let value = inputData.target.value;
            let inputData1 = inputData.target.name.split('-');
            let index = inputData1[0],    //定位到是第几条数据
                name = inputData1[1]     //输入框内容变化的字段
            if(name==='monPotency'||name==='niPotency'||name==='coPotency'||name==='mnPotency'){
                if(value<0||value>1){
                    message.error('浓度值必须为0到1之间的数!')
                    return undefined
                }
            }
            if(tabKey==='6'&&otherFlag){
                if(value[value.length-1] !== '.'){
                    value=value===''?'':parseFloat(value)//将字符串转为浮点型，点不转
                }
                otherData[index - 1][name]=value
                addData.goodInProcessDTOS[tabKey - 1].materialDetails=otherData
            }
            else{
                if(value[value.length-1] !== '.'){
                    value=value===''?'':parseFloat(value)//将字符串转为浮点型，点不转
                }
                addData.goodInProcessDTOS[tabKey - 1].materialDetails[index - 1][name] =value
            }
        }
        if (selectData) {
            selectData= selectData.split('-')
            let codeSelect = selectData[0],    //第几个下拉框
                        id = selectData[1]     //下拉框的哪个option
           addData.goodInProcessDTOS[tabKey - 1].lineProDTOS[codeSelect-1]['product'] = id
        }
        if (inputData && selectData) {
            let value = inputData.target.value;
            let inputData1 = inputData.target.name.split('-');
            let index = inputData1[0],    //定位到是第几条数据
                name = inputData1[1]    //输入框内容变化的字段
            if(tabKey==='6'&&otherFlag){
                if(value[value.length-1] !== '.'){
                    value=value===''?'':parseFloat(value)//将字符串转为浮点型，点不转
                }
                otherData[index - 1][name]=value
                addData.goodInProcessDTOS[tabKey - 1].materialDetails=otherData
            }
            else {
                if (value[value.length - 1] !== '.') {
                    value = value === '' ? '' : parseFloat(value)//将字符串转为浮点型，点不转
                }
                addData.goodInProcessDTOS[tabKey - 1].materialDetails[index - 1][name] = value
            }
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
    alterData(tabKey,value){//根据获取到的读取配方，修改表格数据
        let niPoency= value[0].ni,
            coPotency=value[0].co,
            mnPotency=value[0].mn,
            solidContent=value[0].solidContent
        let {tagTableData}=this.state
        if(tabKey==='2'){//混合盐
            for (let i = 0; i < tagTableData[tabKey-1].materialDetails.length; i++) {
                tagTableData[tabKey-1].materialDetails[i]['niPotency'] = niPoency
                tagTableData[tabKey-1].materialDetails[i]['coPotency'] = coPotency
                tagTableData[tabKey-1].materialDetails[i]['mnPotency'] = mnPotency
            }
        }
        else{//合成和陈化
            for (let i = 0; i < tagTableData[tabKey-1].materialDetails.length; i++) {
                tagTableData[tabKey-1].materialDetails[i]['solidContent'] = solidContent
            }
        }
        this.setState({
            tagTableData:tagTableData,
        })
    }
    weightAlterData(tabKey,item){//获取体积，重量修改表格数据
        this.setState({
            loading:true
        })
        let {tagTableData}=this.state
        axios({
            url:this.url.precursorGoodIn.getVolume,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                processId:tabKey
            }
        }).then(data=>{
            let res=data.data.data
            if(data.data.code===0){
                message.info('获取成功!')
            }
            else{
                message.error(data.data.message)
            }
            if(res){
                if(tabKey==='4'||tabKey==='5'){//陈化，烘干
                    for(let i=0;i<res.length;i++){
                        for(let j=0;j<tagTableData[tabKey-1].materialDetails.length;j++){
                             if(res[i].code===tagTableData[tabKey-1].materialDetails[j].code){
                                 tagTableData[tabKey-1].materialDetails[j][item]=res[i].value
                                 continue
                             }
                        }
                     }
                }
                else{
                    for(let i=0;i<tagTableData[tabKey-1].materialDetails.length;i++){
                        tagTableData[tabKey-1].materialDetails[i][item]=res[i].value
                    }
                }
                this.setState({
                    tagTableData:tagTableData
                })
            }
            this.setState({
                loading:false
            })
        }) .catch(
            ()=>{
                message.error('操作失败，请联系管理员！')
                this.setState({
                    loading:false
                })
            }
        )
    }
    getLastPotency(tabKey){//获取上期浓度,修改表格数据
        this.setState({
            loading:true
        })
        let {tagTableData}=this.state
        axios({
            url: `${this.url.precursorGoodIn.getLastPotencyByProcessId}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                processId: tabKey
            }
        }).then(data => {
            let res = data.data.data
            if (res) {
               for(let i=0;i<res.length;i++){
                    if(tagTableData[tabKey-1].materialDetails[i]['mn']===1){
                       if(tabKey==='1'){
                        tagTableData[tabKey-1].materialDetails[i]['monPotency']=res[i].mnConcentration
                       }
                       else{
                        tagTableData[tabKey-1].materialDetails[i]['mnPotency']=res[i].mnConcentration
                       }
                    }
                    if(tagTableData[tabKey-1].materialDetails[i]['ni']===1){
                        if(tabKey==='1'){
                            tagTableData[tabKey-1].materialDetails[i]['monPotency']=res[i].niConcentration
                        }
                        else{
                            tagTableData[tabKey-1].materialDetails[i]['niPotency']=res[i].niConcentration
                        }
                    }
                    if(tagTableData[tabKey-1].materialDetails[i]['co']===1){
                       if(tabKey==='1'){
                        tagTableData[tabKey-1].materialDetails[i]['monPotency']=res[i].coConcentration
                       }
                       else{
                        tagTableData[tabKey-1].materialDetails[i]['coPotency']=res[i].coConcentration
                       }
                    }
                }
                this.setState({
                    tagTableData:tagTableData
                })
            }
            this.setState({
                loading:false
            })
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
                this.props.history.push({pathname:'/processStatistics'})
            }
            this.setState({
                loading:false
            })

        }).catch(()=>{
            message.info('新增失败!')
        })

    }
    submit() {//提交需要所有空缺都填完整
        let {addData,otherFlag,otherData}=this.state
        let data=addData.goodInProcessDTOS
        for(let i=0;i<data.length;i++){//第一层是遍历哪个tag
            if(i!==0&&i!==5){//遍历头部的下拉框
                for(let j=0;j<data[i].lineProDTOS.length;j++){
                    if(data[i].lineProDTOS[j]['product']===null){
                        message.info('信息填写不完整!')
                        return
                    }
                }
            }
                if(i===0||i===2||i===3||i===4){//只有单晶体，合成,陈化，烘干要遍历表格
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        for(let key in data[i].materialDetails[j]){
                            if(data[i].materialDetails[j][key]===undefined||data[i].materialDetails[j][key]===null){
                                message.info('信息填写不完整!')
                                return
                            }
                        }
                    }
                }

                 if(i===5&&otherFlag){
                    for(let j=0;j<otherData.length;j++){
                        for(let key in otherData.length){
                        if(otherData[j][key]===undefined||otherData[j][key]===null){
                            message.info('其他信息填写不完整!')
                            return
                        }
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
        this.url = JSON.parse(localStorage.getItem('url'))
        this.dataComponent = [{
            component: <SingleCrystal tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getSingleCrystal={this.getChange} weightAlterData={this.weightAlterData} getLastPotency={this.getLastPotency}  flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <MixSalt tagTableData={this.state.tagTableData} url={this.url} getMix={this.getChange} alterData={this.alterData} processId={this.state.tabKey} weightAlterData={this.weightAlterData} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <SyntheticProcess tagTableData={this.state.tagTableData} url={this.url} alterData={this.alterData} processId={this.state.tabKey} getSynthesis={this.getChange} weightAlterData={this.weightAlterData} getLastPotency={this.getLastPotency}  flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <AgingProcess tagTableData={this.state.tagTableData} url={this.url} alterData={this.alterData} processId={this.state.tabKey} getAge={this.getChange} weightAlterData={this.weightAlterData} getLastPotency={this.getLastPotency}  flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <DryProcess tagTableData={this.state.tagTableData} url={this.url} processId={this.state.tabKey} getDry={this.getChange} weightAlterData={this.weightAlterData} getLastPotency={this.getLastPotency}  flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }, {
            component: <Other tagTableData={this.state.tagTableData} otherData={this.state.otherData} otherMaterial={this.state.otherMaterial} url={this.url} getOther={this.getChange} otherSelectChange={this.otherSelectChange} processId={this.state.tabKey} handleOtherAdd={this.handleOtherAdd}  flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}/>
        }]
        return (
            <div >
                <Blockquote name={this.props.location.editFlag ? '编辑数据' : '新增数据'} menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess} />
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddSearch flag={true} editFlag={this.props.location.editFlag} flagConfirm={this.props.location.editFlag?true:this.state.flagConfirm}
                        staticPeriod={this.state.staticPeriod} periodCode={this.state.periodCode} period={this.state.period} selectChange={this.selectChange}
                        search={this.addConfirm} startChange={this.startChange} endChange={this.endChange} inputChange={this.inputChange} inputPeriod={this.state.inputPeriod}
                        endDate={this.state.endDate} startDate={this.state.startDate} disabledDate={this.disabledDate} subLength={this.state.lengthSub} disabledDateFlag={this.state.disabledDateFlag}
                    />
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
