import React from 'react';
import { Divider } from 'antd';
import IsQualified from "../../../BlockQuote/isQualified";
import DetailStateModal from "./detailStateModal";
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
        return(
            <div >
                <div className="productDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>物料编码</th>
                            <th>成品</th>
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
                <div
                    className="productDrSpanTableModal"
                >
                    <div
                        className="productDrSpanTheadModal"
                    >
                        <div>序号</div>
                        <div>检测项目</div>
                        <div>检测结果</div>
                        <div>行业标准</div>
                        <div>计量单位</div>
                        <div>判定</div>
                    </div>
                    <div
                        className="productDrSpanTbodyModal"
                    >
                        {
                            this.props.data.testDTOS.map((item,index) => {
                                return(
                                    <div key={index}>
                                        <div>{item.index}</div>
                                        <div>{item.testItemName}</div>
                                        <div>{item.testResult}</div>
                                        <div>{item.rawTestItemStandard}</div>
                                        <div>{item.unit}</div>
                                        <div>
                                            <div
                                                className={(item.isValid)?'productPassValidDefault':'productDefaultDefault'}
                                            >合格</div>
                                            <div
                                                className={(item.isValid)?'productDefaultDefault':'productNoPassValidDefault'}
                                            >不合格</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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
                        examine={this.props.data.examine}
                        //  择优人
                        optional={this.props.data.optional}
                    />
                </div>
            </div>
        )
    }
}

export default DrSpanModal;
