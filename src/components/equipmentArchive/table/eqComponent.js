import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import EARightBottom from '../right/eARightBottom'

class EqComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            selectedRowKeys : [],
            searchContent:'',
            pageChangeFlag: 0,   //0表示分页 1 表示查询
        }
        this.handleData = this.handleData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this)
        this.fetch = this.fetch.bind(this)
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            } ,
            showSizeChanger:true
        };
    }
    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleData}>部件</span>
                <Modal
                    className="modal-xlg"

                    title="部件"
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
                    <div style={{height:"550px"}}>
                        <EARightBottom
                            comFlag = {true}
                            dataSource={this.state.dataSource}
                        />
                    </div>
                </Modal>
            </span>
        )

    }
    /**table变化时 */
    handleTableChange(pagination){
        this.pagination = pagination;
        const {pageChangeFlag} = this.state;
        if(pageChangeFlag){
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                personName:this.state.searchContent
            })
        }else{
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
            })
        }
    }



    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleData = () => {
        this.fetch({
            deptId: this.props.depCode,
            deviceId: this.props.record.code

        },0)
    };
    fetch(params,flag){
        if(flag)
            this.setState({
                pageChangeFlag:0,
                searchContent:''
            })
        axios({
            url: `${this.props.url.equipmentArchive.units}/${params.deptId}/${params.deviceId}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:params,
        }).then((data) => {
            const res = data.data.data;
            if(res&&res.list)
            {
                var tableData = []
                for(var i = 0; i < res.list.length;i++){
                    var e = res.list[i];
                    tableData.push({
                        code: e.code,
                        index: i+1,
                        fixedassetsCode: e.fixedassetsCode,
                        deviceName: e.deviceName,
                        specification: e.specification,
                        startdate: e.startdate,
                        statusCode: e.statusCode,
                        idCode: e.idCode
                    })
                }
                this.pagination.total = res?res.total:0;
                this.setState({
                    dataSource:tableData,
                    visible: true
                })
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    }
}

export default EqComponent