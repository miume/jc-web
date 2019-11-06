import React from 'react';
import axios from 'axios'
import {Modal,message,Input} from "antd";
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';

const { TextArea } = Input;

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            phenomenon: '',
            reason: '',
            process: '',
            proProcess: ''
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.editorInit = this.editorInit.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    render() {
        let {phenomenon, reason, process, proProcess} = this.state;
        let title = this.props.title ? this.props.title : '新增';
        return (
            <span className={this.props.flag?'':'hide'}>
                {
                    this.renderButton(title)
                }
                <Modal title={title} visible={this.state.visible} closable={false} maskClosable={false}
                       centered={true} width='500px'
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                       ]}>
                    <div>
                        <div className='exception-table-add-div'>
                            <span>现象：</span>
                            <TextArea name='phenomenon' onChange={this.inputChange}
                                      value={phenomenon}/>
                        </div>
                        <div className='exception-table-add-div'>
                            <span>原因：</span>
                            <TextArea name='reason' onChange={this.inputChange}
                                      value={reason}/>
                        </div>
                        <div className='exception-table-add-div'>
                            <span>处理方式：</span>
                            <TextArea name='process' onChange={this.inputChange}
                                      value={process}/>
                        </div>
                        <div className='exception-table-add-div'>
                            <span>相关产品处理：</span>
                            <TextArea name='proProcess' onChange={this.inputChange}
                                      value={proProcess}/>
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }

    /**根据title字段，渲染编辑或新增*/
    renderButton(title) {
        if(title === '编辑') {
            return <span className='blue' onClick={this.handleAdd}>编辑</span>;
        }
        return <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />;
    }

    componentDidMount() {
        this.editorInit();
    }

    editorInit() {
        if(this.props.data) {
            let {phenomenon, reason, process, proProcess} = this.props.data;
            this.setState({
                phenomenon: phenomenon,
                reason: reason,
                process: process,
                proProcess: proProcess,
                visible: false,
            })
        } else {
            this.setState({
                phenomenon: '',
                reason: '',
                process: '',
                proProcess: ''
            });
        }
    }

    /**点击新增，显示弹出框*/
    handleAdd(){
        this.setState({
            visible : true
        })
    }
    /**新增一条记录 */
    handleOk() {
        let {phenomenon, reason, process, proProcess} = this.state, {title} = this.props;
        let params = {
            code: this.props.data ? this.props.data.code : '',
            phenomenon: phenomenon,
            reason: reason,
            process: process,
            proProcess: proProcess
        };
        this.saveData(params,title);
    }

    /**更新数据或新增数据*/
    saveData(params,title) {
        axios({
            url: `${this.props.url.techException.techException}`,
            method: title === '编辑' ? 'put' : 'post',
            header: {
                'Authorization': this.props.url.Authorization
            },
            data: params
        }).then((data) => {
            message.info(data.data.message)
            this.props.getTableData({
                page: 1,
                size: 10
            });
        });
        this.handleCancel()
    }

    /**对应新增确认取消 */
    handleCancel() {
        this.editorInit();
        this.setState({
            visible: false
        });
    }

    /**监控input变化*/
    inputChange(e) {
        let target = e.target, name = target.name, value = target.value;
        this.setState({
            [name]: value
        })
    }
}
export default AddModal;
