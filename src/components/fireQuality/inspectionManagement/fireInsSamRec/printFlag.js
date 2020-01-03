import React, {Component} from 'react'
import {Modal, Table, message, LINK, Input} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import "../fireInsSamRec/fireInsSamRec.css"
import axios from "axios";


class PrintFlag extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const printId = `print_data${this.props.record.col1}`;

        return (
            <span>
                <span className={'blue'} onClick={this.print}>打印</span>
                <div className="printModal_print">
                    <div id={printId} style={{fontFamily:"Arial Normal,Arial",fontStyle:"normal",color:"#333333",lineHeight:"normal"}}>
                        <div style={{fontSize:"15px"}}>{this.props.record.col4}</div>
                        <div style={{fontSize:"8px"}}>检验项目：</div>
                        {
                            this.props.printDataItems?this.props.printDataItems.map((item,index) => {
                                return (
                                    <div key={index} style={{fontSize:"8px"}}>{item}</div>
                                )
                            }):null
                        }
                        <div style={{fontSize:"8px"}}>送检时间：&nbsp;{this.props.record.col2}</div>
                    </div>
                </div>
            </span>
        )
    }


    print = () => {
        const printId = `print_data${this.props.record.col1}`;
        const el = document.getElementById(printId);
        const iframe = document.createElement('IFRAME');
        let doc = null;
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;');
        document.body.appendChild(iframe);
        doc = iframe.contentWindow.document;
        // 引入打印的专有CSS样式，根据实际修改
        doc.write('<link media="print" rel="stylesheet" type="text/css" href="../fireInsSamRec/fireInsSamRec.css">');
        doc.write(el.innerHTML);
        doc.close();
        // 获取iframe的焦点，从iframe开始打印
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0)
        {
            document.body.removeChild(iframe);
        }
    }

}

export default PrintFlag
