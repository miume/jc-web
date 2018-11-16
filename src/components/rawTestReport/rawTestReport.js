import React from 'react';
import {Button} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
const columns = [{
    title:'序号',
    dataIndex:'id',
    key:'id',
    align:'center'
},{
    title:'序号',
    dataIndex:'id',
    key:'id',
    align:'center'
},{
    title:'序号',
    dataIndex:'id',
    key:'id',
    align:'center'
},{
    title:'序号',
    dataIndex:'id',
    key:'id',
    align:'center'
},]
class RawTestReport extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            selectedRowKeys : [],
            searchContent : ''
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.lastStep = this.lastStep.bind(this);
    }
    /**button新增 */
    handleAdd(){

    }
    /**批量删除 */
    deleteByIds(){

    }
    /**搜索功能 */
    searchEvent(){

    }
    /**实现上一步，返回数据录入页面 */
    lastStep(){
        this.props.history.push({pathname:'dataEntry'});
    }
    render(){
        return (
            <div>
                <BlockQuote name='原料检测报告'></BlockQuote>
                <div style={{paddingTop:'10px'}}></div>
                <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button>
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} />
                <span style={{float:'right',paddingButtom:'8px'}} >
                    <SearchCell name='请输入什么什么' searchEvent={this.searchEvent} searchContent={this.searchContent}></SearchCell>
                </span>
                <div style={{marginLeft:'90%', marginTop:'29%',marginRight:'80px',height:'50px',position:'absolute'}} >
                    <button style={{backgroundColor:'#30c7f5',width:'100px',height:'40px'}} onClick={this.lastStep}>上一步</button>
                </div>  
            </div>
        );
    }
}
export default RawTestReport;