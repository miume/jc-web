import React from "react";
import {message,Tree,Card,Layout} from "antd";
import Right from "./right";
import axios from "axios";
import DepTree from "./depTree";
import Home from "../../Home/home";

class Completed extends React.Component{
    url;
    operation
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            editingKey: '',
            searchContent:'',
            searchText: '',
            eff_flag:1,
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
    }
    // onSelect = (selectedKeys, info) => {
    //     console.log('selected', selectedKeys, info);
    // };

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const {  Sider, Content } = Layout;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="eqQueryCompleted">
                <Layout>
                    <Sider theme='light' classname="eqQueryCompleted-left" >
                        <Card headStyle={{marginLeft:"30px"}} title="所属部门" width="100">
                            <DepTree
                                url={this.url}
                                getTableData={this.props.getTableData}
                            />
                        </Card>&nbsp;&nbsp;
                    </Sider>
                    <Content margin-left={600} theme="light">
                        <Right
                            url={this.url}
                            data={this.state.dataSource}
                            pagination={this.state.pagination}
                            fetch={this.fetch}
                            modifyDataSource={this.modifyDataSource}
                            handleTableChange={this.handleTableChange}
                            handleDelete={this.handleDelete}
                            judgeOperation = {Home.judgeOperation}
                            operation = {this.operation}
                            rightTableData={this.props.rightTableData}
                            getTableData={this.props.getTableData}
                            depCode={this.props.depCode}
                        />
                    </Content>
                </Layout>
            </div>

        );
    }

    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.searchContent,
                deptId:parseInt(this.state.depCode),
                deviceId:this.props.record.code
                // pageSize:pagination.pageSize,
                // pageNumber:pagination.current,
                // departmentName:this.state.searchContent
            })
        }else{
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.depCode,
                deptId:parseInt(this.state.code),
                deviceId:this.props.record.code
                // pageSize:pagination.pageSize,
                // pageNumber:pagination.current,
            })
        }
    };


    fetch = (params ,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios({
            url: ' ' ,
            method: 'get',
            params: params,
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                this.setState({
                    dataSource: res.list,
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: []
                })
            }
        });
    };
}
export default Completed

