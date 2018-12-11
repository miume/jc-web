import React from 'react';
import IsQualified from '../BlockQuote/isQualified';
import NewButton from '../BlockQuote/newButton';
import {Modal,Table, Divider} from 'antd';
import axios from 'axios';
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
        this.getDetailData = this.getDetailData.bind(this);
    }
    /**点击详情 */
    handleDetail(){
        this.getDetailData();
        this.setState({
            visible:true
        })
    }
    /**通过id获取数据 */
    getDetailData(){
        axios.get(`${this.props.server}/jc/common/rawTestReport/${this.props.value}`,{
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            console.log(res);
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
        const value = this.props.value;
        return (
            <span>
                <span className='blue' onClick={this.handleDetail} >详情</span>
                <Modal title='详情' visible={this.state.visible} closable={false}
                maskClosable={false} centered={true}
                 onCancel={this.handleCancel} style={{top:10}}
                 footer={[
                    <NewButton key="submit" handleClick={this.handleOk} name='确定' style='button' className='fa fa-check' />
                  ]}
                  >
                 <div style={{height:'550px'}}>
                     <table>
                         <thead className='thead'>
                             <tr>
                                 <td>批号</td><td>原材料</td><td>送样日期</td>
                             </tr>
                         </thead>
                         <tbody className='tbody'>
                             <tr>
                                 <td></td><td>{value.batchNumberId}</td><td>{value.date}</td>
                             </tr>
                         </tbody>
                     </table>
                     <div style={{padding:'10px'}}>
                         <span className='span'>样品名称：镍矿石样品</span>
                     </div>
                     <Table rowKey={record=>record.id} columns={columns1} dataSource={data} pagination={false} size='small' bordered scroll={{y:250}}></Table>
                     <div style={{padding:'10px',height:'40px',fontSize:'15px'}}>
                         <div style={{float:'left'}}>
                             <p className='span'>检验人：<span></span></p>
                             <p className='span'>检验时间：<span></span></p>
                         </div>
                         <IsQualified status={1}></IsQualified>
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