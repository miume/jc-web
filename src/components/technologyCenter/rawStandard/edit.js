import React from 'react';
import axios from 'axios';
import {Button, Input, message, Modal, Table} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';



class CheckSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            inputValue: ""
        };
    }
    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleEdit}>编辑</span>
                <Modal
                    title="编辑"
                    visible={this.state.visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="400px"
                    footer={[
                        <CancleButton handleCancel = {this.handleCancel} key='cancel'/>,
                        <SaveButton handleSave={this.handleSave} key='save' />
                    ]}
                >
                    <div style={{marginBottom:"6px"}}>原材料名称：</div>
                    <Input
                        placeholder='请输入原材料名称'
                        value={this.state.inputValue}
                        onChange={this.inputSave} />
                </Modal>
            </span>
        )
    }
    handleEdit = () => {
        this.setState({
            visible: true,
            inputValue: this.props.record.col2
        });

    }

    /**点击取消按钮 */
    handleCancel = () =>{
        this.setState({
            visible:false
        })
    }
    /**---------------------- */
    /**input框内容变化，实现自动保存数据 */
    inputSave = (e) =>{
        this.setState({
            inputValue: e.target.value
        })
    }

    /**调用保存函数 */
    handleSave = () => {
        var url = "";
        if (this.props.flag === 0) {
            url = `${this.props.url.rawStandard.updateRaw}`;
        } else {
            url = `${this.props.url.rawStandard.editManufacturer}`;
        }
        axios({
            url : url,
            method:'POST',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            type:'json',
            data: {
                id: this.props.record.id,
                name: this.state.inputValue
            }
        }).then((data)=>{
            message.info(data.data.message)
            this.props.handleClick();
            this.setState({
                visible:false
            })
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
    };


}

export default CheckSpan;
