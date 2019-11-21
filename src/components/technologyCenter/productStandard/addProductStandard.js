import React from 'react';
import axios from 'axios';
import moment from 'moment';
import HeadTable from './headTable';
import Submit from '../../BlockQuote/submit';
import NewButton from '../../BlockQuote/newButton';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';
import {Modal, Table, DatePicker, message, Checkbox, Col} from 'antd';
import Standard from "../../BlockQuote/standard";

class AddProductStandard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',          //监控新增标准 的生效日期
            visible: false,    //控制新增弹出框
            visible1: false,   //控制送审弹出框
            process: -1,       //监听送审流程
            urgent: 0,         //监听送审的状态 0紧急还是1正常
            allTestItem: [],   //保存所有受检项目
            batchNumber: '',   //用来存取详情、编辑时的batchNumber
            time: {},           //用来存储详情、编辑时的生效时间和创建时间
            selItemsFlag: true,
            label: [],
            option: [],
            selectTestItems: [],
            testItems: [],
            batchNumberId:-1,
            iteFlag:true,
            checkAll: true
        }
        this.standardChange = this.standardChange.bind(this);
        this.judge = this.judge.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.submitClick = this.submitClick.bind(this);
        this.addDataProcessing = this.addDataProcessing.bind(this);
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.getDataByBatchNumberId = this.getDataByBatchNumberId.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.range = this.range.bind(this);
        this.renderClassName = this.renderClassName.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '20%'
        }, {
            title: '检测项目',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        }, {
            title: '检测标准',
            dataIndex: 'count',
            key: 'count',
            width: '30%',
            render: (text, record) => {
                let {flag} = this.state;
                if (flag === 1) {
                    return text;
                } else
                    return <Standard record={record} standardChange={this.standardChange} defaultValue={flag ? record.count : '请选择检测标准'}/>
            },
            className: this.renderClassName()
        }, {
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
            width: '30%'
        }]
    }

    renderClassName() {
        return this.props.flag === 1 ? '' : 'productStandardTd'
    }

    /**判断是新增 编辑 还是详情 */
    judge(flag, title) {
        switch (flag) {
            case 1 :
                return title ? '详情' : <span className='blue' onClick={this.handleAdd}>详情</span>;
            case 2 :
                return title ? '编辑' :
                    <span className={this.props.editorFlag ? (this.props.status === -1 ? 'blue' : 'notClick') : 'hide'}
                          onClick={this.props.status === -1 ? this.handleAdd : null}>编辑</span>;
            default:
                return title ? '新增标准' : <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>;
        }
    }

    /**点击新增标准 弹出新增标准弹出框 */
    handleAdd() {
        let {flag,batchNumberId,option} = this.props;
        if (flag) this.getDataByBatchNumberId(batchNumberId);
        this.setState({
            visible: true,
            flag: flag,
            batchNumberId:batchNumberId,
            selectTestItems: option,
            selectAllItems: option
        })
    }

    /**详情或者编辑 通过batchNumberId查询数据 */
    getDataByBatchNumberId(id) {
        axios({
            method: 'get',
            url: this.props.url.product.detailByCommonBatchId,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                commonBatchId: id,
            }
        }).then((data) => {
            var res = data.data.data
            if (res) {
                this.detailDataProcessing(res);
            }
        }).catch(() => {
            message.info('保存失败，请联系管理员！')
        })
    }

    /**对详情、编辑数据进行处理 */
    detailDataProcessing(res) {
        var batchNumber = res.commonBatchNumber.batchNumber;
        var time = {
            createTime: res.commonBatchNumber.createTime,
            effectiveTime: res.techniqueProductNewStandardRecord.effectiveTime
        }
        for (var i = 0; i < res.items.length; i++) {
            res.items[i]['index'] = i+1;
        }
        this.setState({
            batchNumber: batchNumber,
            date:time.effectiveTime,
            testItems: res.items,
            time: time,
        })
    }

    /**点击详情-迭代 */
    handleIteration() {
        /**将详情置为编辑 */
        this.setState({
            flag: 2,
            iteFlag:false
        })
    }

    /**点击保存按钮 */
    handleSave() {
        this.addDataProcessing(0);
    }

    /**点击取消按钮 */
    handleCancel() {
        this.setState({
            visible: false,
            visible1: false,
            iteFlag:true
        });
    }

    /**点击送审按钮 弹出送审界面 */
    submitClick() {
        this.setState({
            visible1: true
        })
    }

    /**点击取消送审 */
    handleCancelApply() {
        this.setState({
            visible1: false
        })
    }

    /**点击确定送审 */
    handleOkApply() {
        this.addDataProcessing(1);
    }

    /**监听送审界面 送审流程的变化 */
    selectChange(value) {
        this.setState({
            process: value
        })
    }

    /**监听送审界面switch 正常 紧急与否 */
    urgentChange(value) {
        this.setState({
            urgent: value ? 1 : 0
        })
    }

    /**监听table数据的变化 */
    /**input框内容变化，实现自动保存数据 */
    // save(e) {
    //     const value = e.target.value;
    //     const id = e.target.id;
    //     const newData = [...this.state.testItems];
    //     const index = newData.findIndex(item => parseInt(id) === parseInt(item.id));
    //     newData[index]['count'] = value;
    //     this.setState({
    //         testItems: newData
    //     })
    // }

    /**给每项设置标准 自动保存数据*/
    standardChange(index,value) {
        let {testItems} = this.state;
        testItems[index-1]['count'] = value;
        this.setState({
            testItems: testItems
        })
    }

    /**监控新增标准 生效时间的选取 */
    dateChange(date, dateString) {
        this.setState({
            date: dateString
        })
    }

    /**对保存或送审的数据进行处理 */
    addDataProcessing(status) {
        const {date} = this.state;
        if (date === '') {
            message.info('生效日期不能为空！');
            return
        }
        var items = [];
        const data = this.state.testItems;
        for (var i = 0; i < data.length; i++) {
            items.push({
                id: data[i].id,
                count: data[i].count ? data[i].count : '无'
            })
        }
        const params = {
            createUser: JSON.parse(localStorage.getItem('menuList')).userId,
            productId: parseInt(this.props.data[0][0]),
            classId: parseInt(this.props.data[1][0]),
            items: items,
            effTime:date
        }
        this.handleCancel();
        this.applyOut(status, params);
    }

    /**保存  新增请求方法是post 编辑请求方法是put */
    applyOut(status, params) {
        axios({
            type: 'json',
            method: this.state.flag&&this.state.iteFlag ? 'put' : 'post',
            url: this.state.flag&&this.state.iteFlag?this.props.url.product.updateByCommonBatchId:this.props.url.product.addStandard,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: this.state.flag&&this.state.iteFlag?{
                commonBatchId: this.state.batchNumberId,
                effTime:params.effTime
            }:{
                createUser: params.createUser,
                productId:params.productId,
                classId:params.classId,
                effTime:params.effTime
            },
            data:params.items,
        }).then((data) => {
            if (status === 1 && data.data.code === 0) {
                const dataId = data.data.data ? data.data.data : null;
                this.applyReview(dataId, params.classId, params.productId);
            } else {
                message.info(data.data.message);
                this.props.getAllProductStandard({
                    classId: params.classId,
                    productId: params.productId
                })
                this.setState({
                    iteFlag:true
                })
            }
        }).catch(() => {
            message.info('保存失败，请联系管理员！')
        })
    }

    /**送审 */
    applyReview(dataId, classId, productId) {
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`, {}, {
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                dataId: dataId,
                isUrgent: this.state.urgent
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.getAllProductStandard({
                classId: classId,
                productId: productId
            })
            this.handleCancel();
        }).catch(() => {
            message.info('审核失败，请联系管理员！')
        })
    }

    /**对编辑、详情的生效时间进行处理 只准选择当前时间之后的日期 */
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate(current) {
        return current < moment().startOf('day');
    }

    checkboxChange = (value) => {
        // 获取复选框ID
        this.setState({
            selectTestItems: value
        })
    }

    selectTestItem = () => {
        let selectTestItems = this.state.selectTestItems;
        if(selectTestItems.length === 0){
            const allTestItem = this.props.allTestItem;
            for(var j=0;j<allTestItem.length;j++){
                selectTestItems.push(allTestItem[j]['form'])
            }
        }
        var testItems = [];
        for (var i = 0; i < selectTestItems.length; i++) {
            const form = selectTestItems[i].split('-');
            testItems.push({
                id: parseInt(form[0]),
                name: form[1],
                unit: form[2],
                value: form[3],
                index: i + 1
            })
        }
        this.setState({
            selItemsFlag: false,
            testItems: testItems
        })
    };

    onCheckAllChange(e) {
        let target = e.target;
        this.setState({
            checkAll: target.checked,
            selectTestItems: target.checked ? this.state.selectAllItems : []
        })
    }

    render() {
        const status = this.props.status;
        /**详情  只有status===2 审核通过的数据可以迭代 */
        const detail = status === 2 ? [
                <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                <NewButton key='submit' handleClick={this.handleIteration} name={'迭代'} className='fa fa-level-up'/>
            ] :
            [
                <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
            ];
        /**详情对应迭代后的按钮组合以及编辑、新增 */
        const iteration = [
            <CancleButton key='back' handleCancel={this.handleCancel}/>,
            <SaveButton key='save' handleSave={this.handleSave}/>,
            <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange}
                    selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url}
                    process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}
                    submitClick={this.submitClick}/>
        ]
        const format = "YYYY-MM-DD";
        const effectiveTime = this.state.time.effectiveTime;
        const flag = this.props.flag;
        const data = [this.props.data[0][1], this.props.data[1][1]];
        return (
            <span>
                {this.judge(flag)}
                <Modal title={this.judge(flag, 1)} visible={this.state.visible} closable={false} centered={true}
                       maskClosable={false}
                       footer={this.state.flag === 1 ? detail : iteration}>
                <div>
                    {
                        this.props.selItemsFlag && this.state.selItemsFlag ?
                            <div>
                                <Modal
                                    title="选择检测项目" visible={this.state.visible} closable={false} centered={true}
                                    maskClosable={false}
                                    footer={
                                        [
                                            <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                                            <NewButton key='submit' handleClick={this.selectTestItem} name={'选择'}
                                                       className='fa fa-level-up'/>
                                        ]
                                    }
                                >
                                    <div>
                                        <Checkbox
                                            onChange={this.onCheckAllChange}
                                            checked={this.state.checkAll}
                                        >
                                            全选
                                        </Checkbox>

                                    <br />
                                    <Checkbox.Group style={{width: "100%"}} value = {this.state.selectTestItems}
                                                    onChange={this.checkboxChange}>
                                        {
                                            this.props.allTestItem?this.props.allTestItem.map(p =>
                                                <Col key={p.id} span={8}>
                                                    <Checkbox
                                                        value={p.form}
                                                    >{p.name}</Checkbox>
                                                </Col>):null
                                        }
                                    </Checkbox.Group>
                            </div>
                                </Modal>
                            </div> :
                            <div>
                                <HeadTable flag={this.props.flag} data={data} batchNumber={this.state.batchNumber}/>
                                <div className='modal-add-table'>
                                    <Table className={this.props.flag === 1 ? '' : 'stock-out'}
                                           rowKey={record => record.id}
                                           columns={this.columns} dataSource={this.state.testItems}
                                           pagination={false} size='small' bordered
                                           scroll={{y: this.props.flag === 1 ? 228 : 251}}>
                                    </Table>
                                </div>
                                <div style={{height: 10}}></div>
                                <div style={{height: 70}}>
                                    {
                                        this.state.flag === 1 ?
                                            <div className='modal-detail-p'>
                                                <p>{`生效时间：${this.state.time.effectiveTime ? this.state.time.effectiveTime : ''}`}</p>
                                                <p>{`编制日期：${this.state.time.createTime ? this.state.time.createTime : ''}`}</p>
                                            </div> :
                                            <div>
                                                {
                                                    this.props.flag ?
                                                        typeof(effectiveTime) != 'undefined' ?
                                                            <DatePicker placeholder='请选择生效日期' onChange={this.dateChange}
                                                                        size='large' className='modal-add-date'
                                                                        disabledDate={this.disabledDate}
                                                                        defaultValue={moment(effectiveTime, format)}
                                                                        allowClear
                                                                        format={format}
                                                            /> : ''
                                                        :
                                                        <DatePicker placeholder='请选择生效日期' onChange={this.dateChange}
                                                                    size='large' className='modal-add-date'
                                                                    disabledDate={this.disabledDate}
                                                                    allowClear
                                                                    format={format}/>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
                </Modal>
            </span>
        )
    }
}

export default AddProductStandard;
