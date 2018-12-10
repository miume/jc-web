import React from 'react';
import {Modal,Button,Input,Table} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace'
import axios from 'axios'
import "./difference.css"

const columns = [{
        title: '负责人',
        dataIndex: 'personName' ,
        key: 'personName',
        width: '30%',
        align:'center',
      },{
        title: '职责',
        dataIndex: 'responsibility' ,
        key: 'responsibility',
        width: '30%',
        align:'center',
}]


class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            data : [],
            data1 : []
        }
        this.server = localStorage.getItem('remote');
        this.handleDetail = this.handleDetail.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.fetch = this.fetch.bind(this);
    }
    fetch = (id) => {
        axios({
            url:`${this.server}/jc/common/batchAuditTask/`+parseInt(id),
            method:"GET",
        }).then((data) => {
            const res = data.data.data;
            var dataName = [{}]
            dataName[0].description = res.commonBatchNumber.description
            this.setState({
                data : res.details,
                data1 : dataName
            })
        })
    }
    /**处理一条详情记录 */
    handleDetail() {
        console.log(this.props.value)
        this.fetch(this.props.value.commonBatchNumber.id)
        this.setState({
          visible: true
        });
    }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    render(){
        const td = this.state.data1.map(p=>
            <td key={p.description.toString()}>{p.description}</td>
        )
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.visible}
                    onCancel={this.handleCancel} width='700px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                         <table className="custom_tb">
                             <thead className='thead'>
                                 <tr>
                                     <td>流程名称</td>
                                     <td>所属工艺</td>
                                 </tr>
                             </thead>
                             <tbody className='tbody'>
                                <tr>
                                {td}
                                <td></td>
                                </tr>
                             </tbody>
                         </table>
                         <WhiteSpace />
                         <Table columns={columns} rowKey={record => record.responsibility} size='small' pagination={false} bordered dataSource={this.state.data}></Table>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default Detail