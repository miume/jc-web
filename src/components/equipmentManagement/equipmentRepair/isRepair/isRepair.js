import React from "react";
import "../equipmenRepair.css";
import DepTree from "./depTree";
import SearchCell from "../../../BlockQuote/search";
import TheTable from "./theTable";

class IsRepair extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pageChangeFlag:'',
            searchContent:'',
        }
    }

    render() {
        this.url=this.props.url;
        this.state.pagination=this.props.pagination;

        return(
            <div style={{paddingTop: '1px'}} className="eRp">
                {/*左边树部分*/}
                <div className="eRp-left">
                    <DepTree
                        url={this.url}
                        getTableData={this.props.getTableData}
                    />
                </div>
                <div className='eRp-right'>
                    <div className='eRp-putright'>
                        <SearchCell
                            name='关键字'
                            flag={true}
                            fetch={this.fetch}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            type={2}
                        />
                    </div>

                    <div className='eRp-shangbianju'>
                        <TheTable
                            url={this.url}
                            rightTableData={this.props.rightTableData}
                            pagination={this.state.pagination}
                            handleTableChange={this.handleTableChange}
                        />
                    </div>
                </div>
            </div>

        );
    }
    /**跟踪搜索事件变化 */
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**绑定搜索事件 */
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        });
        const params={
            secondDeptId:this.props.secondDeptId,
            repairStatus:2,
            condition:this.state.searchContent,
        }
        this.fetch(params,0);
    }
    /**重置时重新加载数据*/
    searchReset=()=>{
        this.props.getTableData(
            {
                secondDeptId:this.props.secondDeptId,
                repairStatus:2,
            }
        )
    }
    /**分页查询*/
    handleTableChange = (page) => {
        const {pageChangeFlag} = this.state.pageChangeFlag;
        if (pageChangeFlag) {
            this.props.getTableData({
                secondDeptId:this.props.secondDeptId,
                repairStatus:2,
                condition:this.state.searchContent,
            })
        } else {
            this.props.getTableData({
                secondDeptId:this.props.secondDeptId,
                repairStatus:2,
            })
        }
    };
    fetch = (params,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            // pagination.total = 0;//设置全部页面为0
            this.setState({
                pageChangeFlag: 0,
                searchContent:'',
                pagination:pagination
            })
            this.searchReset();
        }
        else{
            this.setState({
                pageChangeFlag: 1
            });
            const params={
                secondDeptId:this.props.secondDeptId,
                repairStatus:2,
                condition:this.state.searchContent,
            }
            this.props.getTableData(params);
        }
    };
}
export default IsRepair
