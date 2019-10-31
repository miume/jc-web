import React from "react";
import SearchCell from "../../../BlockQuote/search";
import DepTree from "../../../BlockQuote/department";
import {Spin} from "antd";
import InspectionTable from "./inspectionTable";
import AddModal from "./tab1/add";
import DeleteByIds from "../../../BlockQuote/deleteByIds";

class InspectionRight extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    co
    constructor(props) {
        super(props);
        this.state = {
            searchContent:'',
            selectedRowKeys: []
        };
        this.pagination = {
            total: this.props.rightTableData.total,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.fetch = this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchReset=this.searchReset.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    render() {
        const {status} = this.props;
        return (
            <div className='equipment'>
                <DepTree
                    key="depTree"
                    treeName={'所属部门'}
                    url={this.props.url}
                    getTableData={this.getTableData}
                />
                <Spin spinning={this.props.loading} wrapperClassName='equipment-right'>
                    <div>
                        <AddModal status={status} deptCode={this.props.deptCode} deptName={this.props.deviceName} getTableData={this.searchEvent}/>
                        <DeleteByIds
                            selectedRowKeys={this.state.selectedRowKeys}
                            cancel={this.cancel}
                            deleteByIds={this.deleteByIds}
                            flag={status === 1 ? true : false}
                        />
                        <SearchCell
                            name='请输入计划名称'
                            fetch={this.fetch}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            flag={true}
                            type={1}
                        />
                    </div>
                    <div className='clear' ></div>
                    <InspectionTable
                        status = {status}
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

    getTableData = (params) => {
        params['status'] = this.props.status;
        this.props.getTableData(params)
    };

    /**跟踪搜索事件变化 */
    searchContentChange(e) {
        const value = e.target.value;
        this.setState({searchContent:value});
    }

    /**绑定搜索事件 */
    searchEvent() {
        const params={
            deptId:parseInt(this.props.deptCode),
            status:this.props.status,
            depName:this.props.depName,
            condition:this.state.searchContent,
            page:this.pagination.current,
            size:this.pagination.pageSize,
        };
        this.props.getTableData(params);
    }

    /**重置时重新加载数据*/
    searchReset() {
        this.setState({
            searchContent: '' //将搜索框内容置空
        });
        this.props.getTableData(
            {
                deptId:parseInt(this.props.deptCode),
                status:this.props.status,
                depName:this.props.depName,
                page:this.pagination.current,
                size:this.pagination.pageSize
            }
        )
    }

    /**分页查询*/
    handleTableChange(page) {
        this.pagination = page;
        this.props.getTableData({
            deptId:parseInt(this.props.deptId),
            statusId: 1,
            condition:this.state.searchContent,
            page:page.current,
            size:page.pageSize,
        })
    };

    fetch() {
        this.searchReset();
    }
}
export default InspectionRight;
