import React from 'react';
import {Modal,Button,Table,Icon} from 'antd';
const columns = [{
    title:'批号',
    dataIndex:'batchNumber',
    key:'batchNumber',
    align:'center',
    width:'33%'
},{
    title:'原材料',
    dataIndex:'raw',
    key:'raw',
    align:'center',
    width:'33%'
},{
    title:'送样日期',
    dataIndex:'date',
    key:'date',
    align:'center',
    width:'33%'
},]
const columns1 = [{
    title:'序号',
    dataIndex:'id',
    key:'id',
    align:'center',
    width:'10%'
},{
    title:'检测项目',
    dataIndex:'testItem',
    key:'testItem',
    align:'center',
    width:'30%'
},{
    title:'检测结果',
    dataIndex:'result',
    key:'result',
    align:'center',
    width:'30%'
},{
    title:'计量单位',
    dataIndex:'unit',
    key:'unit',
    align:'center',
    width:'30%'
},]
const data = [];
for(var i = 1; i <=10; i++){
    data.push({
        id:i,
        testItem:`Ca${i}`,
        result:`结果${i}`,
        unit:'g/ml'
    })
}
class RecordChecking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.recordChecking = this.recordChecking.bind(this);
    }
    /**点击录检 弹出框显示 */
    handleClick(){
        this.setState({
            visible:true
        })  
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    /**点击保存按钮 */
    handleSave(){
        this.setState({
            visible:false
        })
    }
    /**点击录检按钮 */
    recordChecking(){
        this.setState({
            visible:false
        })
    }
    render(){
        return (
            <span>
                <a onClick={this.handleClick}>录检</a>
                <Modal title='数据录检' visible={this.state.visible} style={{top:20}} closable={false}
                footer={[
                    <Button key='back' type='ghost' size='large' onClick={this.handleCancel} style={{float:'left'}}><Icon type="close" />取消</Button>,
                    <Button key='save' type='primary' size='large' onClick={this.handleSave}><Icon type="appstore" />保存</Button>,
                    <Button key='submit' type='primary' size='large' onClick={this.recordChecking}><Icon type="check" />送审</Button>
                ]}>
                <div style={{height:'600px'}}>
                     <Table rowKey={record=>record.id} columns={columns} dataSource={[this.props.value]} pagination={false} size='small' bordered></Table>
                     <div style={{padding:'10px'}}>
                         <span>样品名称：镍矿石样品</span>
                     </div>
                     <Table rowKey={record=>record.id} columns={columns1} dataSource={data} pagination={false} size='small' bordered scroll={{y:330}}></Table>
                     <div style={{padding:'20px',height:'80px',fontSize:'15px'}}>
                         <div style={{float:'left'}}>
                             <span>检验人：</span><span></span><br/>
                             <span>检验时间：</span><span></span>
                         </div>
                         <div style={{float:'right'}}>
                             <div style={{float:'left'}}>合格</div>
                             <div style={{float:'right'}}>不合格</div>
                         </div>
                     </div>

                </div>
                </Modal>
            </span>
        );
    }
}
export default RecordChecking;