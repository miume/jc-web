import React from 'react';
import axios from 'axios';
import {DatePicker, Input, message, Modal, Select, Table, Tabs} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";

const { TabPane } = Tabs;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Check extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            dateString:"",
            startDate:"",
            endDate:"",
            tabKey:'1',
            dateFormat: 'YYYY-MM-DD'
        };

    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    render() {
        const {startDate, endDate, dateFormat} = this.state;
        const value = startDate === '' || endDate === '' ? null : [moment(startDate,dateFormat), moment(endDate,dateFormat)];
        return (
            <span>
                <NewButton name='新增统计' className='fa fa-plus' handleClick={this.handleClick}/>
                <Modal
                    title="新增统计"
                    visible={this.state.visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="400px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.cancel}/>,
                        <SaveButton key="define" handleSave={this.save} className='fa fa-check' />,
                    ]}
                >
                    <div className="repoQueryInOutAccount_check_month">
                        <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                            <TabPane tab='统计月份' key='1'>
                                <MonthPicker onChange={this.selectChange} value={this.state.dateString ? moment(this.state.dateString) : null} placeholder="请选择统计月份" />
                            </TabPane>
                            <TabPane tab='统计年份' key='2'>
                                <Input placeholder="请输入统计年份" value={this.state.dateString} onChange={this.selectYearChange}/>
                            </TabPane>
                            <TabPane tab='统计区间' key='3'>
                                <RangePicker onChange={this.selectChange} value={value} placeholder={['开始时间','结束时间']} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Modal>
            </span>
        )
    }
    tabChange = (key) => {
        this.setState({
            dateString: "",
            startDate: "",
            endDate: "",
            tabKey:key,
        });

    }
    selectYearChange = (e) => {
        this.setState({
            dateString: e.target.value
        })
    }
    selectChange = (date, dateString) => {
        if (this.state.tabKey === "3") {
            this.setState({
                startDate:dateString[0],
                endDate: dateString[1]
            });
        }else{
            this.setState({
                dateString:dateString
            });
        }
    }
    save = () => {
        if (this.state.tabKey === "3") {
            console.log(this.state.startDate)
            console.log(this.state.endDate)
        }else{
            console.log(this.state.dateString)
        }
        // axios({
        //     url: this.props.url.repoQueryInOutDaily.updateByIds,
        //     method: 'post',
        //     headers: {
        //         'Authorization': this.props.url.Authorization
        //     },
        //     params: {
        //         status: this.state.checkStatus,
        //     },
        //     data:this.props.flag===0?this.props.selectedRowKeys:[this.props.record.code],
        // }).then(data => {
        //     this.props.getTableParams(undefined)
        //     message.info(data.data.mesg)
        //     this.setState({
        //         visible:false
        //     })
        // });
    }
    cancel = () => {
        this.setState({
            visible:false
        })
    }
    /**通过id查询备注信息 */
    handleClick = () => {
        this.setState({
            visible:true
        })
    }


}

export default Check;
