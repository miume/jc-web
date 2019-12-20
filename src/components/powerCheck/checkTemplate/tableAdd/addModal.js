import React from 'react';
import {DatePicker, Input, Modal} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import AddTable from "../tableAdd/addTable";
import NewButton from "../../../BlockQuote/newButton";
import moment from 'moment';
const {TextArea} = Input;

const data = [{
    index: 1,
    code: 1,
    siteCode: 1,
    place: '地点一',
    name: '设备名',
    checkItem: '项目一',
    checkContent: '点检内容',
    checkValue: undefined
},{
    index: 2,
    code: 2,
    siteCode: 2,
    place: '地点二',
    name: '设备名二',
    checkItem: '项目二',
    checkContent: '点检内容二',
    checkValue: undefined
},{
    index: 3,
    code: 3,
    place: '地点三',
    checkItem: '设备名三',
    item: '项目三',
    checkContent: '点检内容三',
    checkValue: undefined
}];

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
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,tableData,siteName,modelName,effectiveDate,shift,memo,operator} = this.state, {title,disabled} = this.props;
        return (
            <span>
                {this.renderButton(title)}
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
                            <Input name={'shift'} value={shift} placeholder={'请输入'} onChange={this.inputChange} disabled={disabled}
                                   style={{width: 150}}/>
                        </div>
                        <div></div>
                    </div>

                    <AddTable dataSource={tableData} selectChange={this.selectChange}/>

                    <div style={{marginTop:10}}>
                        <TextArea rows={2} name={`memo`} value={memo} placeholder={'请输入备注'} onChange={this.inputChange} disabled={disabled}/>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        if(title === '新增') {
            return <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
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
            let {siteName,modelName,effectiveDate,checkContent,operator,code} = record;
            this.setState({
                siteName,
                modelName,
                effectiveDate,
                checkContent,
                operator,
                code,
                shift: record['class'] ? record['class'] : ''
            })
        }
        this.setState({
            visible: true,
            tableData: data
        });
    }

    selectChange(value,option) {
        let index = option.props.name, {tableData} = this.state;
        tableData[index-1]['result'] = value;
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
            date: dateString
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
        // axios({
        //     url: `url`,
        //     method: 'put',
        //     headers: {
        //         'Authorization': this.props.url.Authorization
        //     }
        // }).then((data) => {
        //     message.info(data.data.message);
        // })
    }

    /**保存或提交事件处理-参数统一处理*/
    saveDataProcessing(flag) {
        console.log(this.state)
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
