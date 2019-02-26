import React from 'react';
import {Table} from 'antd'
class StockTable extends React.Component{
    constructor(props){
        super(props);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'10%',
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%',
        },{
            title:'货物类型',
            dataIndex:'meterialClass',
            key:'meterialClass',
            width:'15%',
            render:(text)=>{
                switch(text){
                    case 1 : return '原材料';
                    case 2 : return '中间件';
                    case 3 : return '成品';
                    default: return '';
                }
            }
        },{
            title:'物料编码',
            dataIndex:'serialNumber',
            key:'serialNumber',
            width:'25%',
            render:(text)=>{
                if(this.props.flag) return <span className='text-decoration' title={text}>{text.split('-')[0]+'...'}</span>
                else{
                    if(text.length>24){
                        return <span className='text-decoration' title={text}>{text.substring(0,24)+'...'}</span>
                    }else{
                        return <span className='text-decoration'>{text}</span>
                    } 
                }
            }
        },{
            title:'出库重量',
            dataIndex:'weight',
            key:'weight',
            width:'15%',
        }]
    }
    render(){
        return (
            <div style={{height:'300px'}}>
                <Table rowKey={record=>record.index} dataSource={this.props.dataSource} columns={this.columns} pagination={false} bordered size='small' scroll={{y:200}}></Table>
            </div>
        )}
}
export default StockTable;