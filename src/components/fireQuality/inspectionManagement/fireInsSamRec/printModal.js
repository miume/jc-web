import React, {Component} from 'react'
import {Modal, Table, message, LINK} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import "../fireInsSamRec/fireInsSamRec.css"
import axios from "axios";
import PrintFlag from './printFlag'


class PrintModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            dataSource: [],
            printId :""
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
                const printId = `print_data${record.col1}`;
                return (
                    <div>
                        <div style={{fontFamily:"Arial Normal,Arial",fontStyle:"normal",color:"#333333",lineHeight:"normal"}}>
                            <div style={{fontSize:"20px"}}>{record.col4}</div>
                            <div style={{fontSize:"8px"}}>检验项目：</div>
                            <div style={{fontSize:"10px"}}>{record.col3}</div>
                            <div style={{fontSize:"8px"}}>送检时间：&nbsp;{record.col2}</div>
                        </div>
                    </div>
                )
            }
        }, {
            title: '操作',
            key: 'col4',
            dataIndex: 'col4',
            width: '8%',
            render: (text,record) => {
                const items = record.col3.split(',');
                var print_data = "";
                var print_data_items = [];
                if (items.length > 4){
                    for (var i = 0; i < items.length; i++) {
                        if (print_data === ""){
                            print_data = items[i]
                        } else{
                            print_data = print_data + "," + items[i]
                        }
                        if ((i+1)%4 === 0 && i !== 0){
                            print_data_items.push(print_data);
                            print_data = ""
                        }
                        if (i === items.length-1 && (i+1)%4 !== 0){
                            print_data_items.push(print_data)
                        }
                    }
                } else {
                    print_data_items.push(record.col3)
                }
                return (
                    <PrintFlag key={record.col1} record={record} printDataItems={print_data_items}/>
                )
            }
        }]
    }

    render() {
        return (
            <span className={this.props.printFlag?'':'hide'}>
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
                            scroll={{y: 450}}
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

    cancel = () => {
        this.setState({
            dataSource: [],
            visible: false
        })

    }
}

export default PrintModal
