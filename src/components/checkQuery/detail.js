import React from 'react'
import CancleButton from "../BlockQuote/cancleButton";
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
    }

    clickDetail=()=>{
        this.setState({
            visible:true
        })
        console.log(this.props.code)
        this.fetch({
            id:this.props.code
        },0)
    }
    onCanCel=()=>{
        this.setState({
            visible:false
        })
    }
    fetch = (params,flag) => {
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
            // var {pagination} = this.state;
            // pagination.current = 1;
            // pagination.total = 0;
            // this.setState({
            //     pageChangeFlag:0,
            //     searchContent:'',
            //     pagination:pagination
            // })
        }
        axios({
            url: `${this.props.url.checkQuery.deviceDetailPage}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            console.log(res)

            if (res && res.list) {
                var detailData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].deviceSpotcheckRecordHead;
                    console.log('11111')
                    detailData.push({
                        index: i + 1,
                        code: arr['code'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        scanTime:arr['scanTime'],
                        spotcheckPeople:arr['spotcheckPeople'],
                        confirmTime:arr['confirmTime'],
                        confirmPeople:arr['confirmPeople'],
                        editFlag:arr['editFlag'],
                        specification: arr['specification'],
                        startdate: arr['startdate'],
                        idCode: arr['idCode'],
                    })
                }
                console.log('2222222')
                this.setState({
                    dataSource: detailData,
                    deviceName: params.deviceName
                });
                console.log('kkkkkkkkkkkk')
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
                />


                </span>
            </Modal>
                </span>
        )
    }
}

export default Detail