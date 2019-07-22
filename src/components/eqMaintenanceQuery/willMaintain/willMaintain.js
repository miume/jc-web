import React from "react";
import {Button, Input, Layout, message, Tree} from "antd";
import Card from "antd/lib/card";
import TheTable from "../willMaintain/Table/theTable";
import SearchCell from "../../BlockQuote/search";
import axios from "axios";
import DepTree from "./depTree/depTree";
import home from "../../commom/fns";
import './willMaintain.css'


class WillMaintain extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            depCode: -1,
            deviceName: '',
            eff_flag: 1,
            rightTableData:[],
            searchContent:'',
            pagination: {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger: true
            },
            pageChangeFlag: 0,   //0表示分页 1 表示查询
        };
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        // this.judgeOperation = this.judgeOperation.bind(this)
    }

    render() {
        const { Header, Sider, Content } = Layout;
        this.url = this.props.url;
        this.rightTableData=this.props.rightTableData;
        return (
            <div >
                <Layout >
                    <Sider width={240} style={{background:"white",height:'525px'}} >
                        <div className="wi-roll" style={{width:'235px'}}>
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
                        <Header  style={{background:"white",lineHeight:4,height:58}}>
                            <div className="wi-putright" >
                                <SearchCell
                                    name='单号/设备名称/编号'
                                    fetch={this.fetch}
                                    searchEvent={this.searchEvent}
                                    searchContentChange={this.searchContentChange}
                                    flag={home.judgeOperation(this.props.operation,'QUERY')}/>
                            </div>
                        </Header >
                        <Content style={{background:"white"}}>
                            <div style={{background:"white"}}>
                                <TheTable
                                    rightTableData={this.props.rightTableData}
                                />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
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
            deptId:parseInt(this.props.depCode),
            statusId:1,
            condition:this.state.searchContent,
        }
        // this.props.getTableData(params);
        this.fetch(params,0);
    }

    searchReset=()=>{
        this.props.getTableData(
            {
                deptId:parseInt(this.props.depCode),
                statusId:1,
            }
        )
    }

    fetch = (params,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            this.setState({
                pageChangeFlag: 0,
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
                condition:this.state.searchContent,
            }
            this.props.getTableData(params);
        }

    };
}
export default WillMaintain