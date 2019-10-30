import React from "react"
import {Divider, Popconfirm, Table} from 'antd'
import home from '../../../commom/fns';
import Editer from "./editer";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import "./inspectionTemplate.css"
import DetailModal from "./detailModal";
import EditorModal from "./editorModal";

class RightTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedRowKeys : [],
        };
        this.handleDelete=this.handleDelete.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this);
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
            dataIndex: 'checkTypeName',
            key: 'checkTypeName',
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
                        <EditorModal record={record} url={this.props.url}/>
                        {home.judgeOperation(this.props.operation,'UPDATE')?<Divider type='vertical' />:''}
                        <DetailModal record={record} url={this.props.url}/>
                    {/*删除*/}
                   {home.judgeOperation(this.props.operation,'DELETE')?<Divider type='vertical' />:''}
                        <span className={home.judgeOperation(this.props.operation,'DELETE')?'':'hide'}>
                            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="再想想" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        const {selectedRowKeys} = this.state;
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
                        />
            </div>
        )
    }

    /**单挑记录删除*/
    handleDelete(id) {
        this.props.deleteByIds([id]);
        // axios({
        //     url:`${this.props.url.devicePatrolModel.delete}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     },
        //     params:{
        //         id:id
        //     }
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     this.props.searchEvent();
        // }).catch(()=>{
        //     message.info('删除失败，请联系管理员！');
        // });
    };

    /**批量删除*/
    deleteByIds =() =>  {
        const ids = this.state.selectedRowKeys;
        this.props.deleteByIds(ids)
    };

    /**取消批量删除 */
    cancle() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }

    /**表格checkbox选中变化*/
    onSelectChange=(selectedRowKeys)=> {
        this.setState({ selectedRowKeys });
    }
}
export default RightTable
