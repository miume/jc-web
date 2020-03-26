import React from 'react';
import Blockquote from "../../../BlockQuote/blockquote";
import DepTree from "../../../BlockQuote/department";
import axios from "axios";
import Allocation from "./allocation";
import {Select, Spin} from "antd";
import SearchCell from "../../../BlockQuote/search";
import RightTable from "./RightTable";

class EqupimentAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            processDeptId: '',
            dataSource: [],
            condition: '',
            deptName: '',
            processData: []
        };
        this.url = JSON.parse(localStorage.getItem('url'));
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        };
        this.getProcess = this.getProcess.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchReset = this.searchReset.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
    }

    render() {
        const current = JSON.parse(localStorage.getItem('dataEntry'));
        let operation = JSON.parse(localStorage.getItem('menus')) ?
            JSON.parse(localStorage.getItem('menus')).filter(e => e.menuId === current.menuParentId):[],
            click = operation.length ? operation[0]['menuList'] : [];
        this.operation = click.length ? click.filter(e => e.menuId === current.menuId)[0].operations: [];
        let {processData,loading,processDeptId,dataSource,deptName} = this.state;
        return (
            <div>
                <Blockquote menu={current.menuParent} name={current.menuName} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div className={'equipment'}>
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getProcess} />
                    <Spin spinning={loading} wrapperClassName="equipment-right">
                        {/*分配按钮 */}
                        <Allocation url={this.url} clickId={processDeptId} clickName={deptName}
                                    processData={processData}/>

                        {/*搜索模块*/}
                        <SearchCell
                            name='固定资产编号/设备名称'
                            flag={true}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.searchReset}
                        />
                        <Select style={{width: 200,float:'right',marginRight:10}} value={processDeptId} onChange={this.selectChange}>{this.renderSelect(processData)}</Select>
                        {/*表格模块*/}
                        <RightTable dataSource={dataSource} pagination={this.pagination} handleTableChange={this.handleTableChange}/>
                    </Spin>
                </div>
            </div>
        )
    }

    /**根据部门id获取工序*/
    getProcess(params) {
        this.setState({
            deptName: params.depName,
            dataSource: []
        });
        axios({
            url: `${this.url.deviceProcess.getAllByDept}?deptId=${params.deptId}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            let res = data.data.data ? data.data.data : [],
                processDeptId = res && res.length ? res[0].code : '';
            this.setState({
                processData: res,
                processDeptId: processDeptId
            });
            if(processDeptId)
                this.getTableData({
                    processDeptId: processDeptId
                });
        })
    }

    /**根据部门和工序的组合id（即下拉框的值）获取表格数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.deviceProcess.getPageByProcessDeptId}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            let res = data.data.data ? data.data.data : [], dataSource = [];
            this.pagination.total = res && res.total ? res.total : 0;
            for(let i = 0; i < res.list.length; i++) {
                let e = res.list[i]['deviceMap'];
                e['index'] = (res['page'] - 1) * res['size'] + i + 1;
                e['status'] = res.list[i].status.name;
                e['color'] = res.list[i].status.color;
                e['deptName'] = this.state.deptName;
                dataSource.push(e);
            }
            this.setState({
                dataSource: dataSource,
                loading: false
            });
        })
    }

    /**监控表格分页*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        let {processDeptId, condition} = this.state;
        this.getTableData({
            processDeptId: processDeptId,
            condition: condition,
            page: pagination.current,
            size: pagination.pageSize
        });
    }

    /**渲染下拉框option*/
    renderSelect(data) {
        if(data && data.length) {
            return data.map(e => <Select.Option key={e.code} value={e.code}>{e.processName}</Select.Option>)
        }
    }

    /**监控下拉框工序的变化*/
    selectChange(value) {
        this.setState({
            processDeptId: value
        })
        this.getTableData({
            processDeptId:value
        });
    }

    /**监控输入框的变化*/
    searchContentChange(e) {
        let value = e.target.value;
        this.setState({
            condition: value
        })
    }

    /**搜索功能*/
    searchEvent() {
        let {processDeptId, condition} = this.state;
        this.getTableData({
            processDeptId: processDeptId,
            condition: condition
        });
    }

    /**重置*/
    searchReset() {
        let {processData} = this.state,
            processDeptId = processData && processData.length ? processData[0].code : '';
        this.setState({
            condition: '',
            processDeptId: processDeptId
        });
        this.getTableData({
            processDeptId: processDeptId
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

export default EqupimentAssignment;
