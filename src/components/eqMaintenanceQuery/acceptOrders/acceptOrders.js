import React from "react";
import {message,Input,Button,Table,Layout,Tree} from "antd";
import './acceptOrders.css'
import TheTable from "./Table/theTable";
import axios from "axios";
import SearchCell from "../../BlockQuote/search";
import home from "../../commom/fns";
import TreeCard from "../../BlockQuote/treeSelect";

//总的页面样式

class AcceptOrders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            deviceName: '',
            eff_flag: '2',
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
        this.url =this.props.url;

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
                                    statusId:2,
                                    depName:'锂电一',
                                }}
                                expandedKeys={this.state.expandedKeys}
                                defaultSelectedKeys={['2']}
                                params={{
                                    deptId:this.state.deptId,
                                    depName:this.state.depName,
                                    statusId:2,
                                }}
                                onExpand={this.onExpand}
                                treeName={'所属部门'}
                                getTreeData={this.getTreeData}
                            />
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
                                url={this.url}
                                fetch={this.fetch}
                                searchReset={this.searchReset}
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
                    statusId:2,
                    depName:this.state.depName,
                };
                console.log(params)
                this.props.getTableData(params)
            }
        })

    }

    onExpand = (expandedKeys) => {//展开的时候更新一下
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }

    /**实时跟踪搜索框内容的变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent: value});
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