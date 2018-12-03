import React from 'react';
import {Button,Modal,Table} from 'antd';
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
            dataSource:data,
            visible:false
        }
        this.columns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
            sorter:(a,b)=>a.id-b.id,
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
            width:'13%'
        },{
            title:'批号',
            dataIndex:'batchNumberId',
            key:'batchNumberId',
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
            render:(record)=>{return <input id={record.id} name='outQuantity' style={{border:'none',width:'100%',height:'38px'}} placeholder='请输入出库数量' onChange={this.save} />},
        },{
            title:'出库重量',
            dataIndex:'outWeight',
            key:'outWeight',
            align:'center',
            width:'15%',
            render:(record)=>{return <input id={record.id} name='outWeight' style={{border:'none',width:'100%',height:'38px'}} placeholder='请输入出库重量' onChange={this.save} />},

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
        const name = e.target.name;
        const id = e.target.id
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item=> id===item.id);
        newData[index][name] = value;
        this.setState({
            dataSource:newData
        })
    }
    render(){
        return (
            <span>
                <Button type='primary' size='default' className='button' onClick={this.apply} ><i className="fa fa-plus-square" style={{color:'white'}}></i> 申请出库</Button>
                <Modal title='申请' visible={this.state.visible}
                    closable= {false} width='1100px' maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        // <Button key='back' type='ghost' onClick={this.handleCancel} style={{float:'left'}}><Icon type="close" />取消</Button>,
                        <Submit key='submit' data = {this.state.dataSource}/>                       
                    ]}
                >
                <div style={{height:'400px'}}>
                    <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} bordered size='small' scroll={{y:330}} pagination={false} rowClassName={() => 'editable-row'}></Table>
                </div>
                </Modal>
            </span>
        );
    }
}
export default ApplyStockOut;