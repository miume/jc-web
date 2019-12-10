import React from "react";
import { Modal,Select,message,DatePicker,TimePicker } from 'antd';
import axios from 'axios';
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import "./batchMes.css";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';


const Option = Select.Option;
class AddModal extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state={
            process:[],
            year:[],
            month:[],
            productNum:[],
            materialType:[],
            slot:[],
            // startTime:[],
            productType:[],
            serialNum:[],
            productLine:[],
            slotNum:[],
            // timePoint:[],
            processVal:undefined,
            yearVal:undefined,
            monthVal:undefined,
            productNumVal:undefined,
            materialTypeVal:undefined,
            slotVal:undefined,
            // startTimeVal:undefined,
            productTypeVal:undefined,
            serialNumVal:undefined,
            productLineVal:undefined,
            slotNumVal:undefined,
            // timePointVal:undefined,
            visible:false,
            nowTime:undefined,
            nowDate:undefined,
            endDate:undefined,
            today:undefined
        }
        this.getAddData=this.getAddData.bind(this);
    }
    showModal = () =>{
        this.getAddData()
        this.setState({
            visible:true
        })
    }
    getAddData(){//获取新增默认值
        axios({
            url:`${this.url.productionBatchRule.getAllInfos}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            for(var i=0;i<res.length;i++){
                if(res[i].rule=="年份"){
                    this.setState({
                        year:res[i].values,
                        yearVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="产品类型"){
                    this.setState({
                        productType:res[i].values,
                        productTypeVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="月份"){
                    this.setState({
                        month:res[i].values,
                        monthVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="流水号"){
                    this.setState({
                        serialNum:res[i].values,
                        serialNumVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="产品型号"){
                    this.setState({
                        productNum:res[i].values,
                        productNumVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="生产线"){
                    this.setState({
                        productLine:res[i].values,
                        productLineVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="原材料类型"){
                    this.setState({
                        materialType:res[i].values,
                        materialTypeVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="工序"){
                    this.setState({
                        process:res[i].values,
                        processVal:res[i].defaultValue
                    })
                }
                if(res[i].rule=="槽次"){//根据是否启用决定是否显示
                    this.setState({
                        slot:res[i].values,
                        slotVal:res[i].defaultValue
                    })
                }
                // if(res[i].rule=="槽号"){//合成工序才可显示
                //     this.setState({
                //         slotNum:res[i].values,
                //         slotNumVal:res[i].defaultValue
                //     })
                // }
            }
            let now = new Date();//当前时间
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            let year = now.getFullYear();
            var month = now.getMonth() + 1;
            var strDate = now.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + "-" + month + "-" + strDate;
            if(hour<10){
                hour = "0"+hour;
            }
            if(minutes<10){
                minutes = "0"+minutes;
            }
            if(seconds<10){
                seconds = "0"+seconds;
            }
            var time = hour+":"+minutes+":"+seconds;
            // console.log(time)
            var today = currentdate+" "+time;
            // console.log(today);
            this.setState({
                nowTime:time,
                today:today
            })
        })
    }

    handleCancel = ()=>{
        this.setState({
            visible:false,
            nowDate:undefined
        })
    }
    handleCreate = ()=>{
        if(this.state.serialNumVal!=='001'){
            message.error('流水号选择001时才可新增!')
            return
        }
        let setPeople=JSON.parse(localStorage.getItem('menuList')).name
        let data = {
            productionBatchInfo:{
                process:this.state.processVal,year:this.state.yearVal,month:this.state.monthVal,
                productionModel:this.state.productNumVal,material:this.state.materialTypeVal,cellNum:this.state.slotNumVal,
                startTime:this.state.nowDate,productionType:this.state.productTypeVal,serialNumber:this.state.serialNumVal,
                productionLine:this.state.productLineVal,slotnum:this.state.slotVal,timepoint:this.state.nowTime,
                editFlag:0,setPeople:setPeople
           },
            startTime:this.state.nowDate
        }
        axios({
            url:`${this.url.productionBatchInfo.save}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
           if(data.data.code===0){
            message.info("新增成功");
            this.props.fetch();
           }
            this.setState({
                visible:false,
                nowDate:null
                // materialPonit:[],
                // plcAddress:[],
                // materialCode:undefined,
                // plcCode:undefined
            })
        })
    }
    processChange=(e)=>{//工序
        this.setState({
            processVal:e
        })
        if(e==='HC'){//根据工序获取槽号
            axios({
                url:this.url.productionBatchRule.getDetail,
                method:'get',
                headers:{
                    'Authorization':this.url.Authorization
                },
                params:{
                    code:10
                }
            }).then(data=>{
                let res=data.data.data
                this.setState({
                    slotNum:res
                })
            })
        }
    }
    yearChange=(e)=>{
        this.setState({
            yearVal:e
        })
    }
    productTypeChange=(e)=>{//产品类型
        this.setState({
            productTypeVal:e
        })
    }
    monthChange=(e)=>{
        this.setState({
            monthVal:e
        })
    }
    serialChange=(e)=>{//流水号
        this.setState({
            serialNumVal:e
        })
    }
    productNumChange=(e)=>{//产品型号
        this.setState({
            productNumVal:e
        })
    }
    productLineChange=(e)=>{
        this.setState({
            productLineVal:e
        })
    }
    materialTypeChange=(e)=>{
        this.setState({
            materialTypeVal:e
        })
    }
    slotChange=(e)=>{//槽次
        this.setState({
            slotVal:e
        })
    }
    slotNumChange=(e)=>{//槽号
        console.log(e)
        this.setState({
            slotNumVal:e
        })
    }

    startChange=(time, timeString)=>{
        this.setState({
            nowDate:moment(time).format('YYYY-MM-DD HH:mm:ss')
        })
    }

    timeChange=(time, timeString)=>{
        this.setState({
            nowTime:moment(time).format("HH:mm:ss")
        })
    }
    endChange=(time, timeString)=>{
        this.setState({
            endDate:moment(time).format('YYYY-MM-DD HH:mm:ss')
        })
    }
    render(){
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                    <Modal
                        visible={this.state.visible}
                        closable={false}
                        centered={true}
                        maskClosable={false}
                        title="新增"
                        width='600px'
                        centered={true}
                        footer={[
                            <CancleButton key='back' handleCancel={this.handleCancel}/>,
                            <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                        ]}
                    >
                        <div style={{height:'280px'}}>
                            <div className="batchAll">
                                工序：<Select id="process" style={{width:"30%",marginLeft:"45px"}} value={this.state.processVal} onChange={this.processChange} placeholder="请选择工序">
                                        {
                                            this.state.process.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select>
                                <span className="batchSelect">开始时间：<DatePicker locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime={true}
                                                                        disabled={this.state.serialNumVal=="001"?false:true} value={this.state.nowDate?moment(this.state.nowDate) : null}
                                                                        onChange={this.startChange} style={{width:"180px"}} placeholder="请选择开始时间"/></span>
                            </div>
                            <div className="batchAll">
                                年份：<Select id="year" style={{width:"30%",marginLeft:"45px"}} value={this.state.yearVal} onChange={this.yearChange} placeholder="请选择年份">
                                        {
                                            this.state.year.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select>
                                <span className="batchSelect">产品类型：<Select style={{width:"65%"}} id="productType" value={this.state.productTypeVal} onChange={this.productTypeChange} placeholder="请选择产品类型">
                                        {
                                            this.state.productType.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select></span>
                            </div>
                            <div className="batchAll">
                                月份：<Select id="month" style={{width:"30%",marginLeft:"45px"}} value={this.state.monthVal} onChange={this.monthChange} placeholder="请选择月份">
                                        {
                                            this.state.month.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select>
                                <span className="batchSelect">流水号：&nbsp;&nbsp;&nbsp;&nbsp;<Select style={{width:"65%"}} id="serialNum" value={this.state.serialNumVal} onChange={this.serialChange} placeholder="请选择流水号">
                                        {
                                            this.state.serialNum.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select></span>
                            </div>
                            <div className="batchAll">
                                产品型号：&nbsp;&nbsp;&nbsp;&nbsp;<Select id="productNum" style={{width:"30%"}} value={this.state.productNumVal} onChange={this.productNumChange} placeholder="请选择产品型号">
                                        {
                                            this.state.productNum.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select>
                                <span className="batchSelect">生产线：&nbsp;&nbsp;&nbsp;&nbsp;<Select style={{width:"65%"}} id="productLine" value={this.state.productLineVal} onChange={this.productLineChange} placeholder="请选择生产线">
                                        {
                                            this.state.productLine.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select></span>
                            </div>
                            <div className="batchAll">
                                原材料类型：<Select id="materialType" style={{width:"30%",marginLeft:"2px"}} value={this.state.materialTypeVal} onChange={this.materialTypeChange} placeholder="请选择原材料类型">
                                        {
                                            this.state.materialType.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select>
                                <span className="batchSelect">槽次：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Select style={{width:"65%",marginLeft:"2px"}} id="slot" value={this.state.slotVal} onChange={this.slotChange} placeholder="请选择槽次">
                                        {
                                            this.state.slot.map((item)=>{
                                                return(
                                                    <Option key={item} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                </Select></span>
                            </div>
                            <div className={this.state.processVal==='HC'?"batchAll":'batchInfo-add-hide'}>
                                槽号：<Select id="slotNum" style={{width:"30%",marginLeft:"45px"}} value={this.state.slotNumVal} onChange={this.slotNumChange} placeholder="请选择槽号">
                                        {
                                            this.state.slotNum?this.state.slotNum.map((item)=>{
                                                return(
                                                    <Option key={item.code} value={item.ruleValue}>{item.ruleValue}</Option>
                                                )
                                            }):null
                                        }
                                </Select>
                                <span className="batchSelect">时间点：&nbsp;&nbsp;&nbsp;&nbsp;<TimePicker  value={moment(this.state.nowTime,"HH:mm:ss")} style={{width:"65%"}} onChange={this.timeChange} placeholder="请选择时间"/></span>
                            </div>
                        </div>
                    </Modal>
                </span>
        )
    }
}

export default AddModal