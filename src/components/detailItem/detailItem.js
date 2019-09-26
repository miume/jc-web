import React from "react";
import '../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';

class DetailItem extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visiable:false,
            dataSource:[{
                index:1,
                materialName:"701#合成槽",
                type:"主材",
                process:"合成工序"
            },{
                index:2,
                materialName:"701#合成槽",
                type:"主材",
                process:"合成工序"
            },{
                index:3,
                materialName:"701#合成槽",
                type:"主材",
                process:"车间"
            },{
                index:4,
                materialName:"701#合成槽",
                type:"辅材",
                process:"烘干工序"
            },]
        }
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '20%',
        },{
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '20%',
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
                    <Table rowSelection={{}} columns={this.columns} rowKey={record => record.index} dataSource={this.state.dataSource} scroll={{ y: 400 }} size="small" bordered/>
                </div>
            </div>
        )
    }
}

export default DetailItem