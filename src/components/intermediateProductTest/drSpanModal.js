import React from 'react';
import { Table,Divider } from 'antd';
import IsQualified from "../BlockQuote/isQualified";
import './interProduct.css';



const topData = {
    batchNumber: 'EcT/139',
    materialName: '镍矿石',
    b: '2018年11月11日',
};
const testData = {
    tester: '检测人',
    testTime: '2018年11月12日',
};
const examineData = {
    examiner: '审核人',
    examineView: '数据正常，审核通过',
    examineTime: '2018年11月12日',
}
//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class DrSpanModal extends React.Component {
    state = {
        topData : topData,      //表头数据
        testData: testData,   // 检验人数据
        examineData: examineData,  //审核人数据
        // spanStatus: 0, //进行判断，0详情，1录检，2发布
        status : 1, //0不合格，1合格

    };
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        align:'center',
        width: '20%',
    },{
        title: '检测项目',
        dataIndex: 'testItem',
        key: 'testItem',
        align:'center',
        width: '25%',
    },{
        title: '检测结果',
        dataIndex: 'testResult',
        key: 'testResult',
        align:'center',
    },{
        title: '计量单位',
        dataIndex: 'itemUnit',
        key: 'itemUnit',
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
                <div className="drSpanModalTop">
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
                            <td>{this.state.topData.batchNumber}</td>
                            <td>{this.state.topData.materialName}</td>
                            <td>{this.state.topData.b}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="drSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.state.topData.materialName+'样品'}</span>
                       </div>
                </div>
                <div>
                    <Table
                        className="interCursorDefault"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 250 }}
                        bordered
                    />
                </div>
                <div className="drSpanModalBottomFirst">
                    <table>
                        <tbody>
                        <tr>
                            <td>检验人：</td>
                            <td>{this.state.testData.tester}</td>
                        </tr>
                        <tr>
                            <td>检验时间：</td>
                            <td>{this.state.testData.testTime}</td>
                        </tr>
                        </tbody>
                    </table>
                    <IsQualified
                        status={this.state.status}
                    />
                </div>
                <Divider />
                <div className="drSpanModalBottomSecond">
                    <table >
                        <tbody>
                        <tr>
                            <td>审核人：</td>
                            <td>{this.state.examineData.examiner}</td>
                        </tr>
                        <tr>
                            <td>审核意见：</td>
                            <td>{this.state.examineData.examineView}</td>
                        </tr>
                        <tr>
                            <td>审核日期：</td>
                            <td>{this.state.examineData.examineTime}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default DrSpanModal;