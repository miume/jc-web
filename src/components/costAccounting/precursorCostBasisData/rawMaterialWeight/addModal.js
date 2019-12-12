import React,{Component} from 'react'
import {Modal,Select,message } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import Tr from './tr'
const {Option}=Select;
class AddModal extends Component{
    constructor(props){
        super(props)
        this.state={
            materialName:undefined,//物料点名称
            materialType:undefined,//材料类别
            dataType:undefined,//物料来源
            visible:false,
            materialTypeData:[],
            materialNameData:[],
            productLine:[],
            detail:{},
            recordData:{},
            weightDto:{},
            nameFlag:true
        }
        this.showModal=this.showModal.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.dataTypeChange=this.dataTypeChange.bind(this);
        this.materialNameSelect=this.materialNameSelect.bind(this);
        this.materialTypeSelect=this.materialTypeSelect.bind(this);
        this.getMaterialType=this.getMaterialType.bind(this);
        this.getmaterialName=this.getmaterialName.bind(this)
        this.getLine=this.getLine.bind(this);
        this.getRecordById=this.getRecordById.bind(this);
    }
    componentDidMount(){
        this.getMaterialType()
        this.getLine()
       
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getRecordById(){//根据id获取一条记录
        let {detail}=this.state
        axios({
            url:`${this.props.url.precursorRawmaterialLineWeight.getRecordById}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          params:{
              id:this.props.code
          }
          }).then((data)=>{
            const res = data.data.data;
           if(res && res.weightDTOS){
               for(let i =0;i<res.weightDTOS.length;i++){
                    detail[res.weightDTOS[i].lineCode]['weightValue']=res.weightDTOS[i].weightValue
                    detail[res.weightDTOS[i].lineCode]['checkbox']=true
               }
                this.setState({
                    dataType:res.dataType,
                    materialName:res.materialCode,
                    materialType:res.materialTypeCode,
                    weightDto:res.weightDTOS,
                    detail:detail
                })
            }
          })
    }
    getMaterialType(){
        axios({
            url:`${this.props.url.precursorMaterialType.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    materialTypeData:res
                })
            }
          })
    }
    getmaterialName(value){//根据材料类别获取
        axios({
            url:`${this.props.url.precursorRawMaterial.byType}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
            },
            params:{
                type:value
            }
          }).then((data)=>{
            const res = data.data.data;
            
           if(res){
                this.setState({
                    materialNameData:res
                })
            }
          })
    }
    getLine(){
        axios({
            url:`${this.props.url.precursorProductionLine.all}`,
            method:"get",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data;
            var detail = {}
            for(var i=0;i<res.length;i++){
                detail[res[i].code] = {};
                detail[res[i].code]["checkbox"] = false
            }
            this.setState({
                productLine:res,
                detail:detail,
            });
        })
    }
    showModal(){
        if(this.props.editFlag){
            this.getRecordById()
        }
        this.setState({
            visible:true
        })
    }
    dataTypeChange(value){
        this.setState({
            dataType:value
        })
    }
    materialNameSelect(value){
        this.setState({
            materialName:value
        })
    }
    materialTypeSelect(value){
        this.setState({
            materialType:value,
            nameFlag:false
        })
        this.getmaterialName(value)
    }
    handleCancel(){
        this.setState({
            visible:false,
            materialName:undefined,//物料点名称
            materialType:undefined,//材料类别
            dataType:undefined,//物料来源
            detail:{},
            productLine:[]
        })
    }
    handleCreate(){
        let {dataType,materialName,materialType,detail}=this.state
        if((dataType==='')||materialName===''||!materialType===''){
            message.error('信息填写不完整!')
            return
        }
        let data={
            dataType: dataType,//物料来源
            materialCode: materialName,//物料点名称
            materialTypeCode: materialType,//材料类别
            weightDTOS: []
            },
            count=0,weightValue=[]
        for(let key in detail){
            if(detail[key].checkbox===true){
                let item={};
                item['lineCode']=key
                item['weightValue']=detail[key].value
                weightValue.push(item)
                count+=parseFloat(detail[key].value)
            }
        }
        if(count===0){
            message.error('信息填写不完整!')
            return
        }
        if(count!==1){
            message.error('所选项权值相加应等于1')
        }
        data.weightDTOS=weightValue
        axios({
            url:`${this.props.url.precursorRawmaterialLineWeight.add}`,
            method:this.props.editFlag?'put':'post',
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            data:data
        }).then((data)=>{
            if(data.data.code!==0){
                message.error(data.data.message);
                return
            }
            message.info("操作成功!");
            this.props.fetch();
            this.handleCancel()
        }).catch((error)=>{
            message.error('操作失败，请联系管理员!')
        })
        this.setState({
            visible:false
        })
    }
    getData = (data)=>{//复选框
        let detail = this.state.detail;
        detail[data.target.value]["checkbox"] = data.target.checked;
        this.setState({
            detail:detail
        })
    }
    getValue = (data)=>{//输入框
        let detail = this.state.detail;
        detail[data.target.name]["value"] = data.target.value;
        this.setState({
            detail:detail
        })
    }
    render(){
        let {nameFlag}=this.state
        return(
            <span>
                {this.props.editFlag?<span className='blue' onClick={this.showModal}>编辑</span>
                :<AddButton handleClick={this.showModal} name= '新增' className='fa fa-plus' />}
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title={this.props.editFlag?'编辑':'新增'} 
                    width='800px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    <div>
                        物料来源：<Select onChange={this.dataTypeChange} value={this.state.dataType} style={{ width:"20%"}} placeholder="请选择物料来源">
                        <Option key={1} value={1}>补料</Option>
                        <Option key={0} value={0}>仓库领料</Option>
                        </Select>&nbsp;&nbsp;&nbsp;
                        材料类别：<Select onChange={this.materialTypeSelect} value={this.state.materialType} style={{ width:"20%"}} placeholder="请选择材料类别">
                            {
                                this.state.materialTypeData?this.state.materialTypeData.map(data=>{
                                    return(
                                        <Option key={data.code} value={data.code}>{data.materialTypeName}</Option>
                                    )
                                }):null
                            }
                        </Select>&nbsp;&nbsp;&nbsp;
                        原材料名称：<Select onChange={this.materialNameSelect} value={this.state.materialName} style={{ width:"20%"}} placeholder="请选择原材料名称" disabled={nameFlag}>
                            {
                                this.state.materialNameData?this.state.materialNameData.map(data=>{
                                    return(
                                        <Option key={data.code} value={data.code}>{data.materialName}</Option>
                                    )
                                }):null
                            }
                        </Select>
                    </div>
                    <table className="productLine">
                            <thead className="productHead">
                                <tr>
                                    <th>产线名称</th>
                                    <th>是否所属</th>
                                    <th>权值</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.productLine?this.state.productLine.map((value,item)=>{
                                        let flag=null;
                                        let weightVal=null;
                                        for(let i in this.state.weightDto){
                                            if(this.state.weightDto[i].lineCode===value.code){
                                                flag=true
                                                weightVal=this.state.weightDto[i].weightValue
                                            }

                                        }
                                        return(
                                            <Tr getValue={this.getValue} getData={this.getData} weightVal={weightVal} flag={flag} value={value} key={item}/>
                                        )
                                    }):null
                                }
                            </tbody>
                    </table>
                </Modal>
            </span>
        )
    }
}
export default AddModal