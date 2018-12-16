import React from 'react';
import {Form,Input,Modal,message,Icon} from 'antd';
import axios from 'axios';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';

const { TextArea } = Input;
const FormItem=Form.Item;
const CollectionCreateForm = Form.create()(//弹出层
    class extends React.Component {
      render() {
        const { visible, form } = this.props;
        const { getFieldDecorator } = form;
        //console.log(this.props.record);
        return (
          <Modal
            visible={visible}
            title="损失说明"
            closable={false} maskClosable={false} centered={true}
            width='360px'
            footer={[
                <NewButton key='cancel' handleClick={this.props.onCancel} name='返回'  className='fa fa-times'/>,
                
            ]}
          >
            <Form horizontal='true' >
                <FormItem  wrapperCol={{span:24}} required>
                {getFieldDecorator('note',{
                    initialValue: this.props.record.note,
                    
                })(
                    <TextArea autosize={true} />
                )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

class Note extends React.Component{
  server;
  Authorization;
    state = {
        visible: false,
      };
    
      showModal = () => {
        this.setState({ visible: true });
      }
     
      handleCancel = () => {
        
        this.setState({ visible: false });
       
      }
    
    
    
    render(){
          //这是个令牌，每次调接口将其放在header里面
      this.Authorization=localStorage.getItem('Authorization');
      //通过这个获取接口地址
      this.server=localStorage.getItem('remote');
        return(
          <span>
              <Icon type="file-text" className='blue'/><span onClick={this.showModal} className='blue'>损失说明</span>
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                record={this.props.record}
              />
          </span>
        );
    }
}
export default Form.create()(Note);//创建form实例