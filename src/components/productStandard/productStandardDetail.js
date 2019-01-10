import React from 'react';
import {Table,Divider} from 'antd';
import AddProductStandard from './addProductStandard';
class ProductStandardDetail extends React.Component{
    status
    constructor(props){
        super(props);
        this.status = JSON.parse(localStorage.getItem('status'));
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'5%',
            align:'center'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            width:'15%',
            align:'center'
        },{
            title:'创建时间',
            dataIndex:'createTime',
            key:'createTime',
            width:'15%',
            align:'center'
        },{
            title:'创建人',
            dataIndex:'name',
            key:'name',
            width:'10%',
            align:'center'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',      
            width:'10%',
            align:'center',
            render:status=>{
                return this.status[status.toString()];
            }
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                const status = record.status;
                return(
                    <span>
                        <AddProductStandard flag={1} batchNumberId={text} url={this.props.url} data={this.props.topData} status={status} />
                        <Divider type='vertical'/>
                        <AddProductStandard flag={2} batchNumberId={text} url={this.props.url} data={this.props.topData} status={status} />
                    </span>
                );
            }
        }]
    }
    render(){
        return (
            <div className='standard-table'>
                <Table columns={this.columns} pagination={false} size='small' scroll={{y:300}}
                rowKey={record=>record.id}  dataSource={this.props.data} bordered
                rowClassName={(record,index)=>index===1?'table-implemention':''}
                />
            </div>
        );
    }
}
export default ProductStandardDetail;