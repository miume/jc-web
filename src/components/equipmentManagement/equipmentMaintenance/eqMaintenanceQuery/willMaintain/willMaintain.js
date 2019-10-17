import React from "react";
import TheTable from "./Table/theTable";
import SearchCell from "../../../../BlockQuote/search";
import home from "../../../../commom/fns";
import './willMaintain.css'
import DepTree from "../../../../BlockQuote/department";
import {Spin} from "antd";

class WillMaintain extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    co
    constructor(props) {
        super(props);
        this.state = {
            deviceName: '',
            eff_flag: '1',
            rightTableData:[],
            searchContent:'',
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            dataSource:[],
            TreeData:[],
            expandedKeys:[],
            depName:'',
            deptId:'',
        };
        this.pagination = {
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
                            name='单号/设备名称/编号'
                            fetch={this.fetch}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            flag={home.judgeOperation(this.props.operation,'QUERY')}
                            type={1}
                        />
                    </div>
                    <div className='clear' ></div>
                    <TheTable
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
        params['statusId'] = 1;
        this.props.getTableData(params)
    }

    /**跟踪搜索事件变化 */
    searchContentChange(e) {
        const value = e.target.value;
        this.setState({searchContent:value});
    }

    /**绑定搜索事件 */
    searchEvent() {
        const params={
            deptId:parseInt(this.props.deptId),
            statusId:1,
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
                deptId:parseInt(this.props.deptId),
                statusId:1,
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
export default WillMaintain
