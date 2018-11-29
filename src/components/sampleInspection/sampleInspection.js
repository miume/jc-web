import React from "react";
import BlockQuote from '../BlockQuote/blockquote';
import axios from "axios";
import {message,Table,Divider} from "antd";
import WhiteSpace from '../BlockQuote/whiteSpace';
import '../Home/page.css';
import SearchCell from '../BlockQuote/search'
import AddModal from './addModal'
// import Delete from './delete'

const data = [{
    index : '1',
    id : '1',
    key: '1',
    deliverTime:'2018年6月10日',
    deliver:'张小刚',
    deliveryFactory:'原料工厂',
    serialNumber:'ECT/1231245',
    testItem:'TD',
    urgentComment:'加急',
    type:'样品送检',
    status:'待接受',
    handleComment:'无',
},{
    index : '2',
    id : '2',
    key: '2',
    deliverTime:'2018年6月10日',
    deliver:'张小刚',
    deliveryFactory:'原料工厂',
    serialNumber:'ECT/1231245',
    testItem:'TD',
    urgentComment:'加急',
    type:'样品送检',
    status:'待接受',
    handleComment:'无',
},{
    index : '3',
    id : '3',
    key: '3',
    deliverTime:'2018年6月10日',
    deliver:'张小刚',
    deliveryFactory:'原料工厂',
    serialNumber:'ECT/1231245',
    testItem:'TD',
    urgentComment:'加急',
    type:'样品送检',
    status:'待接受',
    handleComment:'无',
},{
    index : '4',
    id : '4',
    key: '4',
    deliverTime:'2018年6月10日',
    deliver:'张小刚',
    deliveryFactory:'原料工厂',
    serialNumber:'ECT/1231245',
    testItem:'TD',
    urgentComment:'加急',
    type:'样品送检',
    status:'待接受',
    handleComment:'无',
},{
    index : '5',
    id : '5',
    key: '5',
    deliverTime:'2018年6月10日',
    deliver:'张小刚',
    deliveryFactory:'原料工厂',
    serialNumber:'ECT/1231245',
    testItem:'TD',
    urgentComment:'加急',
    type:'样品送检',
    status:'待接受',
    handleComment:'无',
},]


class SampleInspection extends React.Component{
     columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '6%',
    },{
        title: '送样日期',
        dataIndex: 'deliverTime',
        key: 'deliverTime',
        align:'center',
        width: '10%',
    },{
        title: '送样人',
        dataIndex: 'deliver',
        key: 'deliver',
        align:'center',
        width: '10%',
    },{
        title: '送样工厂',
        dataIndex: 'deliveryFactory',
        key: 'deliveryFactory',
        align:'center',
        width: '10%',
    },{
        title: '批号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        align:'center',
        width: '10%',
    },{
        title: '检测项目',
        dataIndex: 'testItem',
        key: 'testItem',
        align:'center',
        width: '10%',
    },{
        title: '异常备注',
        dataIndex: 'urgentComment',
        key: 'urgentComment',
        align:'center',
        width: '10%',
    },{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        width: '10%',
    },{
        title: '接受状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        width: '10%',
    },{
        title: '接受反馈',
        dataIndex: 'handleComment',
        key: 'handleComment',
        align:'center',
        width: '10%',
    },{
        title:'操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '25%',
        render(text,record){
            return(
                <div>
                    <a href='#'>编辑</a>
                    <Divider type="vertical" />
                    <a href='#'>删除</a>
                    <Divider type="vertical" />
                    <a href='#'>接收</a>
                    <Divider type="vertical" />
                    <a href='#'>拒绝</a>
                </div>
            )
        }
    }];
    constructor(props){
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
            pagination:[],
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        }
    }
    render(){
        const { loading,selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <BlockQuote name="样品送检"></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell name='请输入搜索内容'/>
                    </span>
                    <div className='clear' ></div>
                    <Table columns={this.columns} dataSource={data} rowSelection={rowSelection} size="small"
                    bordered
                    pagination={this.pagination}
                    scroll={{ x: 1500}}></Table>
                </div>
            </div>
        )
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
}

export default SampleInspection