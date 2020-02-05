import React from 'react';
import axios from 'axios';
import {Button, Input, message, Modal, Table} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import './repoQueryInventoryDaily.css'

const { TextArea } = Input;

class Edit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            inputValue:""
        };

    }
    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleEdit}>编辑</span>
                <Modal
                    title="备注编辑"
                    visible={this.state.visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.cancel}/>,
                        <SaveButton key="define" handleSave={this.save} className='fa fa-check' />,
                    ]}
                >
                    <div>
                        <TextArea
                            rows={6}
                            value={this.state.inputValue}
                            placeholder="请输入备注"
                            onChange={this.inputChange}
                        />
                    </div>

                </Modal>
            </span>
        )
    }


    inputChange = (e) => {
        this.setState({
            inputValue:e.target.value
        })
    }
    save = () => {
        axios({
            url: `${this.props.url.repoQueryInventoryDaily.edit}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                id:this.props.record.code,
                comments:this.state.inputValue
            }
        }).then(data => {
            message.info(data.data.mesg)
            this.props.getTableParams(this.props.searchContent)
            this.setState({
                visible:false,
                inputValue:""
            })
        })

    }
    cancel = () => {
        this.setState({
            visible:false
        })
    }
    /**通过id查询备注信息 */
    handleEdit = () => {
        this.setState({
            visible:true,
            inputValue:this.props.record.col12
        })
    }


}

export default Edit;
