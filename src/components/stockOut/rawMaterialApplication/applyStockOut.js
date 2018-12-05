import React from 'react';
import {Button,Modal,Table,Input} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import Submit from '../../BlockQuote/submit';
import './rawAdd.css';
const data = [];
for(var i = 1; i<=20; i++){
    data.push({
        id:`${i}`,
        materialName:'钴锰矿',
        materialClass:'钴锰矿一号',
        batchNumberId:'ECT/314314',
        quantity:'122',
        weight:'22' ,
        outQuantity:'',
        outWeight:'' 
    })
}
class ApplyStockOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            visible:false
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
        console.log(newData)
        // this.setState({
        //     dataSource:newData
        // })
    }
    render(){
        const keys = this.props.selectedRowKeys;
        var outData = this.props.data.forEach(d=>{
            var newD = d;
            for(var i = 0; i < keys.length;i++){
                if(keys[i]===d.id){
                    newD['outQuantity']='';
                    newD['outWeight']='';
                    newD['index']=i+1
                    return newD;
                }
            }
        })
        this.state.dataSource = outData;
        return (
            <span>
                <Button type='primary' size='default' className='button' onClick={this.apply} disabled={this.props.selectedRowKeys.length>0?false:true}><i className="fa fa-plus-square" style={{color:'white'}}></i> 申请出库</Button>
                <Modal title='申请' visible={this.state.visible}
                    closable= {false} width='1000px' maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <Submit key='submit' data = {this.state.dataSource}/>                       
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