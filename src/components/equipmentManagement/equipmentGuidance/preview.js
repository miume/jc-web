import React from 'react';
import {Modal} from 'antd';

class Preview extends React.Component{
         
    render(){
        return(
            <Modal visible={this.props.previewVisible} footer={null} onCancel={this.props.previewCancel}>
                <img alt="图片未显示" style={{ width: '100%' }} src={this.props.previewImage} />
            </Modal>
        )
    }
}

export default Preview