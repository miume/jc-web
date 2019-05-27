import React from 'react'
import {Modal} from "antd";
import CancleButton from "../departManagement/addModal";
import NewButton from
// class Modal extends React.Component{
//     constructor(props){
//         super(props)
//     }
// }
function AllModal(props){
    return (
        <Modal visible={this.props.visible} width={this.props.width} title={this.props.title}
               closable={false} centered={true} maskClosable={false} className={this.props.className}>
               footer = {[
                    <CancleButton key='back' handleCancel={handleCancel}/>,
                    <NewButton key="submit" handleClick={handleOk} name='确定' style='button' className='fa fa-check' />
        ]}

        </Modal>
    )
}