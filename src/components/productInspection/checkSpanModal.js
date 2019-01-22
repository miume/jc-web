import React from 'react';
import { Input,Button,Table } from 'antd';
import './aePopModal.css';
import CheckQualifiedModal from '../BlockQuote/checkQualifiedModal';
import './productInspection.css';


//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class CheckSpanModal extends React.Component {
    constructor(props){
        super(props);
        this.clickIsQualified = this.clickIsQualified.bind(this);
    }
    // columns = [{
    //     title: '序号',
    //     dataIndex: 'index',
    //     key: 'index',
    //     align:'center',
    //     width: '12%',
    // },{
    //     title: '检测项目',
    //     dataIndex: 'testItemName',
    //     key: 'testItemName',
    //     align:'center',
    //     width: '20%',
    // },{
    //     title: '检测结果',
    //     dataIndex: 'testResult',
    //     key: 'testResult',
    //     align:'center',
    //     render: (text,record,index) => {
    //         return(
    //             <Input
    //                 placeholder='输入检测结果'
    //                 style={{border:'0',paddingLeft:'10px'}}
    //                 onChange={this.props.inputSave}
    //                 value={record.testResult}
    //                 name={index}
    //             />
    //         )
    //     }
    // },{
    //     title: '行业标准',
    //     dataIndex: 'rawTestItemStandard',
    //     key: 'rawTestItemStandard',
    //     align:'center',
    //     width: '20%',
    // },{
    //     title: '计量单位',
    //     dataIndex: 'unit',
    //     key: 'unit',
    //     align:'center',
    //     width: '20%',
    // }];
    render() {
        // const columns = this.columns.map((col) => {
        //     return {
        //         ...col,
        //         onCell: record => ({
        //             record,
        //         }),
        //     };
        // });
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
                    <Button><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button>
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
                                    <div>
                                        <div>{item.index}</div>
                                        <div>{item.testItemName}</div>
                                        <div>{item.testResult}</div>
                                        <div>{item.rawTestItemStandard}</div>
                                        <div>{item.unit}</div>
                                        <div>
                                            <div
                                                className={(item.isValid)?'productPassValidPointer':'productDefaultPointer'}
                                                // onClick={this.handleJudgePass.bind(this,index,1)}
                                            >合格</div>
                                            <div
                                                className={(item.isValid)?'productDefaultPointer':'productNoPassValidPointer'}
                                                // onClick={this.handleJudgePass.bind(this,index,0)}
                                            >不合格</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <CheckQualifiedModal
                    status={this.props.data.isQualified}
                    clickIsQualified={this.clickIsQualified}
                />
            </div>
        )
    }
    /**实现选择合格:1与不合格:0功能 */
    clickIsQualified = (isQualified) => {
        var checkData = this.props.data;
        checkData.isQualified = isQualified;
        this.modifyDetailData(checkData);
    };
    /**---------------------- */
    handleJudgePass = (index,flag) => {
        var detailData = this.props.data;
        detailData.testDTOS[index].isValid = flag;
        this.props.modifyDetailData(detailData);
    }
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default CheckSpanModal;