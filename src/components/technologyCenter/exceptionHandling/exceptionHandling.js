/**
 * author:ym
 * date:2019-10-23
 * module: 异常处理模块
 * */
import React from 'react';
import axios from 'axios';
import BlockQuote from "../../BlockQuote/blockquote";
import home from "../../commom/fns";
import {Spin,message} from "antd";
import AddModal from './addModal';
import DeleteByIds from "../../BlockQuote/deleteByIds";
import ExceptionTable from "./exceptionTable";
import './exceptionHandling.css';

// const data = [{
//     index: 1,
//     code: 1,
//     phenomenon: '温度偏高标准中线0.5～1.5',
//     reason: '1，停冷确水 2，温控系统失灵，处于持续加热状态',
//     process: '检测试剂温度，监控生产，每半小匙确认至少一次pH值',
//     proProcess: '相关产品需评审处理'
// }];

class ExceptionHandling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            dataSource: []
        };
        this.getTableData = this.getTableData.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
                <Spin spinning={this.state.loading} wrapperClassName='process-parameters'>
                    <AddModal flag={addFlag} url={this.url} getTableData = {this.getTableData}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}
                                 flag={deleteFlag} />
                    <ExceptionTable url={this.url} update={addFlag} deleteFlag={deleteFlag} selectedRowKeys={this.state.selectedRowKeys}
                                    data={this.state.dataSource} getTableData = {this.getTableData} handleDelete={this.deleteByIds}
                                    onSelectChange={this.onSelectChange}/>
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        this.getTableData({
            page: 1,
            size: 10
        });
    }

    /**获取表格数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.techException.page}`,
            method: 'get',
            header: {
                'Authorization': this.url.Authorization
            },
            params
        }).then((data) => {
            let res = data.data.data;
            for(let i = 0; i < res.list.length; i++) {
                res.list[i]['index'] = i + 1;
            }
            res.list['total'] = res.total;
            if(data.data.code === 0) {
                this.setState({
                    loading: false,
                    dataSource: res.list
                })
            }
        })
    }

    /**批量删除和单条记录删除*/
    deleteByIds(ids) {
        let {selectedRowKeys} = this.state;
        if(ids) {
            selectedRowKeys = [ids];
        }
        axios({
            url: `${this.url.techException.deleteByIds}`,
            method: 'DELETE',
            data: selectedRowKeys,
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then(data => {
            message.info(data.data.message);
            //清空表格checkbox选中项
            this.setState({
                selectedRowKeys: []
            });
            //更新表格数据
            this.getTableData({
                page: 1,
                size: 10
            });
        })
    }

    /**表格checkbox选中变化*/
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }
}

export default ExceptionHandling;
