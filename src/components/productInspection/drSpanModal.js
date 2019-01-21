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
                <div className="productSpanModal">
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>检测项目</th>
                                <th>检测结果</th>
                                <th>行业标准</th>
                                <th>计量单位</th>
                                <th colSpan="2">判定</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.data.testDTOS.map((item,index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.index}</td>
                                        <td>{item.testItemName}</td>
                                        <td>{item.testResult}</td>
                                        <td>{item.rawTestItemStandard}</td>
                                        <td>{item.unit}</td>
                                        <td
                                            className={(item.isValid)?'productPassValidPointer':'productDefaultPointer'}
                                            onClick={this.handleJudgePass.bind(this,index,1)}
                                        >合格</td>
                                        <td
                                            className={(item.isValid)?'productDefaultPointer':'productNoPassValidPointer'}
                                            onClick={this.handleJudgePass.bind(this,index,0)}
                                        >不合格</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
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
    handleJudgePass = (index,flag) => {
        var detailData = this.props.data;
        detailData.testDTOS[index].isValid = flag;

        // if(detailData.testDTOS[index].isValid===1){
        //     detailData.testDTOS[index].isValid = 0;
        // }else{
        //     detailData.testDTOS[index].isValid = 1;
        // }
        this.props.modifyDetailData(detailData);
    }
}

export default DrSpanModal;