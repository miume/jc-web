import React from 'react';
import {Modal, Form, Input, message, Select, TreeSelect} from 'antd';
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import NewButton from '../../BlockQuote/newButton'

const Option = Select.Option;
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        server
        render() {
            this.server= localStorage.getItem("remote")
            const { visible, onCancel, onCreate, form,treeData } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal className='modal-sm'
                    visible={visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width='360px'
                    title="新增"
                    footer={[
                        <CancleButton key='back' handleCancel={onCancel}/>,
                        <NewButton key="submit" handleClick={onCreate} name='确定' className='fa fa-check' />
                      ]}>
                      <Form>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('menuName', {
                                rules: [{ required: true, message: '请输入菜单名称' }],
                            })(
                                <Input placeholder='请输入菜单名称' style={{height:35}}/>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('menuType', {
                                rules: [{ required: true, message: '请选择菜单类型' }],
                            })(
                                <Select onChange={this.props.selectChange} size="large" style={{fontSize:"14px"}} placeholder="请选择菜单类型">
                                    <Option value='1'>父菜单</Option>
                                    <Option value='2'>子菜单</Option>
                                </Select>
                            )}
                        </FormItem>
                       {
                           this.props.visible1 === true ?
                               <FormItem labelCol={{span:5}} wrapperCol={{ span: 24 }} required >
                                   {getFieldDecorator('parent',{
                                       rules: [{required: true, message: '请选择父菜单'}],
                                   })(    //2、getFieldDecorator 的使用方法，
                                       <TreeSelect
                                           showSearch
                                           style={{ width: '100%' }}
                                           dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                           treeData={treeData}
                                           placeholder="请选择父菜单"
                                           treeDefaultExpandAll
                                       />
                                       )}
                               </FormItem>
                               :  null
                       }
                          {
                              this.props.visible1 === true ?
                                  <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 24 }}>
                                      {getFieldDecorator('path', {
                                          rules: [{ required: false}],
                                      })(
                                          <Input placeholder='请输入路径名称' style={{height:35}}/>
                                      )}
                                  </FormItem>
                                  :  null
                          }
                    </Form>
                </Modal>
            );
        }
    }
);

/**这是个令牌，每次调用接口都将其放在header里 */

class AddModal extends React.Component {
    server
    url
    state = {
        visible: false,
        visible1:false,
        Authorization : localStorage.getItem('Authorization')
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false,visible1:false });
        form.resetFields();
    };

    selectChange= (value) =>{
        if(value==='1'){
            this.setState({
                visible1 : false
            })
        }else if(value==='2'){
            this.setState({
                visible1 : true
            })
        }
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let data = {
                menuName: values.menuName,
                parent: values.parent ? values.parent.split('-')[1] : -1,
                path: values.path,
            };
            this.addMenu(data)
            form.resetFields();
            this.setState({ visible: false,visible1:false });
        });
    };

    addMenu(data) {
        axios({
            url : `${this.url.menu.add}`,
            method:'post',
            headers:{
                'Authorization': this.url.Authorization
            },
            data: data,
            type:'json'
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch(); // 重新调用分页函数
        }).catch(function (error) {
            message.info(error.data.message);
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        this.server = localStorage.getItem("remote")
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span className={this.props.flag?'':'hide'}>
                <NewButton handleClick={this.showModal} name='新增' className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    treeData={this.props.treeData}
                    visible1={this.state.visible1}
                    selectChange={this.selectChange}
                />
            </span>
        );
    }
}

export default AddModal;
