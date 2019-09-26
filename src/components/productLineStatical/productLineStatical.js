import React from "react";
import '../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';

class ProductLineStatical extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[{
                index:1,
                materialName:"701#合成槽",
                type:"主材",
                process:"合成工序",
                value:`1#产线 0.2,2#产线 0.3,3#产线 0.3,4#产线 0.2`
            },{
                index:2,
                materialName:"701#合成槽",
                type:"主材",
                process:"合成工序",
                value:`1#产线 0.2,2#产线 0.3,3#产线 0.3,4#产线 0.2`
            },{
                index:3,
                materialName:"701#合成槽",
                type:"主材",
                process:"合成工序",
                value:`1#产线 0.2,2#产线 0.3,3#产线 0.3,4#产线 0.2`
            }]
        }
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '10%',
        },{
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '15%',
        },{
            title: '所属类别',
            dataIndex: 'type',
            key: 'type',
            align:'center',
            width: '20%',
        },{
            title: '所属工序',
            dataIndex: 'process',
            key: 'process',
            align:'center',
            width: '20%',
        },{
            title: '产线/权重',
            dataIndex: 'value',
            key: 'value',
            align:'center',
            width: '25%',
            render:(text,record)=>{
                var record = record.value.split(",");
                return(
                    record.map((item,index)=>{
                        return(<div key={index}>
                            {item}
                        </div>)
                    })
                )
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                return(
                    <span>
                        <span className="blue">编辑</span>
                        <Divider type="vertical"/>
                        <span className="blue">删除</span>
                    </span>
                )
            }
        }]
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal />
                    <DeleteByIds 
                        selectedRowKeys = {[1]}
                    />
                    <SearchCell flag={true}/>
                    <div className='clear' ></div>
                    <Table rowSelection={{}} columns={this.columns} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </div>
            </div>
        )
    }
}

export default ProductLineStatical