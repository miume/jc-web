import React from 'react';
import {Modal} from 'antd';
import '../redList.css'
import CancleButton from '../../../BlockQuote/cancleButton';

class Note extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
    this.showModal=this.showModal.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
  }


      showModal = () => {
        this.setState({ visible: true });
      }

      handleCancel = () => {

        this.setState({ visible: false });

      }



    render(){
      //console.log(this.props.record.repoRedTable.note);
        return(
          <span>
          <span onClick={this.showModal} className='blue'>损失说明</span>
          <Modal
            visible={this.state.visible}
            title="损失说明"
            closable={false} maskClosable={false} centered={true}
            width='360px'
            footer={[
                <CancleButton key='cancel' handleCancel={this.handleCancel} flag={1}/>,

            ]}
         >
        <div className='redListDiv'>
           {this.props.record.repoRedTable.note}
        </div>
      </Modal>
      </span>
        );

    }
}
export default Note;
