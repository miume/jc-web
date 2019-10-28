import React from 'react';
import axios from 'axios';
import {Divider, message, Popconfirm, Spin, Table} from 'antd';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import Add from './add';
import SearchCell from '../../../BlockQuote/search';
import home from '../../../commom/fns'
import "./eqMaintenanceDataEntry.css"

class  Right extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }

    url
    operation

    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys : [],     //存取所选中checkbox的ids
            searchContent:'',
            editingKey:'',
            allProductionProcess:[],
            detailData:[],
            pageChangeFlag:0,        //0表示getAllPage分页查询，
            visible:false,
        }
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.reset = this.reset.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter:(a, b) => a.code-b.code,
            width: '8%',
            align:'left',
            editable: false
        }, {
            title: '保养项目',
            dataIndex: 'maintenanceItems' ,
            key: 'maintenanceItems',
            width: '20%',
            align:'left',
            editable: false
        }, {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key:  'maintenanceContent',
            width: '20%',
            align:'left',
            editable: true
         },{
            title: '操作类型',
            dataIndex: 'optType',
            key: 'optType',
            width: '10%',
            align:'left',
            editable: true
        },{
            title:'频率',
            dataIndex:'maintenanceFrequency',
            key:'maintenanceFrequency',
            align:'left',
            width:'10%',
            editable: false
         },
          {
            title: '操作',
            dataIndex: 'maintenance.operation',
            key:'operation',
            align:'left',
            render: (text,record) => {
                let update = home.judgeOperation(this.operation,'UPDATE')
                return (
                    <span>
                        <Add editorFlag={true} flag={update} deviceName={this.props.deviceName} code={record.code} url={this.props.url} getTableData={this.props.getTableData } fetch={this.props.fetch}
                                  maintenanceContent={record.maintenanceContent}
                                  maintenanceFrequency={record.maintenanceFrequency}
                                  maintenanceItems={record.maintenanceItems}
                                  optType={record.optType}
                        />
                        {home.judgeOperation(this.operation,'DELETE')?<Divider type='vertical' />:''}
                        <span className={home.judgeOperation(this.operation,'DELETE')?'':'hide'}>
                            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="再想想" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                );
            }
        }];
    }
    edit() {
        this.setState({ visible: true });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    save(form, id) {
        //row代表修改后的数据,item代表原始数据
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = this.state.dataSource;
            const index = newData.findIndex(item => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const data=row;
                /**将id变成字符串 */
                data['id']=id.toString();
             }
        });
    }

    /**批量删除弹出框确认函数 */
    deleteByIds = () =>  {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.props.url.eqMaintenanceDataEntry.deleteIds}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code === 0) {
                this.props.getTableData({
                    deviceName: this.props.deviceName,
                    size:this.pagination.pageSize,
                    page:this.pagination.current
                })
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }

    /**取消批量删除 */
    cancle() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }

    /**实现全选 */
    onSelectChange=(selectedRowKeys)=> {
        this.setState({ selectedRowKeys });
    }
    /**处理单条记录删除 */
    handleDelete = (id) => {
        axios({
            url:`${this.props.url.eqMaintenanceDataEntry.maintenance}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=> {
            message.info(data.data.message);
            if(data.data.code===0) {
                this.props.getTableData({
                    deviceName: this.props.deviceName,
                    size:this.pagination.pageSize,
                    page:this.pagination.current
                })
            }
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        })
    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**实时跟踪搜索框内容的变化 */
    searchContentChange(e) {
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }

    /**搜索重置*/
    reset() {
        this.setState({
            searchContent:''
        });
        this.props.getTableData({
            deviceName: this.props.deviceName
        });
    }

    /**绑定搜索事件 */
    searchEvent () {
        const {searchContent}=this.state;
        this.props.getTableData({
            deviceName: this.props.deviceName,
            condition: searchContent,
            size:this.pagination.pageSize,
            page:this.pagination.current
        })
    }

    /**表格切换分页*/
    handleTableChange = (pagination) => {
        if(pagination) {
            this.pagination = pagination; //这里必须用箭头函数申明handleTableChange，不然this.pagination中this指向函数作用域
        }
        let params = {
            deviceName: this.props.deviceName,
            condition: this.state.searchContent,
            size: pagination.pageSize,
            page: pagination.current
        }
        this.props.getTableData(params); //调用父组件方法获取表格数据
    }

    /**通过id查询详情 */
    render() {
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        this.current=this.props.current
        this.operation = this.props.operation
        this.status = JSON.parse(localStorage.getItem('status'));
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        this.pagination.total = this.props.dataSource.length;
        const addFlag = home.judgeOperation(this.operation,'SAVE');
        return (
            <Spin spinning={this.props.tableLoading} wrapperClassName="equipment-right">
                <Add deviceData={this.props.deviceData} flag={addFlag}  url={this.props.url} getTableData={this.props.getTableData} deviceName={this.props.deviceName} />
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}
                             flag={home.judgeOperation(this.operation,'DELETE')}
                />
                <SearchCell name='请输入保养数据或保养内容' searchContentChange={this.searchContentChange} searchEvent={this.searchEvent}
                            fetch={this.reset} flag={home.judgeOperation(this.operation,'QUERY')} />

                <Table rowKey={record => record.code}
                       rowSelection={rowSelection}
                       columns={this.columns}
                       dataSource={this.props.dataSource}
                       pagination={this.pagination}
                       onChange={this.handleTableChange}
                       size="small"
                       bordered
                />
            </Spin>
        );
    }
}
export default Right
