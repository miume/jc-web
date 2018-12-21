import React from 'react';

import {Table, Divider} from 'antd';
import IsQualified from "../BlockQuote/isQualified";
import './interProduct.css';
import DetailStateModal from "./detailStateModal";

// const testData = [];
// for (let i = 0; i < 50; i++) {
//     testData.push({
//         index:i,
//         id: i,
//         testItem: `测试`,
//         testResult: '0.001',
//         itemUnit: `g/mL`,
//     });
// }
// const examineData = [];
// for (let i = 0; i < 50; i++) {
//     examineData.push({
//         handler: `测试`,
//         handleReply: '0.001',
//         handleTime: `g/mL`,
//     });
// }
//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class DrSpanModal extends React.Component {
    state = {
        examineData: [],  //审核人数据
        // spanStatus: 0, //进行判断，0详情，1录检，2发布
        // status : 1, //0不合格，1合格

    };
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '20%',
    },{
        title: '检测项目',
        dataIndex: 'testItemName',
        key: 'testItemName',
        align:'center',
        width: '25%',
    },{
        title: '检测结果',
        dataIndex: 'testResult',
        key: 'testResult',
        align:'center',
    },{
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
        align:'center',
        width: '25%',
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
            <div>
                <div className="interDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>批号</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.props.data.topData.serialNumberId}</td>
                            <td>{this.props.data.topData.materialName}</td>
                            <td>{this.props.data.topData.sampleDeliveringDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.props.data.topData.materialName?(this.props.data.topData.materialName+'样品'):''}</span>
                       </div>
                </div>
                <div>
                    <Table
                        className="interCursorDefault"
                        rowKey={record => record.index}
                        columns={columns}
                        dataSource={this.props.data.testDTOS}
                        // dataSource={testData}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 230 }}
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