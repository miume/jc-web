import React from "react";
import '../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';

class MaterialPLC extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[{
                index:1,
                name:"701#合成槽",
                PLCaddress:"plc地址"
            },{
                index:2,
                name:"701#合成槽",
                PLCaddress:"plc地址1"
            },{
                index:3,
                name:"701#合成槽",
                PLCaddress:"plc地址2"
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
            width: '20%',
        },{
            title: '物料名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '30%',
        },{
            title: 'PLC地址表',
            dataIndex: 'PLCaddress',
            key: 'PLCaddress',
            align:'center',
            width: '30%',
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

export default MaterialPLC