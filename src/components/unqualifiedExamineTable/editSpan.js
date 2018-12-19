import React from 'react';
import { Modal} from 'antd';
import PurchaseModal from '../purchaseCheckReport/purchaseModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';
import './unqualifiedExamine.css';


class EditSpan extends React.Component {
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
        return(
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="1030px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
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
                    <div style={{height:500}}>
                        <PurchaseModal
                            clickState ={0}
                        />

                    </div>
                </Modal>
                <span  className="unqualifiedBlueSpan"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;编辑</span>
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

}

export default EditSpan;