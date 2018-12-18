import React from 'react';
import {Modal} from 'antd';
import CheckSpanModal from './checkSpanModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';
import './interProduct.css';
const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `kg`,
    });
}

class CheckSpan extends React.Component {
    url;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.subHide = this.subHide.bind(this);
        this.subOk = this.subOk.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);

    }
    render() {
        const { visible } = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span type="primary" onClick={this.showModal} size="small"    >
                <Modal
                    title="数据录检"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <SaveButton
                            onClick={this.handleOk}
                            key='save'
                        />,
                        <Submit
                            url={this.url}
                            Authorization={this.Authorization}
                            server={this.server}
                            visible={this.state.subVisible}
                            handleCancel={this.subHide}
                            handleOk={this.subOk}
                            handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange}
                            key='submit'
                            process={this.state.process}
                        />
                    ]}
                >
                    <div style={{height:550}}>
                        <CheckSpanModal
                            data={data}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
                <span className="blue interCursorPointer">录检</span>
            </span>
        )
    }
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleCancel = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    subHide = () => {
        this.setState({
            subVisible: false,
        });

    };
    subOk = () => {
        console.log('ok');
    };
    handleVisibleChange = (subVisible) => {
        this.setState({ subVisible });
    };

    /**---------------------- */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default CheckSpan;