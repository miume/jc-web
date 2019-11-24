import React from 'react';
import HeadTable from "./headTable";
import {DatePicker, message, Modal, Table} from "antd";
import NewButton from "../../BlockQuote/newButton";
import CancleButton from "../../BlockQuote/cancleButton";
import Standard from "../../BlockQuote/standard";
import moment from "moment";
import SaveButton from "../../BlockQuote/saveButton";
import Submit from "../../BlockQuote/checkSubmit";
import SelectItems from "./selectItems";
import axios from "axios";

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            format: "YYYY-MM-DD",
            date: ''
        };
        this.judge = this.judge.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditor = this.handleEditor.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.reSelectItems = this.reSelectItems.bind(this);
        this.standardChange = this.standardChange.bind(this);
        this.renderDatePicker = this.renderDatePicker.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
        this.addDataProcessing = this.addDataProcessing.bind(this);
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.getDataByBatchNumberId = this.getDataByBatchNumberId.bind(this);

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

    render() {
        let {visible,format,testItems,selectTestItems,batchNumber,effectiveTime} = this.state, {flag,data,url,title} = this.props;
        return (
            <span>
                {this.judge(flag)}
                <Modal
                    title={title ? title : '新增'} visible={visible} closable={false} centered={true}
                    maskClosable={false}
                    footer={
                        [
                            <CancleButton key='back' handleCancel={this.handleCancel}/>,
                            <SaveButton key='save' handleSave={this.handleSave}/>,
                            <Submit key='submit' url={url} applySaveAndReview={this.applySaveAndReview}/>
                        ]
                    }>
                    <div>
                        <HeadTable flag={flag} data={data} batchNumber={batchNumber}/>
                        <div className='modal-add-table'>
                            <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                                <SelectItems type={'reSelect'} testItems={testItems} selectTestItems={selectTestItems} url={url} reSelectItems={this.reSelectItems}/>
                            </div>
                            <div style={{height: 340}}>
                                <Table
                                       rowKey={record => record.id}
                                       columns={this.columns} dataSource={testItems}
                                       pagination={false} size='small' bordered
                                       scroll={{y:245}}>
                                </Table>
                            </div>
                        </div>
                        <div style={{height: 10}}></div>
                        <div style={{height: 50}}>
                            {this.renderDatePicker(flag,effectiveTime,format)}
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }

    /**判断是新增 编辑*/
    judge(flag) {
        let {editorFlag,status} = this.props;
        if(flag) {
            return <span className={editorFlag ? (status === -1 ? 'blue' : 'notClick') : 'hide'}
                  onClick={status === -1 ? this.handleEditor : null}>编辑</span>;
        }
        return <NewButton handleClick={this.handleAdd} name={'选择'} className='fa fa-level-up'/>
    }

    /**点击选择标准，弹出新增框*/
    handleAdd() {
        let {testItems,selectTestItems} = this.props.selectTestItem();
        this.setState({
            visible: true,
            testItems: testItems,
            selectTestItems: selectTestItems
        })
    }

    handleEditor() {
        let {batchNumberId} = this.props;
        this.getDataByBatchNumberId(batchNumberId);
        this.setState({
            visible: true
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
            let res = data.data.data;
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
                effectiveTime: res['techniqueProductNewStandardRecord'].effectiveTime
            }, selectTestItems = [];
        for (let i = 0; i < res.items.length; i++) {
            res.items[i]['index'] = i+1;
            let data = res.items[i];
            selectTestItems.push(
                data.id + ',' + data.name + ',' + data.unit + ',' + ''
            )
        }
        this.setState({
            batchNumber: batchNumber,
            date:time.effectiveTime,
            testItems: res.items,
            selectTestItems: selectTestItems,
            effectiveTime: time.effectiveTime,
        })
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

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    /**重新选择项目*/
    reSelectItems(testItems,selectTestItems) {
        this.setState({
            testItems: testItems,
            selectTestItems: selectTestItems
        })
    }

    /**给每项设置标准 自动保存数据*/
    standardChange(index,value) {
        let {testItems} = this.state;
        testItems[index-1]['count'] = value;
        this.setState({
            testItems: testItems
        })
    }

    disabledDate(current) {
        return current < moment().startOf('day');
    }

    /**监控新增标准 生效时间的选取 */
    dateChange(date, dateString) {
        this.setState({
            date: dateString
        })
    }

    /**编辑或新增 删除所选项目数*/
    handleDelete(id) {
        let {testItems,selectTestItems} = this.state;
        testItems = testItems.filter(e => e.id !== id);
        selectTestItems = selectTestItems.filter(e => parseInt(e.split('-')[0]) !== id);
        for(let i = 0; i < testItems.length; i++) {
            testItems[i]['index'] = i + 1;
        }
        this.setState({
            testItems: testItems,
            selectTestItems: selectTestItems
        })
    }

    applySaveAndReview(process,urgent) {
        this.addDataProcessing(1,process,urgent);
    }

    handleSave() {
        this.addDataProcessing(0);
    }

    /**对保存或送审的数据进行处理 */
    addDataProcessing(status,process='',urgent='') {
        const {date} = this.state;
        if (date === '') {
            message.info('生效日期不能为空！');
            return
        }
        let items = [], {testItems} = this.state;
        for (let i = 0; i < testItems.length; i++) {
            if(!testItems[i].count) {
                message.info('检测标准请填写完整！');
                return
            }
            items.push({
                id: testItems[i].id,
                count: testItems[i].count
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
    applyOut(status, params,process,urgent) {
        axios({
            type: 'json',
            method: this.props.flag ? 'put' : 'post',
            url: this.props.flag ? this.props.url.product.updateByCommonBatchId : this.props.url.product.addStandard,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: this.props.flag ? {
                commonBatchId: this.props.batchNumberId,
                effTime:params.effTime
            } : {
                createUser: params.createUser,
                productId:params.productId,
                classId:params.classId,
                effTime:params.effTime
            },
            data:params.items,
        }).then((data) => {
            if (status === 1 && data.data.code === 0) {
                const dataId = data.data.data ? data.data.data : null;
                this.applyReview(dataId, params.classId, params.productId,process,urgent);
            } else {
                message.info(data.data.message);
                this.props.getAllProductStandard({
                    classId: params.classId,
                    productId: params.productId
                });
                this.setState({
                    iteFlag:true
                })
            }
        }).catch(() => {
            message.info('保存失败，请联系管理员！')
        })
    }

    /**送审 */
    applyReview(dataId, classId, productId,process,urgent) {
        axios.post(`${this.props.url.toDoList}/${parseInt(process)}`, {}, {
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                dataId: dataId,
                isUrgent: urgent
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
}
export default AddModal;
