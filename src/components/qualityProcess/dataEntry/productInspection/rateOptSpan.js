import React from 'react';
import axios from "axios";
import {message, Modal,Select,DatePicker} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import './productInspection.css';

class RateOptSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            savaData: {
                batchNumberId:'',
                qualityLevel:'',
                rateDate:'',
                ratePersonId:''
            }
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }

    render() {
        const { visible } = this.state;
        const Option = Select.Option;
        return (
            <span>
                <span  className="blue" onClick={this.handleRateOpt}>择优</span>
                <Modal
                    title="成品择优"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="320px"
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <SaveButton
                            handleSave={this.handleSave}
                            key='save'
                        />
                    ]}
                >
                    <div className="rateOptModal">
                        <div className="rateOptSelect">
                            <Select style={{ width: 275 }} onChange={this.handleChange}>
                                <Option value={2}>优等品</Option>
                                <Option value={1}>普通品</Option>
                                <Option value={0}>不合格品</Option>
                            </Select>
                        </div>
                        <div className="rateOptDate">
                            <DatePicker
                                showTime={{ format: 'HH:mm:ss' }}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="请选择时间"
                                onChange={this.dateChange}
                            />
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }


    dateChange = (value, dateString) => {
        var savaData = this.state.savaData;
        savaData.rateDate = dateString;
        this.setState({
            savaData:savaData
        })
    }

    handleChange = (value) => {
        var savaData = this.state.savaData;
        savaData.qualityLevel = value;
        this.setState({
            savaData:savaData
        })
    };


    handleRateOpt = () => {
        axios({
            url:`${this.props.url.productInspection.productRecord}/${this.props.batchNumberId}`,
            method : 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){

                this.setState({
                    savaData:{
                        batchNumberId: res.testReportRecord.batchNumberId,
                        qualityLevel: res.testReportRecord.qualityLevel,
                        rateDate: res.testReportRecord.rateDate,
                        ratePersonId: res.testReportRecord.ratePersonId,
                    },
                    visible: true,
                });
            }else{
                message.info('查询失败，请联系管理员')
            }
        }).catch(()=>{
            message.info('查询失败，请联系管理员')
        })

    };
    handleSave = () => {
        var savaData = this.state.savaData;
        savaData.ratePersonId = this.props.menuList.userId;
        axios({
            url : `${this.props.url.productInspection.rate}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: savaData,
            type:'json'
        }).then((data)=>{
            this.setState({
                visible: false,
            });
            message.info(data.data.message);
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

}

export default RateOptSpan;
