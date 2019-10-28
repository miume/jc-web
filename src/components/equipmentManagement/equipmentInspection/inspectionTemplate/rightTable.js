import React from "react"
import {Divider, message, Popconfirm, Table} from 'antd'
import Detail from "./detail";
import home from '../../../commom/fns';
import axios from "axios";
import Editer from "./editer";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import "./inspectionTemplate.css"

class RightTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedRowKeys : [],
        }


        this.handleDelete=this.handleDelete.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    handleDelete = (id) => {
        console.log('删除成功')
        axios({
            url:`${this.props.url.devicePatrolModel.delete}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:id
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getTableData({
                deptId:this.props.deptCode,
                status:this.props.Tableflag,
            })
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
    render(){
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'8%',
        },{ title:'车间名称',
            dataIndex: 'workshop' ,
            key: 'workshop',
            width: '12%',
            align:'left',
            editable: false
        }, {
            title: '巡检模板名称',
            dataIndex: 'patrolName',
            key:  'patrolName',
            width: '14%',
            align:'left',
            editable: true
        },{
            title: '检查类型',
            dataIndex: 'checkType',
            key: 'checkType',
            width: '11%',
            align:'left',
            editable: true
        }, {
            title: '制表人',
            dataIndex: 'setPeople',
            key: 'setPeople',
            width: '8%',
            align:'left',
        },{
            title: '制表日期',
            dataIndex: 'tabulatedate',
            key: 'tabulatedate',
            width: '12%',
            align:'left',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                return (
                    <span>
                        <Editer   name={this.props.name} record={record} url={this.props.url} operation={this.props.operation}  deptCode={this.props.deptCode} getTableData={this.props.getTableData}/>
                        {home.judgeOperation(this.props.operation,'UPDATE')?<Divider type='vertical' />:''}
                        <Detail record={record} url={this.props.url}/>
                    {/*删除*/}
                   {home.judgeOperation(this.props.operation,'DELETE')?<Divider type='vertical' />:''}
                        <span className={home.judgeOperation(this.props.operation,'DELETE')?'':'hide'}><Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="再想想" >
                <span className='blue'>删除</span>
                </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        const {selectedRowKeys,pagination} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,

        };
        return(

    <div >
        <div className="ins-tem-deleteByIds">
        <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}
                     flag={1}   />
        </div>
            <Table
                rowKey={record => record.code}
                rowSelection={rowSelection}
                dataSource={this.props.dataSource}
                columns={this.columns}
                pagination={this.props.pagination}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
                 scroll={{ y: 450 }}
                />
    </div>
        )
    }

    deleteByIds =() =>  {
        const ids = this.state.selectedRowKeys;
        this.props.deleteByIds(ids)
    }
    /**取消批量删除 */
    cancle() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }
    onSelectChange=(selectedRowKeys)=> {
        this.setState({ selectedRowKeys });
        // console.log(this.state.selectedRowKeys)
    }
}
export default RightTable
