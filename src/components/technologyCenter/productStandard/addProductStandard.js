import React from 'react';
import axios from 'axios';
import moment from 'moment';
import HeadTable from './headTable';
import Submit from '../../BlockQuote/checkSubmit';
import NewButton from '../../BlockQuote/newButton';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';
import {Modal, Table, DatePicker, message} from 'antd';
import Standard from "../../BlockQuote/standard";
import SelectItems from "./selectItems";

class AddProductStandard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',          //监控新增标准 的生效日期
            visible: false,    //控制新增弹出框
            allTestItem: [],   //保存所有受检项目
            batchNumber: '',   //用来存取详情、编辑时的batchNumber
            time: {},           //用来存储详情、编辑时的生效时间和创建时间
            option: [],
            selectTestItems: [],//选中标准选项id
            testItems: [],      //选中标准选项
            batchNumberId:-1,
            checkAll: true
        }
        this.reSelectItems = this.reSelectItems.bind(this);
        this.standardChange = this.standardChange.bind(this);
        this.judge = this.judge.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.addDataProcessing = this.addDataProcessing.bind(this);
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.getDataByBatchNumberId = this.getDataByBatchNumberId.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.range = this.range.bind(this);
        this.renderClassName = this.renderClassName.bind(this);
        this.renderDatePicker = this.renderDatePicker.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%'
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
                    return <Standard record={record} standardChange={this.standardChange} defaultValue={text ? text : '请选择检测标准'}/>
            },
            className: 'productStandardTd'
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
            batchNumberId: batchNumberId,
            selectTestItems: option,  //默认所有选项
            selectAllItems: option    //默认选中所有
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
        let batchNumber = res.commonBatchNumber.batchNumber,
            time = {
                createTime: res.commonBatchNumber.createTime,
                effectiveTime: res.techniqueProductNewStandardRecord.effectiveTime
        }, selectTestItems = [];
        for (let i = 0; i < res.items.length; i++) {
            res.items[i]['index'] = i+1;
            let data = res.items[i];
            selectTestItems.push(
                data.id + '-' + data.name + '-' + data.unit + '-' + ''
            )
        }
        this.setState({
            batchNumber: batchNumber,
            date:time.effectiveTime,
            testItems: res.items,
            selectTestItems: selectTestItems,
            time: time,
        })
    }

    /**点击详情-迭代 */
    handleIteration() {
        /**将详情置为编辑 */
        this.setState({
            flag: 2
        })
    }

    /**重新选择项目*/
    reSelectItems(testItems,selectTestItems) {
        this.setState({
            testItems: testItems,
            selectTestItems: selectTestItems
        })
    }
    /**点击保存按钮 */
    handleSave() {
        this.addDataProcessing(0);
    }

    /**点击取消按钮 */
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    /**点击确定送审 */
    handleOkApply(process,urgent) {
        this.addDataProcessing(1,process,urgent);
    }

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
    addDataProcessing(status,process='',urgent='') {
        const {date} = this.state;
        if (date === '') {
            message.info('生效日期不能为空！');
            return
        }
        let items = [], data = this.state.testItems;
        for (let i = 0; i < data.length; i++) {
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
        };
        this.handleCancel();
        this.applyOut(status, params,process,urgent);
    }

    /**保存  新增请求方法是post 编辑请求方法是put */
    applyOut(status, params) {
        axios({
            type: 'json',
            method: 'post',
            url: this.props.url.product.addStandard,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
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
                });
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
            });
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

    render() {
        let format = "YYYY-MM-DD",effectiveTime = this.state.time.effectiveTime,
            {status,url} = this.props, {flag,testItems,selectTestItems,visible,batchNumber} = this.state,
            data = [this.props.data[0][1], this.props.data[1][1]];
        /**详情  只有status===2 审核通过的数据可以迭代 */
        const detail = status === 2 ? [
                <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                <NewButton key='submit' handleClick={this.handleIteration} name={'迭代'} className='fa fa-level-up'/>
            ] :
            [
                <CancleButton key='cancel' handleCancel={this.handleCancel} flag={1}/>,
            ];
        /**详情对应迭代后的按钮组合以及编辑、新增 */
        const iteration = [
            <CancleButton key='back' handleCancel={this.handleCancel}/>,
            <SaveButton key='save' handleSave={this.handleSave}/>,
            <Submit key='submit' url={this.props.url}
                    applySaveAndReview={this.handleOkApply}/>
        ];
        return (
            <span>
                {this.judge(this.props.flag)}
                <Modal title={this.judge(flag, 1)} visible={visible} closable={false} centered={true}
                       maskClosable={false}
                       footer={flag === 1 ? detail : iteration}>
                <div>
                    <HeadTable flag={flag} data={data} batchNumber={batchNumber}/>
                    <div className='modal-add-table'>
                        <div className={flag === 1 ? 'hide' : 'product-standard-select-items'}>
                            <SelectItems type={'reSelect'} testItems={testItems} selectTestItems={selectTestItems} url={url} reSelectItems={this.reSelectItems}/>
                        </div>
                        <div style={{height: 340}}>
                            <Table
                                   rowKey={record => record.id}
                                   columns={this.columns} dataSource={testItems}
                                   pagination={false} size='small' bordered
                                   scroll={{y: flag ? 265 : 245}}>
                            </Table>
                        </div>
                    </div>
                    <div style={{height: 10}}></div>
                    <div>
                        {
                            flag === 1 ?
                                <div className='modal-detail-p'>
                                    <p>{`生效时间：${this.state.time.effectiveTime ? this.state.time.effectiveTime : ''}`}</p>
                                    <p>{`编制日期：${this.state.time.createTime ? this.state.time.createTime : ''}`}</p>
                                </div> : this.renderDatePicker(flag,effectiveTime,format)
                        }
                </div>
                </div>
                </Modal>
            </span>
        )
    }

    /**渲染日期选择*/
    renderDatePicker(flag,effectiveTime,format) {
        if(flag) {
            return (
                typeof(effectiveTime) != 'undefined' ?
                    <DatePicker placeholder='请选择生效日期' onChange={this.dateChange}
                                size='large' className='modal-add-date'
                                disabledDate={this.disabledDate}
                                defaultValue={moment(effectiveTime, format)}
                                allowClear
                                format={format}
                    /> : '')
        }
        return (
            <DatePicker placeholder='请选择生效日期' onChange={this.dateChange}
                        size='large' className='modal-add-date'
                        disabledDate={this.disabledDate}
                        allowClear
                        format={format}/>
        )
    }

}

export default AddProductStandard;
