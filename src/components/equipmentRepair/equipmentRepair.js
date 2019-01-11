import React from "react";
import '../Home/page.css';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from '../BlockQuote/deleteByIds';
import { Table,Popconfirm,Divider,message,Select } from 'antd';
import Detail from './detail'
import RateNum from './rate'

const data = [];
for(let i=1;i<=10;i++){
    data.push({
        key:i,
        index:i,
        status:'状态'+i,
        name:'名字'+i,
        department:'部门'+i,
        productLine:'生产线'+i,
        person:'人'+i,
        time:'保修时间'+i,
        acceptTime:'接受时间'+i,
        finishTime:'完工时间'+i,
    })
}

class equipmentRepair extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            pagination:[],
            selectedRowKeys: [],
            searchContent:'',
        }
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            }
        };
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key: 'index',
            align:'center',
            width: '10%',
        },{
            title: '工单状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            width: '10%',
        },{
            title: '设备名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '10%',
        },{
            title: '单位/部门',
            dataIndex: 'department',
            key: 'department',
            align:'center',
            width: '10%',
        },{
            title: '所属生产线',
            dataIndex: 'productLine',
            key: 'productLine',
            align:'center',
            width: '10%',
        },{
            title: '报修人',
            dataIndex: 'person',
            key: 'person',
            align:'center',
            width: '10%',
        },{
            title: '保修时间',
            dataIndex: 'time',
            key: 'time',
            align:'center',
            width: '10%',
        },{
            title: '接单时间',
            dataIndex: 'acceptTime',
            key: 'acceptTime',
            align:'center',
            width: '10%',
        },{
            title: '完工时间',
            dataIndex: 'finishTime',
            key: 'finishTime',
            align:'center',
            width: '10%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '10%',
            render:()=>{
                return(
                    <span>
                        <Detail />
                        <Divider type="vertical" />
                        <RateNum />
                    </span>
                )
            }
        }]
    }
    /**获取查询时名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
        console.log(this.searchContentChange)
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys }); 
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        const { selectedRowKeys } = this.state;
        const Option = Select.Option;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        //     onSelect() {},
        //     onSelectAll() {},
        //   };
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <Select style={{ width: 200 }} placeholder="请选择工单状态">
                        <Option value={0}>待接单</Option>
                        <Option value={1}>已接单</Option>
                        <Option value={2}>已维修</Option>
                        <Option value={3}>已评价</Option>
                    </Select>
                    <SearchCell name='请输入设备名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear'></div>
                    <Table size="small" rowKey={record => record.index} dataSource={data} columns={this.columns} bordered pagination={this.pagination}  scroll={{ y: 400 }}/>
                </div>
            </div>
        )
    }
}

export default equipmentRepair