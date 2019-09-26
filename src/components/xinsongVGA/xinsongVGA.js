import React from "react";
import '../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';

class XinsongVGA extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[{
                index:1,
                VGAname:"1号叫料点"
            },{
                index:2,
                VGAname:"2号叫料点"
            },{
                index:3,
                VGAname:"3号叫料点"
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
            title: 'VGA点名称',
            dataIndex: 'VGAname',
            key: 'VGAname',
            align:'center',
            width: '60%',
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

export default XinsongVGA