import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal, message, Input, Upload, Button, Icon} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class ImportFile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            fileName: ''
        };
        this.cancel = this.cancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    render(){
        let {visible,fileName} = this.state;
        return(
            <span>
                <NewButton name={'导入检验状态'} className={'fa fa-plus'} handleClick={this.showModal}/>
                <Modal
                    title={'导入数据'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={440}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />
                    ]}
                >
                        <div style={{height: 50}}>
                            <span>导入文件：</span>
                            {/*<span style={{width: 150,marginRight: 10}}>fileName</span>*/}
                            <Upload
                                // showUploadList={false}
                                onChange={this.handleChange}
                                onRemove={this.onRemove}
                                beforeUpload={this.beforeUpload}>

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

    inputChange(e) {
        let name=e.target.name,value=e.target.value;
        this.setState({
            changeFlag:true,
            [name]:value
        })
    }

    handleChange(fileList) {

    }

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    onRemove(e) {
        this.setState({
            fileName: ''
        })
    }

    beforeUpload(file) {
        let fileName = file.name;
        this.setState({
            fileName
        })

    }

    handleCreate() {
        let {editflag,record}=this.props,{name,unit,changeFlag}=this.state
        this.setState({
            visible:false
        });
        let data={
            code: editflag?record.code:'',
            name: editflag&&!changeFlag?record.name:name,
            unit:  editflag&&!changeFlag?record.unit:unit
        };
        axios({
            url:`${this.props.url.fireMageTestItems}`,
            method:editflag?'put':'post',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功！')
                this.props.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    cancel() {
        let {record,editflag}=this.props
        this.setState({
            visible:false
        })
        if(editflag){
            this.setState({
                name:record.name,
                unit:record.unit
            })
        }
        else{
            this.setState({
                name:undefined,
                unit:undefined
            })
        }
    }
}
export default ImportFile
