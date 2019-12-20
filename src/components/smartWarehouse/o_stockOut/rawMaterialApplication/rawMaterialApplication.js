import React from 'react';
import {Spin, Table} from 'antd';
import home from '../../../commom/fns';
import SearchCell from '../../../BlockQuote/search';
import './rawAdd.css';
import ApplyStockOut from './applyStockOut';
// const Option = Select.Option;
// const data = [];
// for(var i = 1; i<=20; i++){
//     data.push({
//         id:`${i}`,
//         materialName:'钴锰矿',
//         materialClass:'钴锰矿一号',
//         batchNumberId:'ECT/314314',
//         quantity:'122',
//         weight:'22'
//     })
// }
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchContent:'',
            selectedRowKeys:[]
        }
        this.cancel = this.cancel.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'6%'
        },{
            title:'物料名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%'
        },{
            title:'物料类型',
            dataIndex:'materialType',
            key:'materialType',
            width:'15%'
        },{
            title:'编号',
            dataIndex:'materialCode',
            key:'materialCode',
            width:'45%',
            render: (text) => {
                return <span title={text}>{text.split('-').slice(0,4).join('-')+ '...'}</span>
            }
        }, {
            title:'重量',
            dataIndex:'weight',
            key:'weight'
        }]
    }

    /**监控搜索框的输入变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }
    /**根据货物名称进行搜索 */
    searchEvent(){
        this.props.fetch({
            materialName:this.state.searchContent
        });
    }
    /**监控checkbox选中的情况 */
    onSelectChange(selectedRowKeys,selectedRows){
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRow:selectedRows
        })
    }
    cancel(){
        this.setState({
            selectedRowKeys:[],
            selectedRow: []
        })
    }
    render(){
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <Spin spinning={this.props.loading} wrapperClassName='rightDiv-content'>
                <ApplyStockOut selectedRowKeys={this.state.selectedRow} cancel={this.cancel} url={this.props.url}
                    flag={home.judgeOperation(this.operation,'SAVE')}
                />
                <SearchCell name='请输入物料名称' searchEvent={this.searchEvent} type={this.props.index}
                            fetch={this.fetch} searchContentChange={this.searchContentChange}
                            flag={home.judgeOperation(this.operation,'QUERY')}></SearchCell>
                <Table rowKey={record=>record.id} dataSource={this.props.data} columns={this.columns} rowSelection={rowSelection} pagination={false} bordered size='small'></Table>
            </Spin>
        );
    }
}
export default RawMaterialApplication;
