import React from 'react';
import {Modal,Table} from 'antd';
import axios from 'axios';
import NewButton from '../BlockQuote/newButton';
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataSource:[]
        }
        this.handleDetial = this.handleDetial.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'15%',
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'15%',
        },{
            title:'货物类型',
            dataIndex:'meterialClass',
            key:'meterialClass',
            align:'center',
            width:'15%',
        },{
            title:'编号',
            dataIndex:'serialNumber',
            key:'serialNumber',
            align:'center',
            width:'20%',
        },{
            title:'出库数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'15%',
        },{
            title:'出库重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'15%',
        }]
    }
    /**点击详情 显示弹出框 */
    handleDetial(){
        axios({
            url:`${this.props.url.stockOut.repoOut}/${this.props.id}`,
            method:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then((data)=>{
            const res = data.data.data?data.data.data.details:[];
            var detail = [];
            for(var i = 0; i < res.length; i++){
                var e = res[i];
                detail.push({
                    index:`${i+1}`,
                    serialNumber:e.repoBaseSerialNumber.serialNumber,
                    materialName:e.repoBaseSerialNumber.materialName,
                    meterialClass:e.repoBaseSerialNumber.materialClass,
                    quantity:e.repoOutApply.quantity,
                    weight:e.repoOutApply.weight
                })
            }
            // console.log(detail)
            this.setState({
                visible:true,
                dataSource:detail
            })
        })
    }
    /**点击详情确认按钮 取消弹出框 */
    handleClick(){
        this.setState({
            visible:false
        })
    }
    render(){
        return (
            <span>
                <span className='blue' onClick={this.handleDetial}>详情</span>
                <Modal visible={this.state.visible} closable={false} maskCloseable={false}
                width={800} title='出库详情' centered={true}
                footer={[
                    <NewButton key='back' name='确定' className='fa fa-check' handleClick={this.handleClick}/>
                ]}
                >
                <div style={{height:'300px'}}>
                    <Table rowKey={record=>record.index} dataSource={this.state.dataSource} columns={this.columns} pagination={false} bordered size='small' scroll={{y:200}}></Table>
                </div>
                </Modal>
            </span>
        );
    }
}
export default Detail;