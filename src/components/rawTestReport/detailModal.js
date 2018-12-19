import React from 'react';
import { Table,Divider } from 'antd';
import IsQualified from "../BlockQuote/isQualified";
//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
const columns = [{
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
class DetailModal extends React.Component {
    render() {
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
                            <td>{this.props.topData?this.props.topData.batchNumber:''}</td>
                            <td>{this.props.topData?this.props.topData.materialName:''}</td>
                            <td>{this.props.topData?this.props.topData.b:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.props.topData?this.props.topData.materialName+'样品':''}</span>
                       </div>
                </div>
                <div>
                    <Table
                        className="interCursorDefault"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data}
                        pagination={false}
                        size="small"
                        scroll={{ y: 250 }}
                        bordered
                    />
                </div>
                <div className="interDrSpanModalBottomFirst">
                    <table>
                        <tbody>
                        <tr>
                            <td>检验人：</td>
                            <td>{this.props.testData?this.props.testData.tester:''}</td>
                        </tr>
                        <tr>
                            <td>检验时间：</td>
                            <td>{this.props.testData?this.props.testData.testTime:''}</td>
                        </tr>
                        </tbody>
                    </table>
                    <IsQualified
                        status={this.props.status?this.props.status:0}
                    />
                </div>
                <Divider />
                <div className="interDrSpanModalBottomSecond">
                    <table >
                        <tbody>
                        <tr>
                            <td>审核人：</td>
                            <td>{this.props.examineData?this.props.examineData.examiner:''}</td>
                        </tr>
                        <tr>
                            <td>审核意见：</td>
                            <td>{this.props.examineData?this.props.examineData.examineView:''}</td>
                        </tr>
                        <tr>
                            <td>审核日期：</td>
                            <td>{this.props.examineData?this.props.examineData.examineTime:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default DetailModal;