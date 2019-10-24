import React from 'react';
import axios from 'axios'
import {Modal, message, Input, Select, DatePicker} from "antd";
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';

const {Option} = Select;

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.editorInit = this.editorInit.bind(this);
        this.renderData = this.renderData.bind(this);
    }
    render() {
        let title = this.props.title ? this.props.title : '新增';
        return (
            <span className={this.props.flag?'':'hide'}>
                {
                    this.renderButton(title)
                }
                <Modal title={title} visible={this.state.visible} closable={false} maskClosable={false}
                       centered={true} width='450px'
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                       ]}>
                    <div>
                        <div className='process-parameters-add-div'>
                            <span>编号：</span>
                            <Input name={'processNum'} onChange={this.inputChange}
                                   style={{width: 250}}/>
                        </div>
                        <div className='process-parameters-add-div'>
                            <span>版次：</span>
                            <Input name={'edition'} onChange={this.inputChange}
                                   style={{width: 250}}/>
                        </div>
                        <div className='process-parameters-add-div'>
                            <span>使用车间：</span>
                            <Select name={'plantCode'} onChange={this.inputChange}
                                    style={{width: 250}}></Select>
                        </div>
                        <div className='process-parameters-add-div'>
                            <span>工序：</span>
                            <Select name={'processCode'} onChange={this.inputChange}
                                    style={{width: 250}}></Select>
                        </div>
                        <div className='process-parameters-add-div'>
                            <span>生效日期：</span>
                            <DatePicker name={'effectiveDate'} palceholder={'请选择生效日期'} onChange={this.inputChange}
                                   style={{width: 250}}/>
                        </div>
                        <div className='process-parameters-add-div'>
                            <span>失效日期：</span>
                            <DatePicker name={'plantCode'} palceholder={'请选择失效日期'} onChange={this.inputChange}
                                   style={{width: 250}}/>
                        </div>
                        <div className='process-parameters-add-div'>
                            <span>审批名称：</span>
                            <Select name={'approvalProcessCode'} onChange={this.inputChange}
                                    style={{width: 250}}>

                            </Select>
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }

    componentDidMount() {
        this.editorInit();
    }

    editorInit() {
        if(this.props.data) {
              let {processNum,edition, plantCode, processCode,
                effectiveDate,expiryDate,approvalProcessCode,preparer} = this.props.data;
        }
        this.setState({
            visible: false,
        })
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

    renderData(data) {
        if(data) {
            return data.map(e => {
                return (
                    <div key={e.name} className='process-parameters-add-div'>
                        <span>{`${e.title}：`}</span>
                        <Input name={e.name} onChange={this.inputChange}
                               defaultValue={e.value} style={{width: 250}}/>
                    </div>
                )
            })
        }
    }

    /**新增一条记录 */
    handleOk() {
        let {phenomenon, reason, process, proProcess} = this.state;
        let params = {
            code: this.props.code,
            phenomenon: phenomenon,
            reason: reason,
            process: process,
            proProcess: proProcess
        };
        console.log(params);
        this.handleCancel()
    }
    /**对应新增确认取消 */
    handleCancel() {
        this.editorInit();
        this.setState({
            visible: false
        });
    }

    add(){
        // axios({
        //     url : `${this.props.url.role.role}`,
        //     process:'post',
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     },
        //     data:this.formRef.props.form.getFieldsValue(),
        //     type:'json'
        // }).then((data) => {
        //     message.info(data.data.message);
        //     this.props.fetch({
        //         pageNumber: 1,
        //         sortField: 'id',
        //         sortType: 'desc',
        //     });
        // }).catch(function () {
        //         message.info('新增失败，请联系管理员！');
        //     });
    }

    /**监控input变化*/
    inputChange(e) {
        let target = e.target, name = target.name, value = target.value;
        console.log(name,value)
        this.setState({
            [name]: value
        })
    }
}
export default AddModal;
