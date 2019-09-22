import React from 'react'
import CancleButton from "../BlockQuote/cancleButton";
import {message, Modal} from "antd";
import ThirdTable from "./thirdTable"
import FhTable from "./fhTable"
import axios from "axios";
class SeDetail extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            dataSource:[],
            detaildataSource:[],
            spotcheckComment:''
        }
        this.fetch=this.fetch.bind(this)
    }

    clickDetail=()=>{
        this.setState({
            visible:true
        })
        this.fetch({
            id:this.props.record.code
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
            url: `${this.props.url.checkQuery.deviceDetail}/${params.id}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            console.log(res)

            if (res) {
                console.log('11111')
                var detailData1 = [];
                var arr1 = res.deviceSpotcheckRecordHead
                if(arr1['editFlag']===0)
                {
                    arr1['editFlag']='待确认'
                }else
                {
                    arr1['editFlag']='已确认'
                }
                detailData1.push({
                    code: arr1['code'],
                    fixedassetsCode: arr1['fixedassetsCode'],
                    deviceName: arr1['deviceName'],
                    scanTime:arr1['scanTime'],
                    spotcheckPeople:res.spotPeople,
                    confirmTime:arr1['confirmTime'],
                    confirmPeople:res.confirmPeople,
                    editFlag:arr1['editFlag'],
                    specification: arr1['specification'],
                    startdate: arr1['startdate'],
                    idCode: arr1['idCode'],
                    statusCode: arr1['statusCode'],
                })
                var detailData2 = [];
                for (var i = 0; i < res.deviceSpotcheckRecordDetailsList.length; i++) {
                   ;
                    var arr2 = res.deviceSpotcheckRecordDetailsList[i];
                    if(arr2['mainValues'] === 0)
                    {
                        arr2['mainValues']='合格'
                    }else{
                        arr2['mainValues']='不合格'
                    }
                    detailData2.push({
                        index:i+1,
                        spotcheckItems:arr2['spotcheckItems'],
                        spotcheckContent:arr2['spotcheckContent'],
                        mainContent:arr2['mainContent'],
                        mainValues:arr2['mainValues']
                    })

                }



                this.setState({
                    dataSource: detailData1,
                    detaildataSource:detailData2,
                    spotcheckComment:res.deviceSpotcheckRecordHead?res.deviceSpotcheckRecordHead.spotcheckComment:''
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    dataSource: [],
                    detaildataSource:[],
                    spotcheckComment:''
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
                title="点检详情"
                footer={[
                    <CancleButton key='cancel' handleCancel={this.onCanCel} />]}
            >
                <span>

                    <span>设备编号:{this.props.fixedassetsCode}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>设备名称:{this.props.deviceName}</span>
                {/*<ThirdTable*/}
                {/*    // dataSource={this.state.dataSource}*/}
                {/*    // dataSource={fakedataSource}*/}
                {/*/>*/}
                </span>
                <span>
                    <FhTable  dataSource={this.state.dataSource} />
                </span>
                <div>&nbsp;</div>
                <span><ThirdTable dataSource={this.state.detaildataSource}/></span>
                <span>{`备注：${this.state.spotcheckComment}`}</span>
            </Modal>
                </span>
        )
    }
}

export default SeDetail