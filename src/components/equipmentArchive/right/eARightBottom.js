import React, {Component} from 'react';
import {Table, Icon} from 'antd';
import '../equipmentArchive.css'
import EARightTable from './eARightTable'
import Add from './add'
import DeleteByIds from '../../BlockQuote/deleteByIds';
import home from "../../commom/fns";
import SearchCell from '../../BlockQuote/search';

class EARightBottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            searchContent: '',
            pageChangeFlag: 0,        //0表示getAllPage分页查询，
            dataSource: []

        }
        this.onSelectChange = this.onSelectChange.bind(this)
        this.deleteByIds = this.deleteByIds.bind(this)
        this.cancle = this.cancle.bind(this)
        this.fetch = this.fetch.bind(this)
        this.searchContentChange = this.searchContentChange.bind(this)
        this.searchEvent = this.searchEvent.bind(this)
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        var selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div className="eA-right-bottom">
                <Add
                    getRightData={this.props.getRightData}
                    deviceName={this.props.deviceName}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    depCode={this.props.depCode}
                    addFlag={home.judgeOperation(this.operation, 'SAVE')}
                />
                <DeleteByIds
                    selectedRowKeys={this.state.selectedRowKeys}
                    deleteByIds={this.deleteByIds}
                    cancel={this.cancle}
                    flag={home.judgeOperation(this.operation, 'DELETE')}
                />
                <SearchCell
                    name='请输入搜索人'
                    searchContentChange={this.searchContentChange}
                    searchEvent={this.searchEvent}
                    fetch={this.fetch}
                    flag={home.judgeOperation(this.operation, 'QUERY')}/>
                <EARightTable
                    getRightData={this.props.getRightData}
                    depCode={this.props.depCode}
                    deviceName={this.props.deviceName}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    comFlag={this.props.comFlag}
                    rowSelection={rowSelection}
                    dataSource={this.props.dataSource}

                    // handleTableChange={this.props.handleTableChange}
                    // pagination={this.props.pagination}
                />
            </div>
        )
    }



    deleteByIds = () => {
        const codes = this.state.selectedRowKeys;
        console.log(codes)
    };
    cancle = () => {
        this.setState({
            selectedRowKeys: []
        })
    };

    /**实现全选*/
    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    }

    fetch = () => {

    };
    /**实时跟踪搜索框内容的变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
    };
    /**绑定搜索事件 */
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        });
        this.fetch({
            // personName: this.state.searchContent
        });
    }
}

export default EARightBottom