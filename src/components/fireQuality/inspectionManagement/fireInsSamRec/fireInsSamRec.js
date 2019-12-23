/**检验管理-样品接收*/
/**检验管理-送检登记*/
import React, {Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, Divider, message, Popconfirm} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import Add from './add'
import axios from "axios";

import SamRecTable from "../fireInsSamRec/table"
import SearchCell from "../../../BlockQuote/newSearchSell";


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

class FireInsSamRec extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            selectedRowKeys: [],
            dataSource: [],
            searchContent: ""
        }
        this.pagination = {
            pageSize: 10,
            current: 1
        };
        this.back = this.back.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.deleteCancel = this.deleteCancel.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getTableParams()
    }

    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current'))
        this.url = JSON.parse(localStorage.getItem('url'))
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        let {loading, selectedRowKeys} = this.state
        return (
            <div>
                <BlockQuote name="样品接收" menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds}
                                 cancel={this.deleteCancel} flag={true}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'设备名/点检项目'}/>
                    <div className='clear'></div>
                    <SamRecTable
                        dataSource={this.state.dataSource}
                        selectedRowKeys={this.state.selectedRowKeys}
                        onSelectChange={this.onSelectChange}
                        handleTableChange={this.handleTableChange}
                    />
                </Spin>
            </div>
        )
    }

    back() {
        this.props.history.push({pathname: "/inspectionManagement"})
    }

    /**确定获取表格数据的参数*/
    getTableParams = (value) => {
        let {searchContent} = this.state, {pageSize, current} = this.pagination,
            params = {
                searchContent: value === undefined ? searchContent : value,
                pageSize: pageSize,
                current: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData = (params) => {
        var dataSource = [];
        for (var i = 0; i < data.length; i++) {
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

    /**搜索事件*/
    searchEvent = (searchContent) => {
        this.setState({
            searchContent
        });
        this.getTableParams(searchContent)
        console.log('searchContent=', searchContent)
    }
    /**重置事件*/
    reset = () => {
        this.setState({
            searchContent: undefined
        });
        this.getTableParams('')

    }

    deleteByIds() {
        let ids = this.state.selectedRowKeys
        // axios({
        //     url:`${this.url.fireMageTestItems}/${ids}`,
        //     method:'delete',
        //     headers:{
        //         'Authorizaion':this.url.Authorizaion
        //     }
        // }).then(data=>{
        //     if(data.data.code===0){
        //         message.info('操作成功!')
        //         this.getTableData()
        //     }
        //     else{
        //         message.error('操作失败，请联系管理员!')
        //     }
        // })
    }

    deleteCancel() {
        this.setState({
            selectedRowKeys: []
        });
    }

    handleDelete(id) {
        // axios({
        //     url:`${this.url.fireMageTestItems}/${id}`,
        //     method:'delete',
        //     headers:{
        //         'Authorizaion':this.url.Authorizaion
        //     }
        // }).then(data=>{
        //     if(data.data.code===0){
        //         message.info('操作成功!')
        //         this.getTableData()
        //     }
        //     else{
        //         message.error('操作失败，请联系管理员!')
        //     }
        // })
    }


    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    }
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        this.getTableParams();
    }


}

export default FireInsSamRec