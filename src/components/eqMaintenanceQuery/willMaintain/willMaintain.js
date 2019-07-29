import React from "react";
import {Button, Input, Layout, message, Tree} from "antd";
import TheTable from "../willMaintain/Table/theTable";
import SearchCell from "../../BlockQuote/search";
import axios from "axios";
import home from "../../commom/fns";
import './willMaintain.css'
import TreeCard from "../../BlockQuote/treeSelect";


class WillMaintain extends React.Component{
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
        const { Header, Sider, Content } = Layout;
        this.state.pagination=this.props.pagination;
        this.url = this.props.url;

        return (
            <div >
                <Layout >
                    <Sider width={240} style={{background:"white",height:'525px'}} >
                        <div style={{width:'235px'}}>
                        <TreeCard
                            getParams={this.getParams}
                            treeData={this.state.TreeData}
                            getTableData={this.props.getTableData}
                            defaultparams={{
                                deptId:2,
                                statusId:1,
                                depName:'锂电一',
                            }}
                            expandedKeys={this.state.expandedKeys}
                            defaultSelectedKeys={['2']}
                            params={{
                                deptId:this.state.deptId,
                                depName:this.state.depName,
                                statusId:1,
                            }}
                            onExpand={this.onExpand}
                            treeName={'所属部门'}
                            getTreeData={this.getTreeData}
                        />
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
                                    url={this.url}
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

    getParams=(selectedkeys,e)=>{
        this.setState({
            deptId:selectedkeys[0],
            depName:e.node.props.value,
        },()=>{
            if(selectedkeys[0]){
                const params = {
                    deptId:this.state.deptId,
                    statusId:1,
                    depName:this.state.depName,
                };
                console.log(params)
                this.props.getTableData(params)
            }
        })

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
                condition:this.state.searchContent,
                page:page.current,
                size:page.pageSize,
            })
        } else {
            this.props.getTableData({
                deptId:parseInt(this.props.depCode),
                statusId: 1,
                page:page.current,
                size:page.pageSize,
            })
        }
    };

    getTreeData = () => {
        // TODO: 调接口，获取数据
        axios({
            url: `${this.props.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            var dataSource = [{

                title:'总公司',
                key:0,
                value: '总公司',
                children: []
            }];
            if (res) {
                var expandedKeys=['0'];
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        value: arrParent.name,
                        key:arrParent.code,
                        children: [],
                    };
                    const arrSon = res[i].son;
                    if(i === 0){
                        expandedKeys.push(arrParent.code.toString())
                    }
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        if(i===0&&j===0){
                            parenObj['children'].push({
                                value: arr.name,
                                children:[],
                                title:arr.name,
                                key:arr.code,
                            });
                        }else{
                            parenObj['children'].push({
                                value: arr.name,
                                children: [],
                                title:arr.name,
                                key:arr.code,

                            });
                        }
                    }
                    dataSource[0].children.push(parenObj);
                }
                this.setState({
                    TreeData: dataSource,
                    expandedKeys: expandedKeys,
                })
            } else {
                message.info('没有获取到数据')
            }
        });
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
                condition:this.state.searchContent,
            }
            this.props.getTableData(params);
        }
    };

}
export default WillMaintain