import React from 'react';
import { Modal} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import NewButton from '../BlockQuote/newButton';
import './unqualifiedTrack.css';
import EdSpanModal from './edSpanModal';


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
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        const { visible } = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="600px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <NewButton
                            handleClick={this.handleClick}
                            className="fa fa-check"
                            name="提交"
                        />
                    ]}
                >
                    <div style={{height:400}}>
                        <EdSpanModal
                            spanState={false}
                        />

                    </div>
                </Modal>
                <span  className="unqualifiedTrackBlueSpan"><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;详情</span>
            </span>
        )
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleClick = () => {
        console.log("提交")
    }

}

export default EditSpan;