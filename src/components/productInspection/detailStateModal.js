import React from 'react';
import './productInspection.css';
import {Divider} from "antd";

class DetailStateModal extends React.Component {
    render() {
        switch (this.props.examine.examineStatus) {
            case 0: //未申请
                return(
                    <div className="productStateDefaultModal">
                        未申请
                    </div>
                );
            case 1: //审核中
                return(
                    <div className="productStateDefaultModal">
                        审核中
                    </div>
                );
            case 2: //已通过
                return(
                    <div className="productPassModal">
                        <div className="productPassExamineModal">
                            <table>
                                <tbody className="productPadding">
                                {
                                    this.props.examine.examineData.map((item,index) => {
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
                                                    className="productDrSpanDivider"
                                                />
                                            </div>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <Divider />
                        <table style={{marginBottom:'15px',marginTop:'-10px'}}>
                            <tbody className="productPadding">
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
            case 3: //不通过
                return(
                    <div className="productPassModal">
                        <div className="productPassExamineModal">
                            <table>
                                <tbody className="productPadding">
                                {
                                    this.props.examine.examineData.map((item,index) => {
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
                                                    className="productDrSpanDivider"
                                                />
                                            </div>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <Divider
                            className="productDrSpanDivider"
                        />
                        <div className="productOptionalModal">
                            审核不通过，无法择优
                        </div>
                    </div>
                );
            case 4: //发布
                return(
                    <div className="productStateModal">
                        <table>
                            <tbody className="productPadding">
                            {
                                this.props.examine.examineData.map((item,index) => {
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
            default: return ''
        }
    }
}

export default DetailStateModal