import React from 'react';
import { Modal} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import NewButton from '../BlockQuote/newButton';
import './unqualifiedTrack.css';
import EdSpanModal from './edSpanModal';


class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleDetail} >详情</span>
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
                    ]}
                >
                    <div style={{height:400}}>
                        <EdSpanModal
                            spanState={false}
                        />

                    </div>
                </Modal>
            </span>
        )
    }

    handleDetail = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

}

export default EditSpan;