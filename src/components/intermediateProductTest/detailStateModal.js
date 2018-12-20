import React from 'react';
import './interProduct.css';
import {Divider} from "antd";

class DetailStateModal extends React.Component {
    render() {
        switch (this.props.checkStatus) {
            case '-1': //待审核
                return(
                    <div className="interStateDefaultModal">
                        已保存未提交
                    </div>
                );
            case '0': //未申请
                return(
                    <div className="interStateDefaultModal">
                        已提交未未审核
                    </div>
                );
            case '1': //审核中
                return(
                    <div className="interStateDefaultModal">
                        审核中
                    </div>
                );
            case '2': //已通过
                return(
                    <div className="interStateModal">
                        <table>
                            <tbody className="interPadding">
                            {
                                this.props.examineData.map((item,index) => {
                                    return (
                                        <div>
                                            <tr key={`handler${index}`}>
                                                <td>审核人：</td>
                                                <td>{item?item.handler:''}</td>
                                            </tr>
                                            <tr key={`handleReply${index}`}>
                                                <td>审核意见：</td>
                                                <td>{item?item.handleReply:''}</td>
                                            </tr>
                                            <tr key={`handleTime${index}`}>
                                                <td>审核日期：</td>
                                                <td>{item?item.handleTime:''}</td>
                                            </tr>
                                            <Divider
                                                className="interDrSpanDivider"
                                            />
                                        </div>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                );
            case '3': //不通过
                return(
                    <div className="interStateModal">
                        <table>
                            <tbody className="interPadding">
                            <tr>
                                <td>审核人：</td>
                                <td>{this.props.examineData.examiner}</td>
                            </tr>
                            <tr>
                                <td>审核意见：</td>
                                <td>{this.props.examineData.examineView}</td>
                            </tr>
                            <tr>
                                <td>审核日期：</td>
                                <td>{this.props.examineData.examineTime}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Divider />
                        <div className="nopass">
                            审核不通过，无法择优
                        </div>
                    </div>
                );
            case '4': //发布
                return(
                    <div>
                        <table style={{float:'left'}}>
                            <tbody>
                            <tr>
                                <td>审核人：</td>
                                <td>{this.props.examineData.examiner}</td>
                            </tr>
                            <tr>
                                <td>审核意见：</td>
                                <td>{this.props.examineData.examineView}</td>
                            </tr>
                            <tr>
                                <td>审核日期：</td>
                                <td>{this.props.examineData.examineTime}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            default: return ''
        }
    }
}

export default DetailStateModal