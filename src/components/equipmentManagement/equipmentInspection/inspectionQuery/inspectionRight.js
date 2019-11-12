import React from 'react';
import DepTree from "../../../BlockQuote/department";
import {Spin, Table} from "antd";
import {column1,column2,column3} from "./columns";
import SearchPart from "./searchPart";

class InspectionRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deptId: '',
            startDate: '',
            endDate: '',
            condition: ''
        };
        this.pagination = {
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            },
            pageSizeOptions: ["10","20","50","100"]
        };
        this.reset = this.reset.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    render() {
        let {rightTableData,status} = this.props;
        this.pagination.total = rightTableData && rightTableData.total ? rightTableData.total : 0;
        return (
            <div className="equipment">
                <DepTree
                    key="depTree"
                    treeName={'所属部门'}
                    url={this.props.url}
                    getTableData={this.getTableData} />
                <Spin spinning={this.props.loading} wrapperClassName={'equipment-right'}>
                    <SearchPart getTableData={this.searchEvent} reset={this.reset}/>
                    <Table
                        bordered
                        size={"small"}
                        columns={this.renderColumns(status)}
                        dataSource={this.props.rightTableData}
                        pagination={this.pagination}
                        onChange={this.handleTableChange}
                        rowKey={record => record.key}
                    />
                </Spin>
            </div>
        )
    }

    renderColumns(status) {
        if(status === 1) return column1;
        else if (status === 2) return column2;
        return column3;
    }

    getTableData(params) {
        this.setState({
            deptId: params.deptId
        });
        let {condition,startDate,endDate} = this.state;
        params['condition'] = condition;
        params['startDate'] = startDate;
        params['endDate'] = endDate;
        this.props.getTableData(params);
    }

    handleTableChange(pagination) {
        let {deptId,condition,startDate,endDate} = this.state;
        let params = {
            deptId: deptId,
            condition: condition,
            startDate: startDate,
            endDate: endDate,
            page: pagination.current,
            size: pagination.pageSize,
        };
        this.props.getTableData(params);
    }

    searchEvent(params) {
        let {condition,startDate,endDate} = params;
        this.setState({
            startDate: startDate,
            endDate: endDate,
            condition: condition
        });
        params['deptId'] = this.state.deptId;
        this.props.getTableData(params);
    }

    /**重置操作*/
    reset() {
        this.setState({
            startDate: '',
            endDate: '',
            condition: ''
        });
        let {deptId} = this.state;
        let params = {
            deptId: deptId,
            page: this.pagination.current,
            size: this.pagination.pageSize,
        };
        this.props.getTableData(params);
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default InspectionRight;
