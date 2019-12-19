import React from 'react';
import {Input, Select, DatePicker, TreeSelect, Checkbox, Col, message} from "antd";
import NewButton from '../../../BlockQuote/newButton';
import axios from "axios";
import moment from "moment";

const {Option} = Select;

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            treeData : [],
            processData: [],
            parentCode: [],  //保存不可点击一级车间的code
            plantCode: '',
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.getTreeData = this.getTreeData.bind(this);
        this.getProcess = this.getProcess.bind(this);
        this.processChange = this.processChange.bind(this);
        this.disabledExpiryDate = this.disabledExpiryDate.bind(this);
        this.disabledEffectiveDate = this.disabledEffectiveDate.bind(this);
    }
    render() {
        let {treeData,processData} = this.state,
            {productionData,productionLineData,code,headChange,head,disabled,lines,productClass,productClassName,
            effectiveDateChange,expiryDateChange,productionLineChange,productClassChange} = this.props;
        return (
            <div>
                <div className='process-parameters-add-div'>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span'>编号：</span>
                        <Input name={'processNum'} defaultValue={head ? head['processNum']:''} placeholder={'请输入编号'} onChange={headChange}
                               style={{width: 200}}/>
                    </div>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span'>版次：</span>
                        <Input name={'edition'} defaultValue={head ? head['edition']:''} placeholder={'请输入版次'} onChange={headChange}
                               style={{width: 200}}/>
                    </div>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span'>使用车间：</span>
                        <TreeSelect
                            showSearch
                            name={'plantCode'}
                            style={{ width: 200 }}
                            value={head['plantCode']?`${head['deptName']}-${head['plantCode']}`:undefined}
                            treeCheckStrictly={true}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={treeData}
                            placeholder="请选择使用车间"
                            treeDefaultExpandAll
                            onChange={this.selectChange}
                        />
                    </div>
                </div>

                <div className='process-parameters-add-div'>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span'>生效日期：</span>
                        <DatePicker name={'effectiveDate'} value={head['effectiveDate'] ? moment(head['effectiveDate']) : null} placeholder={'请选择生效日期'} onChange={effectiveDateChange}
                                    showTime format="YYYY-MM-DD HH:mm:ss" disabledDate={this.disabledEffectiveDate} style={{width: 200}}/>
                    </div>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span'>失效日期：</span>
                        <DatePicker name={'expiryDate'} value={head['expiryDate'] ? moment(head['expiryDate']) : null} placeholder={'请选择失效日期'} onChange={expiryDateChange}
                                    showTime format="YYYY-MM-DD HH:mm:ss" disabledDate={this.disabledExpiryDate} style={{width: 200}}/>
                    </div>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span'>工序：</span>
                        <Select name={'processCode'} value={head['processCode'] ? head['processCode'].toString() : undefined} disabled={disabled} onChange={this.processChange} style={{width: 200}} placeholder={'请选择工序'}>
                            {
                                processData ? processData.map(e => e) : null
                            }
                        </Select>
                    </div>
                </div>
                <div className={code === 50 || code === 48 ? '' : 'hide'}>
                    <div className='process-parameters-add-div'>
                        <div className='process-parameters-add-div'>
                            <span className='process-parameters-add-div-span'>生产品种：</span>
                            <Select style={{width: 200}} value={productClass?`${productClass}-${productClassName}`:undefined} placeholder={'请选择'} onChange={productClassChange}>
                                {
                                    productionData ? productionData.map(e => <Option key={e.code} value={`${e.code}-${e.ruleValue}`}>{e.ruleValue}</Option>) : null
                                }
                            </Select>
                        </div>
                    </div>
                    <div className='process-parameters-add-div'>
                        <span className='process-parameters-add-div-span' style={{marginLeft:20}}>生产线：</span>
                        <Checkbox.Group style={{ width: '100%',lineHeight:'30px'}} value={lines} onChange={productionLineChange}>
                            {
                                productionLineData ? productionLineData.map(e => {
                                    return <Col span={2} key={e.code}><Checkbox value={e.code}>{e.name}</Checkbox></Col>
                                }) : null
                            }
                        </Checkbox.Group>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getTreeData();
        this.getProcess();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props === nextProps && this.state === nextState) return false;
        return true;
    }

    /**获取批次规则 工序信息*/
    getProcess() {
        axios({
            url: `${this.props.url.productionBatchRule.getDetail}?code=8`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [], processData = [];
            if (res) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    processData.push(
                        <Option key={e.code}>{e.ruleDesc}</Option>
                    )
                }
                this.setState({
                    processData: processData
                })
            }
        });
    }

    /**获取树的数据*/
    getTreeData() {
        axios({
            url: `${this.props.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                let treeData = this.dataProcessing(res);
                this.setState({
                    treeData: treeData
                })
            }
        });
    }

    /**处理物料信息树形结构*/
    dataProcessing(res, result = []) {
        let parentCode = [];
        for (let i = 0; i < res.length; i++) {
            let parent = res[i]['parent'],
                temp = {
                    title: parent['name'],
                    key: parent['code'],
                    value: parent['name'] + '-' + parent['code'],
                    disabled: false,
                    children: []
                }, son = res[i]['son'];
            parentCode.push(temp['value']);
            for (let j = 0; j < son.length; j++) {
                temp['children'].push({
                    title: son[j]['name'],
                    key: son[j]['code'],
                    value: son[j]['name'] + '-' + son[j]['code'],
                });
            }
            result.push(temp)
        }
        this.setState({
            parentCode: parentCode
        });
        return result;
    }

    /**根据title字段，渲染编辑或新增*/
    renderButton(title) {
        if(title === '编辑') {
            return <span className='blue' onClick={this.handleAdd}>编辑</span>;
        } else if(title === '复制新建') {
            return <span className='blue' onClick={this.handleAdd}>复制新建</span>;
        }
        return <NewButton handleClick={this.handleAdd} name={title} className='fa fa-plus' />;
    }

    /**点击新增，显示弹出框*/
    handleAdd(){
        this.setState({
            visible : true
        })
    }

    /**监控工序变化*/
    selectChange(value) {
        let {parentCode} = this.state;
        if(!parentCode.includes(value)) {
            this.setState({
                plantCode: value
            });
            this.props.plantCodeChange(value)
        }
    }

    processChange(value) {
        value = parseInt(value);
        if(value === 50 && !this.props.head['plantCode']) {
            message.info('陈化新增，请先选择使用车间！');
            return
        }
        if(value === 48 || value === 49 || value === 50) {
            this.setState({
                processCode: value.toString()
            });
            this.props.processChange(value);
        } else if(value === 47) {
            message.info('净前统一用净后标准，请重新选择！')
        } else {
            message.info('暂无标准，请重新选择！')
        }
    }

    disabledEffectiveDate(current) {
        let {head} = this.props;
        return current && current >= moment(head['expiryDate'],'YYYY-MM-DD');
    }

    disabledExpiryDate(current) {
        let {head} = this.props;
        return current && current <= moment(head['effectiveDate'],'YYYY-MM-DD');
    }

    /**对应新增确认取消 */
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
