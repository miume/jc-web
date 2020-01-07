import React from 'react';
import Blockquote from "../../../BlockQuote/blockquote";
import DepTree from "../../../BlockQuote/department";
import AddModal from "./addaModal";
import {message, Spin} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import ProcessTable from "./processTable";
import axios from "axios";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class EquipmentProcessName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            rightTableData: [],
            deptName: '',
            deptId: '',
            loading: true
        };
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
    }

    render() {
        let {selectedRowKeys,deptName,deptId,rightTableData,loading} = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {addFlag,deleteFlag,updateFlag}=this.state
        return (
            <div>
                <Blockquote menu={this.current.menuParent} name="工序名称" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className='equipment'>
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    <Spin spinning={loading} wrapperClassName='equipment-right'>
                        <AddModal
                            title = '新增'
                            deptName={deptName}
                            deptId={deptId}
                            url={this.url}
                            flag={addFlag}
                            getTableData={this.getTableData}
                        />
                        <DeleteByIds
                            selectedRowKeys={this.state.selectedRowKeys}
                            deleteByIds={this.deleteByIds}
                            cancel={this.cancel}
                            flag={deleteFlag}
                        />
                        <ProcessTable
                            url={this.url}
                            pagination={this.pagination}
                            rowSelection={rowSelection}
                            deptName={deptName}
                            deptId={deptId}
                            rightTableData={rightTableData}
                            getTableData={this.getTableData}
                            handleTableChange={this.handleTableChange}
                            updateFlag={updateFlag}
                            deleteFlag={deleteFlag}
                        />
                    </Spin>
                </div>
            </div>
        )
    }

    getTableData(params = {}) {
        let {deptId, depName} = params;
        if(depName) {
            this.setState({
                deptId: deptId,
                deptName: depName
            });
        }
        if(!deptId) {
            let {deptId} = this.state, {current,pageSize} = this.pagination;
            params = {
                deptId: deptId,
                size: pageSize,
                page: current
            }
        }
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.equipmentProcessName.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if(res && res.list) {
                for(let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = i + 1;
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

    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    };

    deleteByIds() {
        let {selectedRowKeys} = this.state;
        axios({
            url:`${this.url.equipmentProcessName.deptProcess}/ids`,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:selectedRowKeys,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.getTableData();
        }).catch((error)=>{
            message.info(error.data.message)
        });
    }

    /**分页*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData();
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
    componentDidMount() {
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
}

export default EquipmentProcessName;
