/**检验管理-送检登记*/
import React, {Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, message} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import axios from "axios";
import Home from "../../../commom/fns";
import SearchCell from "../../../BlockQuote/newSearchSell";
import RegisterTable from '../fireInsRegister/table';
import AddModal from "../fireInsRegister/addModal";

import "../fireInsRegister/fireInsRegister.css"

const data = [];
for (var i=0;i<20;i++){
    data.push({
        code: i+1,
        col1: i+1,
        col2: "HS5503191206F0205",
        col3: "Li Ni Co Mn Al Li Ni Co Mn Al Li Ni Co Mn Al Li Ni Co Mn Al",
        col4: "质量二部",
        col5: "管理员",
        col6: "2019-12-12 12:12:12",
        col7: "2019-12-18 12:12:12",
    })
}

class FireInsRegister extends Component {

    componentDidMount() {
        this.getTableParams()
    }

    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            selectedRowKeys: [],
            dataSource: [],
            searchContent:""
        }
        this.pagination = {
            pageSize: 10,
            current: 1
        };
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current'))
        const {selectedRowKeys, dataSource} = this.state;
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        this.url = JSON.parse(localStorage.getItem('url'))
        return (
            <div>
                <BlockQuote name="送检登记" menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal title={'新增'}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={Home.judgeOperation(this.operation, 'DELETE')}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'设备名/点检项目'}/>
                    <div className='clear'></div>
                    <RegisterTable dataSource={dataSource} selectedRowKeys={selectedRowKeys} onSelectChange={this.onSelectChange}
                                   handleTableChange={this.handleTableChange}/>
                </Spin>
            </div>
        )
    }

    back = () => {
        this.props.history.push({pathname: "/inspectionManagement"})
    }

    /**确定获取表格数据的参数*/
    getTableParams(value) {
        let {searchContent} = this.state, {pageSize, current} = this.pagination,
            params = {
                searchContent: value === undefined ? searchContent : value,
                pageSize: pageSize,
                current: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData(params) {
        var dataSource = [];
        for (var i = 0; i < data.length; i++){
            const e = data[i];
            dataSource.push({
                code: e.code,
                col1: e.col1,
                col2: e.col2,
                col3: e.col3,
                col4: e.col4,
                col5: e.col5,
                col6: e.col6,
                col7: e.col7,
            })
        }

        console.log(params)
        this.setState({
            dataSource: dataSource
        })
    }

    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    /**批量删除*/
    deleteByIds() {
        let {selectedRowKeys} = this.state;
        console.log(selectedRowKeys)
        // axios({
        //     url:`${this.props.url.eqMaintenanceQuery.recordDelete}/${id}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     }
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     this.props.getTableData(); //删除后重置信息
        // }).catch(()=>{
        //     message.info('删除失败，请联系管理员！');
        // });
    }

    handleTableChange = (pagination) => {
        this.pagination = pagination;
        this.getTableParams();
    }

    /**搜索事件*/
    searchEvent(searchContent) {
        this.setState({
            searchContent
        });
        this.getTableParams(searchContent)
        console.log('searchContent=', searchContent)
    }

    /**取消批量删除*/
    cancel() {
        this.setState({
            selectedRowKeys: []
        })
    }

    /**重置事件*/
    reset() {
        this.setState({
            searchContent: undefined
        });
        this.getTableParams('')

    }

}

export default FireInsRegister