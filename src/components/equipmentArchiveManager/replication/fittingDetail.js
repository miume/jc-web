import React from 'react';
import CancleButton from "../../BlockQuote/cancleButton";
import {message, Modal, Table} from "antd";
import axios from "axios";

class FittingDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            dataSource:[]
        }

    }
    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        width: '25%',
        editable: 1
    }, {
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
        width: '20%',
        editable: 1
    }, {
        title: '数量',
        dataIndex: 'counts',
        key: 'counts',
        align: 'center',
        width: '20%',
        editable: 1
    }]

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleFitting}>配件</span>
                <Modal
                    title="配件"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <div style={{maxHeight:'320px'}}>
                        <Table
                            rowKey={record => record.code}
                            scroll={{y: 300}}
                            pagination={false}
                            size="small"
                            bordered
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                        />
                    </div>
                </Modal>
            </span>
        );
    }
    handleFitting = () => {
        var url = ''
        if(this.props.mainFlag){
            url=`${this.props.url.equipmentArchive.accsMain}/${this.props.record.code}`
        }else{
            url=`${this.props.url.equipmentArchive.accsUnit}/${this.props.record.code}`
        }
        axios({
            url:url,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            var dataSource = []
            // TODO
            if(res&&res.list){
                var datas = []
                if(res.list){
                    datas = res.list
                }else{
                    datas = res
                }
                for(var i = 0; i< datas.length; i++){
                    const arr = datas[i]
                    dataSource.push({
                        name:arr.name,
                        specification:arr.specification,
                        counts:arr.counts,
                        code:arr.code
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    visible: true,
                })
            }else{
                this.setState({
                    dataSource: [],
                    visible: true,
                })
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

}

export default FittingDetail