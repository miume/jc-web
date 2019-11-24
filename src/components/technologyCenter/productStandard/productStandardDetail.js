import React from 'react';
import {Table,Divider} from 'antd';
import AddProductStandard from './addProductStandard';
import AddModal from "./addModal";
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
            width:'10%',
        },{
            title:'批号',
            dataIndex:'commonBath',
            key:'commonBath',
            width:'15%',
        },{
            title:'创建时间',
            dataIndex:'createTime',
            key:'createTime',
            width:'15%',
        },{
            title:'创建人',
            dataIndex:'createPeople',
            key:'createPeople',
            width:'10%',
        },{
            title:'审核状态',
            dataIndex:'audit',
            key:'audit',
            width:'10%',
            render:status=>{
                return this.status[status.toString()];
            }
        },{
            title:'操作',
            dataIndex:'commonBatchId',
            key:'commonBatchId',
            width:'10%',
            render:(text,record)=>{
                let {audit,isPublished} = record;
                return(
                    <span className={isPublished?'product-table-span':''}>
                        <AddProductStandard selItemsFlag={false} flag={1} batchNumberId={text} url={this.props.url} data={this.props.topData} status={audit} getAllProductStandard={this.props.getAllProductStandard}/>
                        <span className={this.props.editorFlag?'':'hide'}>
                            <Divider type='vertical'/>
                        </span>
                        <AddModal flag={1} editorFlag={this.props.editorFlag} batchNumberId={text} url={this.props.url} data={this.props.topData}
                                  status={audit} getAllProductStandard={this.props.getAllProductStandard} title={'编辑'}/>
                        <span className={isPublished?'product-table-span-on':'hide'}><span>实施中</span></span>
                    </span>
                );
            }
        }]
    }
    render(){
        var height1 = document.body.clientHeight-350;
        return (
            <div className='standard-table' style={{height:height1}}>
                <Table columns={this.columns} pagination={false} size='small' scroll={{y:300}}
                rowKey={record=>record.commonBatchId}  dataSource={this.props.data} bordered
                rowClassName={(record)=>record.isPublished?'table-implemention':''}
                />
            </div>
        );
    }
}
export default ProductStandardDetail;
