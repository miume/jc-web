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
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
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
                            spanState={true}
                        />

                    </div>
                </Modal>
            </span>
        )
    }

    /**点击编辑 */
    handleEdit() {
        // this.getDetailData();
        this.setState({
            visible: true,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleClick = () => {
        this.setState({
            visible: false,
        });
    }

}

export default EditSpan;