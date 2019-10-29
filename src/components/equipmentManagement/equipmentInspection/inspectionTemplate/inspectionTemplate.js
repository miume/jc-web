import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";

import "./inspectionTemplate.css"
import axios from "axios";
import {message, Select} from "antd";
import Add from "./add";
import SearchCell from "./searchCell";
import home from "../../../commom/fns";
import RightTable from "./rightTable";
import DepTree from "../../../BlockQuote/department";

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
            status: '',
        };
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };

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
        var date = new Date();
        var nowMonth = date.getMonth() + 1;
        var strDate = date.getDate();
        var seperator = "-";
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        this.nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        const menuList1 = JSON.parse(localStorage.getItem('menuList'))
        this.userName = menuList1.name
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('equipmentInspection'));
        const operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.menuName === current.menuParent)[0].menuList : null;
        this.operation = operation.filter(e => e.path === current.path)[0].operations;
        const {Option} = Select;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检模板" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className="equipment">
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.clickDepartment}
                    />
                    <div className="equipment-right">
                        <div>
                            <div className="checkP_buttons">
                                <div className="checkp-left">
                                    <Add deptCode={this.state.deptCode} deviceName={this.state.deviceName}
                                         url={this.url} departName={this.state.parentname} pagination={this.pagination}
                                         fetch={this.getTableData} parentname={this.state.parentname}
                                         name={this.state.name} operation={this.operation} userName={this.userName}
                                         nowDate={this.nowDate}/>
                                    {/*<DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}*/}
                                    {/*             flag={home.judgeOperation(this.operation,'DELETE')}*/}
                                    {/*/>*/}
                                </div>
                                <div className="check_right">
                                    <Select defaultValue="-1" style={{width: 120}} onChange={this.handleChange}>
                                        <Option value='-1'>全部类型</Option>
                                        <Option value='0'>机械类</Option>
                                        <Option value='1'>电气类</Option>
                                    </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <SearchCell
                                        name='请输入模版名称'
                                        flag={home.judgeOperation(this.operation, 'QUERY')}
                                        searchEvent={this.searchEvent}
                                        searchContentChange={this.searchContentChange}
                                        fetch={this.getTableData}
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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

    /**获取右边表格数据*/
    getTableData(params) {
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
                    rightTableData: rightTableData
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
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
    searchEvent = () => {
        const {deptCode,status,searchContent} = this.state;
        if(searchContent) {
            this.getTableData({
                deptId: deptCode,
                status: status,
                size: this.pagination.pageSize,
                page: this.pagination.current,
                condition: searchContent
            });
        }
    }

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

    /**批量删除*/
    deleteByIds = (ids) => {
        axios({
            url: `${this.url.devicePatrolModel.deleteByIds}`,
            method: 'Delete',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: ids,
            type: 'json'
        }).then((data) => {
            message.info(data.data.message);
            if (data.data.code === 0) {
                this.searchEvent();
            }
        }).catch(() => {
            message.info('删除错误，请联系管理员！')
        })
    }

    /**返回数据录入页面 */
    returnDataEntry() {
        this.props.history.push({pathname: '/equipmentInspection'});
    }
}

export default InspectionTemplate
