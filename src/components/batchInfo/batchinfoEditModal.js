import React from 'react';
import moment from 'moment'
import {Button, Icon, Input, Modal, Table, Select, DatePicker, message} from 'antd';
import "../batchSearch/batchSearch.css"
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import locale from "antd/es/date-picker/locale/zh_CN";
import axios from "axios";
const { Option } = Select;
const data1=[{name:"合成",code:'1'},{name:"合成2",code:'2'}]
export default class EditPart extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props)
        this.state={
            visible:false,
            process:"HC",             //工序
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
            madePeople:'',
            /* *
             * 存储接口调用的状态，格式固定
             * */
            ToSelectData:[],
            ToDecideStatus:[],
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
                            <Option  value={data.name} key={data.name}>{`${data.name}`}</Option>
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
        var ToSelectData=[];
        var ToDecideStatus=[];
        for(var i=0;i<10;i++){
            ToSelectData.push([]);
            for(var j=0;j<5;j++)
                ToSelectData[i].push({name:`H${j}`})
        }
        ToSelectData[0][0].name="HC";
        for(var ii=0;ii<10;ii++){
            ToDecideStatus.push({defaultValue:`${ii+1}`,effFlag:true,name:'HC'})
        }
        this.setState({
            ToSelectData:ToSelectData,
            ToDecideStatus:ToDecideStatus,
            visible:true,
            editTime:this.props.record.modifyTime,
            process:this.props.record.process,                  //工序
            wheBegin:true,                                      //是否启用
            startTime:this.props.record.startTime,              //开始时间
            addYear:this.props.record.year,                     //年份
            addMonth:this.props.record.month,                   //月份
            ChangedNum:this.props.record.serialNumber,          //流水号
            productType:this.props.record.productionType,         //产品类型
            materialType:this.props.record.material,            //原材料类型
            productTypeNum:this.props.record.productionModel,      //产品型号
            grooveNum:this.props.record.cellNum,                //槽号
            grooveOrder:this.props.record.slotnum,              //槽次
            productLine:this.props.record.productionLine,       //生产线
            editPeople:this.props.record.modifyPeople,
            madeTime:this.props.record.setTime,
            madePeople:this.props.record.setPeople
        })

    }
    handleCreate=()=>{
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        var editData={
            code:this.props.record.code,
            year:this.state.addYear,
            month:this.state.addMonth,
            serialnumber:this.state.ChangedNum,
            modifyPeople:menuList.userId,
        };
        if(this.state.process==="HC")editData['timepoint']=this.state.NowTime;
        console.log(editData)
        axios({
            url:this.url.productionBatchInfo.updateOne,
            method:"post",
            header:{
                'Authorization': this.url.Authorization,
            },
            data:editData,
        }).then((response)=>{
            console.log(response)
            if(response.status===200){
                if(response.data.code===0){
                    message.info(response.data.message)
                    this.props.getTableData();
                    this.handleCancel();
                }else{
                    message.info(response.data.message)
                }
            }else {
                message.info("编辑失败，请联系管理员！")
            }
            console.log(response.data.message)
        })
        this.setState({
            visible:false,
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
                                {this.state.ToSelectData.length>0?this.selectData("2",true,this.state.ToSelectData[0]):this.selectData('2',true,[{name:"没有数据"}])}
                                <span className={"secondLine"}>产品类型:&nbsp; </span>
                                {this.selectData('3',false)}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>月份:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData("4",true,this.state.ToSelectData[0]):this.selectData('4',true,[{name:"没有数据"}])}
                                <span className={"secondLine"}>流水号:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData("5",true,this.state.ToSelectData[0]):this.selectData('5',true,[{name:"没有数据"}])}
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

