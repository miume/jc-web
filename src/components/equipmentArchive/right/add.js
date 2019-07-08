import React, {Component} from 'react';
import {Modal,Button} from 'antd';
import NewButton from '../../BlockQuote/newButton';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addModalVisable: false
        };
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
                <Modal
                    visible={this.state.addModalVisable}
                    closable={false} centered={true}
                    title="新增"
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.handleSave} />
                    ]}
                >
                    {/*TODO*/}
                </Modal>
            </span>
        )
    }

    handleAdd = () => {
        this.setState({
            addModalVisable: true
        })
    };
    handleCancel = () => {
        this.setState({
            addModalVisable: false
        })
    };
    handleSave = () => {

    }
}

export default Add