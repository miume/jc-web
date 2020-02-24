import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm} from "antd";
import SearchCell from '../../../BlockQuote/newSearchSell';
import axios from 'axios';
import InAccount from './inAccount'
import OutAccount from './outAccount'
import {getOperations,judgeOperation} from "../../../commom/getOperations";

const { TabPane } = Tabs;
class RepoRecordAccount extends React.Component {

    componentDidMount = () => {
        this.getTableParams(undefined,"1");
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
            searchContent: '',
            dataSource:[],
            tabKey:'1'
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
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'物料编码'}/>
                    <div className='clear'></div>
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        <TabPane tab='入库台帐' key='1'>
                            <InAccount pagination={this.pagination} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange}/>
                        </TabPane>
                        <TabPane tab='出库台帐' key='2'>
                            <OutAccount pagination={this.pagination} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }


    tabChange = (key) => {
        this.setState({
            searchContent: undefined,
            tabKey:key
        });
        this.pagination.current = 1;
        this.getTableParams('',key)

    }

    /**确定获取表格数据的参数*/
    getTableParams = (value,key) => {
        let {searchContent} = this.state, {pageSize,current} = this.pagination,
            params = {
                condition: value === undefined ? searchContent : value,
                size: pageSize,
                current: current
            };
        this.getTableData(params,key);
    }

    /**获取表格数据*/
    getTableData = (params,key) => {
        var url=""
        if (key==="2"){
            url = this.url.repoRecordAccount.outPages
        } else{
            url = this.url.repoRecordAccount.inPages
        }
        this.setState({
            loading: true
        });
        axios({
            url: url,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                materialCode: params.condition,
            },
            data:{
                current:params.current,
                size:params.size
            },
        }).then(data => {
            let res = data.data.data;
            if(res && res.records) {
                this.pagination.total = res['total'] ? res['total'] : 0;
                var dataSource =[];
                for(let i = 0; i < res.records.length; i++) {
                    dataSource.push({
                        col1: (res['current'] - 1) * 10 + i + 1,
                        col2: res.records[i].materialCode,
                        col3: res.records[i].materialName,
                        col4: res.records[i].materialBatch,
                        col5: res.records[i].materialTypeName,
                        col6: res.records[i].subTypeName,
                        col7: res.records[i].plantName,
                        col8: res.records[i].supplierName,
                        col9: res.records[i].weight.toString() + res.records[i].measureUnit,
                        col10: res.records[i].bagNum,
                        col11: res.records[i].materialStatus,
                        col12: res.records[i].createdTime,
                        col13: res.records[i].createdPerson
                    })
                }
                this.setState({
                    dataSource: dataSource
                })
            }
            this.setState({
                loading: false
            })
        })
    }


    handleTableChange = (pagination) => {
        this.pagination = pagination;
        const tabKey = this.state.tabKey;
        this.getTableParams('',tabKey);
    }

    /**搜索事件*/
    searchEvent = (searchContent) => {
        this.setState({
            searchContent
        });
        this.pagination.current = 1;
        this.getTableParams(searchContent,this.state.tabKey)
    }

    /**重置事件*/
    reset = () => {
        this.setState({
            searchContent: undefined
        });
        this.pagination.current = 1;
        const tabKey = this.state.tabKey;
        this.getTableParams('',tabKey)
    }

    back = () => {
        this.props.history.push('/repoBasic');
    }

}

export default RepoRecordAccount;
