/**
 * author:ym
 * date:2019-10-23
 * module: 异常处理模块
 * */
import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import home from "../../commom/fns";
import {Spin} from "antd";
import AddModal from './addModal';
import DeleteByIds from "../../BlockQuote/deleteByIds";
import ExceptionTable from "./exceptionTable";
import './exceptionHandling.css';

const data = [{
    index: 1,
    code: 1,
    phenomenon: '温度偏高标准中线0.5～1.5',
    reason: '1，停冷确水 2，温控系统失灵，处于持续加热状态',
    process: '检测试剂温度，监控生产，每半小匙确认至少一次pH值',
    proProcess: '相关产品需评审处理'
}];

class ExceptionHandling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: []
        }
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
                    <AddModal flag={addFlag} url={this.url} />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}
                                 cancel={this.confirmCancel} flag={deleteFlag} />
                    <ExceptionTable update={addFlag} deleteFlag={deleteFlag} data={data}/>
                </Spin>
            </div>
        )
    }
}

export default ExceptionHandling;
