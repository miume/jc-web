import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal, message, Upload, Button, Icon} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class ImportFile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            fileList: []
        };
        this.cancel = this.cancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
    }

    render(){
        let {visible,fileList} = this.state, {flag} = this.props,
            props = {
                onRemove: file => {
                    this.setState(state => {
                        const index = state.fileList.indexOf(file);
                        const newFileList = state.fileList.slice();
                        newFileList.splice(index, 1);
                        return {
                            fileList: newFileList,
                        };
                    });
                },
                beforeUpload: this.beforeUpload,
                fileList
            };
        return (
            <span className={flag ? '' : 'hide'}>
                <NewButton name={'导入检验状态'} className={'fa fa-plus'} handleClick={this.showModal}/>
                <Modal
                    title={'导入数据'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={440}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        <NewButton key={'ok'} name={'导入'} className={'fa fa-check'} handleClick={this.handleUpload}/>
                    ]}
                >
                        <div style={{height: 50}}>
                            <span>导入文件：</span>
                            <Upload {...props}>
                                <Button><Icon type="upload" /> 选择文件</Button>
                            </Upload>
                        </div>
                    </Modal>
                </span>
        )
    }

    showModal() {
        this.setState({
            visible:true
        })
    }

    /**在上传文件之前验证*/
    beforeUpload(file) {
        if(file.name.slice(-3) === 'xls' || file.name.slice(-4) === 'xlsx') {
            this.setState({
                isUpload: false
            })
        } else {
            this.setState({
                isUpload: true
            })
        }
        /**让最新的文件覆盖旧文件*/
        this.setState({
            fileList: [file]
        });
        return false;
    }

    /**点检导入按钮，进行文件类型判断*/
    handleUpload() {
        const { fileList ,isUpload} = this.state;
        if(!fileList.length) {
            message.error('请先上传.xls或者.xlsl文件!');
        }
        if(isUpload) {
            message.error('上传文件类型错误！上传文件类型只能是.xls或者.xlsx！');
            return
        }

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('excel', file);
        });

        this.uploadFile(formData);
    }

    /**上传文件*/
    uploadFile(formData) {
        axios({
            url: `${this.props.url.dataReorganize.import}`,
            method: 'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: formData
        }).then(data => {
            this.setState({
                fileList: [],
                visible: false,
            });
            message.success(data.data.message);
        }).catch(() => {
            this.setState({
                visible: false,
            });
            message.error('上传失败，请联系管理员！');
        })
    }

    cancel() {
        this.setState({
            visible: false
        })
    }
}
export default ImportFile
