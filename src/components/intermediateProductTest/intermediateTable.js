import React from 'react';
import {Divider, Table} from 'antd';
import DetailSpan from './detailSpan';
import CheckSpan from './checkSpan';
import ReleaseSpan from './releaseSpan';
import Loss from '../BlockQuote/lossStatement'

class InterTable extends React.Component{
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '5%',
    },{
        title: '送检日期',
        dataIndex: 'sampleDeliveringRecord.sampleDeliveringDate',
        key: 'sampleDeliveringRecord.sampleDeliveringDate',
        align:'center',
        width: '8%',
        render:(sampleDeliveringDate)=>{
            return <span title={sampleDeliveringDate} className='text-decoration'>{sampleDeliveringDate.substring(0,10)}</span>
        }
    },{
        title: '送检人',
        dataIndex: 'deliverer',
        key: 'deliverer',
        align:'center',
        width: '8%',
        render: deliverer => {
            return deliverer?deliverer:'无';
        }
    },{
        title: '送检工厂(原材料)',
        dataIndex: 'deliveryFactoryName',
        key: 'deliveryFactoryName',
        align:'center',
        width: '10%',
        render: deliveryFactoryName => {
            return deliveryFactoryName?deliveryFactoryName:'无';
        }
    },{
        title: '批号',
        dataIndex: 'commonBatchNumber.batchNumber',
        key: 'commonBatchNumber.batchNumber',
        align:'center',
        width: '12%',
        render:(batchNumber)=>{
            const arr = batchNumber.split('-');
            if(arr.length>2){
                return <span title={batchNumber} className='text-decoration'>{arr[0]+'-'+arr[1]+'...'}</span>
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
    },{
        title: '发布状态',
        dataIndex: 'commonBatchNumber.isPublished',
        key: 'commonBatchNumber.isPublished',
        align:'center',
        width: '6%',
        render: isPublished => {
            switch(`${isPublished}`) {
                case '0': return '未发布';
                case '1': return '已发布';
                default: return '无';
            }
        },
    },{
        title: '审核状态',
        dataIndex: 'commonBatchNumber.status',
        key: 'commonBatchNumber.status',
        align:'center',
        width: '8%',
        render:state => {
            return this.props.status[state.toString()];
        }
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '18%',
        render: (text,record) => {
            const isPublished = record.commonBatchNumber?record.commonBatchNumber.isPublished:'';
            const status = record.commonBatchNumber?record.commonBatchNumber.status:'';
            let detailSpanFlag = this.judgeDetailOperation(status);
            let checkSpanFlag = this.judgeCheckOperation(status);
            let releaseSpanFlag = this.judgeReleaseOperation(isPublished,status);
            return (
                <span>
                    {detailSpanFlag?(
                        <DetailSpan
                            url={this.props.url}
                            id={record.sampleDeliveringRecord.id}
                        />
                    ):(
                        <span  className="notClick">详情</span>
                    )}
                    <span className={this.props.judgeOperation(this.props.operation,'UPDATE')?'':'hide'}>
                        <Divider type="vertical" />
                        {checkSpanFlag?(
                            <CheckSpan
                                menuList={this.props.menuList}
                                url={this.props.url}
                                id={record.sampleDeliveringRecord.id}
                                fetch={this.props.fetch}
                            />
                        ):(
                            <span  className="notClick">录检</span>
                        )}
                    </span>
                    <span className={this.props.judgeOperation(this.props.operation,'UPDATE')?'':'hide'}>
                        <Divider type="vertical" />
                        {releaseSpanFlag?(
                            <ReleaseSpan
                                url={this.props.url}
                                id={record.sampleDeliveringRecord.id}
                                fetch={this.props.fetch}
                            />
                        ):(
                            <span  className="notClick">发布</span>
                        )}
                    </span>
                    <Divider type="vertical" />
                        <Loss statement={record.sampleDeliveringRecord.exceptionComment} name='异常备注'/>
                </span>
            )
        }
    }];
    render() {
        //  获取record的记录
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                }),
            };
        });
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <Table
                rowKey={record => record.index}
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
        if(isPublished===0&&(status===3||status===2)){
            return true;
        }else{
            return false;
        }
    };
    /**---------------------- */
    /**通过id查询详情 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default InterTable;