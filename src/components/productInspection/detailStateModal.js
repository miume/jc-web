import React from 'react';
import './productInspection.css';
import AllTester from '../BlockQuote/allTester';
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
                        <AllTester
                            hide={1}
                            examineData={this.props.examine.examineData}
                        />
                        <Divider
                            className="productDrSpanDivider"
                        />
                        <div
                            className="productOptional"
                        >
                            <div
                                className="productOptionalPerson"
                            >
                                <div><span>择优人：<span>{this.props.optional?this.props.optional.optionalData.personer:''}</span></span></div>
                                <div><span>择优时间：<span>{this.props.optional?this.props.optional.optionalData.personTime:''}</span></span></div>
                            </div>
                            <div
                                className="productOptionalImag"
                            >
                                <span>{this.props.optional.optionalStatus}</span>
                            </div>
                        </div>
                    </div>
                );
            case 3: //不通过
                return(
                    <div className="productPassModal">
                        <div className="productPassExamineModal">
                            <div>
                                <div className="productPadding">
                                {
                                    this.props.examine.examineData.map((item,index) => {
                                        return (
                                            <div key={index}>
                                                <div key={`handler${index}`}>
                                                    <span>审核人：</span>
                                                    <span>{item?item.handler:''}</span>
                                                </div>
                                                <div key={`handleReply${index}`}>
                                                    <span>审核意见：</span>
                                                    <span>{item?item.handleReply:''}</span>
                                                </div>
                                                <div key={`handleTime${index}`}>
                                                    <span>审核日期：</span>
                                                    <span>{item?item.handleTime:''}</span>
                                                </div>
                                                <Divider
                                                    className="productDrSpanDivider"
                                                />
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
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