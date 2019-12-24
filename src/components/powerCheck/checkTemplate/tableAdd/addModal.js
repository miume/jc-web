import React from 'react';
import {DatePicker, Input, Modal, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import AddTable from "../tableAdd/addTable";
import NewButton from "../../../BlockQuote/newButton";
import moment from 'moment';
import axios from 'axios';
const {TextArea} = Input;

// const data = [{
//     index: 1,
//     code: 1,
//     siteCode: 1,
//     place: '地点一',
//     name: '设备名',
//     checkItem: '项目一',
//     checkContent: '点检内容',
//     checkValue: undefined
// },{
//     index: 2,
//     code: 2,
//     siteCode: 2,
//     place: '地点二',
//     name: '设备名二',
//     checkItem: '项目二',
//     checkContent: '点检内容二',
//     checkValue: undefined
// },{
//     index: 3,
//     code: 3,
//     place: '地点三',
//     checkItem: '设备名三',
//     item: '项目三',
//     checkContent: '点检内容三',
//     checkValue: undefined
// }];

class AddTableModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0,
            tableData: []
        };
        this.dateChange = this.dateChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveOrCommit = this.saveOrCommit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.getCheckRecordDetailData = this.getCheckRecordDetailData.bind(this);
    }

    render() {
        let {visible,tableData,siteName,modelName,effectiveDate,classNum,note,operator} = this.state, {title,disabled,status} = this.props;
        return (
            <span>
                {this.renderButton(title,status)}
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={800}
                       footer={this.renderFooter(title)}
                >
                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检站点：</div>
                            <Input style={{width: 150}} value={siteName} name={'siteName'} onChange={this.inputChange} disabled={disabled}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检名称：</div>
                            <Input style={{width: 150}} value={modelName} name={'modelName'} onChange={this.inputChange} disabled={disabled}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检日期：</div>
                            <DatePicker name={'effectiveDate'} value={effectiveDate ? moment(effectiveDate) : null}  placeholder={'请选择生效日期'} onChange={this.dateChange}
                                        showTime format="YYYY-MM-DD HH:mm:ss" style={{width: 200}} disabled={disabled}/>
                        </div>
                    </div>

                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>录检人：</div>
                            <Input name={'operator'} value={operator} placeholder={'请输入'} onChange={this.inputChange} disabled={disabled}
                                   style={{width: 150}}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>班次：</div>
                            <Input name={'classNum'} value={classNum} placeholder={'请输入'} onChange={this.inputChange} disabled={disabled}
                                   style={{width: 150}}/>
                        </div>
                        <div></div>
                    </div>

                    <AddTable dataSource={tableData} disabled={disabled} selectChange={this.selectChange}/>

                    <div style={{marginTop:10}}>
                        <TextArea rows={2} name={`note`} value={note} placeholder={'请输入备注'} onChange={this.inputChange} disabled={disabled}/>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title,status) {
        if(title === '新增') {
            return <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
        } else if(title === '保存') {
            return <SaveButton handleSave={this.handleClick}/>
        } else if(title === '编辑'){
            return <span className={status ? '' : 'blue'} onClick={status ? null : this.handleClick}>{title}</span>
        } else {
            return <span className={'blue'} onClick={this.handleClick}>{title}</span>
        }
    }

    renderFooter(title) {
        if(title === '详情') {
            return <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>
        }
        return (
            [
                <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                <SaveButton key={'save'} handleSave={this.handleSave}/>,
                <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleCommit}/>
            ]
        )
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {siteName,modelName,effectiveDate,code,operator,classNum,note} = record;
            this.setState({
                siteName,
                modelName,
                effectiveDate,
                operator,
                classNum,
                note,
                code
            });
            let url = operator ? this.props.url.checkRecord.detail : this.props.url.checkModel.detail;
            this.getDetailData(code,url);
        }
        this.setState({
            visible: true
        });
    }

    /**编辑-根据code查详情*/
    getDetailData(code,url) {
        axios({
            url: `${url}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                let {details} = res;
                for(let i = 0; i < details.length; i++) {
                    details[i]['index'] = i + 1;
                }
                this.setState({
                    tableData: details
                })
            }
        })
    }

    /**根据动力点检id查询详情*/
    getCheckRecordDetailData(code) {
        axios({
            url: `${this.props.url.checkRecord.detail}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                let {details} = res;
                for(let i = 0; i < details.length; i++) {
                    details[i]['index'] = i + 1;
                }
                this.setState({
                    tableData: details
                })
            }
        })
    }

    selectChange(value,option) {
        let index = option.props.name, {tableData} = this.state;
        tableData[index-1]['checkResult'] = value;
        this.setState({
            tableData
        })
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    /**监控点检日期的变化*/
    dateChange(date,dateString) {
        this.setState({
            effectiveDate: dateString
        })
    }

    /**点击保存*/
    handleSave() {
        this.saveOrCommit(0);
    }

    /**点击提交*/
    handleCommit() {
        this.saveOrCommit(1);
    }

    /**保存或提交事件*/
    saveOrCommit(flag) {
        let params = this.saveDataProcessing();
        if(params) {
            let {tableData,head} = params, {title} = this.props,
                url = title === '新增' ? this.props.url.checkRecord.add : this.props.url.checkRecord.update;
            axios({
                url: url,
                method: 'post',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: {
                    head,
                    flag,
                    details: tableData
                }
            }).then((data) => {
                message.info(data.data.message);
            })
        }
    }

    /**保存或提交事件处理-参数统一处理*/
    saveDataProcessing() {
        let {siteName,modelName,effectiveDate,operator,classNum,tableData,code} = this.state,
            head = {
                code,
                siteName,
                modelName,
                effectiveDate,
                operator,
                classNum
            };
        if(!siteName || !modelName || !effectiveDate || !operator || !classNum) {
            message.info('请将表格上面的数据填写完整！');
            return;
        }
        return {head,tableData}
    }


    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddTableModal;
