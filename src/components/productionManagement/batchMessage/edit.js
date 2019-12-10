import React from "react";
import { Modal,Select,message,DatePicker,TimePicker,Input } from 'antd';
import axios from 'axios';
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import "./batchMes.css";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';


const Option = Select.Option;
class Edit extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state={
            year:[],
            month:[],
            serialNum:[],
            processVal:undefined,
            yearVal:undefined,
            monthVal:undefined,
            yearOrigin:undefined,
            monthOrigin:undefined,
            productNumVal:undefined,//产品型号
            materialTypeVal:undefined,//原材料类型
            slotVal:undefined,//槽次
            productTypeVal:undefined,//产品类型
            serialNumVal:undefined,//流水号
            serialNumOrigin:undefined,
            productLineVal:undefined,//生产线
            slotNumVal:undefined,//槽号
            timePointVal:undefined,
            visible:false,
            startTime:undefined,
            setPeople:undefined,
            setTime:undefined,
            modifyPeople:undefined,
            modifyTime:undefined,
            data:undefined
        }
        this.getEditData=this.getEditData.bind(this);
        this.getData=this.getData.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    showModal = () =>{
        this.getEditData()
        this.getData()
        this.setState({
            visible:true
        })
    }

    getEditData(){//根据code获取一条记录
        axios({
            url:this.props.url.productionBatchInfo.ByCode,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                code:this.props.code
            }
        }).then(data=>{
            console.log(data)
            let res=data.data.data
            if(res && res.productionBatchInfo){
                this.setState({
                    data:res.productionBatchInfo,
                    yearVal:res.productionBatchInfo.year,
                    monthVal:res.productionBatchInfo.month,
                    yearOrigin:JSON.parse(JSON.stringify(res.productionBatchInfo.year)),
                    monthOrigin:JSON.parse(JSON.stringify(res.productionBatchInfo.month)),
                    productLineVal:res.productionBatchInfo.productionLine,
                    startTime:res.productionBatchInfo.startTime,
                    serialNumVal:res.productionBatchInfo.serialNumber,
                    serialNumOrigin:JSON.parse(JSON.stringify(res.productionBatchInfo.serialNumber)),
                    productNumVal:res.productionBatchInfo.productionModel,
                    productTypeVal:res.productionBatchInfo.productionType,
                    processVal:res.productionBatchInfo.process,
                    materialTypeVal:res.productionBatchInfo.material,
                    slotVal:res.productionBatchInfo.slotnum,//槽次
                    slotNumVal:res.productionBatchInfo.cellNum,//槽号
                    timePointVal:res.productionBatchInfo.timepoint,
                    setPeople:res.productionBatchInfo.setPeople,
                    setTime:res.productionBatchInfo.setTime,
                    modifyPeople:res.modify_people,
                    modifyTime:res.productionBatchInfo.modifyTime
                })
            }
        })
    }
    getData(){//获取每个规则下拉框的值
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
                    })
                }

                if(res[i].rule=="月份"){
                    this.setState({
                        month:res[i].values,
                    })
                }
                if(res[i].rule=="流水号"){
                    this.setState({
                        serialNum:res[i].values,
                    })
                }
     
            }
            
        })
    }
    handleCancel = ()=>{
        let {yearOrigin,monthOrigin,serialNumOrigin}=this.state
        this.setState({
            visible:false,
            yearVal:yearOrigin,
            monthVal:monthOrigin,
            serialNumVal:serialNumOrigin
        })
    }
    handleCreate = ()=>{
        let {data,yearVal,monthVal,serialNumVal}=this.state
        data['year']=yearVal
        data['month']=monthVal
        data['serialNumVal']=serialNumVal
        //console.log(data)
        axios({
            url:this.url.productionBatchInfo.updateOne,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.setState({
                    visible:false
                })
                this.props.fetch()
            }
            else{
                message.error(data.data.message)
            }
           // this.handleCancel()
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:value
        })
    }
   
    render(){
        let {serialNum,year,month,yearVal,monthVal,startTime,serialNumVal,processVal,productLineVal,
            materialTypeVal,slotNumVal,slotVal,timePointVal,productTypeVal,productNumVal,
            setPeople,setTime,modifyPeople,modifyTime}=this.state
        return(
            <span>
                <span className="blue" onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
                    width='620px'
                    height='450px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <div className="batchAll ">
                        <span className='batchInfo-edit-span'>开始时间 :</span>
                        <DatePicker placeholder='开始时间' showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss"
                                    style={{width:'170px'}} value={moment(startTime)} disabled/>
                        <span className='batchInfo-edit-span'>批次生成人:</span>
                        <Input placeholder='批次生成人' style={{width:'170px'}} value={setPeople} disabled/>
                    </div>
                    <div className="batchAll ">
                        <span className='batchInfo-edit-span'>批次生成时间 : </span>
                        <DatePicker placeholder='批次生成时间' showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss"
                                    style={{width:'170px'}} value={moment(setTime)} disabled/>
                        <span className='batchInfo-edit-span'>年份 : </span>
                        <Select placeholder='年份' style={{width:'170px'}} value={yearVal} onChange={this.selectChange}>
                            {
                                year?year.map(item=>{
                                    return(
                                        <Option key={item} value={item} name='yearVal'>{item}</Option>
                                    )
                                }):null
                            }
                        </Select>
                    </div>
                    <div className="batchAll ">
                        <span className='batchInfo-edit-span'>月份 : </span>
                        <Select placeholder='月份' style={{width:'170px'}} value={monthVal} onChange={this.selectChange}>
                            {
                                month?month.map(item=>{
                                    return(
                                        <Option key={item} value={item} name='monthVal'>{item}</Option>
                                    )
                                }):null
                            }
                        </Select>
                        <span className='batchInfo-edit-span'>流水号 : </span>
                        <Select placeholder='流水号' style={{width:'170px'}} value={serialNumVal} onChange={this.selectChange}>
                            {
                                serialNum?serialNum.map(item=>{
                                    return(
                                        <Option key={item} value={item} name='serialNumVal'>{item}</Option>
                                    )
                                }):null
                            }
                        </Select>
                    </div>
                    <div className="batchAll ">
                        <span className='batchInfo-edit-span'>产品型号 : </span>
                        <Select placeholder='产品型号' style={{width:'170px'}} value={productNumVal} disabled></Select>
                        <span className='batchInfo-edit-span'>产品类型 : </span>
                        <Select placeholder='产品类型' style={{width:'170px'}} value={productTypeVal} disabled></Select>
                    </div>
                    <div className="batchAll ">
                        <span className='batchInfo-edit-span'>生产线 : </span>
                        <Select placeholder='生产线' style={{width:'170px'}} value={productLineVal} disabled></Select>
                        <span className='batchInfo-edit-span'>原材料类型 : </span>
                        <Select placeholder='原材料类型' style={{width:'170px'}} value={materialTypeVal} disabled></Select>
                    </div>
                    
                    <div className={modifyTime||modifyPeople?"batchAll":'batchInfo-add-hide'}>
                        <span className='batchInfo-edit-span'>批次调整时间 : </span>
                        <DatePicker placeholder='批次调整时间' showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss"
                                    style={{width:'170px'}} value={moment(modifyTime)} disabled/>
                        <span className='batchInfo-edit-span'>调整人 : </span>
                        <Input placeholder='调整人' style={{width:'170px'}} value={modifyPeople} disabled/>
                    </div>
                    <div className="batchAll ">
                        <span className='batchInfo-edit-span'>工序 : </span>
                        <Select placeholder='工序' style={{width:'170px'}} value={processVal} disabled></Select>
                        <span className='batchInfo-edit-span'>槽次 : </span>
                        <Select placeholder='槽次' style={{width:'170px'}} value={slotVal} disabled></Select>
                       
                    </div>
                    <div className={processVal==='HC'?"batchAll":'hide'}>
                        <span className='batchInfo-edit-span'>槽号 : </span>
                        <Select placeholder='槽号' style={{width:'170px'}} value={slotNumVal} disabled></Select>
                        <span className='batchInfo-edit-span'>时间点 : </span>
                        <TimePicker placeholder='时间点' style={{width:'170px'}} value={moment(timePointVal)} disabled/>
                        
                    </div>
                    
                </Modal>
            </span>
        )
    }
}

export default Edit