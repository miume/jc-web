import React from 'react';
import moment from 'moment';
import axios from "axios"
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Modal, Select,message,DatePicker} from 'antd';
import "../batchSearch/batchSearch.css"
import "./batchinfo.css"
import AddButton from "../../BlockQuote/newButton";
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
const { Option } = Select;
// const data1=[{name:"HC"},{name:"JS"},{name:'05'},{name:'A'}];
export default class AddPart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,          //是否可见
            startTime:'',           //开始时间
            wheBegin:true,          //槽次是否启用
            TimeFlag:false,         //时间是否可选

            /* * 下方******************************受控部分****/
            process:"",             //工序1
            addYear:'',             //年份2
            productType:'',         //产品类型3
            addMonth:'',            //月份4
            ChangedNum:'',          //流水号5
            productTypeNum:'',      //产品型号6
            productLine:'',         //生产线7
            materialType:"",        //原材料类型8
            grooveOrder:'',         //槽次9
            grooveNum:"",           //槽号10

            /* * 下方******************************手动获取本地缓存****/
            userId:'',              //当前用户ID
            timePoint:'',           //当前时间

            /* *
             * 存储接口调用的状态，格式固定
             * */
            ToSelectData:[],
            ToDecideStatus:[],
        }
    }


    //此函数会根据不同的标志位(which)返回相应数据所对应的选择框
    selectData=(data,which)=>{
        return(
            <Select
                placeholder={"请选择"}
                style={{ width: 200 }}
                onChange={this.handleChange.bind(this,`${which}`)}
                value={this.getValue(which)}
            >
                {
                data.map((data)=>{
                    return(
                        <Option key={data.name} value={data.name}  >{`${data.name}`}</Option>
                    )
                })
            }
            </Select>)
    }

    //此函数在父组件中点击”新增“时触发
    showModal=()=>{
        //转换数据时数据的次序必须一致
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
        // axios({
        //     url:this.props.url.productionBatchInfo.getAddRule,
        //     method:"get",
        //     header:{
        //         'Authorization': this.props.url.Authorization,
        //     }
        // }).then((response)=>{
        //     if(response.status===200){
        //         if(response.data.code===0){
        //             const resData=response.data.data;
        //             console.log(resData)
        //             if(resData){
        //                 message.info("操作成功")
        //             }
        //         }else {
        //             message.info(response.data.message)
        //         }
        //     }else{
        //         message.info("网络错误!，请重试或联系管理员")
        //     }
        // })
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        this.getNowTimeString();


        this.setState({
            visible:true,
            userId:menuList.userId,
            ToSelectData:ToSelectData,
            ToDecideStatus:ToDecideStatus,
            wheBegin:ToDecideStatus[8].effFlag,
            process:ToDecideStatus[0].defaultValue,             //工序1
            addYear:ToDecideStatus[1].defaultValue,             //年份2
            productType:ToDecideStatus[2].defaultValue,         //产品类型3
            addMonth:ToDecideStatus[3].defaultValue,            //月份4
            ChangedNum:ToDecideStatus[4].defaultValue,          //流水号5
            productTypeNum:ToDecideStatus[5].defaultValue,      //产品型号6
            productLine:ToDecideStatus[6].defaultValue,         //生产线7
            materialType:ToDecideStatus[7].defaultValue,        //原材料类型8
            grooveOrder:ToDecideStatus[8].defaultValue,         //槽次9
            grooveNum:ToDecideStatus[9].defaultValue            //槽号10

        },()=>{
            if(ToDecideStatus[4].defaultValue===ToSelectData[4][0].name){
                console.log("默认值和第一个值相同")
                console.log(ToDecideStatus[4].defaultValue)
                this.setState({TimeFlag:false})
            }else {
                console.log("默认值和第一个值不相同")
                console.log(ToDecideStatus[4].defaultValue,ToSelectData[4][0].name)
                this.setState({TimeFlag:true})
            }
        })
    }

    //此函数会在点击取消并确认时触发，
    //此函数会清空状态；
    handleCancel=()=>{
        this.setState({
            visible:false,
            process:"",             //工序
            NowTime:'',             //时间点
            startTime:'',           //开始时间
            addYear:'',             //年份
            addMonth:'',            //月份
            ChangedNum:'',          //流水号
            productType:'',         //产品类型
            materialType:"",        //原材料类型
            productTypeNum:'',      //产品型号
            grooveNum:"",           //槽号
            grooveOrder:'',         //槽次
            productLine:'',         //生产线
        })
    }

    //此函数会在点击保存时触发，
    //此函数调用接口
    handleCreate=()=>{
        // if(!this.state.process){
        //     message.info("请选择工序！")
        //     return;
        // }else if(!this.state.startTime){
        //     message.info("请选择开始时间！")
        //     return;
        // }else if(!this.state.addYear){
        //     message.info("请选择年份！")
        //     return;
        // }else if(!this.state.addMonth){
        //     message.info("请选择月份！")
        //     return;
        // }else if(!this.state.ChangedNum){
        //     message.info("请选择流水号！")
        //     return;
        // }else if(!this.state.productType){
        //     message.info("请选择产品类型！")
        //     return;
        // }else if(!this.state.materialType){
        //     message.info("请选择原材料类型！")
        //     return;
        // }else if(!this.state.productTypeNum){
        //     message.info("请选择产品型号！")
        //     return;
        // }else if(!this.state.grooveOrder&&this.state.Status[8].flag){
        //     message.info("请选择原槽次！")
        //     return;
        // }else if(!this.state.grooveNum&&this.state.process==="HC"){
        //     message.info("请选择槽号！")
        //     return;
        // }else if(!this.state.productLine){
        //     message.info("请选择生产线！")
        //     return;
        // }
        var addData={
            process:this.state.process,
            startTime:this.state.startTime,
            year:this.state.addYear,
            productionType:this.state.productType,
            month:this.state.addMonth,
            serialnumber:this.state.ChangedNum,
            productionModal:this.state.productTypeNum,
            productionLine:this.state.productLine,
            material:this.state.materialType,
            setPeople:this.state.userId,
            slotnum:this.state.grooveOrder,

        }
        if(this.state.process==="HC"){
            addData['timepoint']=this.state.NowTime;
            addData['cellnum']=this.state.grooveNum;
        }
        axios({
            url:this.props.url.productionBatchInfo.addOne,
            method:"post",
            header:{
                'Authorization': this.props.url.Authorization,
            },
            data:addData,
        }).then((response)=>{
            if(response.status===200){
                if(response.data.code===0){
                    message.info(response.data.message);
                    this.handleCancel();
                    this.props.getTableData();
                }else{
                    message.info(response.data.message);
                }
            }else {
                message.info("新增失败，请联系管理员！")
            }
        });
        console.log(addData)
    };

    //onChange()此函数将在时间选择中选择时间发生变化时触发；
    //此函数会把选择的时间赋值给状态startTime
    onChange=(date, dateString)=> {
        this.setState({startTime:dateString})
        console.log( dateString);
    }

    //onOk()此函数将在时间选择中点击确认之后触发；
    //此函数会把选择的时间赋值给状态startTime
    onOk=(value)=>{
        let m=moment(value).format("YYYY-MM-DD HH:mm:ss")
        this.setState({startTime:m})
        console.log('onOk: ', m);
    }

    //getValue()此函数将设置的状态值赋给表单中的value；
    getValue=(which)=>{
        switch (which) {
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

    //* handleChange()此函数通过flag实时改变新增数据的值；
    handleChange=(which,value)=> {
        switch (which) {
            case '1':this.setState({process:value}); break;
            case '2':this.setState({addYear:value}); break;
            case '3':this.setState({productType:value}); break;
            case '4':this.setState({addMonth:value}); break;
            case '5':this.setState({ChangedNum:value}); break;
            case '6':this.setState({productTypeNum:value}); break;
            case '7':this.setState({productLine:value}); break;
            case '8':this.setState({materialType:value}); break;
            case '9':this.setState({grooveOrder:value}); break;
            case '10':this.setState({grooveNum:value}); break;
            default:message.info("传入参数有误") ;break;
        }
    }

    /* *
    * 调用此函数可以获取当前时间，将时间转换为一个字符串
    * format:年-月-日(此处为空格)小时:分钟:秒钟;4
    * example:"2019-08-16 13:14:22"
    * */
    getNowTimeString=()=>{
        let now=new Date();
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let day=now.getDate();
        let hour=now.getHours();
        let minutes=now.getMinutes();
        let second=now.getSeconds();
        if(hour<10)hour='0'+hour;
        if(minutes<10)minutes='0'+minutes;
        if(month<10)month='0'+month;
        if(day<10)day='0'+day;
        if(second<10)second='0'+second;
        this.setState({ NowTime:`${year}-${month}-${day} ${hour}:${minutes}:${second}`})
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
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'1'):this.selectData([{name:"没有数据"}],'1')}
                                <span className={"secondLine"}>开始时间:&nbsp;</span>
                                <DatePicker locale={locale} showTime={true} style={{width:"200px"}} format={"YYYY-MM-DD HH:mm:ss"} onChange={this.onChange} onOk={this.onOk} disabled={this.state.TimeFlag}/>
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>年份:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'2'):this.selectData([{name:"没有数据"}],'2')}
                                <span className={"secondLine"}>产品类型:&nbsp; </span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'3'):this.selectData([{name:"没有数据"}],'3')}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>月份:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'4'):this.selectData([{name:"没有数据"}],'4')}
                                <span className={"secondLine"}>流水号:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'5'):this.selectData([{name:"没有数据"}],'5')}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>产品型号:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'6'):this.selectData([{name:"没有数据"}],'6')}
                                <span className={"secondLine"}>生产线:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'7'):this.selectData([{name:"没有数据"}],'7')}
                            </span><br/>
                            <span className={"everyLine"}>
                                <span className={"firstLine"}>原材料类型:&nbsp;</span>
                                {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'8'):this.selectData([{name:"没有数据"}],'8')}
                                {this.state.wheBegin?
                                    <span><span className={"secondLine"}>槽次:&nbsp;</span>
                                        {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'9'):this.selectData([{name:"没有数据"}],'9')}</span> :''

                                }
                                {(!this.state.wheBegin&&this.state.process==="HC")?
                                    <span>
                                        <span className={"secondLine"}>槽号:&nbsp;</span>
                                        {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'10'):this.selectData([{name:"没有数据"}],'10')}
                                    </span> :''
                                }
                            </span ><br/>
                            {this.state.process==="HC"&&this.state.wheBegin?
                                <span className={"everyLine"}>
                                <span className={"firstLine"}>槽号:&nbsp;</span>
                                    {this.state.ToSelectData.length>0?this.selectData(this.state.ToSelectData[0],'10'):this.selectData([{name:"没有数据"}],'10')}
                                    <span className={"secondLine"}>时间点:&nbsp;</span>
                                <Select value={this.state.NowTime} style={{ width: 200 }} disabled={true}/>
                            </span>:''}
                            {this.state.process==="HC"&&!this.state.wheBegin?
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
