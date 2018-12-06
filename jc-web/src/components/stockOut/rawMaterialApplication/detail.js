import React from 'react';
import {Modal,Table} from 'antd';
import NewButton from '../../BlockQuote/newButton';
import axios from 'axios';
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
        this.detailClick = this.detailClick.bind(this);
        this.handleOk = this.handleOk.bind(this);
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
            title:'出库数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'10%'
        },{
            title:'出库重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'10%'
        }
        // ,{
        //     title:'出库数量',
        //     dataIndex:'outQuantity',
        //     key:'outQuantity',
        //     align:'center',
        //     width:'15%',
        // },{
        //     title:'出库重量',
        //     dataIndex:'outWeight',
        //     key:'outWeight',
        //     align:'center',
        //     width:'15%',
        // }
    ]}
    /**弹出详情框 */
    detailClick(){
        this.setState({
            visible:true
        })
        axios({
            url:`${this.props.server}/jc/common/repoOutApply/getByBatchNumberId?batchNumberId=${this.props.id}`,
            method:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            console.log(res)
        })
    }
    /**取消弹出框 */
    handleOk(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <span>
                <span className='blue' onClick={this.detailClick}>详情</span>
                <Modal visible={this.state.visible} closable={false} maskClosable={false} width={900}
                title='详情'
                footer={[
                    <NewButton key='submit' handleClick={this.handleOk} name='确定' className='fa fa-check' />
                ]}
                >
                <div style={{height:'400px'}}>
                    <Table rowKey={record=>record.id} columns={this.columns} pagination={false} scroll={{y:300}} bordered size='small'></Table>
                </div>
                </Modal>
            </span>
        );
    }
}
export default Detail;