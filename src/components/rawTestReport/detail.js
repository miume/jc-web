import React from 'react';
import {Modal,Button,Table, Divider,Icon} from 'antd';
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
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    /**点击详情 */
    handleDetail(){
        this.setState({
            visible:true
        })
    }
    /**点击确定按钮 */
    handleOk(){
        this.setState({
            visible:false
        })
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        return (
            <span>
                <a onClick={this.handleDetail} >详情</a>
                <Modal title='详情' visible={this.state.visible} closable={false}
                 onCancel={this.handleCancel} style={{top:15}}
                 footer={[
                    //  <Button key='submit' type='primary' size='large' onClick={this.handleOk} >确定</Button>,
                     <Button key='back' type='primary' size='large' onClick={this.handleCancel}><Icon type="left" />返回</Button>
                 ]}>
                 <div style={{height:'600px'}}>
                     <Table rowKey={record=>record.id} columns={columns} dataSource={[this.props.value]} pagination={false} size='small' bordered></Table>
                     <div style={{padding:'10px'}}>
                         <span>样品名称：镍矿石样品</span>
                     </div>
                     <Table rowKey={record=>record.id} columns={columns1} dataSource={data} pagination={false} size='small' bordered scroll={{y:330}}></Table>
                     <div style={{padding:'10px',height:'40px',fontSize:'15px'}}>
                         <div style={{float:'left'}}>
                             <span>检验人：</span><span></span><br/>
                             <span>检验时间：</span><span></span>
                         </div>
                         <div style={{float:'right'}}>
                             合格
                         </div>
                     </div>
                     <Divider type='horizontal'/>
                     <div style={{textAlign:'center',fontSize:'15px'}}>
                          审核中
                     </div>
                 </div>
                </Modal>
            </span>
        );
    }
}
export default Detail;