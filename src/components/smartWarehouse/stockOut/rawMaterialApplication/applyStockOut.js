import React from 'react';
import {Button,Modal,Table,Input,message} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import Submit from '../../../BlockQuote/submit';
import './rawAdd.css';
import axios from 'axios';
import BatchNumberSelect from "./batchNumberSelect";
// const data = [];
// for(var i = 1; i<=20; i++){
//     data.push({
//         id:`${i}`,
//         materialName:'钴锰矿',
//         materialClass:'钴锰矿一号',
//         batchNumberId:'ECT/314314',
//         quantity:'122',
//         weight:'22' ,
//         outQuantity:'',
//         outWeight:''
//     })
// }
class ApplyStockOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            visible:false,
            visible1:false,
            process:-1,      //用来存取送审流程,
            urgent:0,
            batch: ''
        }
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'5%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'12%'
        },{
            title:'货物类型',
            dataIndex:'materialClass',
            key:'materialClass',
            width:'13%',
            render:(text)=>{
                switch(text){
                    case 1: return '原材料';
                    case 2: return '中间件';
                    case 3: return '成品';
                    default:return '';
                }
            }
        },{
            title:'编号',
            dataIndex:'serialNumber',
            key:'serialNumber',
            width:'19%',
            render:(text)=>{
                if(text.length>24){
                    return <span className='text-decoration' title={text}>{text.substring(0,24)}</span>
                }else{
                    return <span className='text-decoration'>{text}</span>
                }
            }
        },{
            title:'库存重量',
            dataIndex:'weight',
            key:'weight',
            width:'10%'
        },{
            title:'出库重量',
            dataIndex:'outWeight',
            key:'outWeight',
            width:'15%',
            render:(text,record)=>{return <Input id={record.id} name='outWeight' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库重量' onChange={this.save} />},
            className:'tdStyle'
        }]
        this.apply = this.apply.bind(this);
        this.handleCancel =this.handleCancel.bind(this);
        this.save = this.save.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.getBatchNumber= this.getBatchNumber.bind(this);
    }
    /**申请出库弹出框 点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false,
            batch: ''
        })
        /**实现取消选中 */
        this.props.cancle();
    }

    /**点击申请按钮，弹出弹出框 */
    apply(){
        const keys = this.props.selectedRowKeys;
        var outData = [];
        this.props.data.forEach(d=>{
            var newD = d;
            for(var i = 0; i < keys.length;i++){
                if(keys[i]===d.id){
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
        newData[index][name] = value.toString();
    }
    /**监控申请送审弹出框的visible */
    handleVisibleChange(visible){
        this.setState({
            visible1:visible
        })
    }
    /**监听select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
     /**监控是否紧急 */
     urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
     /**监控申请送审 保存 */
     handleSave(){
        this.applyOut(0);
    }
    /**点击确定送审 */
    handleOkApply(){
        this.applyOut(1);
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            visible1:false,
        })
        this.props.cancle();
    }
    /**保存 */
    applyOut(status){
        const createPersonId = JSON.parse(localStorage.getItem('menuList')).userId;
        let {batch} = this.state;
        if(!batch) {
            message.info('请先确定批次规则！')
            return
        }
        const commonBatchNumber = {
            createPersonId:createPersonId,
            batch: this.state.batch
        }
        const details = [];
        const data = this.state.dataSource;
        for(var i=0; i<data.length;i++ )
        {
            var e = data[i];
            if(!e.outWeight){
                message.info('出库重量不能为空！');
                return
            }
            details.push({
                stockId:parseInt(e.id),
                // quantity:1,
                weight:parseInt(e.outWeight)
            })
        }
        axios.post(`${this.props.url.stockOut.repoOut}`,{
            commonBatchNumber:commonBatchNumber,
            details:details
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }else{
                message.info(data.data.message);
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
        this.setState({
            visible:false,
            visible1:false,
            batch: ''
        })
        this.props.cancle();
    }
    /**送审 */
    applyReview(dataId){
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }

    /**在组件BatchNumberSelect中获取batchNumber批号显示*/
    getBatchNumber(batch) {
        this.setState({
            batch: batch.join('')
        })
    }

    render(){
        this.toDoList = JSON.parse(localStorage.getItem('url')).toDoList
        return (
            <span className={this.props.flag?'':'hide'}>
                <Button type='primary' size='default' style={{margin:'0 0 8px 0'}} className={this.props.selectedRowKeys&&this.props.selectedRowKeys.length>0?'blue':'grey'}
                        onClick={this.apply} disabled={this.props.selectedRowKeys && this.props.selectedRowKeys.length>0?false:true}><i className="fa fa-plus-square" ></i> 申请出库</Button>
                <Modal title='申请' visible={this.state.visible} centered={true}
                    closable= {false} width='1000px' maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange}
                                url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply} defaultChecked={false}/>
                    ]}
                >
                <div style={{height:'50vh',overflow:'auto'}}>
                    <BatchNumberSelect url={this.props.url} batchNumber={this.state.batch} getBatchNumber={this.getBatchNumber}/>
                    <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} bordered size='small' pagination={false} rowClassName={() => 'editable-row'}></Table>
                </div>
                </Modal>
            </span>
        );
    }
}
export default ApplyStockOut;
