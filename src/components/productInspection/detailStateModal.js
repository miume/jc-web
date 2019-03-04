import React from 'react';
import './productInspection.css';
import AllTester from '../BlockQuote/allTester';
import {Divider} from "antd";
import ProductOptional from './productOptional';

class DetailStateModal extends React.Component {
    render() {
        switch (this.props.examine.examineStatus) {
            case -1: //已保存未提交
                return(
                    <div className="productStateDefaultModal">
                        已保存未提交
                    </div>
                );
            case 0: //未申请
                return(
                    <div className="productStateDefaultModal">
                        已提交未审核
                    </div>
                );
            case 1: //审核中
                return(
                    <div className="productStateDefaultModal">
                        审核中
                    </div>
                );
            case 2: //已通过--
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
                            <ProductOptional
                                optionalStatus = {this.props.optional.optionalStatus}
                            />
                        </div>
                    </div>
                );
            case 3: //不通过
                return(
                    <div className="productPassModal">
                        <AllTester
                            hide={1}
                            examineData={this.props.examine.examineData}
                        />
                        <Divider
                            className="productDrSpanDivider"
                        />
                        <div className="productOptionalModal">
                            审核不通过，无法择优
                        </div>
                    </div>
                );
            default: return ''
        }
    }
}

export default DetailStateModal