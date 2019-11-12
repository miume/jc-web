import React from "react";
import Right from "./right";
import DepTree from "../../../../BlockQuote/department";
import home from "../../../../commom/fns";
import {Spin} from "antd";
import SearchCell from "./search";

class Completed extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    url;
    operation;

    constructor(props) {
        super(props);
        this.state = {
            searchContent:'', //保存input的内容
            startDate: '',    //保存RangePicker组件的开始时间和结束时间
            endDate: ''
        };
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.fetch = this.fetch.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }


    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div className='equipment-query'>
                <DepTree
                    key="depTree"
                    treeName={'所属部门'}
                    url={this.props.url}
                    getTableData={this.getTableData}
                />
                <Spin spinning={this.props.loading} wrapperClassName='equipment-right'>
                    <div>
                        <SearchCell
                            name="单号/设备名称/编号..."
                            fetch={this.fetch}
                            flag={home.judgeOperation(this.operation,'QUERY')}
                            getTableData={this.getTableData}
                            searchEvent = {this.searchEvent}
                            deptId={this.props.deptId}
                            style={{marginTop:10}}
                        />
                    </div>
                    <Right
                        url={this.props.url}
                        searchEvent={this.searchEvent}
                        pagination={this.pagination}
                        rightTableData={this.props.rightTableData}
                        handleTableChange={this.handleTableChange}
                    />
                </Spin>
            </div>
        );
    }

    /**获取最近一个月已完成表格数据*/
    getTableData(params, flag) {
        if(flag) {
            this.setState({
                flag: flag
            })
        }
        if(!params.startDate && !params.endDate) {
            let date = this.props.getLastMonthTime(flag ? flag : this.state.flag);
            params['startDate'] = date.startDate;
            params['endDate'] = date.endDate;
        }
        params['statusId'] = 3;
        params['deptId'] = params['deptId'] ? params['deptId'] : this.props.deptId;
        this.props.getTableData(params)
    }

    /**分页查询*/
    handleTableChange(page)  {
        this.pagination = page;
        const {searchContent, startDate, endDate} = this.state;
        this.getTableData({
            deptId: parseInt(this.props.deptId),
            condition: searchContent,
            page: page.current,
            size: page.pageSize,
            startDate: startDate,
            endDate: endDate
        })
    };

    searchEvent(params) {
        this.setState({
            searchContent: params.searchInput,
            startDate: params.startDate,
            endDate: params.endDate
        });
        this.props.getTableData(params);
    }

    /**搜索重置*/
    fetch({}, flag) {
        this.setState({
            searchContent: '',
            startDate: '',
            endDate: ''
        });
        this.getTableData({},flag);
    }
}
export default Completed

