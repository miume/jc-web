import React from 'react';
import {Table} from 'antd';
import DetailSpan from './packDetailSpan';
import './purchaseCheckReport.css'

class PackTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '8%',
    },{
        title: '送检日期',
        dataIndex: 'deliveringDate',
        key: 'deliveringDate',
        align:'center',
        width: '15%',
        render: deliveringDate => {
            return deliveringDate?deliveringDate:'无';
        }
    },{
        title: '送样人',
        dataIndex: 'deliverName',
        key: 'deliverName',
        align:'center',
        width: '10%',
        render: deliverName => {
            return deliverName?deliverName:'无';
        }
    },{
        title: '送样工厂',
        dataIndex: 'manufacturerName',
        key: 'manufacturerName',
        align:'center',
        width: '10%',
        render: manufacturerName => {
            return manufacturerName?manufacturerName:'无';
        }
    },{
        title: '物料编码',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        align:'center',
        width: '18%',
        render:(serialNumber)=>{
            var arr = serialNumber.split('-');
            return <span title={serialNumber} className='text-decoration'>{arr[0]+'-'+arr[1]+'...'}</span>
        }
    },{
        title: '检测项目',
        dataIndex: 'testItemString',
        key: 'testItemString',
        align:'center',
        width: '14%',
        render:(text)=>{
            const items = text.split(',');
            var testItems = '';
            if(items.length>5){
                testItems = items[0]+','+items[1]+','+items[2]+','+items[3]+','+items[4];
                return <span title={text} className='text-decoration'>{testItems+'...'}</span>;
            }else{
                testItems = text;
                return <span className='text-decoration'>{testItems}</span>
            }
        },
    },{
        title: '异常备注',
        dataIndex: 'exceptionHandle',
        key: 'exceptionHandle',
        align:'center',
        width: '10%',
        render: exceptionHandle => {
            return exceptionHandle?exceptionHandle:'无';
        }
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '10%',
        render: (text,record) => {
            return (
                <span>
                    <DetailSpan
                        unGenerateDate={this.props.unGenerateDate}
                        url={this.props.url}
                        batchNumberId={record.batchNumberId}
                        modifySelectedRowKeysData={this.props.modifySelectedRowKeysData}
                    />
                </span>
            )
        }
    }];
    render() {
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,

                }),
            };
        });
        return(
            <Table
                // className="purchasePackTable"
                rowKey={record => record.batchNumberId}
                dataSource={this.props.data}
                columns={columns}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{ y: 400 }}
            />
        )
    }
}

export default PackTable;