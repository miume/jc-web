import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {DatePicker, Input, Modal, Select} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import moment from "../../../technologyCenter/processParameters/add/addModal";
import AddTable from "./addTable";
const {Option} = Select;

const data = [{
    index: 1,
    code: 1,
    content: '外壳是否完整',
    type: 0,
    frequency: '1次/天'
},{
    index: 2,
    code: 2,
    content: '正常',
    type: 0,
    frequency: '1次/天'
},{
    index: 3,
    code: 3,
    content: '未开机',
    type: 1,
    frequency: '1次/天'
}];

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0,
            tableData: []
        };
        this.addItem = this.addItem.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,tableData} = this.state, {title,disabled} = this.props;
        return (
            <span>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={800}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>模版名称：</div>
                            <Input name={'processNum'} placeholder={'请输入模版名称'} onChange={this.headChange}
                                   style={{width: 150}}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检站点：</div>
                            <Select name={'processCode'} disabled={disabled} onChange={this.processChange} style={{width: 150}} placeholder={'请选择点检站点'}>
                                <Option value={1}>点检站点</Option>
                            </Select>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>编号：</div>
                            <Input name={'processNum'} placeholder={'请输入编号'} onChange={this.headChange}
                                   style={{width: 150}}/>
                        </div>
                    </div>

                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检频率：</div>
                            <Input name={'processNum'} placeholder={'请输入点检频率'} onChange={this.headChange}
                                   style={{width: 150}}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>生效日期：</div>
                            <DatePicker name={'effectiveDate'} placeholder={'请选择生效日期'} onChange={this.dateChange}
                                        showTime format="YYYY-MM-DD HH:mm:ss" style={{width: 200}}/>
                        </div>
                        <div></div>
                    </div>

                    <AddTable dataSource={tableData} data={data} addItem={this.addItem} handleDelete={this.deleteItem}/>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
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
            visible: true
        });
    }

    /**监控生效日期的变化*/
    dateChange(date,dateString) {
        this.setState({
            date: dateString
        })
    }

    selectChange(value) {
        this.setState({
            type: value
        })
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    /**表格新增一条数据
     * type存在表示 新增数据
     * type不存在 表示 更新数据
     * */
    addItem(record,type) {
        let {tableData} = this.state;
        if(type) {
            record['index'] = tableData.length + 1;
            tableData.push(record);
            this.setState({
                tableData
            })
        }
    }

    /**表格删除一条数据*/
    deleteItem(index) {
        let {tableData} = this.state;
        tableData.splice(index-1,1);
        this.setState({
            tableData
        })
    }

    handleSave() {
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

    saveDataProcessing() {
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

export default AddModal;
