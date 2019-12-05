import React from 'react';
import {Modal} from 'antd';
import Procedure from './procedure';
import NewButton from '../../../BlockQuote/newButton';
import CancleButton from '../../../BlockQuote/cancleButton';

class DetailModal extends React.Component{
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    /**点击取消  */
    handleCancel(){
        this.setState({
            visible:false
        })
    }

    render(){
        return (
            <span>
                <NewButton name='详情' className='fa fa-floppy-o' handleClick={this.handleCheck} ></NewButton>
                <Modal visible={this.state.visible} title='审核' width='1100px' centered={true}
                closable={false} maskClosable={false}
                footer={[
                    <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                ]}
                >
                <Procedure url={this.props.url} dataId={this.props.dataId}/>
                </Modal>
            </span>
        );
    }
}
export default DetailModal;
