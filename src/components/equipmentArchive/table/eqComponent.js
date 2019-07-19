import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import EARightBottom from '../right/eARightBottom'
import '../equipmentArchive.css'

class EqComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            selectedRowKeys: [],
            searchContent: '',
            pageChangeFlag: 0,   //0表示分页 1 表示查询
        }
        this.handleData = this.handleData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this)
        this.fetch = this.fetch.bind(this)
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }
    }

    render() {

        const title = <div className="eq-component-titleHead">
            <div className="eq-component-title-first">部件管理：&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className="eq-component-title">所属设备:&nbsp;&nbsp;&nbsp;&nbsp;
                <span>固定资产编码: {this.props.record.fixedassetsCode}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>设备名称: {this.props.record.deviceName}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>规格型号: {this.props.record.specification}</span></div>
        </div>
        return (
            <span>
                <span className="blue" onClick={this.handleData}>部件</span>
                <Modal
                    className="modal-xlg"

                    title={title}
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <div style={{height: "550px"}}>
                        <EARightBottom
                            depCode={this.props.depCode}
                            mainCode={this.props.record.code}
                            url={this.props.url}
                            comFlag={this.props.comFlag}
                            dataSource={this.state.dataSource}
                            handleTableChange={this.state.handleTableChange}
                            pagination={this.pagination}
                            fetch={this.fetch}
                        />
                    </div>
                </Modal>
            </span>
        )

    }

    /**table变化时 */
    handleTableChange = (pagination) => {
        this.setState({
            pagination: pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        // if (pageChangeFlag) {
        //     this.fetch({
        //         pageSize: pagination.pageSize,
        //         pageNumber: pagination.current,
        //         // factory: this.state.searchContent
        //     })
        // } else {
        //     this.fetch({
        //         pageSize: pagination.pageSize,
        //         pageNumber: pagination.current,
        //     })
        // }
    };


    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleData = () => {
        this.fetch({
            page: 1
        }, 0)
    };

    fetch = (params, flag) => {
        if (flag)
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
        axios({
            url: `${this.props.url.equipmentArchive.units}/${this.props.depCode}/${this.props.record.code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            console.log(res)
            if (res && res.list) {
                var tableData = []
                for (var i = 0; i < res.list.length; i++) {
                    var e = res.list[i];
                    tableData.push({
                        code: e.code,
                        index: i + 1,
                        fixedassetsCode: e.fixedassetsCode,
                        deviceName: e.deviceName,
                        specification: e.specification,
                        startdate: e.startdate,
                        idCode: e.idCode
                    })
                }
                this.pagination.total = res ? res.total : 0;
                console.log('2-------')
                this.setState({
                    dataSource: tableData,
                    visible: true
                })
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    }
}

export default EqComponent