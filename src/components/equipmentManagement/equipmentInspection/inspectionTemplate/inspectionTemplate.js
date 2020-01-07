import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import "./inspectionTemplate.css"
import axios from "axios";
import {message, Select, Spin} from "antd";
import SearchCell from "../../../BlockQuote/search";
import home from "../../../commom/fns";
import RightTable from "./rightTable";
import DepTree from "../../../BlockQuote/department";
import EditorModal from "./editorModal";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class InspectionTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            rightTopData: [],
            rightTableData: [],
            deptCode: -1,
            deviceName: '',
            searchContent: '',
            status: '-1',
            loading: true
        };
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.reset = this.reset.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.clickDepartment = this.clickDepartment.bind(this);
    }

    render() {
        /*获取日期*/
        let date = new Date().toLocaleDateString().split('/').join('-');
        const menuList1 = JSON.parse(localStorage.getItem('menuList'))
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        const operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.menuName === this.current.menuParent)[0].menuList : null;
        this.operation = operation.filter(e => e.path === this.current.path)[0].operations;
        const {Option} = Select;
        let {deptCode,deviceName ,addFlag,deleteFlag,updateFlag} = this.state;
        let record = {
            deptCode: deptCode,
            workshop: deviceName,
            setPeople: menuList1.name,
            setPeopleId: menuList1.userId,
            tabulatedate: date,
            checkType: 'false'
        };
        return (
            <div>
                <Blockquote menu={this.current.menuParent} name="巡检模板" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className="equipment">
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.clickDepartment}
                    />
                    <Spin spinning={this.state.loading} wrapperClassName="equipment-right">
                        <div>
                            <div className="checkP_buttons">
                                <div className="checkp-left">
                                    <EditorModal title={'新增'} record={record} addFlag={addFlag}
                                         url={this.url} searchEvent={this.searchEvent}/>
                                </div>
                                <div className="check_right">
                                    <Select value={this.state.status} style={{width: 120}} onChange={this.handleChange}>
                                        <Option value='-1'>全部类型</Option>
                                        <Option value='0'>机械类</Option>
                                        <Option value='1'>电气类</Option>
                                    </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <SearchCell
                                        name='请输入模版名称'
                                        flag={true}
                                        fetch={this.reset}
                                        searchContentChange={this.searchContentChange}
                                        searchEvent = {this.searchEvent}
                                        deptId={this.state.deptCode}
                                        deviceName={this.state.deviceName}
                                    />
                                </div>
                            </div>
                            <div className="inspection-Tem-table">
                                <RightTable
                                    dataSource={this.state.rightTableData}
                                    operation={this.operation}
                                    pagination={this.pagination}
                                    searchEvent={this.searchEvent}
                                    deptCode={this.state.deptCode}
                                    deviceName={this.state.deviceName}
                                    url={this.url}
                                    handleTableChange={this.handleTableChange}
                                    status={this.state.status}
                                    deleteByIds={this.deleteByIds}
                                    updateFlag={updateFlag}
                                    deleteFlag={deleteFlag}
                                />
                            </div>
                        </div>
                    </Spin>
                </div>
            </div>
        )
    }
    componentDidMount() {
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    /**点击切换部门*/
    clickDepartment(params) {
        /**存储部门名称和部门id*/
        this.setState({
            deptCode: params.deptId,
            deviceName: params.depName
        });
        const {status,searchContent} = this.state;
        this.getTableData({
            deptId: params.deptId,
            status: status,
            size: this.pagination.pageSize,
            page: this.pagination.current,
            condition: searchContent
        });

    }

    /**重置*/
    reset() {
        this.setState({
            status: '-1',
            searchContent: ''
        });
        const {deptCode} = this.state;
        this.getTableData({
            deptId: deptCode
        });
    }

    /**获取右边表格数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.devicePatrolModel.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res && res.list) {
                var rightTableData = [];
                this.pagination.total = res.list.length;
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].devicePatrolModelsHead;
                    rightTableData.push({
                        index: i + 1,
                        code: arr['code'],
                        deptCode: arr['deptCode'],
                        patrolName: arr['patrolName'],
                        tabulatedate: arr['tabulatedate'],
                        checkType: arr['checkType'],
                        checkTypeName: arr['checkType'] ? '电气类' : '机械类',
                        setPeople: res.list[i].setPeople,
                        workshop: params.depName ? params.depName : this.state.deviceName,
                    })
                }
                this.setState({
                    rightTableData: rightTableData,
                    loading: false
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    loading: false
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    };

    /**跟踪下拉框变化*/
    handleChange = (value) => {
        this.setState({
            status: value
        });
        const {deptCode,searchContent} = this.state;
        this.getTableData({
            deptId: deptCode,
            status: value,
            size: this.pagination.pageSize,
            page: this.pagination.current,
            condition: searchContent
        });
    };

    /**搜索事件*/
    searchEvent() {
        const {deptCode,status,searchContent} = this.state;
        this.getTableData({
            deptId: deptCode,
            status: status,
            size: this.pagination.pageSize,
            page: this.pagination.current,
            condition: searchContent
        });
    };

    /**跟踪input搜索框内容*/
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        });
    };

    /**分页查询 */
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        this.searchEvent();
    };

    /**返回数据录入页面 */
    returnDataEntry() {
        this.props.history.push({pathname: '/equipmentInspection'});
    }

    /**销魂组件*/
    componentWillUnmount() {
        this.setState=()=>{
            return;
        }
    }
}

export default InspectionTemplate
