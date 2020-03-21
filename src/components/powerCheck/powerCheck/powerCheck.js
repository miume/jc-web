import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import AddModal from "./add/addModal";
import {Spin, message} from "antd";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from "./search";
import PowerCheckTable from "./powerCheckTable";
import axios from "axios";
import {getSecondsOperations, judgeOperation} from "../../commom/getOperations";

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
            param: {}
        };
        this.operations = [];
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
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
        this.current = JSON.parse(localStorage.getItem('current'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {selectedRowKeys,data,addFlag,deleteFlag,updateFlag} = this.state;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal title={'新增'} flag={addFlag} url={this.url} getTableParams={this.getTableParams}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={deleteFlag}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'点检名称'}/>
                    <div className='clear'></div>
                    <PowerCheckTable data={data} selectedRowKeys={selectedRowKeys} onSelectChange={this.onSelectChange}
                                     url={this.url} handleTableChange={this.handleTableChange} pagination={this.pagination}
                                     getTableParams={this.getTableParams} deleteFlag={deleteFlag} updateFlag={updateFlag}/>
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.getTableParams();
        let {menuId} = this.current, operations = getSecondsOperations(menuId);
        this.setState({
            addFlag: judgeOperation(operations,'SAVE'),
            updateFlag: judgeOperation(operations,'UPDATE'),
            deleteFlag: judgeOperation(operations,'DELETE')
        })
    }

    /**确定获取表格数据的参数 flag标记重置数据为空*/
    getTableParams(params = {},flag) {
        let {param} = this.state, {pageSize, current} = this.pagination;
        if ( !params.hasOwnProperty('start') && !flag && (param['start'] || param['end'] || param['condition'])) {
            params['start'] = param['start'];
            params['end'] = param['end'];
            params['condition'] = param['condition'];
        }   
        params['size'] = pageSize;
        params['page'] = current;
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
            if (res && res.list) {
                let result = [];
                this.pagination.total = res.total ? res.total : 0;
                for (let i = 0; i < res.list.length; i++) {
                    let {head, siteName} = res['list'][i];
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
            url: `${this.url.checkRecord.deletes}`,
            method: 'Delete',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: selectedRowKeys
        }).then((data) => {
            message.info(data.data.message);
            this.getTableParams(); //删除后重置信息
        }).catch(() => {
            message.info('删除失败，请联系管理员！');
        });
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableParams();
    }

    /**搜索事件*/
    searchEvent(params) {
        this.setState({
            param: params
        });
        this.pagination.current = 1;
        this.getTableParams(params)
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
            param: {}
        });
        this.pagination.current = 1;
        this.getTableParams({},true)

    }
}

export default PowerCheck;
