import React from "react";
import DepTree from "../../../BlockQuote/department";
import SearchCell from "../../../BlockQuote/search";
import TheTable from "./theTable";
import {Spin} from "antd";

class HaveJudge extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchContent:'',
        };
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
    }

    render() {
        this.pagination.total = this.props.rightTableData.total;
        return(
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
                            name='请输入设备名称'
                            flag={true}
                            fetch={this.searchReset}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            type={4}
                        />
                    </div>
                    <div className='clear' ></div>
                    <TheTable
                        url={this.props.url}
                        rightTableData={this.props.rightTableData}
                        pagination={this.pagination}
                        handleTableChange={this.handleTableChange}
                    />
                </Spin>
            </div>

        );
    }

    getTableData = (params) => {
        params['repairStatus'] = 4;
        this.props.getTableData(params)
    };

    /**跟踪搜索事件变化 */
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({searchContent:value});
    };

    /**绑定搜索事件 */
    searchEvent = () => {
        const params={
            secondDeptId:this.props.secondDeptId,
            repairStatus:4,
            condition:this.state.searchContent,
            page: this.pagination.current,
            size: this.pagination.pageSize
        };
        this.props.getTableData(params);
    };

    /**重置时重新加载数据*/
    searchReset=()=>{
        this.setState({
            searchContent:''
        });
        this.props.getTableData(
            {
                secondDeptId:this.props.secondDeptId,
                repairStatus:4,
            }
        )
    };

    /**分页查询*/
    handleTableChange = (page) => {
        this.pagination = page;
        let {searchContent} = this.state;
        let params = {
            secondDeptId:this.props.secondDeptId,
            repairStatus:1,
            condition: searchContent,
            page: page.current,
            size: page.pageSize
        };
        this.props.getTableData(params);
    };
}
export default HaveJudge
