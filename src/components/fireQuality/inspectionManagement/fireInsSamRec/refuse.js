import React, {Component} from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal, Input, message} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";


const { TextArea } = Input;
class Refuse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            value:""
        }
        this.showModal = this.showModal.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    render() {
        return (
            <span>
                <span className={'blue'} onClick={this.showModal}>拒绝</span>
                <Modal
                    title={'请填写拒绝原因'}
                    visible={this.state.visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'400px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel}/>,
                        <NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleRefuse}/>
                    ]}
                >
                    <TextArea rows={6} onChange={this.onChange}/>
                </Modal>
                </span>
        )
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    showModal() {
        this.setState({
            visible: true
        })
    }

    handleRefuse = () => {
        axios({
            url: `${this.props.url.fireInsSamRec.sampleReceive}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                id: this.props.record.code,
                flag: 2,
                reason:this.state.value
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.getTableParams(''); //删除后重置信息
        }).catch(() => {
            message.info('拒绝失败，请联系管理员！');
        });
    }

    cancel() {

        this.setState({
            visible: false
        })

    }
}

export default Refuse