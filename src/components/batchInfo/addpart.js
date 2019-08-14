import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {Button, Icon, Input, Modal, Select,message,DatePicker, } from 'antd';
import "../batchSearch/batchSearch.css"
import "./batchinfo.css"
import AddButton from "../BlockQuote/newButton";
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
const { Option } = Select;
const data1=[{name:"合成",code:'1'},{name:"合成2",code:'2'}]
export default class AddPart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,          //是否可见
            process:"",             //工序
            wheBegin:true,          //是否启用
            NowTime:'',         //时间点
            startTime:'',           //开始时间
            addYear:'',             //年份
            addMonth:'',            //月份
            ChangedNum:'',          //流水号
            productType:'',         //产品类型
            materialType:"",        //原材料类型
            productTypeNum:'',      //原材料型号
            grooveNum:"",           //槽号
            grooveOrder:'',         //槽次
            productLine:'',         //生产线
            userId:'',
        }
    }
    getValue=(type)=>{
        switch (type) {
            case '1':return this.state.process;
            case '2':return this.state.addYear;
            case '3':return this.state.productType;
            case '4':return this.state.addMonth;
            case '5':return this.state.ChangedNum;
            case '6':return this.state.productTypeNum;
            case '7':return this.state.productLine;
            case '8':return this.state.materialType;
            case '9':return this.state.grooveOrder;
            case '10':return this.state.grooveNum;
            default:message.info("传入参数有误") ;break;
        }
    }
    handleChange=(flag,value)=> {
        switch (flag) {
            case '1':this.setState({process:value},()=>{
            }); break;
            case '2':this.setState({addYear:value},()=>{
            }); break;
            case '3':this.setState({productType:value},()=>{
            }); break;
            case '4':this.setState({addMonth:value},()=>{
            }); break;
            case '5':this.setState({ChangedNum:value},()=>{
            }); break;
            case '6':this.setState({productTypeNum:value},()=>{
            }); break;
            case '7':this.setState({productLine:value},()=>{
            }); break;
            case '8':this.setState({materialType:value},()=>{
            }); break;
            case '9':this.setState({grooveOrder:value},()=>{
            }); break;
            case '10':this.setState({grooveNum:value},()=>{
            }); break;
            default:message.info("传入参数有误") ;break;
        }
        // console.log(value)
        // console.log(flag);
    }
    selectData=(data,type)=>{
        return(
            <Select
                placeholder={"请选择"}
                style={{ width: 200 }}
                onChange={this.handleChange.bind(this,`${type}`)}
                value={this.getValue(type)}
            >
                {
                data.map((data,index,type)=>{
                    return(
                        <Option  value={data.name} key={data.code}>{`${data.name}`}</Option>
                    )
                })
            }
            </Select>)
    }
    showModal=()=>{
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        this.setState({userId:menuList.userId})
        console.log(menuList)
        let now=new Date();
        console.log(now)
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let day=now.getDate();
        let hour=now.getHours();
        let minites=now.getMinutes();
        let second=now.getSeconds();
        if(hour<10)hour='0'+hour;
        if(minites<10)minites='0'+minites;
        if(month<10)month='0'+month;
        if(day<10)day='0'+day;
        if(second<10)second='0'+second;
        this.setState({visible:true,NowTime:`${year}-${month}-${day} ${hour}:${minites}:${second}`})
    }
    handleCancel=()=>{
        this.setState({
            visible:false,
            process:"",             //工序
            wheBegin:false,         //是否启用
            NowTime:'',             //时间点
            startTime:'',           //开始时间
            addYear:'',             //年份
            addMonth:'',            //月份
            ChangedNum:'',          //流水号
            productType:'',         //产品类型
            materialType:"",        //原材料类型
            productTypeNum:'',      //原材料型号
            grooveNum:"",           //槽号
            grooveOrder:'',         //槽次
            productLine:'',         //生产线
        })
    }
    handleCreate=()=>{
        const addData={
            process:this.state.process,
            year:this.state.addYear,
            month:this.state.addMonth,
            serialnumber:this.state.ChangedNum,
            productionModal:this.state.productTypeNum,
            productionLine:this.state.productLine,
            slotnum:this.state.grooveOrder,
            cellnum:this.state.grooveNum,
            timepoint:this.state.NowTime,
            material:this.state.materialType,
            productionType:this.state.productType,
            setPeople:this.state.userId,
        }
        console.log(addData)
        this.setState({
            visible:false,
        })
        this.handleCancel()
    }
    onChange=(date, dateString)=> {
        this.setState({startTime:dateString})
        console.log( dateString);
    }
    onOk=(value)=>{
        let m=moment(value).format("YYYY-MM-DD HH:mm:ss")
        this.setState({startTime:m})
        console.log('onOk: ', m);
    }
    render(){
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus'/>
                <Modal title="新增" visible={this.state.visible}
                       destroyOnClose={true}
                       width="750px"
                       closable={false} centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <SaveButton key="define" handleSave={this.handleCreate}/>,
                       ]}>
                    <div>
                        <div>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>工序:&nbsp;</span>
                                {this.selectData(data1,'1')}
                                <span className={"secondLine"}>开始时间:&nbsp;</span>
                                <DatePicker locale={locale} showTime={true} style={{width:"200px"}} format={"YYYY-MM-DD HH:mm:ss"} onChange={this.onChange} onOk={this.onOk} />
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>年份:&nbsp;</span>
                                {this.selectData(data1,'2')}
                                <span className={"secondLine"}>产品类型:&nbsp; </span>
                                {this.selectData(data1,'3')}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>月份:&nbsp;</span>
                                {this.selectData(data1,'4')}
                                <span className={"secondLine"}>流水号:&nbsp;</span>
                                {this.selectData(data1,'5')}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>产品型号:&nbsp;</span>
                                {this.selectData(data1,'6')}
                                <span className={"secondLine"}>生产线:&nbsp;</span>
                                {this.selectData(data1,'7')}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>原材料类型:&nbsp;</span>
                                {this.selectData(data1,'8')}
                                {this.state.wheBegin?
                                    <span><span className={"secondLine"}>槽次:&nbsp;</span>
                                        {this.selectData(data1,'9')}</span> :''

                                }
                                {(!this.state.wheBegin&&this.state.process==="合成")?
                                    <span>
                                        <span className={"secondLine"}>槽号:&nbsp;</span>
                                        {this.selectData(data1,'10')}
                                    </span> :''
                                }
                            </span ><br/>
                            {this.state.process==="合成"&&this.state.wheBegin?
                                <span className={"everyLine"}>
                                <span className={"firstLine"}>槽号:&nbsp;</span>
                                {this.selectData(data1,'10')}
                                <span className={"secondLine"}>时间点:&nbsp;</span>
                                <Select value={this.state.NowTime} style={{ width: 200 }} disabled={true}/>
                            </span>:''}
                            {this.state.process==="合成"&&!this.state.wheBegin?
                                <span className={"everyLine"}>
                                    <span className={"firstLine"}>时间点:&nbsp;</span>
                                    <Select value={this.state.NowTime} style={{ width: 200 }} disabled={true}/>
                            </span>:''}
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }
}