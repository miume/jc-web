import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm} from "antd";
import axios from 'axios';
import InDaily from './inDaily'
import OutDaily from './outDaily'
import Search from './search'
import Check from './check'
import {getOperations,judgeOperation} from "../../../commom/getOperations";

var data1 = []
var data2 = []
for (var i = 0; i < 20; i++) {
    data1.push({
        code:i,
        col1: i+1,
        col2: (i+1)%2,
        col3: '2019年11月11日',
        col4: `批号${i+1000}`,
        col5: '大类',
        col6: `小类`,
        col7: '物料名称',
        col8: '供应商',
        col9: '合格',
        col10: (i+1)%5,
        col11: i*10,
        col12: 'kg'
    })
    data2.push({
        code:i,
        col1: i+1,
        col2: (i+1)%2,
        col3: '2019年11月11日',
        col4: `批号${i+1000}`,
        col5: '大类',
        col6: `小类`,
        col7: '物料名称',
        col8: '供应商',
        col9: '领料单位',
        col10: '出料单位',
        col11: (i+1)%5,
        col12: i*10,
    })
}


const { TabPane } = Tabs;
class RepoQueryInOutDaily extends React.Component {

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
            selectedRowKeys: [],
            searchContent: '',
            dataSource:[],
            tabKey:'1',
            condition1: null,
            condition2: null,
            condition3: null,
            condition4: null,
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
                        flag={0}
                        tabKey={this.state.tabKey}
                        url={this.url}
                        selectedRowKeys={this.state.selectedRowKeys}
                        getTableParams={this.getTableParams}
                    />
                    <Search
                        getCondition1={this.getCondition1}
                        getCondition2={this.getCondition2}
                        getCondition3={this.getCondition3}
                        getCondition4={this.getCondition4}
                        searchEvent={this.searchEvent}
                        reset={this.reset}
                        condition1={this.state.condition1}
                        condition2={this.state.condition2}
                        condition3={this.state.condition3}
                        condition4={this.state.condition4}
                    />
                    <div className='clear'></div>
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        <TabPane tab='入库日报' key='1'>
                            <InDaily
                                tabKey={this.state.tabKey}
                                url={this.url}
                                getTableParams={this.getTableParams}
                                selectedRowKeys={this.state.selectedRowKeys}
                                onSelectChange={this.onSelectChange}
                                pagination={this.pagination}
                                dataSource={this.state.dataSource}
                                handleTableChange={this.handleTableChange}/>
                        </TabPane>
                        <TabPane tab='出库日报' key='2'>
                            <OutDaily
                                tabKey={this.state.tabKey}
                                url={this.url}
                                getTableParams={this.getTableParams}
                                selectedRowKeys={this.state.selectedRowKeys}
                                onSelectChange={this.onSelectChange}
                                pagination={this.pagination}
                                dataSource={this.state.dataSource}
                                handleTableChange={this.handleTableChange}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }


    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    }
    tabChange = (key) => {
        this.setState({
            searchContent: undefined,
            tabKey:key,
            selectedRowKeys:[]
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
                page: current
            };
        this.getTableData(params,key);
    }

    /**获取表格数据*/
    getTableData = (params,key) => {
        if (key==="1"){
            this.setState({
                dataSource:data1,
                selectedRowKeys:[]
            })
        } else{
            this.setState({
                dataSource:data2,
                selectedRowKeys:[]
            })
        }
        console.log(params)
        console.log(key)



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
        const tabKey = this.state.tabKey;
        this.getTableParams(undefined,tabKey);
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
    getCondition4 = (value,option) => {
        this.setState({
            condition4: value,
        })
    }

    /**搜索事件*/
    searchEvent = () => {
        const {condition1,condition2,condition3,condition4} = this.state;
        console.log(condition1)
        console.log(condition2)
        console.log(condition3)
        console.log(condition4)


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
            condition4:null,
        });
        // this.pagination.current = 1;
        // const tabKey = this.state.tabKey;
        // this.getTableParams('',tabKey)
    }

    back = () => {
        this.props.history.push('/repoBasic');
    }

}

export default RepoQueryInOutDaily;
