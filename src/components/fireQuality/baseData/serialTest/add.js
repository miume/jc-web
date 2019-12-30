import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal,Select,message,Checkbox} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";
const {Option}=Select
const {Group}=Checkbox
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            processData:[],
            lineData:[],
            testItemData:[],
            testItem:[],
        }
        this.showModal=this.showModal.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getProcess=this.getProcess.bind(this);
        this.getProductLine=this.getProductLine.bind(this);
        this.getItems=this.getItems.bind(this);
        this.getEditData=this.getEditData.bind(this);
        this.checkChange=this.checkChange.bind(this)
    }
    /**获取工序*/
    getProcess(){
        axios({
            url:`${this.props.url.fireMageNumber}/detail`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params: {
                position:1
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    processData:res
                })
            }
        })
    }
    /**获取厂家型号*/
    getProductLine(){
        axios({
            url:`${this.props.url.fireMageNumber}/detail`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                position:4
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    lineData:res
                })
            }
        })
    }
    /**获取检测项目*/
    getItems(){
        axios({
            url:`${this.props.url.fireMageTestItems}/getAll`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    testItemData:res
                })
            }
        })
    }
    /**根据id获取一条记录数据*/
    getEditData(){
        let id=this.props.record.code,{showFlag}=this.props //showFlag判断是标签还是批号界面
        axios({
            url:showFlag?`${this.props.url.fireMageLabel}/${id}`:`${this.props.url.fireMageBatchItems}/${id}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&!showFlag){//批号的编辑
               let item= res.items?res.items.filter(item=>item.flag===true):undefined,da=[]
               for(let i=0;i<item.length;i++){
                da.push(item[i].code)
               }
                this.setState({
                    testItem:da,
                    processCode:res.head&&res.head.processCode?res.head.processCode:undefined,
                    productCode:res.head&&res.head.productCode?res.head.productCode:undefined,
                    testItemData:res.items?res.items:undefined
                })
            }
          else if(res&&showFlag){//标签的编辑
                let item= res.filter(item=>item.flag===true),daLabel=[]
                for(let i=0;i<item.length;i++){
                    daLabel.push(item[i].code)
                }
                this.setState({
                    testItem:daLabel,
                    testItemData:res?res:undefined
                })
            }
        })
    }
    showModal(){
        let {editflag,showFlag}=this.props
        if(editflag){
            this.getEditData()
        }
        this.setState({
            visible:true
        })
        if(!editflag){//只有新增调用所有受检物料，编辑会返回item，所以不用调用此接口
            this.getItems()
        }
     if(!showFlag){//标签的新增不需要这两个下拉框
        this.getProductLine()
        this.getProcess()
     }
    }

    selectChange(value,option){
         let name=option.props.name
        this.setState({
             [name]:value
        })
    }
    checkChange(value){
        this.setState({
            testItem:value
        })
    }
    transformParams(){//新增编辑传的参数不一样，标签与批号也不一样，所以整理下
        let {editflag,showFlag,record}=this.props
        if(!showFlag&&!editflag){//批号的新增
            let params={
                processId:this.state.processCode,
                productId:this.state.productCode
            }
            return params
        }
        else if(editflag&&!showFlag){//批号的编辑
            let params={
                id:record.code
            }
            return params
        }
        else if(showFlag&&!editflag){//标签的新增

        }
        else if(editflag&&showFlag){//标签的编辑
            let params={
                id:record.code
            }
            return params
        }
    }
    handleCreate(){
        let {editflag,record,showFlag}=this.props,ids=this.state.testItem,items=this.state.testItem,{processCode,productCode}=this.state
        if(items.length===0){
            message.error('信息填写不完整!')
            return
        }
        if((!showFlag&&processCode===undefined)||(!showFlag&&productCode===undefined)){
            message.error('信息填写不完整!')
            return
        }
        let params=this.transformParams()
        axios({
            url:showFlag?this.props.url.fireMageLabel:this.props.url.fireMageBatchItems,
            method:editflag?'put':'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:showFlag?items:ids,
            params
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功！')
                this.props.getTableData()
                this.cancel()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    cancel(){
        let {editflag}=this.props
        this.setState({
            visible:false
        })
        if(editflag){
            this.getEditData()
        }
        else{
            this.setState({
                processCode:undefined,
                productCode:undefined,
                testItem:[]
            })
        }
    }
    render(){
        let {visible,changeFlag}=this.state,{editflag,record,showFlag}=this.props
        return(
            <span>
                {editflag?<span className={'blue'} onClick={this.showModal}>编辑</span>
                    : <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.showModal}/>}
                <Modal
                    title={editflag?'编辑':'新增'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'800px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        (<NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                    {
                        showFlag ? null:(
                         <div>
                             <div className={'fire-ins-data-acq1'}><span className='fireQua-add-span fireQua-add-span-width2'>请选择工序 : </span>
                                 <Select name={'name'} style={{width:'610px'}} placeholder={'请选择工序'} onChange={this.selectChange} value={this.state.processCode}>
                                     {
                                         this.state.processData?this.state.processData.map(item=>{
                                             return(
                                                 <Option key={item.code} value={item.code} name='processCode'>{item.value}</Option>
                                             )
                                         }):null
                                     }
                                 </Select>
                             </div>
                             <div className={'fire-ins-data-acq1'}> <span className='fireQua-add-span fireQua-add-span-width2' >请选择产品型号/厂家 : </span>
                                 <Select name={'unit'} style={{width:'610px'}} placeholder={'请选择产品型号/厂家'} onChange={this.selectChange} value={this.state.productCode}>
                                     {
                                         this.state.lineData?this.state.lineData.map(item=>{
                                             return(
                                                 <Option key={item.code} value={item.code} name='productCode'>{item.value}</Option>
                                             )
                                         }):null
                                     }
                                </Select>
                             </div>
                         </div>
                        )
                    }
                    <div className={'fire-ins-data-acq1'}>请选择绑定检验项目 : </div>
                    <div className={'fireQua-add-check-group fireIns-add-check-group-scroll'} style={{padding:'10px'}}>
                        <Group onChange={this.checkChange}  value={this.state.testItem} style={{width:'100%'}}>
                            {
                                this.state.testItemData?this.state.testItemData.map((item,index)=>{
                                    return(
                                      <span className='fireIns-add-check-group-span' key={index}> <Checkbox value={item.code}>{item.name}</Checkbox></span>
                                    )
                                }):null
                            }
                        </Group>
                    </div>
                </Modal>
            </span>
        )
    }
}
export default Add
