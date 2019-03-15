import React from 'react';
import {Divider, Table} from 'antd';
import DetailSpan from './detailSpan';
import CheckSpan from './checkSpan';
import ReleaseSpan from './releaseSpan';
import './productInspection.css';
import RateOptSpan from './rateOptSpan';

class ProductTable extends React.Component{
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '6%',
    },{
        title: '送检日期',
        dataIndex: 'deliveringDate',
        key: 'deliveringDate',
        align:'center',
        width: '10%',
        render: deliveringDate => {
            return <span title={deliveringDate} className='text-decoration'>{deliveringDate.substring(0,10)}</span>
        }
    },{
        title: '送检人',
        dataIndex: 'deliver',
        key: 'deliver',
        align:'center',
        width: '8%',
    },{
        title: '送检工厂(原材料)',
        dataIndex: 'deliverFactory',
        key: 'deliverFactory',
        align:'center',
        width: '10%',
    },{
        title: '物料编码',
        dataIndex: 'repoBaseSerialNumber.serialNumber',
        key: 'repoBaseSerialNumber.serialNumber',
        align:'center',
        width: '20%',
        render:(batchNumber)=>{
            const arr = batchNumber.split('-');
            if(arr.length>4){
                return <span title={batchNumber} className='text-decoration'>{arr[0]+'-'+arr[1]+'-'+arr[2]+'-'+arr[3]+'...'}</span>
            }else{
                return <span>{batchNumber}</span>
            }
        }
    },{
        title: '检测项目',
        dataIndex: 'testItemString',
        key: 'testItemString',
        align:'center',
        width: '10%',
        render:(text)=>{
            const items = text.split(',');
            var testItems = '';
            if(items.length>5){
                testItems = items[0]+','+items[1]+','+items[2];
                return <span title={text} className='text-decoration'>{testItems}</span>;
            }else{
                testItems = text;
                return <span>{testItems}</span>
            }
        }
    }, {
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        width: '8%',
        render:state => {
            return this.props.status[state.toString()];
        }
    },{
        title: '操作',
        dataIndex: 'batchNumberId',
        key: 'batchNumberId',
        align:'center',
        width: '16%',
        render: (text,record) => {
            let detailSpanFlag = this.judgeDetailOperation(record.status);
            let checkSpanFlag = this.judgeCheckOperation(record.status);
            let releaseSpanFlag = this.judgeReleaseOperation(record.isPublished,record.status);
            let rateOpt = this.judgeRateOpt(record.isPublished,record.status);
            return (
                <span>
                    {detailSpanFlag?(
                        <DetailSpan
                            url={this.props.url}
                            batchNumberId={record.batchNumberId}
                            checkStatus={record.status}
                        />
                    ):(
                        <span  className="notClick">详情</span>
                    )}
                    <Divider type="vertical" />
                    {checkSpanFlag?(
                        <CheckSpan
                            menuList={this.props.menuList}
                            fetch={this.props.fetch}
                            batchNumberId={record.batchNumberId}
                            url={this.props.url}
                        />
                    ):(
                        <span  className="notClick">录检</span>
                    )}
                    <Divider type="vertical" />
                    {releaseSpanFlag?(
                        <ReleaseSpan
                            batchNumberId={record.batchNumberId}
                            url={this.props.url}
                            fetch={this.props.fetch}
                            checkStatus={record.status}
                        />
                    ):(
                        <span  className="notClick">发布</span>
                    )}
                    <Divider type="vertical" />
                    {rateOpt?(
                        <RateOptSpan
                            menuList={this.props.menuList}
                            batchNumberId={record.batchNumberId}
                            url={this.props.url}
                            fetch={this.props.fetch}
                            checkStatus={record.status}
                        />
                    ):(
                        <span  className="notClick">择优</span>
                    )}
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
        return (
            <Table
                className="productCursorDefault"
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
        );
    }
    /**判断详情，录检，发布可否功能 */
    judgeRateOpt = (isPublished,status) => {
        if(isPublished===0&&(status===2||status===3)){
            return true;
        }else{
            return false;
        }
    }
    judgeDetailOperation = (status) => {
        if(status===-1){
            return false;
        }else{
            return true;
        }
    };
    judgeCheckOperation = (status) => {
        if(status===-1||status===3){
            return true;
        }else{
            return false;
        }
    };
    judgeReleaseOperation = (isPublished,status) => {
        if(isPublished===0&&(status===2||status===3)){
            return true;
        }else{
            return false;
        }
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default ProductTable;