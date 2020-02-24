import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm} from "antd";
import axios from 'axios';
import InOutQueryTable from './table'
import Search from './search'
import {getOperations,judgeOperation} from "../../../commom/getOperations";

var data1 = []
var data2 = []
for (var i = 0; i < 20; i++) {
    data1.push({
        code: i+1,
        col1: i+1,
        col2: '原料',
        col3: '前驱体',
        col4: '硫酸镍',
        col5: '吉林吉恩',
        col6: `kg`,
        col7: 4430,
        col8: 12,
        col9: 10,
        col10: 4432,
        col11: i*100,
        col12: 'XXXXXX'
    })
}


class RepoQueryInOutQuery extends React.Component {

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
            searchContent: {
                condition1: '',
                condition2: '',
                condition3: '',
                condition4: '',
                condition5: '',
            },
            dataSource:[],
            condition1: undefined,
            condition2: undefined,
            condition3: undefined,
            condition4: undefined,
            condition5: undefined,
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
                    <Search
                        url={this.url}
                        getCondition1={this.getCondition1}
                        getCondition2={this.getCondition2}
                        getCondition3={this.getCondition3}
                        getCondition4={this.getCondition4}
                        getCondition5={this.getCondition5}
                        searchEvent={this.searchEvent}
                        reset={this.reset}
                        condition1={this.state.condition1}
                        condition2={this.state.condition2}
                        condition3={this.state.condition3}
                        condition4={this.state.condition4}
                        condition5={this.state.condition5}
                    />
                    <div className='clear'></div>
                    <InOutQueryTable
                        pagination={this.pagination}
                        dataSource={this.state.dataSource}
                        handleTableChange={this.handleTableChange}/>
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
        this.setState({
            loading: true
        });
        axios({
            url: this.url.repoQueryInventoryQuery.pages,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                typeId: params.condition.condition1,
                subTypeId: params.condition.condition2,
                batch: params.condition.condition5
            },
            data: {
                current: params.current,
                size: params.size
            },
        }).then(data => {
            let res = data.data.data;
            if (res && res.records) {
                this.pagination.total = res['total'] ? res['total'] : 0;
                var dataSource = [];
                for (let i = 0; i < res.records.length; i++) {
                    var nowAge = (new Date()).getTime();
                    var preAge = res.records[i].stockDate?(new Date(res.records[i].stockDate)).getTime():0;
                    var age = parseInt((nowAge - preAge)/  1000  /  60  /  60  /24);

                    dataSource.push({
                        code: res.records[i].id,
                        col1: (res['current'] - 1) * 10 + i + 1,
                        col2: res.records[i].outDate,
                        col3: res.records[i].inDate,
                        col4: res.records[i].materialBatch,
                        col5: res.records[i].typeName,
                        col6: res.records[i].subTypeName,
                        col7: res.records[i].materialName,
                        col8: res.records[i].supplierName,
                        col9: res.records[i].checkStatus,
                        col10: res.records[i].realWeight,
                        col11: res.records[i].weight,
                        col12: res.records[i].usefulWeight,
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
        this.getTableParams(undefined);
    }
    /** 获取搜索条件 */
    getCondition1 = (value) => {
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
    getCondition4 = (value,option) => {
        this.setState({
            condition4: value,
        })
    }
    getCondition5 = (e) => {
        this.setState({
            condition5: e.target.value,
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
            condition5:condition5,
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
            condition1:undefined,
            condition2:undefined,
            condition3:undefined,
            condition4:undefined,
            condition5:undefined,
        });
        this.pagination.current = 1;
        this.getTableParams('')
    }

    back = () => {
        this.props.history.push('/repoBasic');
    }

}

export default RepoQueryInOutQuery;
