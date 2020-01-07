import React, {Component} from 'react';
import {message} from 'antd';
import '../eqcomponentSearch.css'
import EARightTable from './eARightTable'
import home from "../../../../commom/fns";
import SearchCell from '../../../../BlockQuote/search';
import axios from "axios";

class EARightBottom1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            searchContent: '',
            dataSource: [],
            componentflag:'',

        }
        this.onSelectChange = this.onSelectChange.bind(this)
        this.deleteByIds = this.deleteByIds.bind(this)
        this.cancle = this.cancle.bind(this)
        this.searchContentChange = this.searchContentChange.bind(this)
        this.radioChange=this.radioChange.bind(this)
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        var selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        let {updateFlag,deleteFlag}=this.props
        return (
            <div className="eA-right-bottom">
                   <div className="eq-aM-search">  </div>
                <div className="eq-amm-search">
                <SearchCell
                    type={this.props.searchType}
                    name={this.props.searchName}
                    searchContentChange={this.searchContentChange}
                    searchEvent={this.props.searchEvent}
                    fetch={this.props.comFlag?this.props.searchResetCom:this.props.searchReset}
                    flag={true}/>
                </div>
                <EARightTable
                    getRightData={this.props.getRightData}
                    depCode={this.props.depCode}
                    deviceName={this.props.deviceName}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    comFlag={this.props.comFlag}
                    rowSelection={rowSelection}
                    dataSource={this.props.dataSource}
                    fetch={this.props.fetch}
                    handleTableChange={this.props.handleTableChange}
                    pagination={this.props.pagination}
                    updateFlag={updateFlag}
                    deleteFlag={deleteFlag}
                />
            </div>
        )
    }


    radioChange=(e)=>{
        const flag=e.target.value;
        this.setState({
            componentflag:flag
        })
        console.log(this.state.componentflag)
        //当按钮发生改变时重新获得表格数据
        // this.props.getTableData()
    }


    deleteByIds = () => {
        const codes = this.state.selectedRowKeys;
        if(this.props.comFlag){
            axios({
                url:`${this.props.url.equipmentArchive.deleteUnits}`,
                method:'Delete',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                data:codes,
                type:'json'
            }).then((data)=>{
                message.info(data.data.message);
                this.props.fetch()
                this.setState({
                    selectedRowKeys: []
                })
            }).catch(()=>{
                message.info('删除错误，请联系管理员！')
            })
        }else{
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
        }
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

export default EARightBottom1
