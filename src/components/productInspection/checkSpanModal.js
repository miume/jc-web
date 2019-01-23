import React from 'react';
import { Input,Button,Table } from 'antd';
import './aePopModal.css';
import CheckQualifiedModal from '../BlockQuote/checkQualifiedModal';
import './productInspection.css';


//判断类型，如果为新增,则data为空
class CheckSpanModal extends React.Component {
    constructor(props){
        super(props);
        this.clickIsQualified = this.clickIsQualified.bind(this);
        this.clearData = this.clearData.bind(this);
    }
    render() {
        return(
            <div >
                <div className="productDrSpanModalTop">
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
                            <td>{this.props.data.topData.serialNumber}</td>
                            <td>{this.props.data.topData.materialName}</td>
                            <td>{this.props.data.topData.sampleDeliveringDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="productCheckModalMiddle">
                    <div>
                           样品名称：<span>{this.props.data.topData.materialName+'样品'}</span>
                    </div>
                    <Button onClick={this.clearData}><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button>
                </div>
                <div
                    className="productSpanTableModal"
                >
                    <div
                        className="productSpanTheadModal"
                    >
                        <div>序号</div>
                        <div>检测项目</div>
                        <div>检测结果</div>
                        <div>行业标准</div>
                        <div>计量单位</div>
                        <div>判定</div>
                    </div>
                    <div
                        className="productSpanTbodyModal"
                    >
                        {
                            this.props.data.testDTOS.map((item,index) => {
                                return(
                                    <div key={index}>
                                        <div>{item.index}</div>
                                        <div>{item.testItemName}</div>
                                        <div className="productTdInput"><Input name={index} value={item.testResult} placeholder="请输入"  onChange={this.props.inputSave}/></div>
                                        <div>{item.rawTestItemStandard}</div>
                                        <div>{item.unit}</div>
                                        <div>

                                            <div
                                                className={(item.isValid)?'productPassValidPointer':'productDefaultPointer'}
                                                onClick={this.handleJudgePass.bind(this,index,1)}
                                            >合格</div>
                                            <div
                                                className={(item.isValid)?'productDefaultPointer':'productNoPassValidPointer'}
                                                onClick={this.handleJudgePass.bind(this,index,0)}
                                            >不合格</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <CheckQualifiedModal
                    isQualified={this.props.data.isQualified}
                    clickIsQualified={this.clickIsQualified}
                />
            </div>
        )
    }
    /**实现选择合格:1与不合格:0功能 */
    clickIsQualified = (isQualified) => {
        var checkData = this.props.data;
        checkData.isQualified = isQualified;
        this.props.modifyDetailData(checkData);
    };
    /**---------------------- */
    handleJudgePass = (index,flag) => {
        var checkData = this.props.data;
        checkData.testDTOS[index].isValid = flag;
        this.props.modifyDetailData(checkData);
    };
    /**实现清空功能 */
    clearData = () => {
        var checkData = this.props.data;
        for(var i=0; i<checkData.testDTOS.length; i++){
            checkData.testDTOS[i].testResult = null;
        }
        this.props.modifyDetailData(checkData);
    };
}

export default CheckSpanModal;