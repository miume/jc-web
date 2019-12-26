/**检验管理-样品接收*/
/**检验管理-送检登记*/
import React, {Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, Divider, message, Popconfirm} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
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
            searchContent: "",
            total: 0
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
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current'))
        this.url = JSON.parse(localStorage.getItem('url'))
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        return (
            <div>
                <BlockQuote name="样品接收" menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName={'rightDiv-content'}>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}
                                 cancel={this.deleteCancel} flag={true}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'批号'}/>
                    <div className='clear'></div>
                    <SamRecTable
                        dataSource={this.state.dataSource}
                        selectedRowKeys={this.state.selectedRowKeys}
                        handleTableChange={this.handleTableChange}
                        getTableParams={this.getTableParams}
                        url={this.url}
                        total={this.state.total}
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
                condition: value === undefined ? searchContent : value,
                size: pageSize,
                page: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData = (params) => {
        axios({
            url:`${this.url.fireInsSamRec.page}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            const res = data.data.data;
            if (res && res.list) {
                var dataSource = [];
                var total = res.total;
                for (var i = 0; i < res.list.length; i++) {
                    const e = res.list[i];
                    dataSource.push({
                        code: e.head.code,
                        col1: (res['page'] - 1) * 10 + i + 1,
                        col2: e.head.batch,
                        col3: e.itemsSpace,
                        col4: e.deptName,
                        col5: e.head.delieryPeople,
                        col6: e.head.checkInTime,
                        col7: e.comfirmTime,
                        col8: e.head.comment?e.head.comment:"",
                        flag: e.head.flag
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    total: total
                })

            }else{
                message.info("查询数据为空")
            }
            this.setState({
                loading: false
            })
        }).catch(()=>{
            message.info('查询失败，请联系管理员！');
        });
    }

    handleTableChange = (pagination) => {
        this.pagination = pagination;
        this.getTableParams();
    }

    /**搜索事件*/
    searchEvent = (searchContent) => {
        this.setState({
            searchContent
        });
        this.getTableParams(searchContent)
    }

    /**取消批量删除*/
    cancel = () => {
        this.setState({
            selectedRowKeys: []
        })
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
        axios({
            url:`${this.url.fireInsSamRec.deleteIds}`,
            method: 'Delete',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: ids,
            type: 'json'
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableParams('')
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }

    deleteCancel() {
        this.setState({
            selectedRowKeys: []
        });
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    }


}

export default FireInsSamRec