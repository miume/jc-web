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
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchReset=this.searchReset.bind(this);
    }
    render() {
        this.state.pagination=this.props.pagination;

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
                        fetch={this.fetch}
                        searchReset={this.searchReset}
                        getTableData={this.props.getTableData}
                        pagination={this.state.pagination}
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
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    onExpand = (expandedKeys) => {//展开的时候更新一下
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }

    /**绑定搜索事件 */
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        });
        const params={
            deptId:parseInt(this.props.depCode),
            statusId:1,
            depName:this.props.depName,
            condition:this.state.searchContent,
        }
        // this.props.getTableData(params);
        this.fetch(params,0);
    }

    /**重置时重新加载数据*/
    searchReset=()=>{
        this.props.getTableData(
            {
                deptId:parseInt(this.props.depCode),
                statusId:1,
                depName:this.props.depName,
            }
        )
    }
    /**分页查询*/
    handleTableChange = (page) => {
        const {pageChangeFlag} = this.state.pageChangeFlag;
        if (pageChangeFlag) {
            this.props.getTableData({
                deptId:parseInt(this.props.depCode),
                statusId: 1,
                depName:this.props.depName,
                condition:this.state.searchContent,
                page:page.current,
                size:page.pageSize,
            })
        } else {
            this.props.getTableData({
                deptId:parseInt(this.props.depCode),
                statusId: 1,
                depName:this.props.depName,
                page:page.current,
                size:page.pageSize,
            })
        }
    };

    fetch = (params,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;//设置当前页面为1
            pagination.total = 0;//设置全部页面为0
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
                deptId:parseInt(this.props.depCode),
                statusId:1,
                depName:this.props.depName,
                condition:this.state.searchContent,
            }
            this.props.getTableData(params);
        }
    };

}
export default WillMaintain
