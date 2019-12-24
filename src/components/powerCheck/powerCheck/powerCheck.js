import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import AddModal from "./add/addModal";
import Home from "../../commom/fns";
import {Spin, message} from "antd";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from "../../BlockQuote/newSearchSell";
import PowerCheckTable from "./powerCheckTable";
import axios from "axios";

// const data = [{
//     index: 1,
//     code: 1,
//     modelName: '点检名称',
//     siteName: '地点1',
//     siteCode: 1,
//     operator: '管理员',
//     class: '班次1',
//     checkDate: '2019-10-10',
//     note: '1次/天',
//     effectiveDate: '2019-11-11'
// }];

class PowerCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            searchContent: ''
        };
        this.pagination = {
            pageSize: 10,
            current: 1
        };
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current')), {selectedRowKeys,data} = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal title={'新增'} url={this.url} getTableParams={this.getTableParams}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={Home.judgeOperation(this.operation,'DELETE')}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'点检名称'}/>
                    <div className='clear'></div>
                    <PowerCheckTable data={data} selectedRowKeys={selectedRowKeys} onSelectChange={this.onSelectChange}
                                     url={this.url} handleTableChange={this.handleTableChange} getTableParams={this.getTableParams}/>
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.getTableParams()
    }

    /**确定获取表格数据的参数*/
    getTableParams(value) {
        let {searchContent} = this.state, {pageSize,current} = this.pagination,
            params = {
                condition: value === undefined ? searchContent : value,
                size: pageSize,
                page: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.checkRecord.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then(data => {
            let res = data.data.data;
            if(res && res.list) {
                let result = [];
                result['total'] = res.total ? res.total : 0;
                for(let i = 0; i < res.list.length; i++) {
                    let {head,siteName} = res['list'][i];
                    head['index'] = (res['page'] - 1) * 10 + i + 1;
                    head['siteName'] = siteName;
                    result.push(head)
                }
                this.setState({
                    data: result
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    /**批量删除*/
    deleteByIds() {
        let {selectedRowKeys} = this.state;
        axios({
            url:`${this.url.checkRecord.deletes}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data: selectedRowKeys
        }).then((data)=>{
            message.info(data.data.message);
            this.getTableParams(); //删除后重置信息
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableParams();
    }

    /**搜索事件*/
    searchEvent(searchContent) {
        this.setState({
            searchContent
        });
        this.getTableParams(searchContent)
    }

    /**取消批量删除*/
    cancel() {
        this.setState({
            selectedRowKeys: []
        })
    }

    /**重置事件*/
    reset() {
        this.setState({
            searchContent: undefined
        });
        this.getTableParams('')

    }
}

export default PowerCheck;
