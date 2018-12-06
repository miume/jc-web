import React from 'react';
import {Button,Modal,Table,Input,message} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import Submit from '../../BlockQuote/submit';
import './rawAdd.css';
import axios from 'axios';
class ApplyStockOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            visible:false,
            visible1:false,
            urgent : false,
            process : -1,
        }
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'9%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'12%'
        },{
            title:'货物类型',
            dataIndex:'materialType',
            key:'materialType',
            align:'center',
            width:'13%',
            render:(text,record)=>{
                switch(text){
                    case 1: return '原材料';
                    case 2: return '中间件';
                    case 3: return '产品';
                    default:return '';
                }
            }
        },{
            title:'编号',
            dataIndex:'serialNumber',
            key:'serialNumber',
            align:'center',
            width:'15%'
        },{
            title:'库存数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'10%'
        },{
            title:'库存重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'10%'
        },{
            title:'出库数量',
            dataIndex:'outQuantity',
            key:'outQuantity',
            align:'center',
            width:'15%',
            render:(text,record)=>{return <Input className='numberInput' id={record.id} name='outQuantity' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库数量' onChange={this.save} />},
            className:'tdStyle'
        },{
            title:'出库重量',
            dataIndex:'outWeight',
            key:'outWeight',
            align:'center',
            width:'15%',
            render:(text,record)=>{return <Input className='numberInput' id={record.id} name='outWeight' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库重量' onChange={this.save} />},
            className:'tdStyle'
        }]
        this.apply = this.apply.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel =this.handleCancel.bind(this);
        this.save = this.save.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleOk1 = this.handleOk1.bind(this);
        this.handleCancel1 = this.handleCancel1.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    /**申请出库弹出框 点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
        /**实现取消选中 */
        this.props.cancle();
    }
    /**申请出库弹出框 点击送审按钮 */
    handleOk(){
        // this.setState({
        //     visible:false
        // })
    }
    /**点击申请按钮，弹出弹出框 */
    apply(){
        const keys = this.props.selectedRowKeys;
        var outData = [];
        this.props.data.forEach(d=>{
            var newD = d;
            for(var i = 0; i < keys.length;i++){
                if(keys[i]===d.id){
                    newD['outQuantity']='';
                    newD['outWeight']='';
                    newD['index']=i+1;
                    outData.push(newD)
                }
            }
            
        })
        this.setState({
            visible:true,
            dataSource:outData
        })
    }
    /**input框内容变化，实现自动保存数据 */
    save(e){
        const value = e.target.value;
        const name = e.target.name.toString();
        const id = e.target.id
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        // console.log(newData[index].id )
        newData[index][name] = value.toString();
    }
    /**监控送审界面的visible */
    handleVisibleChange=(visible)=>{
        if(visible===true){
           const inputClass = document.getElementsByClassName('numberInput') ;
           for(var i = 0; i < inputClass.length; i++){
                if(inputClass[i].value===''){
                    message.info('出库数量和出库重量都不能为空！');
                    return
                }
           }
           this.setState({
            visible1:visible,
        })
        }
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked
        })
    }
     /**监听送审select变化事件 */
     selectChange(value){
        this.setState({
            process:value
        })
    }
    /**点击取消送审 */
    handleCancel1(){
        this.setState({
            visible1:false
        })
    }
    /**点击送审 确定 */
    handleOk1(){
        this.setState({
            visible1:false,
            visible:false
        })
        const userId = JSON.parse(localStorage.getItem('menuList')).userId;
        var details = [];
        this.state.dataSource.forEach(d=>{
            details.push({
                stockId:d.id,
                quantity:parseInt(d.outQuantity),
                weight:parseInt(d.outWeight)
            })
        })
        var commonBatchNumber ={
            createPersonId:userId,
            isUrgent:this.state.urgent?1:0
        }
        axios.post(
            `${this.props.server}/jc/common/repoOutApply/outApply`, 
            {
                commonBatchNumber:commonBatchNumber,
                details:details
            },
            {
                headers : {
                    'Authorization': this.props.Authorization
                },
                params:{
                    taskId : parseInt(this.state.process)
                } 
            }
        ).then((data)=>{
                message.info(data.data.message);
                this.props.fetch();
            }).catch((error)=>{
                message.info('送审失败，请联系管理员！')
            })
        // axios({
        //     url:`${this.props.server}/jc/common/repoOutApply/outApply`, 
        //     method:'post',
        //     headers:{
        //         'Authorization': this.props.Authorization
        //       },
        //     params:{
               
        //             commonBatchNumber:commonBatchNumber,
        //             details:details
                
        //     },
        //     type:'json'
        // }).then((data)=>{
        //     console.log(data.data)
        //     message.info(data.data.message)
        // }).catch((error)=>{
        //     console.log(error)
        //     message.info('送审失败，请联系管理员！')
        // })
    }
    /**送审接口调用 */
    outApply=(data)=>{
        console.log('outApply')
        axios({
            url:`${this.props.server}/jc/common/repoOutApply/outApply`,
            method:'post',
            headers:{
                'Authorization':this.props.Authorization
            },
            params:data
        }).then((data)=>{
            console.log(data.data)
            message.info(data.data.message)
        }).catch((error)=>{
            console.log(error.data)
            message.info('送审失败，请联系管理员！')
        })
    }
    render(){
        
        //console.log(outData)
        return (
            <span>
                <Button type='primary' size='default' className='button' onClick={this.apply} disabled={this.props.selectedRowKeys.length>0?false:true}><i className="fa fa-plus-square" style={{color:'white'}}></i> 申请出库</Button>
                <Modal title='申请' visible={this.state.visible}
                    closable= {false} width='1000px' maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <Submit key='submit' data = {this.state.dataSource} visible={this.state.visible1} handleCancel={this.handleCancel1} handleOk={this.handleOk1} urgentChange={this.urgentChange} selectChange={this.selectChange} handleVisibleChange={this.handleVisibleChange} process={this.state.process} />                       
                    ]}
                >
                <div style={{height:'250px'}}>
                    <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} bordered size='small' scroll={{y:230}} pagination={false} rowClassName={() => 'editable-row'}></Table>
                </div>
                </Modal>
            </span>
        );
    }
}
export default ApplyStockOut;