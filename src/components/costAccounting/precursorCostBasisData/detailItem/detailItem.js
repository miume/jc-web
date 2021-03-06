import React from "react";
import '../../../Home/page.css';
import { Table, Popconfirm, Divider, message, Spin, Radio } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import Edit from "./edit";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class DetailItem extends React.Component {
    url;
    constructor(props) {
        super(props);
        this.state = {
            visiable: false,
            data: [],
            selectedRowKeys: [],
            loading: true,
            searchContent: '',
            searchFlag: 1, //用来判断是搜索分页还是getAll分页
            radioValue: 0
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.start = this.start.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.reset=this.reset.bind(this);
        this.pagination = {
            total: this.state.data.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: '14.3%',
        }, {
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align: 'center',
            width: '18%',
        }, {
            title: '所属工序',
            dataIndex: 'processName',
            key: 'processName',
            align: 'center',
            width: '14.3%',
        }, {
            title: '所含元素',
            dataIndex: 'metal',
            key: 'metal',
            align: 'center',
            width: '20%',
        }, {
            title: '数据类别',
            dataIndex: 'valueType',
            key: 'valueType',
            align: 'center',
            width: '15%',
            render: (text, record) => {
                if (record.valueType === 0) {
                    return "体积"
                } else {
                    return "重量"
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: '20%',
            render: (text, record) => {
                let {deleteFlag,updateFlag}=this.state
                return (
                    <span>
                        <Edit code={record.code} updateFlag={updateFlag} fetch={this.fetch} processCode={record.processCode} types={record.types} /> 
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
    }
    handleDelete = (id) => {
        axios({
            url: `${this.url.precursorMaterialDetails.delete}`,
            method: "delete",
            headers: {
                'Authorization': this.url.Authorization
            },
            params: { id: id }
        }).then((data) => {
            message.info(data.data.message);
            this.fetch();
        }).catch((error) => {
            message.info('删除失败，请联系管理员!')
        });
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    componentDidMount() {
        this.fetch();
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }

    fetch = (params = {},type) => {
        type = type === undefined ? 0 : type
        params = {
            ...params,
            type:type
        }
        this.setState({
            loading: true,
            searchFlag: 0
        })
        axios({
            url: `${this.url.precursorMaterialDetails.byTypes}`,
            method: "get",
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params
        }).then((data) => {
            let res = data.data.data
            if (res && res.list) {
                for (let i = 1; i <= res.list.length; i++) {
                    res.list[i - 1]['index'] = (res.page - 1) * res.size + i;

                }
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i]["metal"] = ""
                }
                for (let i = 0; i < res.list.length; i++) {
                    if (res.list[i]["mn"] === 1) {
                        res.list[i]["metal"] += "mn "
                    }
                    if (res.list[i]["co"] === 1) {
                        res.list[i]["metal"] += "co "
                    }
                    if (res.list[i]["ni"] === 1) {
                        res.list[i]["metal"] += "ni "
                    }
                    if(res.list[i]['amm']===1){
                        res.list[i]["metal"] += "氨 "
                    }
                    if(res.list[i]['alk']===1){
                        res.list[i]["metal"] += "碱 "
                    }
                }
                for (let i = 0; i < res.list.length; i++) {
                    if (res.list[i]["metal"] === "") {
                        res.list[i]["metal"] = "无"
                    }
                }
                this.pagination.total = res && res.total ? res.total : 0
                this.setState({
                    data: res.list,
                    searchContent: '',
                    loading: false
                })
            }
        })
    }
    /**删除*/
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url: `${this.url.precursorMaterialDetails.ids}`,
            method: 'delete',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: ids,
            type: 'json'
        }).then((data) => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
            message.info(data.data.message);
            this.fetch();
        }).catch((error) => {
            message.info(error.data);
        })
    };
    /**实现全选 */
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys: selectedRowKeys });
    }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    searchContentChange(e) {
        const value = e.target.value;
        this.setState({ searchContent: value });
    };
    /**返回数据录入页面 */
    returnDataEntry() {
        this.props.history.push({ pathname: "/precursorCostBasisData" });
    }
    searchEvent(params = {}) {
        let {searchContent,radioValue}=this.state
        this.fetch({
            ...params,
            condition: searchContent,
        },radioValue)
        this.setState({
            searchFlag: 1,
        })
    };
    handleTableChange(pagination) {
        let { searchFlag, radioValue } = this.state
        this.pagination = pagination;
        if (searchFlag) {
            this.searchEvent({
                size: pagination.pageSize,
                page: pagination.current
            })
        }
        else {
            this.fetch({
                size: pagination.pageSize,
                page: pagination.current
            }, radioValue)
        }
    }
    radioChange(e) {
        this.setState({
            radioValue: e.target.value
        })
        let { pageSize, current } = this.pagination
        this.fetch({
            page: current,
            size: pageSize,
        },e.target.value)
    }
    reset(){
        let {radioValue}=this.state
        this.fetch({},radioValue)
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this. current = JSON.parse(localStorage.getItem('dataEntry'));
        const { selectedRowKeys,addFlag,deleteFlag } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() { },
            onSelectAll() { },
        };
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回'
                    returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch} addFlag={addFlag}/>
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={deleteFlag}
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>所属类别 : </span>&nbsp;&nbsp;
                    <Radio.Group onChange={this.radioChange} value={this.state.radioValue}>
                        <Radio value={0}>主材</Radio>
                        <Radio value={1}>辅材</Radio>
                    </Radio.Group>
                    <SearchCell name="请输入物料名称" flag={true} fetch={this.reset} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} />
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} rowSelection={rowSelection} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} onChange={this.handleTableChange} size="small" bordered />
                </Spin>
            </div>
        )
    }
}

export default DetailItem