import React, { Component } from 'react'
import { Select, DatePicker, Button, Tabs,Input,message,Popconfirm} from 'antd'
import NewButton from '../../../BlockQuote/newButton'
import axios from 'axios'
import moment from 'moment'
const { Option } = Select;

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modelData: [],
        }
        this.selectChange = this.selectChange.bind(this);
        this.getModel = this.getModel.bind(this)
        this.startChange = this.startChange.bind(this);
        this.endChange = this.endChange.bind(this);
        this.confirm=this.confirm.bind(this)
    }
    componentDidMount() {
            this.getModel()
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }
    getModel() {
        axios({
            url: this.props.url.positiveModel.all,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data
            if (res) {
                this.setState({
                    modelData: res,
                })
                if(!this.props.editFlag){
                    this.setState({
                        modelCode:res[0].code
                    })
                }
            }
        })
    }
    /**子组件在接收到props变化时，执行此函数，此处setState不会引起第二次渲染*/
    componentWillReceiveProps(nextProps) {
        
        if(this.props.editFlag){//编辑操作，编辑头表变化
            if(this.props.headEdit!=nextProps.headEdit){
                this.setState({
                    periodCode: nextProps.headEdit.periodCode,
                    modelCode: nextProps.headEdit.typeCode,
                    startDate: nextProps.headEdit.beginTime.split(' ')[0],
                    endDate: nextProps.headEdit.endTime.split(' ')[0],
                    lineCode:nextProps.headEdit.lineCode
                })
            }
        }
        else{//新增操作
            if (this.props.headPeriod !== nextProps.headPeriod) {//传过来的统计周期那些值有变化
                this.setState({
                    periodCode: nextProps.headPeriod.periodCode,
                    length: nextProps.headPeriod.length,
                    time: nextProps.headPeriod.time,
                    lineCode:nextProps.headPeriod.lineCode
                })
            }
        }
    }
    selectChange(value, option) {
        let name = option.props.name,{periodCode,lineCode}=this.state
        if (name === 'lineCode' || name === 'modelCode') {
            this.setState({
                [name]: value
            })
            if(name === 'lineCode'){
                this.props.getNextPeriods(periodCode,value)
            }
        }
        else{//统计周期下拉框变化
            name=name.split('-')
            this.setState({
                periodCode:value,
                length:name[1],
                time:name[2],
            })
            this.props.getNextPeriods(value,lineCode)
        }
    }
    /**开始日期变化*/
    startChange(date, dateString) {
        let { time, length } = this.state,//time是传过来的时分秒，和开始日期拼接传给后台，length是开始与结束相差几天，用来计算结束时间
            {giveEndDate}=this.props,
            end = dateString.replace(new RegExp("-","gm"),"/"),
            t=new Date(`${end} ${time}`).getTime()+24*length*3600*1000,
            endTime=moment(t).format('YYYY-MM-DD HH:mm:ss'),
            endDate=moment(t).format('YYYY-MM-DD '),
            date1=Date.parse(dateString),date2=Date.parse(giveEndDate),dateSub=Math.abs(date1-date2),
            lengthSub=Math.floor(dateSub / (24 * 3600 * 1000))
        if(lengthSub>1){//选择的开始时间与给的上一期结束时间间隔天数，大于1天要给提示
            this.setState({
                disabledDateFlag:true,
                lengthSub:lengthSub
            })
        }
        this.setState({
            startTime: `${dateString} ${time}`,
            endTime: endTime,
            startDate: dateString,
            endDate: endDate,
            secondTime:endTime.split(' ')[1]
        });
    }
    /**结束日期变化*/
    endChange(date, dateString) {
        let { secondTime} = this.state
        this.setState({
            endDate: dateString,
            endTime: `${dateString} ${secondTime}`
        });
    }
    confirm() {
          let {lineCode,periodCode,modelCode,startTime,endTime,}=this.state,{inputPeriod}=this.props,
             params={
                beginTime: startTime,
                endTime: endTime,
                lineCode: lineCode,
                periodCode: periodCode,
                typeCode: modelCode,
                periods:inputPeriod
          }
          if(!startTime|| !endTime|| !periodCode|| !inputPeriod ||!modelCode){
            message.info('信息不完整!') //在点确定的时候做下判断，必须4个都填了，才能点击确定
            return
        }
          this.props.addConfirm(params)
    }
    render() {
        let { modelCode, periodCode, endDate ,startDate,lineCode,lengthSub,disabledDateFlag} = this.state,{flagConfirm,inputPeriod}=this.props
        
        return (
            <div>
                <Select onChange={this.selectChange} value={lineCode} placeholder='请选择产线' style={{ width: '180px', marginRight: '10px' }} disabled={flagConfirm}>
                    {
                        this.props.lineData ? this.props.lineData.map(item => {
                            return (
                                <Option name='lineCode' key={item.code} value={item.code}>{item.name}</Option>
                            )
                        }) : null
                    }
                </Select>
                <Select onChange={this.selectChange} value={modelCode} placeholder='请选择产品型号' style={{ width: '180px', marginRight: '10px' }} disabled={flagConfirm}>
                    {
                        this.state.modelData ? this.state.modelData.map(item => {
                            return (
                                <Option name='modelCode' key={item.code} value={item.code}>{item.name}</Option>
                            )
                        }) : null
                    }

                </Select>
                <Select onChange={this.selectChange} value={periodCode} placeholder='请选择周期' style={{ width: '180px', marginRight: '10px' }} disabled={flagConfirm}>
                    {
                        this.props.periodStatis ? this.props.periodStatis.map(item => {
                            return (
                                <Option name={`${'periodCode'}-${item.length}-${item.startTime}`} key={item.code} value={item.code}>{item.name}</Option>
                            )
                        }) : null
                    }
                </Select>
                <span>期数 : </span>&nbsp;<Input value={inputPeriod} placeholder='期数' style={{width:100,marginRight:'20px'}}  disabled={true}/>
                <DatePicker onChange={this.startChange} disabledDate={this.props.disabledDate} value={startDate?moment(startDate):undefined} placeholder='开始时间' style={{ width: '180px', marginRight: '10px' }}  disabled={flagConfirm}/>
                <DatePicker onChange={this.endChange} disabledDate={this.props.disabledDate} value={endDate ? moment(endDate) : undefined} placeholder='结束时间' style={{ width: '180px', marginRight: '10px' }} disabled={flagConfirm}/>
                {!disabledDateFlag?<Button type='primary' className='button' style={this.props.editFlag?{display:'none'}:{}} onClick={this.confirm} disabled={this.props.flagConfirm}>确定</Button>
                :<Popconfirm title={`与上期结束时间间隔${lengthSub}天，确定继续吗?`} onConfirm={this.confirm} okText="确定" cancelText="再想想" >
                    <Button type='primary' className='button' style={this.props.editFlag?{display:'none'}:{}}  disabled={this.props.flagConfirm}>确定</Button>
                </Popconfirm>}
                &nbsp;
            </div>
        )
    }
}
export default Search