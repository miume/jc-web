import React from 'react'
import CancleButton from "../../../BlockQuote/cancleButton";
import {message, Modal} from "antd";
import SeTable from "./seTable";
import axios from "axios";


class Detail extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            dataSource:[]
        }
        this.fetch=this.fetch.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ['10','20','50','100']
        };
    }

    clickDetail=()=>{
        this.setState({
            visible:true
        })
        this.fetch({
            id:this.props.code
        },0)
    }
    onCanCel=()=>{
        this.setState({
            visible:false
        })
    }
    fetch(params) {
        axios({
            url: `${this.props.url.checkQuery.deviceDetailPage}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            this.pagination.total = res.total || 0;
            if (res && res.list) {
                var detailData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].deviceSpotcheckRecordHead;
                    detailData.push({
                        index: (res.page-1)*10+i+1,
                        code: arr['code'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        finishTime:arr['finishTime'],
                        spotcheckPeople:res.list[i].spotPeople,
                        confirmTime:arr['confirmTime'],
                        confirmPeople:res.list[i].confirmPeople,
                        editFlag:arr['editFlag'],
                        specification: arr['specification'],
                        startdate: arr['startdate'],
                        idCode: arr['idCode'],
                    })
                }
                this.setState({
                    dataSource: detailData,
                    deviceName: params.deviceName
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    dataSource: [],
                    deviceName: ''
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        let {code}=this.props,{pageSize,current}=this.pagination
        this.fetch({
            page: current,
            size: pageSize,
            id:code
        });
    }
    render(){


        return(
            <span>
           <span className='blue' onClick={this.clickDetail}>详情</span>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                maskClosable={false}
                width="1000px"
                height="464"
                title="点检详情"
                footer={[
                         <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >
                <span>
                    <span>设备编号:{this.props.fixedassetsCode}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>设备名称:{this.props.deviceName}</span>
                <SeTable
                    dataSource={this.state.dataSource}
                    deviceName={this.props.deviceName}
                    fixedassetsCode={this.props.fixedassetsCode}
                    url={this.props.url}
                    pagination = {this.pagination}
                    handleTableChange={this.handleTableChange}
                />


                </span>
            </Modal>
                </span>
        )
    }
}

export default Detail
