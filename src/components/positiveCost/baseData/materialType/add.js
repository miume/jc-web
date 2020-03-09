import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal, message, Input, Row, Col, Select,Table,Popconfirm} from 'antd'
import './type.css'
import axios from 'axios'
const {Option}=Select
class MaterialTypeAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            materialCode: undefined,
            materialName: undefined,
            processCode: undefined,
            processName: undefined,
            types:undefined,
            line:[],
            lineName:undefined,
            processData:[],
            lineData:[],
            tableData:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'属性名',
            dataIndex:'name',
            key:'name'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.tableDelete(record.id)}>
                        <span className={'blue'}>删除</span>
                    </Popconfirm>
                )
            }
        }]
        this.showModal=this.showModal.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleAddCancel=this.handleAddCancel.bind(this);
        this.getProcess=this.getProcess.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getLine=this.getLine.bind(this);
        this.lineChange=this.lineChange.bind(this);
    }

    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getProcess(){
        axios({
            url:`${this.props.url.positiveProcess.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    processData:res
                })
            }
          })
    }
    getLine(){
        axios({
            url:`${this.props.url.positiveProductline.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    lineData:res
                })
            }
          })
    }
    showModal(){
        this.setState({
            visible:true
        })
        if(this.props.editflag){
         let {materialName,processCode,types}=this.props.record
          this.setState({
              materialName:materialName,
              types:types,
              line:this.props.line,
              processCode:processCode,
          })
        }
        this.getProcess()
        this.getLine()
    }
    handleAdd(){
        let {materialName,types,line,processCode,processName,flag}=this.state
        if(!materialName||(types===undefined)||line.length===0||!processCode||flag===undefined){
            message.error('信息填写不完整!')
            return
        }
        let data={
            materialCode: this.props.editflag?this.props.record.materialCode:'',
            materialName: materialName,
            processCode: processCode,
            //processName: processName,
            types:types,
            weightDTOS: [],
            flag:flag
        }
        for(let i=0;i<line.length;i++){
            let a={}
            a['lineCode']=line[i].split('-')[0]
           // a['lineName']=line[i].split('-')[1]
            data.weightDTOS.push(a)
        }
        axios({
            url:this.props.editflag?this.props.url.positiveMaterialType.update:this.props.url.positiveMaterialType.add,
            method:this.props.editflag?"put":"post",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData()
            }
            else{
                message.error(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
       this.handleAddCancel()
    }
    handleAddCancel(){
        this.setState({
            visible:false
        })
    }
    inputChange(e){
        let value=e.target.value
        this.setState({
            materialName:value
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:value
        })
    }
    lineChange(value){
        this.setState({
            line:value
        })
    }

    render(){
        let {addFlag,updateFlag}=this.props
        return(
            <span>
                {this.props.editflag?<span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                :<span className={addFlag?'':'hide'}>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                </span>}
                <Modal
                    title={this.props.editflag?'编辑':'新增'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleAddCancel}/>,
                        <NewButton key='ok' handleClick={this.handleAdd} className='fa fa-check' name='确定'/>
                    ]}
                >
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire fontAdd'>物料种类名称:</Col>
                        <Col span={18}><Input placeholder='请输入物料种类名称' defaultValue={this.props.editflag?this.props.record.materialName:undefined} onChange={this.inputChange}/></Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire fontAdd'>数据类型:</Col>
                        <Col span={18}>
                            <Select placeholder='请选择数据类型' onChange={this.selectChange} defaultValue={this.props.editflag?this.props.record.types:undefined} style={{width:307.5}}>
                                <Option key={0} value={0}  name='types'>DCS读取数据</Option>
                                <Option key={1} value={1}  name='types'>手工输入数据</Option>
                                <Option key={2} value={2}  name='types'>智能仓库</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire fontAdd'>所属工序:</Col>
                        <Col span={18}>
                            <Select placeholder='请选择所属工序' onChange={this.selectChange} defaultValue={this.props.editflag?this.props.record.processCode:undefined} style={{width:307.5}}>
                                {
                                    this.state.processData?this.state.processData.map(data=>{
                                        return(
                                            <Option key={data.code} value={data.code} name='processCode'>{data.processName}</Option>
                                        )
                                    }):null
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire fontAdd'>产线:</Col>
                        <Col span={18}>
                            <Select placeholder='请选择产线' mode="multiple" optionLabelProp="label" onChange={this.lineChange} defaultValue={this.props.editflag?this.props.line:undefined}  style={{width:307.5}}>
                                {
                                    this.state.lineData?this.state.lineData.map(data=>{
                                        return(
                                            <Option key={data.code} label={data.name} value={`${data.code}-${data.name}`} name='lineCode'>{data.name}</Option>
                                        )
                                    }):null
                                }
                            </Select>
                        </Col>
                    </Row>
                     <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire fontAdd'>物料标记:</Col>
                        <Col span={18}>
                            <Select placeholder='请选择物料标记'  onChange={this.selectChange}   style={{width:307.5}}>
                                <Option value={1} name='flag'>正常物料</Option>
                                <Option value={0} name='flag'>手工物料</Option>
                            </Select>
                        </Col>
                    </Row>

                </Modal>
            </span>
        );
    }
}
export default MaterialTypeAdd