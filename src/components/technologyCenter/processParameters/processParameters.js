/**
 * author:ym
 * date:2019-10-23
 * module: 工艺参数
 * */
import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import NewButton from "../../BlockQuote/newButton";
import home from "../../commom/fns";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import axios from "axios";
import {Spin, Tabs, message} from "antd";
import ProcessTable from "./processTable";
import './processParameters.css';
import SearchCell from "../../BlockQuote/search";

const {TabPane} = Tabs;
// const data = [{
//     index: 1,
//     code: 1,
//     processNum: '00001',
//     plantName: '锂电1工厂',
//     processName: '合成',
//     effectiveDate: '2019-01-01',
//     expiryDate: '2019-10-10',
//     preparer: '张三',
//     dateOfFiling: '2019-10-12'
// }];
const STAFF_AUTH = [{
        id: '0',
        title: '未提交'
    },{
        id: '1',
        title: '待审核'
    },{
        id: '2',
        title: '审核中'
    },{
        id: '3',
        title: '已通过'
    },{
        id: '4',
        title: '已驳回'
    },{
        id: '5',
        title: '已发布'
    }],
    APPROVER_AUTH = [{
        id: '1',
        title: '待审核'
    },{
        id: '3',
        title: '已通过'
    },{
        id: '4',
        title: '已驳回'
    },{
        id: '5',
        title: '已发布'
    }],
    INQUIRER_AUTH = [{
        id: '5',
        title: '已发布'
    }];

class processParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            condition: '',
            status: 0,   //默认为未提交
        };
        this.reset = this.reset.bind(this);
        this.fetch = this.fetch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.confirmCancel = this.confirmCancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.judgeTabsPath = this.judgeTabsPath.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
    }

    render() {
        this.status = ['未提交','待审核','审核中','已通过','已驳回','已发布'];
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===this.current.path)[0].operations:null;
        let deleteFlag = home.judgeOperation(this.operation,'DELETE'),
            {loading,selectedRowKeys,tabsList} = this.state,
            addDisabled = tabsList && tabsList.length  > 1 ? false : true;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <div className={tabsList ? 'hide' : 'process-parameters-auth'}>暂无权限</div>
                <Spin spinning={loading} wrapperClassName={tabsList ? 'rightDiv-content' : 'hide'}>
                    {
                        addDisabled ?
                            <SearchCell name={'请输入工序或车间'} flag={true} searchContentChange={this.searchContentChange} searchEvent={this.searchEvent} fetch={this.reset}/> :
                            <div className={addDisabled ? 'hide' : ''}>
                                <NewButton handleClick={this.handleAdd} name={'新增'} className='fa fa-plus' />
                                <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds}
                                             cancel={this.confirmCancel} flag={deleteFlag} />
                                <SearchCell name={'请输入工序或车间'} type={1} flag={true} searchContentChange={this.searchContentChange} searchEvent={this.searchEvent} fetch={this.reset}/>
                            </div>
                    }

                    <div className='clear' ></div>
                    <div>
                    {
                       this.renderTabs(tabsList,addDisabled)
                    }
                    </div>
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        let roleList = JSON.parse(localStorage.getItem('menuList'))['roleList'],
            tabsList = this.judgeTabsPath(roleList);
        if(tabsList) {
            let status = tabsList[0]['id']
            this.setState({
                tabsList,
                status
            });
            this.fetch({},status);
        }
    }

    judgeTabsPath(roleList) {
        let ROLE_PROCESS_STAFF, ROLE_PROCESS_APPROVER, ROLE_PROCESS_INQUIRER;
        for(let i = 0; i < roleList.length; i++) {
            if(roleList[i]['roleName'] === 'ROLE_PROCESS_STAFF') {
                ROLE_PROCESS_STAFF = true;
            }
            if(roleList[i]['roleName'] === 'ROLE_PROCESS_APPROVER') {
                ROLE_PROCESS_APPROVER = true;
            }
            if(roleList[i]['roleName'] === 'ROLE_PROCESS_INQUIRER') {
                ROLE_PROCESS_INQUIRER = true;
            }
        }
        if(ROLE_PROCESS_STAFF) {
            return STAFF_AUTH;
        } else if(ROLE_PROCESS_APPROVER) {
            return APPROVER_AUTH;
        } else if(ROLE_PROCESS_INQUIRER){
            return INQUIRER_AUTH;
        } else {
            return false
        }
    }

    renderTabs(tabsList,addDisabled) {
        let addFlag = home.judgeOperation(this.operation,'SAVE'),
            deleteFlag = home.judgeOperation(this.operation,'DELETE'),
            {data,selectedRowKeys} = this.state;
        return (
            tabsList ?
                <Tabs defaultActiveKey={tabsList[0]['id']} onChange={this.tabChange}>
                    {
                        tabsList.map(e =>
                            <TabPane tab={e.title} key={e.id}>
                                <ProcessTable status={e.id} url={this.url} data={data} fetch={this.fetch} update={addFlag} onSelectChange={this.onSelectChange}
                                              deleteFlag={deleteFlag} selectedRowKeys={selectedRowKeys} handleAdd={this.handleAdd} addDisabled={addDisabled}/>
                            </TabPane>
                        )
                    }
                </Tabs> :
                <div style={{margin: 'auto', textAlign: 'center'}}>暂无权限</div>
        )
    }


    /**标签页切换*/
    tabChange(key) {
        key = parseInt(key);
        this.setState({
            status: key
        });
        this.fetch('',key)
    }

    /**统一获取表格数据的参数
     * pagination:表示分页的参数
     * key：表示标签页切换的key值
     * flag：表示重置
     * */
    fetch(pagination,key = '',flag) {
        let {condition,status} = this.state,
            params = {
                status: key === '' ? status : key,
                condition: flag ? '' : condition,
                page: pagination ? pagination.current : 1,
                size: pagination ? pagination.pageSize : 10
            };
        this.getTableData(params);
    }

    /**统一获取数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.processParam.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            let res = data.data.data;
            if(res && res.list) {
                let list = res.list, dataSource = [];
                dataSource['total'] = res['total'];
                for(let i = 0; i < list.length; i++) {
                    let head = list[i]['head'];
                    head['index'] = (res.page-1) * 10 + i + 1;
                    head['deptName'] = list[i]['deptName'];
                    head['processName'] = list[i]['processName'];
                    head['prepareName'] = list[i]['prepareName'];
                    dataSource.push(head);
                }
                this.setState({
                    data: dataSource
                })
            }
            this.setState({
                loading: false,
                selectedRowKeys: []
            });
        });
    }

    handleAdd(code) {
        let pathName = '/processParamsAdd';
        if(typeof code === 'number') {
            pathName += `/${code}`
        }
        this.props.history.push(pathName)
    }

    /**对应于批量删除时，确认取消删除 并实现checkbox选中为空 */
    confirmCancel() {
        this.setState({
            selectedRowKeys:[]
        })
    }

    deleteByIds() {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.processParam.deleteByIds}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code === 0){
                this.fetch();
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }

    searchContentChange(e) {
        let value = e.target.value;
        this.setState({
            condition: value
        })
    }

    searchEvent() {
        this.fetch();
    }

    /**重置 清空搜索框内容*/
    reset() {
        this.setState({
            condition: ''
        });
        this.fetch('','',1);
    }

    /**table checkbox选中*/
    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

}

export default processParameters;
