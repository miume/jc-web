import React from 'react';
import { Table,Divider } from 'antd';
import IsQualified from "../BlockQuote/isQualified";
import DetailStateModal from "./detailStateModal";
// import AllTester from '../BlockQuote/allTester';
import './productInspection.css';

//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class DrSpanModal extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '12%',
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
    },{
        title: '行业标准',
        dataIndex: 'rawTestItemStandard',
        key: 'rawTestItemStandard',
        align:'center',
        width: '20%',
    },{
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
        align:'center',
        width: '20%',
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
            <div >
                <div className="productDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>编号</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.props.data.topData.serialNumber}</td>
                            <td>{this.props.data.topData.materialName}</td>
                            <td>{this.props.data.topData.sampleDeliveringDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="productDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.props.data.topData.materialName+'样品'}</span>
                       </div>
                </div>
                <div>
                    <Table
                        className="productCursorDefault"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data.testDTOS}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 150 }}
                        bordered
                    />
                </div>
                <div className="productDrSpanModalBottom">
                    <div className="productDrSpanModalBottomFirst">
                        <table>
                            <tbody className="productPadding">
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
                        className="productDrSpanDivider"
                    />
                    <DetailStateModal
                        // examine={this.props.data.examine}
                        examine = {{
                            examineStatus:2,
                            examineData:[{
                                handler:'a',
                                handleReply:'b',
                                handleTime:'c'
                            },{
                                handler:'aa',
                                handleReply:'bb',
                                handleTime:'cc'
                            }]
                        }}
                        // examineData={this.state.examineData}
                        //  择优人
                        // optional={this.props.data.optional}
                        optional = {{
                            optionalStatus: 1000,
                            optionalData: {
                                personer:'暂定',
                                personTime:'暂定'
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default DrSpanModal;