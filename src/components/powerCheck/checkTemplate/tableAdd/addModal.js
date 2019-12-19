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
    place: '地点一',
    name: '设备名',
    item: '项目一',
    content: '点检内容',
    result: undefined
},{
    index: 2,
    code: 2,
    place: '地点二',
    name: '设备名二',
    item: '项目二',
    content: '点检内容二',
    result: undefined
},{
    index: 3,
    code: 3,
    place: '地点三',
    name: '设备名三',
    item: '项目三',
    content: '点检内容三',
    result: undefined
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
        this.saveOrCommit = this.saveOrCommit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,tableData} = this.state, {record} = this.props;
        return (
            <span>
                <span className={'blue'} onClick={this.handleClick}>新增点检</span>
                <Modal title={'点检详情'} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={800}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>,
                           <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleCommit}/>
                       ]}
                >
                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检站点：</div>
                            <Input style={{width: 150}} value={record ? record['place'] : ''} disabled={true}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检名称：</div>
                            <Input style={{width: 150}} value={record ? record['name'] : ''} disabled={true}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检日期：</div>
                            <DatePicker name={'effectiveDate'}  placeholder={'请选择生效日期'} onChange={this.dateChange}
                                        showTime format="YYYY-MM-DD HH:mm:ss" style={{width: 200}}/>
                        </div>
                    </div>

                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>录检人：</div>
                            <Input name={'processNum'} placeholder={'请输入'} onChange={this.headChange}
                                   style={{width: 150}}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>班次：</div>
                            <Input name={'processNum'} placeholder={'请输入'} onChange={this.headChange}
                                   style={{width: 150}}/>
                        </div>
                        <div></div>
                    </div>

                    <AddTable dataSource={tableData} selectChange={this.selectChange}/>

                    <div style={{marginTop:10}}>
                        <TextArea rows={2} name={`memo`} placeholder={'请输入备注'} onChange={this.inputChange}/>
                    </div>
                </Modal>
            </span>
        );
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {name,place,item,content,type,frequency,code} = record;
            this.setState({
                name,
                place,
                item,
                content,
                type,
                frequency,
                code
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
