import React from 'react';
import moment from 'moment'
import {Button, Icon, Input, Modal, Table, Select, DatePicker, message} from 'antd';
import "../batchSearch/batchSearch.css"
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import locale from "antd/es/date-picker/locale/zh_CN";
const { Option } = Select;
const data1=[{name:"合成",code:'1'},{name:"合成2",code:'2'}]
export default class EditPart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            process:"合成",             //工序
            wheBegin:true,          //是否启用
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
            userId:'',
            editNumber:0,
            editTime:'',
            editPeople:'',
            madeTime:'',
            madePeople:''
        }
    }
    handleChange=(flag,value)=> {
        switch (flag) {
            case '2':this.setState({addYear:value},()=>{
            }); break;
            case '4':this.setState({addMonth:value},()=>{
            }); break;
            case '5':this.setState({ChangedNum:value},()=>{
            }); break;
            default:message.info("传入参数有误") ;break;
        }
        // console.log(value)
        // console.log(flag);
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
            case "11":return this.state.editTime;
            case "12":return this.state.editPeople;
            case "13":return this.state.madeTime;
            case "14":return this.state.madePeople;
            default:message.info("传入参数有误") ;break;
        }
    }
    selectData=(type,flag,data)=>{
        if(!flag){
            return(
                <Select
                    disabled={!flag}
                    style={{ width: 200 }}
                    value={this.getValue(type)}
                />)
        }
        else return (
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
            </Select>
        )

    }
    handleCancel=()=>{
        this.setState({visible:false})
    }
    handleBatchEdit=()=>{
        this.setState({
            visible:true,
            editTime:'1'
        })

    }
    handleCreate=()=>{
        this.setState({
            visible:false,editNumber:this.state.editNumber+1,
        })
    }
    render(){

        return(
            <span>
                <span onClick={this.handleBatchEdit} className='blue'>编辑</span>
                <Modal title="编辑" visible={this.state.visible}
                       width="750px"
                       destroyOnClose={true}
                       closable={false} centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <SaveButton key="define" handleSave={this.handleCreate}/>,                  ]}>
                    <div>
                        <span className={"everyLine"}>
                                <span className={"firstLine"}>工序:&nbsp;</span>
                                {this.selectData('1',false)}
                                <span className={"secondLine"}>开始时间:&nbsp;</span>
                                <Input
                                    style={{width:"200px"}}
                                    value={this.state.startTime}
                                    disabled={true}
                                />
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>批次生成时间:&nbsp;</span>
                                {this.selectData('13',false)}
                                <span className={"secondLine"}>生成人:&nbsp; </span>
                                {this.selectData('14',false)}
                            </span><br/>
                        {this.state.editTime?
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>批次调整时间:&nbsp;</span>
                                {this.selectData('11',false)}
                                <span className={"secondLine"}>调整人:&nbsp; </span>
                                {this.selectData('12',false)}
                                <br/>
                            </span>:''
                        }
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>年份:&nbsp;</span>
                                {this.selectData('2',true,data1)}
                                <span className={"secondLine"}>产品类型:&nbsp; </span>
                                {this.selectData('3',false)}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>月份:&nbsp;</span>
                                {this.selectData('4',true,data1)}
                                <span className={"secondLine"}>流水号:&nbsp;</span>
                                {this.selectData('5',true,data1)}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>产品型号:&nbsp;</span>
                                {this.selectData('6',false)}
                                <span className={"secondLine"}>生产线:&nbsp;</span>
                                {this.selectData('7',false)}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>原材料类型:&nbsp;</span>
                                {this.selectData('8',false)}
                                {this.state.wheBegin?
                                    <span><span className={"secondLine"}>槽次:&nbsp;</span>
                                        {this.selectData('9',false)}</span> :''

                                }
                                {(!this.state.wheBegin&&this.state.process==="合成")?
                                    <span>
                                        <span className={"secondLine"}>槽号:&nbsp;</span>
                                        {this.selectData('10',false)}
                                    </span> :''
                                }
                            </span ><br/>
                            {this.state.process==="合成"&&this.state.wheBegin?
                                <span className={"everyLine"}>
                                <span className={"firstLine"}>槽号:&nbsp;</span>
                                    {this.selectData('10',false)}
                                    <span className={"secondLine"}>时间点:&nbsp;</span>
                                <Select value={this.state.NowTime} style={{ width: 200 }} disabled={true}/>
                            </span>:''}
                            {this.state.process==="合成"&&!this.state.wheBegin?
                                <span className={"everyLine"}>
                                    <span className={"firstLine"}>时间点:&nbsp;</span>
                                    <Select value={this.state.NowTime} style={{ width: 200 }} disabled={true}/>
                            </span>:''}
                        </div>

                </Modal>
            </span>
        );
    }
}

