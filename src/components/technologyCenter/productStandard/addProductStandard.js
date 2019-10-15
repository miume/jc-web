import React from 'react';
import axios from 'axios';
import moment from 'moment';
import HeadTable from './headTable';
import Submit from '../../BlockQuote/submit';
import NewButton from '../../BlockQuote/newButton';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';
import {Modal, Input, Table, DatePicker, message, Checkbox, Form, Col} from 'antd';

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
            iteFlag:true
        }
        this.save = this.save.bind(this);
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
        this.dataProcessing = this.dataProcessing.bind(this);
        this.addDataProcessing = this.addDataProcessing.bind(this);
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.getDataByBatchNumberId = this.getDataByBatchNumberId.bind(this);
        // this.disabledDateTime = this.disabledDateTime.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.range = this.range.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'left',
            width: '25%'
        }, {
            title: '检测项目',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: '25%'
        }, {
            title: '检测结果',
            dataIndex: 'count',
            key: 'count',
            align: 'left',
            width: '25%',
            render: (text, record) => {
                if (this.state.flag === 1) {
                    return text;
                } else
                    return <Input id={record.id} name='testResult' placeholder='请输入检测结果'
                                  style={{width: '100%', height: '30px', border: 'none'}} defaultValue={text}
                                  onChange={this.save} className='stock-out-input'/>
            }
        }, {
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
            align: 'left',
            width: '25%'
        },]
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
        const flag = this.props.flag;
        const id = this.props.batchNumberId;
        if (flag) this.getDataByBatchNumberId(id);
        this.setState({
            visible: true,
            flag: flag,
            batchNumberId:id
        })
        // else this.getAllTestItem();
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
    /**点击迭代保存按钮 */
    // handleIteSave = () => {
    //     this.setState({
    //         flag:-1
    //     },() => {
    //         this.addDataProcessing(0);
    //     })
    // }


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

    // handleIteOkApply = () => {
    //     this.setState({
    //         flag:-1
    //     },() => {
    //         this.addDataProcessing(1);
    //     })
    // }

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
    save(e) {
        const value = e.target.value;
        // const name = e.target.name;
        const id = e.target.id;
        const newData = [...this.state.testItems];
        const index = newData.findIndex(item => parseInt(id) === parseInt(item.id));
        newData[index]['count'] = value;
        this.setState({
            testItems: newData
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
        //console.log(details)
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
            // console.log(classId,productId)
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


    /**获取所有检测项目 */
    getAllTestItem() {
        axios({
            url: `${this.props.url.testItems.testItems}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            const res = data.data.data;
            if (res) {
                this.dataProcessing(res);
            }
        })
    }

    /**对数据进行处理 */
    dataProcessing(data) {
        var option = []
        for (var i = 0; i < data.length; i++) {
            //data[i]['index'] = i + 1;
            data[i]['value'] = '';
            data[i]['form'] = data[i].id + '-' + data[i].name + '-' + data[i].unit + '-' + data[i].value
            data[i]['check'] = true
            option.push(data[i].id)
        }
        this.setState({
            option: option,
            allTestItem: data,
            selItemsFlag: 1
        })
    }

    checkboxChange = (value) => {
        // 获取复选框ID
        this.setState({
            selectTestItems: value
        })

    }

    selectTestItem = () => {
        const selectTestItems = this.state.selectTestItems
        var testItems = []
        for (var i = 0; i < selectTestItems.length; i++) {
            const form = selectTestItems[i].split('-')
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
        // console.log(flag)
        // console.log(this.props.selItemsFlag)
        return (
            <span>
                {this.judge(flag)}
                <Modal title={this.judge(flag, 1)} visible={this.state.visible} closable={false} centered={true}
                       maskClosable={false}
                       footer={this.state.flag === 1 ? detail : iteration}>
                <div>
                    {
                        this.props.selItemsFlag&&this.state.selItemsFlag ?
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
                                    <Checkbox.Group style={{width: "100%"}} defaultValue={this.props.option}
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