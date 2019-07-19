import React, {Component} from 'react';
import {Table, Icon, message} from 'antd';
import '../equipmentArchive.css'
import EARightTable from './eARightTable'
import Add from './add'
import DeleteByIds from '../../BlockQuote/deleteByIds';
import home from "../../commom/fns";
import SearchCell from '../../BlockQuote/search';
import axios from "axios";

class EARightBottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            searchContent: '',
            dataSource: [],


        }
        this.onSelectChange = this.onSelectChange.bind(this)
        this.deleteByIds = this.deleteByIds.bind(this)
        this.cancle = this.cancle.bind(this)
        this.searchContentChange = this.searchContentChange.bind(this)
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
                    mainCode={this.props.mainCode}
                    comFlag={this.props.comFlag}
                    getRightData={this.props.getRightData}
                    deviceName={this.props.deviceName}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    deptCode={this.props.depCode}
                    addFlag={home.judgeOperation(this.operation, 'SAVE')}
                    fetch={this.props.fetch}
                />
                <DeleteByIds
                    selectedRowKeys={this.state.selectedRowKeys}
                    deleteByIds={this.deleteByIds}
                    cancel={this.cancle}
                    flag={home.judgeOperation(this.operation, 'DELETE')}
                />
                <SearchCell
                    type={this.props.searchType}
                    name={this.props.searchName}
                    searchContentChange={this.searchContentChange}
                    searchEvent={this.props.searchEvent}
                    fetch={this.props.comFlag?this.props.searchResetCom:this.props.searchReset}
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

                    handleTableChange={this.props.handleTableChange}
                    pagination={this.props.pagination}
                />
            </div>
        )
    }



    deleteByIds = () => {
        const codes = this.state.selectedRowKeys;
        console.log(codes)
        axios({
            url:`${this.props.url.equipmentArchive.delete}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:codes,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getRightData(parseInt(this.props.depCode), this.props.deviceName)
            this.setState({
                selectedRowKeys: []
            })
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
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
    /**实时跟踪搜索框内容的变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.props.modifySearchContent(value)
    };
}

export default EARightBottom