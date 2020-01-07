import React from 'react';
import Blockquote from "../../../BlockQuote/blockquote";
import DepTree from "../../../BlockQuote/department";
import axios from "axios";
import SearchCell from "../../../BlockQuote/search";
import TheTable from "./theTable";
import {Spin} from "antd";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class UserProcessAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            deptId: '',
            deptName: '',
            condition: ''
        };
        this.reset = this.reset.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.requestDataProcessing = this.requestDataProcessing.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
    }
    componentDidMount() {
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        let {deptName,deptId,rightTableData,loading,updateFlag} = this.state;
        return (
            <div>
                <Blockquote menu={this.current.menuParent} name="用户工序分配" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className='equipment'>
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    <Spin spinning={loading} wrapperClassName='equipment-right'>
                        <SearchCell name='请输入物料名称' searchEvent={this.searchEvent}
                                    fetch={this.reset} searchContentChange={this.searchContentChange} flag={true}/>
                        <div className={'clear'}></div>
                        <TheTable
                            url={this.url}
                            pagination={this.pagination}
                            deptName={deptName}
                            deptId={deptId}
                            rightTableData={rightTableData}
                            handleTableChange={this.handleTableChange}
                            getTableData={this.getTableData}
                            updateFlag={updateFlag}
                        />
                    </Spin>
                </div>
            </div>
        )
    }

    /**根据部门id获取表格数据*/
    getTableData(params = {}) {
        params = this.requestDataProcessing(params);
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.userProcessName.userProcess}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if(res && res.list) {
                for(let i = 0; i < res.list.length; i++) {
                    let processes = res.list[i]['processes'],
                        processName = [];
                    processes.map(e => processName.push(e.processName));   
                    res.list[i]['index'] = i + 1;
                    res.list[i]['processName'] = processName.join(',');
                }
                this.pagination.total = res.total;
                this.setState({
                    rightTableData: res.list
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    requestDataProcessing(params) {
        let {deptId, depName} = params;
        if(depName) {
            this.setState({
                deptId: deptId,
                deptName: depName
            });
        }
        if(!deptId) {
            let {current,pageSize} = this.pagination, {deptId,condition} = this.state;;
            params['deptId'] = deptId;
            params['page'] = current ? current : 1;
            params['size'] = pageSize ? pageSize : 10;
            params['condition'] = params['condition'] === '' ? '' : condition;
        }
        return params;
    }

    /**分页*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData();
    }

    /**监控input框的变化*/
    searchContentChange(e) {
        let value = e.target.value;
        this.setState({
            condition: value
        })
    }

    /**搜索操作*/
    searchEvent() {
        this.getTableData();
    }

    reset() {
        this.setState({
            condition: ''
        });
        this.getTableData({
            condition: ''
        });
    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentBasicData'});
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
}

export default UserProcessAssignment;
