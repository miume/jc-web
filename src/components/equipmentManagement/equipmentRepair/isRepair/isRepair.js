import React from "react";
import "../equipmenRepair.css";
import DepTree from "./depTree";
import SearchCell from "../../../BlockQuote/search";
import TheTable from "./theTable";
import {Spin} from "antd";

class IsRepair extends React.Component{
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
        this.url=this.props.url;

        return(
            <div style={{paddingTop: '1px'}} className="eRp">
                {/*左边树部分*/}
                <div className="eRp-left">
                    <DepTree
                        url={this.url}
                        getTableData={this.props.getTableData}
                    />
                </div>
                <Spin spinning={this.props.loading} wrapperClassName='eRp-right'>
                    <div className='eRp-putright'>
                        <SearchCell
                            name='关键字'
                            flag={true}
                            fetch={this.searchReset}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            type={2}
                        />
                    </div>

                    <div className='eRp-shangbianju'>
                        <TheTable
                            url={this.url}
                            rightTableData={this.props.rightTableData}
                            pagination={this.pagination}
                            handleTableChange={this.handleTableChange}
                        />
                    </div>
                </Spin>
            </div>

        );
    }
    /**跟踪搜索事件变化 */
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({searchContent:value});
    };

    /**绑定搜索事件 */
    searchEvent = () => {
        const params={
            secondDeptId:this.props.secondDeptId,
            repairStatus:2,
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
                repairStatus:2,
            }
        )
    };

    /**分页查询*/
    handleTableChange = (page) => {
        this.pagination = page;
        let {searchContent} = this.state;
        let params = {
            secondDeptId:this.props.secondDeptId,
            repairStatus:2,
            condition: searchContent,
            page: page.current,
            size: page.pageSize
        };
        this.props.getTableData(params)
    };
}
export default IsRepair
