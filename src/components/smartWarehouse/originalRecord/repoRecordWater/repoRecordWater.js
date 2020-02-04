import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Tabs} from "antd";
import SearchCell from '../../../BlockQuote/newSearchSell';
import axios from 'axios';
import InWater from './inWater'
import OutWater from './outWater'
import {getOperations,judgeOperation} from "../../../commom/getOperations";

var data1 = []
var data2 = []
for (var i = 0; i < 20; i++) {
    data1.push({
        col1: i+1,
        col2: `batch${i+1000}`,
        col3: '2019年11月11日',
        col4: 'admin'
    })
    data2.push({
        col1: i+1,
        col2: `batch${i+1000}`,
        col3: '2019年11月11日',
    })
}


const { TabPane } = Tabs;
class RepoRecordWater extends React.Component {

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
                        <TabPane tab='入库流水' key='1'>
                            <InWater pagination={this.pagination} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange}/>
                        </TabPane>
                        <TabPane tab='出库流水' key='2'>
                            <OutWater pagination={this.pagination} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange}/>
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
            url = this.url.repoRecordWater.outPages
        } else{
            url = this.url.repoRecordWater.inPages
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
            console.log(res)
            if(res && res.records) {
                this.pagination.total = res['total'] ? res['total'] : 0;
                var dataSource =[];
                for(let i = 0; i < res.records.length; i++) {
                    dataSource.push({
                        col1: (res['current'] - 1) * 10 + i + 1,
                        col2: res.records[i].materialCode,
                        col3: res.records[i].createdTime,
                        col4: res.records[i].createdPerson
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

export default RepoRecordWater;
