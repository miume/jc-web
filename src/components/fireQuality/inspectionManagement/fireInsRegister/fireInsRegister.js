/**检验管理-送检登记*/
import React, {Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message} from "antd";
import axios from "axios";
import SearchCell from "../../../BlockQuote/newSearchSell";
import RegisterTable from '../fireInsRegister/table';
import AddModal from "../fireInsRegister/addModal";

import "../fireInsRegister/fireInsRegister.css"


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
            dataSource: [],
            searchContent: "",
            total: 0
        }
        this.pagination = {
            pageSize: 10,
            current: 1
        };
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    render() {
        const current = JSON.parse(localStorage.getItem('dataEntry'))
        this.url = JSON.parse(localStorage.getItem('url'))
        return (
            <div>
                <BlockQuote name="送检登记" menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal
                        title={'新增'}
                        url={this.url}
                        getTableParams={this.getTableParams}
                    />
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'批号'}/>
                    <div className='clear'></div>
                    <RegisterTable dataSource={this.state.dataSource}
                                   handleTableChange={this.handleTableChange}
                                   getTableParams={this.getTableParams}
                                   url={this.url}
                                   total={this.state.total}
                    />
                </Spin>
            </div>
        )
    }

    back = () => {
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
            url:`${this.url.fireInsRegister.page}`,
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
                        col7: e.head.comfirmTime,
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
    searchEvent(searchContent) {
        this.setState({
            searchContent
        });
        this.getTableParams(searchContent)
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
