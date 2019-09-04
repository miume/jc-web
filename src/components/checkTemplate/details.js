import React from 'react';
import {Modal,Radio,Divider} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../BlockQuote/cancleButton";

class Detail extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            data:[],
            effectDate:[],
            tabulateDate:[],
            peopleName:"",
            radioValue:"",
            deviceSpotcheckModelsDetails:[],
        }
    }

    fetch = (id) => {
        // console.log(id)
        axios({
            url:`${this.url.deviceSpot.checkDetail}`,
            method:"GET",
            params:{id:id},
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data) => {
            // console.log(data)
            const res = data.data.data;
            // console.log(res)
            if(res){
                this.setState({
                    data : res,
                    effectDate:res.deviceSpotcheckModelsHead.modelName,
                    tabulateDate:res.deviceSpotcheckModelsHead.tabulateDate,
                    peopleName:res.peopleName,
                    radioValue:res.deviceSpotcheckModelsHead.modelStatus,
                    deviceSpotcheckModelsDetails:res.deviceSpotcheckModelsDetails
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    /**处理一条详情记录 */
    handleDetail = () => {
        this.fetch(this.props.code)
        this.setState({
          visible: true
        });
    }
    handleCancel = () => {
        this.setState({
        visible: false
        });
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        // const {deviceSpotcheckModelsDetails,deviceSpotcheckModelsHead,peopleName} = this.state.data;
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.visible}
                    width="800px"
                    closable={false} centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                    ]}
                >
                    <div>
                        <span className="headers">所属部门：</span><span className="checkName">{this.props.deptName}</span>
                        <span className="headers">设备名称：</span><span className="checkName">{this.props.deviceName}</span>
                        <span className="headers">生效日期：</span><span className="checkName">{this.state.effectDate}</span>
                        <div>
                        <span className="headers">模板状态：</span><Radio.Group value={this.state.radioValue} disabled={true}>
                            <Radio value={false}>生效</Radio>
                            <Radio value={true}>失效</Radio>
                        </Radio.Group>
                        <span className="headersPerson">制表人：</span><span className="checkName">{this.state.peopleName?this.state.peopleName:"管理员"}</span>
                        <span className="headersDate">制表日期：</span><span className="checkName">{this.state.tabulateDate}</span>
                        </div>
                    </div>
                    <Divider />
                    {
                        this.state.deviceSpotcheckModelsDetails.map(e=>
                            <div key={e.code}>
                                <span className="DetailName">{e.spotcheckContent}</span>
                                <span className="DetailName">{e.spotcheckItems}</span>
                                <span className="DetailName">{e.spotcheckPeriod}</span>
                                <span className="DetailName">{e.spotcheckAddress}</span>
                            </div>
                        )
                    }
                </Modal>
            </span>
        )
    }
}

export default Detail