import React, {Component} from 'react'
import {Modal, Input, message, Divider, Checkbox, Col} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";

import axios from "axios";

class PrintModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
        this.getPrint = this.getPrint.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    render() {
        let {visible, changeFlag} = this.state, {editflag, record} = this.props
        return (
            <span>
                <span className={'blue'} onClick={this.getPrint}>打印</span>
                <Modal
                    title={'打印预览'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={600}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={true}/>,
                    ]}
                >
                    <div className="detailModal_scala">

                    </div>

                </Modal>
            </span>
        )
    }

    getPrint = () => {

    }

    cancel = () => {
        this.setState({
            visible: false
        })

    }
}

export default PrintModal