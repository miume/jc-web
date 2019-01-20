import React from 'react';
import {Button,Modal,Table,Input,message} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import Submit from '../../BlockQuote/submit';
import SaveButton from '../../BlockQuote/saveButton';
import './rawAdd.css';
import axios from 'axios';
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
            urgent:0
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
            dataIndex:'materialClass',
            key:'materialClass',
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
            render:(text,record)=>{return <Input id={record.id} name='outQuantity' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库数量' onChange={this.save} />},
            className:'tdStyle'
        },{
            title:'出库重量',
            dataIndex:'outWeight',
            key:'outWeight',
            align:'center',
            width:'15%',
            render:(text,record)=>{return <Input id={record.id} name='outWeight' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库重量' onChange={this.save} />},
            className:'tdStyle'
        }]
        this.apply = this.apply.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel =this.handleCancel.bind(this);
        this.save = this.save.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.applyReview = this.applyReview.bind(this);
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
        this.setState({
            visible:true
        })
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
        
        this.state.dataSource = outData;
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
        //console.log(checked)
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
        const commonBatchNumber = {
            createPersonId:createPersonId,
            // isUrgent:this.state.urgent
        }
        const details = [];
        const data = this.state.dataSource;
        for(var i=0; i<data.length;i++ )
        {
            var e = data[i];
            if(!e.outQuantity || !e.outWeight){
                message.info('出库数量和出库重量都不能为空！');
                return 
            }
            details.push({
                stockId:parseInt(e.id),
                quantity:parseInt(e.outQuantity),
                weight:parseInt(e.outWeight)
            })
        }
        // const taskId = parseInt(this.state.process) !== -1?parseInt(this.state.process) :''
        //console.log(taskId)
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
                //console.log(dataId)
                this.applyReview(dataId);
            }else{
                message.info(data.data.message);
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
        this.setState({
            visible:false,
            visible1:false
        })
        this.props.cancle();
    }
    /**送审 */
    applyReview(dataId){
        //console.log(this.state.urgent)
        // console.log(this.state.process)
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                // taskId:parseInt(this.state.process),
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
    render(){
        this.toDoList = JSON.parse(localStorage.getItem('url')).toDoList
        return (
            <span>
                <Button type='primary' size='default' className={this.props.selectedRowKeys&&this.props.selectedRowKeys.length>0?'blue':'grey'} onClick={this.apply} disabled={this.props.selectedRowKeys.length>0?false:true}><i className="fa fa-plus-square" ></i> 申请出库</Button>
                <Modal title='申请' visible={this.state.visible} centered={true}
                    closable= {false} width='1000px' maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.handleSave} />,
                        <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply} defaultChecked={false}/>                       
                    ]}
                >
                <div style={{height:'250px'}}>
                    <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} bordered size='small' scroll={{y:216}} pagination={false} rowClassName={() => 'editable-row'}></Table>
                </div>
                </Modal>
            </span>
        );
    }
}
export default ApplyStockOut;