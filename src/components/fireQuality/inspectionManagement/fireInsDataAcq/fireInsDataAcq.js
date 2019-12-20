/**检验管理-数据采集*/
import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, message} from "antd";
import ExportFile from './exportFile'
import ImportFile from './importFile'
import axios from "axios";
import NewSearchCell from "../../../BlockQuote/newSearchSell";

class FireInsDataAcq extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'批次',
            dataIndex:'batch',
            key:'batch'
        },{
            title:'工序',
            dataIndex:'process',
            key:'process'
        },{
            title:'检验项目',
            dataIndex:'item',
            key:'item'
        }]
        this.state={
            loading:false,
            dataSource:[]
        }
        this.back=this.back.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.reset=this.reset.bind(this)
    }
    componentDidMount() {
        //this.getTableData()
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }

    getTableData(){
        this.setState({
            loading:true
        })
    }
    searchEvent(searchContent){

    }
    reset(){

    }
    back(){
        this.props.history.push({pathname:"/inspectionManagement"})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,selectedRowKeys}=this.state

        return(
            <div>
                <BlockQuote name={'数据采集'} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <ExportFile url={this.url} getTableData={this.getTableData}/>
                    <ImportFile url={this.url} getTableData={this.getTableData} />

                    <NewSearchCell reset={this.reset} searchEvent={this.searchEvent}/>
                    <Table  pagination={false} columns={this.columns}
                           dataSource={this.state.dataSource} rowKey={record => record.index} bordered size={'small'} />
                </Spin>
            </div>
        )
    }
}
export default FireInsDataAcq