import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {DatePicker, Input, Modal, Select, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import moment from "moment";
import AddTable from "./addTable";
import axios from 'axios';
import SelectModal from "./selectModal";
const {Option} = Select;

// const data = [{
//     index: 1,
//     code: 1,
//     checkContent: '外壳是否完整',
//     dataType: 0,
//     frequency: '1次/天'
// },{
//     index: 2,
//     code: 2,
//     checkContent: '正常',
//     dataType: 1,
//     frequency: '1次/天'
// },{
//     index: 3,
//     code: 3,
//     checkContent: '未开机',
//     type: 1,
//     frequency: '1次/天'
// }];

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0,
            tableData: [],
            siteData: [],
            disabledCode: [],  //记录表格数据code
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
        this.getDetailData = this.getDetailData.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,tableData,modelName,frequency,siteCode,batchNumber,effectiveDate,siteData,disabledCode} = this.state, {title,flag} = this.props, disabled = title === '编辑' ? true : false;
        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={850}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>模版名称：</div>
                            <Input name={'modelName'} value={modelName} placeholder={'请输入模版名称'} onChange={this.inputChange}
                                   style={{width: 150}} disabled={disabled}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检站点：</div>
                            <Select name={'siteCode'} value={siteCode} disabled={disabled} onChange={this.selectChange} style={{width: 200}} placeholder={'请选择点检站点'}>
                                {
                                    siteData ? siteData.map(e => <Option key={e.code} value={e.code}>{e.siteName}</Option>) : null
                                }
                            </Select>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>编号：</div>
                            <Input name={'batchNumber'} value={batchNumber} placeholder={'请输入编号'} onChange={this.inputChange}
                                   style={{width: 150}}/>
                        </div>
                    </div>

                    <div className='check-template-add'>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>点检频率：</div>
                            <Input name={'frequency'} value={frequency} placeholder={'请输入点检频率'} onChange={this.inputChange}
                                   style={{width: 150}}/>
                        </div>
                        <div className='check-template-add'>
                            <div className='check-template-add-div'>生效日期：</div>
                            <DatePicker name={'effectiveDate'} value={effectiveDate ? moment(effectiveDate) : null} placeholder={'请选择生效日期'} onChange={this.dateChange}
                                        showTime format="YYYY-MM-DD HH:mm:ss" style={{width: 200}}/>
                        </div>
                        <div></div>
                    </div>

                    <SelectModal title={'新增'} siteCode={siteCode} addItem={this.addItem} url={this.props.url} disabledCode={disabledCode}/>
                    <AddTable dataSource={tableData} siteCode={siteCode} addItem={this.addItem} handleDelete={this.deleteItem} url={this.props.url} disabledCode={disabledCode}/>
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
            let {siteCode,modelName,frequency,batchNumber,effectiveDate,code} = record;
            this.setState({
                siteCode,
                modelName,
                batchNumber,
                effectiveDate,
                frequency,
                code
            });
            this.getDetailData(code);
        }
        this.getAllCheckSite();
        this.setState({
            visible: true
        });
    }

    /**编辑-根据code查详情*/
    getDetailData(code) {
        axios({
            url: `${this.props.url.checkModel.detail}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                let {details} = res, disabledCode = [];
                for(let i = 0; i < details.length; i++) {
                    details[i]['index'] = i + 1;
                    disabledCode.push(details[ i]['itemCode']);
                }
                this.setState({
                    tableData: details,
                    disabledCode
                })
            }
        })
    }

    /**获取所有点检站点*/
    getAllCheckSite() {
        axios({
            url: `${this.props.url.checkSite.all}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    siteData: res
                })
            }
        })
    }

    /**监控生效日期的变化*/
    dateChange(date,dateString) {
        this.setState({
            effectiveDate: dateString
        })
    }

    selectChange(value) {
        this.setState({
            siteCode: value,
            tableData: [],
            disabledCode: []
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
    addItem(record) {
        let {tableData} = this.state, disabledCode = [];
        tableData.push(...record);
        for(let i = 0; i < tableData.length; i++) {
            tableData[i]['index'] = i + 1;
            disabledCode.push(tableData[i]['itemCode']);
        }
        this.setState({
            tableData,
            disabledCode
        })
    }

    /**表格删除一条数据*/
    deleteItem(index) {
        let {tableData,disabledCode} = this.state;
        disabledCode.pop(tableData[index-1]['code']);
        tableData.splice(index-1,1);
        for(let i = 0; i < tableData.length; i++) {
            tableData[i]['index'] = i + 1;
        }
        this.setState({
            tableData,
            disabledCode
        })
    }

    handleSave() {
        let params = this.saveDataProcessing();
        if(params) {
            let {model,tableData} = params ,{title} = this.props,
                url = title === '新增' ? this.props.url.checkModel.add : this.props.url.checkModel.update;
            axios({
                url: url,
                method: 'post',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: {
                    model,
                    details: tableData
                }
            }).then((data) => {
                message.info(data.data.message);
                this.handleCancel();
                this.props.getTableParams();
            })
        }
    }

    saveDataProcessing() {
        let {siteCode,modelName,batchNumber,effectiveDate,frequency,tableData,code} = this.state,
            model = {
                code,
                siteCode,
                modelName,
                batchNumber,
                effectiveDate,
                frequency
            };
        if(!siteCode || !modelName || !batchNumber || !effectiveDate || !frequency) {
            message.info('请将表格上面数据填写完整！');
            return
        }
        if(!tableData.length) {
            message.info('请确保表格至少有一条数据！');
            return
        }
        return {model,tableData}
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
