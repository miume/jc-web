import React from 'react';
import { Table } from 'antd';
// import AllTester from '../BlockQuote/allTester';
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
class DetailModal extends React.Component {
    render() {
        const data = this.props.detail;
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
                            <td>{data.topData?data.topData.batchNumber:''}</td>
                            <td>{data.topData?data.topData.materialName:''}</td>
                            <td>{data.topData?data.topData.b:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{data.topData?data.topData.materialName+'样品':''}</span>
                       </div>
                </div>
                <div style={{height:300}}>
                    <Table
                        className="interCursorDefault"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={data.details}
                        pagination={false}
                        size="small"
                        scroll={{ y: 190 }}
                        bordered
                    />
                </div>
                <div>
                    <div className="interDrSpanModalBottomFirst">
                        <table>
                            <tbody className="interPadding">
                            <tr>
                                <td>检验人：</td>
                                <td>{data.testData?data.testData.tester:''}</td>
                            </tr>
                            <tr>
                                <td>检验时间：</td>
                                <td>{data.testData?data.testData.testTime:''}</td>
                            </tr>
                            </tbody>
                        </table>
                        <IsQualified
                            status={data.IsQualified?data.IsQualified:0}
                        />
                    </div>
                {/* <Divider />
                <div className={this.props.flag && this.props.examineData?'':'hide'}>
                    <AllTester examineData={this.props.examineData} dataId={this.props.dataId} hide={1}/>
                </div> */}
                {/* <AllTester examineData={this.props.examineData} dataId={this.props.dataId} hide={1} /> */}
            </div>
            </div>
        )
    }
}
export default DetailModal;