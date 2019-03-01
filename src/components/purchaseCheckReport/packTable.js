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
        // render: deliveringDate => {
        //     return <abbr style={{cursor:'default'}} title={deliveringDate?deliveringDate:'无'}>{deliveringDate?deliveringDate.substring(0,10):'无'}</abbr>
        // }
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
        title: '编号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        align:'center',
        width: '18%',
        render:(serialNumber)=>{
            return <span title={serialNumber} className='text-decoration'>{serialNumber.substring(0,15)+'...'}</span>
        }
    },{
        title: '检测项目',
        dataIndex: 'testItemString',
        key: 'testItemString',
        align:'center',
        width: '14%',
        render: testItemString => {
            const length = testItemString?testItemString.length:0;
            if(length > 15){
                return <span title={testItemString} className='text-decoration'>{testItemString.substring(0,15)+'...'}</span>
            }
            return testItemString?testItemString:'无';
        }
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