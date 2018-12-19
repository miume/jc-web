import React from 'react';
import './drStateModal.css';
import {Divider} from "antd";

class DetailStateModal extends React.Component {
    render() {
        switch (this.props.checkStatus) {
            case '0': //未申请
                return(
                    <div>
                        未申请
                    </div>
                );
            case '1': //审核中
                return(
                    <div className="noApply">
                        审核中
                    </div>
                );
            case '2': //已通过
                return(
                    <div>
                        <table style={{float:'left',marginBottom:'15px',marginTop:'-10px'}}>
                            <tbody className="padding">
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
                        <table style={{marginBottom:'15px',marginTop:'-10px'}}>
                            <tbody className="padding">
                            <tr>
                                <td>择优人：</td>
                                <td>{this.props.optionalPerson.personer}</td>
                            </tr>
                            <tr>
                                <td>择优时间：</td>
                                <td>{this.props.optionalPerson.personTime}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case '3': //不通过
                return(
                    <div>
                        <table style={{float:'left',marginBottom:'15px',marginTop:'-10px'}}>
                            <tbody className="padding">
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