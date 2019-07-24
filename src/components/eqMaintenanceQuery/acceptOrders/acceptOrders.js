import React from "react";
import {message,Input,Button,Table,Layout,Tree} from "antd";
import './acceptOrders.css'
import Card from "antd/lib/card";
import TheTable from "./Table/theTable";
import axios from "axios";
import SearchCell from "../../BlockQuote/search";
import DepTree from "./depTree/depTree";
import home from "../../commom/fns";

//总的页面样式

class AcceptOrders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            deviceName: '',
            rightTableData:[],
            eff_flag: '2',
            searchContent:'',
            pageChangeFlag: 0,   //0表示分页 1 表示查询
        };
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchReset=this.searchReset.bind(this);
    }

    render() {
        const { Header, Sider, Content } = Layout;
        this.state.pagination=this.props.pagination;
        this.url =this.props.url;

        return (
            <div >
                <Layout >
                    <Sider width={240} style={{background:"white",height:'525px'}} >
                        <div className="ac-roll" style={{width:'235px'}}>
                            <Card title="所属部门" >
                                <DepTree
                                    url={this.url}
                                    eff_flag={this.state.eff_flag}
                                    getTableData={this.props.getTableData}
                                />
                            </Card>
                        </div>
                    </Sider>
                    <Layout >
                        <Header style={{background:"white",lineHeight:4,height:58}}>
                            <div className="ac-putright" >
                                <SearchCell
                                    name='单号/设备名称/编号'
                                    fetch={this.fetch}
                                    searchEvent={this.searchEvent}
                                    searchContentChange={this.searchContentChange}
                                    flag={home.judgeOperation(this.props.operation, 'QUERY')}/>
                            </div>
                        </Header >
                        <Content style={{background:"white"}}>
                            <div style={{background:"white"}}>
                            <TheTable
                                fetch={this.fetch}
                                searchReset={this.searchReset}
                                getTableData={this.props.getTableData}
                                pagination={this.state.pagination}
                                rightTableData={this.props.rightTableData}
                                handleTableChange={this.handleTableChange}
                            />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }


    /**实时跟踪搜索框内容的变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent: value});
    };
    /**绑定搜索事件 */
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        });
        const params={
            deptId:parseInt(this.props.depCode),
            statusId:2,
            condition:this.state.searchContent,
        }
        // this.props.getTableData(params);
        this.fetch(params,0);
    }

    searchReset=()=>{
        this.props.getTableData(
            {
                deptId:parseInt(this.props.depCode),
                statusId:2,
            }
        )
    }
    /**分页查询*/
    handleTableChange = (page) => {
        const {pageChangeFlag} = this.state.pageChangeFlag;
        if (pageChangeFlag) {
            this.props.getTableData({
                deptId:parseInt(this.props.depCode),
                statusId: 2,
                condition:this.state.searchContent,
                page:page.current,
                size:page.pageSize,
            })
        } else {
            this.props.getTableData({
                deptId:parseInt(this.props.depCode),
                statusId: 2,
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
                statusId:2,
                condition:this.state.searchContent,
            }
            this.props.getTableData(params);
        }

    };

}

export default AcceptOrders