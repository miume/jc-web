import React from 'react';
import home from '../../../commom/fns'
import {Divider, Table} from 'antd';
import IsQualified from "../../../BlockQuote/isQualified";
import './interProduct.css';
import DetailStateModal from "./detailStateModal";


//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class DrSpanModal extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '10%',
    },{
        title: '检测项目',
        dataIndex: 'testItemName',
        key: 'testItemName',
        align:'center',
        width: '20%',
    },{
        title: '检测结果',
        dataIndex: 'testResult',
        key: 'testResult',
        align:'center',
        width: '20%',
    },{
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
        align:'center',
        width: '20%',
    },{
        title: '状态',
        dataIndex: 'isAudit',
        key: 'isAudit',
        width: '30%',
        render: (text) => {
            if(text === 0) {
                return '最近审核未通过';
            } else if(text === 1) {
                return '通过'
            } else {
                return '未审核';
            }
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

        const arr = this.props.data.topData.serialNumber.split('-');
        return(
            <div>
                <div className="interDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>物料编码</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span title={this.props.data.topData.serialNumber} className="text-decoration">{arr[0]+'-'+arr[1]+'...'}</span></td>
                            <td>{home.judgeText(this.props.data.topData.materialName,8)}</td>
                            <td>{home.judgeText(this.props.data.topData.sampleDeliveringDate,10)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.props.data.topData.materialName?(this.props.data.topData.materialName+'样品'):''}</span>
                       </div>
                </div>
                <div className="interDetailTable">
                    <Table
                        className="interCursorDefault"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data.testDTOS}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 220 }}
                        bordered
                    />
                </div>
                <div className="interDrSpanModalBottom">
                    <div className="interDrSpanModalBottomFirst">
                        <table>
                            <tbody className="interPadding">
                            <tr>
                                <td>检验人：</td>
                                <td>{this.props.data.testData.tester}</td>
                            </tr>
                            <tr>
                                <td>检验时间：</td>
                                <td>{this.props.data.testData.testTime}</td>
                            </tr>
                            </tbody>
                        </table>
                        <IsQualified
                            status={this.props.data.isQualified}
                        />
                    </div>
                    <Divider
                        className="interDrSpanDivider"
                    />
                    <DetailStateModal
                        data={this.props.data.examine}
                    />
                </div>
            </div>
        )
    }
}

export default DrSpanModal;
