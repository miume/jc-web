import React from 'react';
import axios from 'axios';
import {DatePicker, Input, message, Modal, Select, Table, Tabs} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";
import './repoQueryInOutAccount.css'

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
            dateFormat: 'YYYY-MM-DD',
            isopen: false,
            yearString: null,

            monthYearDate:"",
            startDay:"",
            endDay:""
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
                        <span className="repoQueryInOutAccount_check_month_span1">年-月:</span>
                        <MonthPicker onChange={this.monthYearSelectChange} value={this.state.monthYearDate ? moment(this.state.monthYearDate) : null} placeholder="请选择统计年月" />
                        <span className="repoQueryInOutAccount_check_month_span2">开始日～结束日: (手输，例如 1~30)</span>
                        <div className="repoQueryInOutAccount_check_month_bottom">
                            <Input className="repoQueryInOutAccount_check_month_input" value={this.state.startDay}  onChange={this.startDay} placeholder="请选择开始日"/>
                            <Input className="repoQueryInOutAccount_check_month_input" value={this.state.endDay}  onChange={this.endDay} placeholder="请选择结束日"/>
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }

    startDay = (e) => {
        console.log(e.target.value)
        const day = e.target.value
        var reg = /^[0-9]*$/
        if (!reg.test(day) ||parseInt(day) < 0 || parseInt(day) > 32) {
            message.info("请输入正确的开始日期")
            return
        }
        this.setState({
            startDay:e.target.value
        });
    }
    endDay = (e) => {
        console.log(e.target.value)
        const day = e.target.value
        var reg = /^[0-9]*$/
        if (!reg.test(day) ||parseInt(day) < 0 || parseInt(day) > 32) {
            message.info("请输入正确的结束日期")
            return
        }
        this.setState({
            endDay:e.target.value
        })
    }

    monthYearSelectChange = (date, dateString) => {
        this.setState({
            monthYearDate:dateString
        });
    }
    save = () => {
        const monthYearDate = this.state.monthYearDate;
        const startDay = this.state.startDay;
        const endDay = this.state.endDay;
        var startTime = "";
        var endTime = "";
        if (startDay < 10) {
            startTime = monthYearDate + "-0" + startDay;
        } else {
            startTime = monthYearDate + "-" + startDay;
        }
        if (endDay < 10) {
            endTime = monthYearDate + "-0" + endDay;
        } else {
            endTime = monthYearDate + "-" + endDay;
        }
        if (monthYearDate === "" || startDay === "" || endDay === "") {
            message.info("请输入年月日")
            return
        }

        axios({
            url: this.props.url.repoQueryInOutAccount.addStatistic,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                year: parseInt(monthYearDate.split("-")[0]),
                month: parseInt(monthYearDate.split("-")[1]),
                startTime: startTime,
                endTime: endTime,
            }
        }).then(data => {
            this.props.getTableParams('')
            message.info(data.data.mesg)
            this.setState({
                visible:false,
                monthYearDate:"",
                startDay:"",
                endDay:""
            })
        });
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
