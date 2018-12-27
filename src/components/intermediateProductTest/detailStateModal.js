import React from 'react';
import './interProduct.css';
import {Divider} from "antd";

class DetailStateModal extends React.Component {
    render() {
        switch (this.props.data.examineStatus) {
            case -1: //待审核
                return(
                    <div className="interStateDefaultModal">
                        已保存未提交
                    </div>
                );
            case 0: //未申请
                return(
                    <div className="interStateDefaultModal">
                        已提交未未审核
                    </div>
                );
            case 1: //审核中
                return(
                    <div className="interStateDefaultModal">
                        审核中
                    </div>
                );
            case 2: //已通过
                return(
                    <div className="interStateModal">
                        <table>
                            <tbody className="interPadding">
                            {
                                this.props.data.examineData.map((item,index) => {
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
            case 3: //不通过
                return(
                    <div className="interStateModal">
                        <table>
                            <tbody className="interPadding">
                            {
                                this.props.data.examineData.map((item,index) => {
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
            case 4: //发布
                return(
                    <div className="interStateModal">
                        <table>
                            <tbody className="interPadding">
                            {
                                this.props.data.examineData.map((item,index) => {
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
            default:
                return(
                    <div className="interStateDefaultModal">
                        没有进行审核过程
                    </div>
                );
        }
    }
}

export default DetailStateModal