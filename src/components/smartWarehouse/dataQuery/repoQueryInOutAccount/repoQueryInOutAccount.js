import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm} from "antd";
import axios from 'axios';
import InDaily from './inDaily'
import Search from './search'
import Check from './check'
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import './repoQueryInOutAccount.css'

const { TabPane } = Tabs;
class RepoQueryInOutAccount extends React.Component {

    componentDidMount = () => {
        this.getTableParams(undefined);
    }
    componentWillUnmount = () => {
        this.setState(() => {
            return;
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            searchContent: {
                condition1:'',
                condition2:'',
                condition3:'',
                condition4:'',
                condition5:''
            },
            dataSource:[],
            condition1: null,
            condition2: null,
            condition3: null,
            condition4: undefined,
            condition5: undefined
        };
        this.operations = [];
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
    }

    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Check
                        url={this.url}
                        selectedRowKeys={this.state.selectedRowKeys}
                        getTableParams={this.getTableParams}
                    />
                    <Search
                        url={this.url}
                        getCondition1={this.getCondition1}
                        getCondition2={this.getCondition2}
                        getCondition3={this.getCondition3}
                        getCondition4and5={this.getCondition4and5}
                        searchEvent={this.searchEvent}
                        reset={this.reset}
                        condition1={this.state.condition1}
                        condition2={this.state.condition2}
                        condition3={this.state.condition3}
                        condition4={this.state.condition4}
                        condition5={this.state.condition5}
                    />
                    <div className='clear'></div>
                    <InDaily
                        url={this.url}
                        getTableParams={this.getTableParams}
                        onSelectChange={this.onSelectChange}
                        pagination={this.pagination}
                        dataSource={this.state.dataSource}
                        handleTableChange={this.handleTableChange}
                    />
                </Spin>
            </div>
        );
    }


    /**确定获取表格数据的参数*/
    getTableParams = (value) => {
        let {searchContent} = this.state, {pageSize,current} = this.pagination,
            params = {
                condition: value === undefined ? searchContent : value,
                size: pageSize,
                current: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData = (params) => {
        axios({
            url: this.url.repoQueryInOutDaily.pagesOut,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                typeId: params.condition.condition1,
                subTypeId: params.condition.condition2,
                supplierId: params.condition.condition3,
                startTime: params.condition.condition4,
                endTime: params.condition.condition5
            },
            data:{
                current:params.current,
                size:params.size
            },
        }).then(data => {
            let res = data.data.data;
            console.log(res)
            if(res && res.records) {
                this.pagination.total = res['total'] ? res['total'] : 0;
                var dataSource =[];
                for(let i = 0; i < res.records.length; i++) {
                    var nowTime = (new Date()).getTime();
                    var preTime = new Date(res.records[i].createdDay).getTime();
                    var aging = Math.floor((nowTime - preTime)/86400000);
                    dataSource.push({
                        code: res.records[i].id,
                        col1: (res['current'] - 1) * 10 + i + 1,
                        col2: aging.toString() + "天",
                        col3: res.records[i].createdDay,
                        col4: res.records[i].materialBatch,
                        col5: res.records[i].typeName,
                        col6: res.records[i].subTypeName,
                        col7: res.records[i].materialName,
                        col8: res.records[i].supplierName,
                        col9: res.records[i].deptName,
                        col10: res.records[i].bagCounts,
                        col11: res.records[i].weight,
                        col12: res.records[i].measureUnit
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    selectedRowKeys: []
                })
            }
            this.setState({
                loading: false
            })
        })
    }


    handleTableChange = (pagination) => {
        this.pagination = pagination;
        this.getTableParams(undefined);
    }
    /** 获取搜索条件 */
    getCondition1 = (value,option) => {
        this.setState({
            condition1: value,
        })
    }
    getCondition2 = (value,option) => {
        this.setState({
            condition2: value,
        })
    }
    getCondition3 = (value,option) => {
        this.setState({
            condition3: value,
        })
    }
    getCondition4and5 = (date, dateString) => {
        console.log(dateString)
        this.setState({
            condition4: dateString[0],
            condition5: dateString[1]
        })
    }

    /**搜索事件*/
    searchEvent = () => {
        const {condition1,condition2,condition3,condition4,condition5} = this.state;
        var searchContent = {
            condition1:condition1,
            condition2:condition2,
            condition3:condition3,
            condition4:condition4,
            condition5:condition5
        }
        this.setState({
            searchContent
        });
        this.pagination.current = 1;
        this.getTableParams(searchContent)
    }

    /**重置事件*/
    reset = () => {
        this.setState({
            condition1:null,
            condition2:null,
            condition3:null,
            condition4:undefined,
            condition5:undefined
        });
        this.pagination.current = 1;
        this.getTableParams('')
    }

    back = () => {
        this.props.history.push('/repoBasic');
    }

}

export default RepoQueryInOutAccount;
