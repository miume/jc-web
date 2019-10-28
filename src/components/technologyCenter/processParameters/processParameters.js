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
import {message, Tabs} from "antd";
import moment from "../../costAccounting/rawMaterial/search";
import Search from "./search";
import ProcessTable from "./processTable";
import AddModal from "./addModal";
import './processParameters.css';
import ExceptionTable from "../exceptionHandling/exceptionHandling";

const {TabPane} = Tabs;
const data = [{
    index: 1,
    code: 1,
    processNum: '00001',
    plantName: '锂电1工厂',
    processName: '合成',
    effectiveDate: '2019-01-01',
    expiryDate: '2019-10-10',
    preparer: '张三',
    dateOfFiling: '2019-10-12'
}];

class processParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedRowKeys: [],
            start: '',
            end: '',        //记录日期组件的开始时间和结束时间
            dateFormat: 'YYYY-MM-DD'
        };
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.confirmCancel = this.confirmCancel.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===this.current.path)[0].operations:null;
        let addFlag = home.judgeOperation(this.operation,'SAVE');
        let deleteFlag = home.judgeOperation(this.operation,'DELETE');
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <div className='rightDiv-content'>
                    <AddModal flag={addFlag}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}
                                 cancel={this.confirmCancel} flag={deleteFlag} />
                    <Search flag={true}/>
                    <div className='clear' ></div>
                    <Tabs defaultActiveKey={'1'}>
                        <TabPane tab={'未提交'} key={'1'}>
                            <ProcessTable status={'1'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'待审核'} key={'2'}>
                            <ProcessTable status={'2'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'审核中'} key={'3'}>
                            <ProcessTable status={'3'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'已通过'} key={'4'}>
                            <ProcessTable status={'4'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'已驳回'} key={'5'}>
                            <ProcessTable status={'5'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                        <TabPane tab={'已发布'} key={'6'}>
                            <ProcessTable status={'6'} data={data} update={addFlag} deleteFlag={deleteFlag}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }

    /**标签页切换*/
    tabChange(key) {
        console.log('标签页切换为：', key)
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
}

export default processParameters;
