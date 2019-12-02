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
import {Spin, Tabs} from "antd";
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

class processParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedRowKeys: [],
            condition: '',
            status: 0,   //默认为未提交
        };
        this.reset = this.reset.bind(this);
        this.fetch = this.fetch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.confirmCancel = this.confirmCancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
    }

    render() {
        this.status = ['未提交','待审核','审核中','已通过','已驳回','已发布'];
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===this.current.path)[0].operations:null;
        let addFlag = home.judgeOperation(this.operation,'SAVE'),deleteFlag = home.judgeOperation(this.operation,'DELETE'),
            {loading,data,selectedRowKeys} = this.state;
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={loading} wrapperClassName='rightDiv-content'>
                    <NewButton handleClick={this.handleAdd} name={'新增'} className='fa fa-plus' />
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds}
                                 cancel={this.confirmCancel} flag={deleteFlag} />
                    <SearchCell name={'请输入工序或车间'} flag={true} searchContentChange={this.searchContentChange} searchEvent={this.searchEvent} fetch={this.reset}/>
                    <div className='clear' ></div>
                    <Tabs defaultActiveKey={'0'} onChange={this.tabChange}>
                        <TabPane tab={'未提交'} key={'0'}>
                            <ProcessTable status={'0'} url={this.url} data={data} fetch={this.fetch} update={addFlag} deleteFlag={deleteFlag} selectedRowKeys={selectedRowKeys} handleAdd={this.handleAdd}/>
                        </TabPane>
                        <TabPane tab={'待审核'} key={'1'}>
                            <ProcessTable status={'1'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'审核中'} key={'2'}>
                            <ProcessTable status={'2'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'已通过'} key={'3'}>
                            <ProcessTable status={'3'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'已驳回'} key={'4'}>
                            <ProcessTable status={'4'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'已发布'} key={'5'}>
                            <ProcessTable status={'5'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        this.fetch();
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
        console.log(key,params)
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
                'Authorization': this.url.Authorizaion
            },
            params
        }).then((data) => {
            let res = data.data.data;
            if(res && res.list) {
                let list = res.list, dataSource = [];
                for(let i = 0; i < list.length; i++) {
                    let head = list[i]['head'];
                    head['index'] = i + 1;
                    head['deptName'] = list[i]['deptName'];
                    head['processName'] = list[i]['processName'];
                    head['prepareName'] = list[i]['prepareName'];
                    dataSource.push(head)
                }
                this.setState({
                    data: dataSource
                })
            }
            this.setState({
                loading: false
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

    /**点击新增按钮
     * record用来区分编辑和新增
     * */
    handleClick(record = {}) {

    }

    /**对应于批量删除时，确认取消删除 并实现checkbox选中为空 */
    confirmCancel() {
        this.setState({
            selectedRowKeys:[]
        })
    }

    deleteByIds() {
        const ids = this.state.selectedRowKeys;
        // axios({
        //     url:`${this.url.role.role}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.url.Authorization
        //     },
        //     data:ids,
        //     type:'json'
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     if(data.data.code===0){
        //         this.fetch({
        //             pageSize: this.pagination.pageSize,
        //             pageNumber: this.pagination.current,
        //             sortField: 'id',
        //             sortType: 'desc',
        //         });
        //     }
        // }).catch(()=>{
        //     message.info('删除错误，请联系管理员！')
        // })
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
        this.setState({ selectedRowKeys });
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

}

export default processParameters;
