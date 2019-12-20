import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import AddModal from "./add/addModal";
import Home from "../../commom/fns";
import {Spin} from "antd";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from "../../BlockQuote/newSearchSell";
import PowerCheckTable from "./powerCheckTable";

const data = [{
    index: 1,
    code: 1,
    modelName: '点检名称',
    siteName: '地点1',
    siteCode: 1,
    operator: '管理员',
    class: '班次1',
    checkDate: '2019-10-10',
    note: '1次/天',
    effectiveDate: '2019-11-11'
}];

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
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current')), {selectedRowKeys,data} = this.state;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal title={'新增'}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={Home.judgeOperation(this.operation,'DELETE')}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'设备名/点检项目'}/>
                    <div className='clear'></div>
                    <PowerCheckTable data={data} selectedRowKeys={selectedRowKeys} onSelectChange={this.onSelectChange} handleTableChange={this.handleTableChange}/>
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
                searchContent: value === undefined ? searchContent : value,
                pageSize: pageSize,
                current: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData(params) {
        console.log(params)
        this.setState({
            data: data
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
        // axios({
        //     url:`${this.props.url.eqMaintenanceQuery.recordDelete}/${id}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     }
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     this.props.getTableData(); //删除后重置信息
        // }).catch(()=>{
        //     message.info('删除失败，请联系管理员！');
        // });
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
        console.log('searchContent=',searchContent)
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
