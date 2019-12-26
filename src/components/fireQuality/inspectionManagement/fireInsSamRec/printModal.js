import React, {Component} from 'react'
import {Modal, Table, message, LINK} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import "../fireInsSamRec/fireInsSamRec.css"
import axios from "axios";


class PrintModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            dataSource: [],
            printRef: null
        }
        this.getPrint = this.getPrint.bind(this);
        this.cancel = this.cancel.bind(this);
        this.columns = [{
            title: '序号',
            key: 'col1',
            dataIndex: 'col1',
            width: '8%'
        }, {
            title: '标签预览',
            key: 'col2',
            dataIndex: 'col2',
            width: '84%',
            render: (text, record) => {
                return (
                    <div>
                        <div id="print_data" style={{fontFamily:"Arial Normal,Arial",fontStyle:"normal",color:"#333333",lineHeight:"normal"}}>
                            <div style={{fontSize:"28px",fontWeight:"400"}}>{record.col4}</div>
                            <div style={{fontSize:"10px"}}>检验项目：</div>
                            <div style={{fontSize:"10px"}}>{record.col3}</div>
                            <div style={{fontSize:"10px"}}>送检时间：&nbsp;{record.col2}</div>
                        </div>
                    </div>
                )
            }
        }, {
            title: '操作',
            key: 'col4',
            dataIndex: 'col4',
            width: '8%',
            render: (() => {
                return (
                    <span>
                        <span className={'blue'} onClick={this.print}>打印</span>
                    </span>
                )
            })
        }]
    }

    render() {
        return (
            <span>
                <span className={'blue'} onClick={this.getPrint}>打印</span>
                <Modal
                    className="printModal"
                    title={'打印预览'}
                    visible={this.state.visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={700}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={true}/>,
                    ]}
                >
                    <div className="printModal_scala">
                        <Table
                            rowKey={record => record.col1}
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                            bordered
                            size={'small'}
                            pagination={false}
                            scroll={{y: 650}}
                        />
                    </div>

                </Modal>
            </span>
        )
    }

    getPrint = () => {
        axios({
            url: `${this.props.url.fireInsSamRec.print}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                id: this.props.record.code
            }
        }).then((data) => {
            const res = data.data.data;
            var dataSource = this.state.dataSource;
            if (res) {
                for (var i = 0; i < res.length; i++) {
                    dataSource.push({
                        col1: i + 1,
                        col2: res[i]["送检时间"],
                        col3: res[i]["检验项目"],
                        col4: res[i]["批号"]
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    visible: true
                })
                message.info(data.data.message)
            } else {
                message.info("不存在打印数据")
            }

        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    }
    print = () => {
        const el = document.getElementById("print_data");
        const iframe = document.createElement('IFRAME');
        let doc = null;
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;');
        document.body.appendChild(iframe);
        doc = iframe.contentWindow.document;
        // 引入打印的专有CSS样式，根据实际修改
        // doc.write('<LINK rel="stylesheet" type="text/css" href="../fireInsSamRec/fireInsSamRec.css">');
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

    cancel = () => {
        this.setState({
            dataSource: [],
            visible: false
        })

    }
}

export default PrintModal
