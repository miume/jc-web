import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm} from "antd";
import axios from 'axios';
import InventoryDailyTable from './table'
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


class RepoQueryInventoryDaily extends React.Component {

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
            searchContent: '',
            dataSource:[],
            condition1: null,
            condition2: null,
            condition3: null,
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
                        getCondition1={this.getCondition1}
                        getCondition2={this.getCondition2}
                        getCondition3={this.getCondition3}
                        searchEvent={this.searchEvent}
                        reset={this.reset}
                        condition1={this.state.condition1}
                        condition2={this.state.condition2}
                        condition3={this.state.condition3}
                    />
                    <div className='clear'></div>
                    <InventoryDailyTable url={this.url} pagination={this.pagination} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange}/>
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
                page: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData = (params) => {
        this.setState({
            dataSource:data1
        })
        console.log(params)



        // this.setState({
        //     loading: true
        // });
        // axios({
        //     url: `${this.url.checkSite.page}`,
        //     method: 'get',
        //     headers: {
        //         'Authorization': this.url.Authorization
        //     },
        //     params
        // }).then(data => {
        //     let res = data.data.data;
        //     if(res && res.list) {
        //         this.pagination.total = res['total'] ? res['total'] : 0;
        //         for(let i = 0; i < res.list.length; i++) {
        //             res['list'][i]['index'] = (res['page'] - 1) * 10 + i + 1;
        //         }
        //         this.setState({
        //             dataSource: res.list
        //         })
        //     }
        //     this.setState({
        //         loading: false
        //     })
        // })
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

    /**搜索事件*/
    searchEvent = () => {
        const {condition1,condition2,condition3} = this.state;
        console.log(condition1)
        console.log(condition2)
        console.log(condition3)


        // this.setState({
        //     searchContent
        // });
        // this.pagination.current = 1;
        // this.getTableParams(searchContent)
    }

    /**重置事件*/
    reset = () => {
        this.setState({
            condition1:null,
            condition2:null,
            condition3:null,
        });
        // this.pagination.current = 1;
        // const tabKey = this.state.tabKey;
        // this.getTableParams('',tabKey)
    }

    back = () => {
        this.props.history.push('/repoBasic');
    }

}

export default RepoQueryInventoryDaily;
