import React from 'react';
import { Button, Modal, Form, Input,message } from 'antd';
import axios from 'axios';
import Tr from './tr';
import WhiteSpace from '../BlockQuote/whiteSpace';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import './difference.css'

const FormItem = Form.Item;


const CollectionCreateForm = Form.create()(
    class extends React.Component {
        constructor(props){
            super(props)
            this.state={
                visible : false,
            }
        }

        render() {
            const { visible, onCancel, onCreate, form,onSubmit } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    className='modal-md'
                    footer={[
                        <CancleButton key='back' handleCancel={onCancel}/>,
                        <SaveButton key="define" handleSave={onCreate} className='fa fa-check' />,
                        <AddButton key="submit" handleClick={onSubmit} name='提交' className='fa fa-check' />
                      ]}
                >
                    <div style={{height:'400px'}}>
                    <Form horizontal='true'>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: '请输入流程名称' }],
                            })(
                                <Input placeholder='请输入流程名称' size="large"/>
                            )}
                        </FormItem>
                        <WhiteSpace />
                        <table className="protable">
                            <thead className='prothead' id="thd">
                                <tr>
                                    <td>负责人</td>
                                    <td>职责</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody id="edit">
                            {
                            this.props.data.map((m) => { return <Tr key={m.toString()} deleteRow={this.props.deleteRow} value={m.toString()}></Tr> })
                            }
                            </tbody>
                        </table>
                        <WhiteSpace />
                        <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.props.addData}/>
                    </Form>
                    </div>
                </Modal>
            );
        }
    }
);

class AddModal extends React.Component {
    ob
    url
    state = {
        visible: false,
        count: 1,
        data : [1],
    };
    server = localStorage.getItem("remote")

    /**新增一条数据 */
    addData = ()=>{
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
    }

    /**删除一条数据 */
    deleteRow = (value)=>{
        const {count,data} = this.state;
        this.setState({
            count:count-1,
            data:data.filter(d=>d.toString()!==value)
        })
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        let name = document.getElementsByName("input")
        for(let i=0;i<name.length;i++){
            name[i].value = ""
        }
        this.setState({ visible: false,count:1,data:[1] });
        form.resetFields();
    };

    /**获取table的数据 */
    getData = () => {
        let data = document.getElementsByName("select")
        let selectValue = [];
        for(let i=0;i<data.length;i++){
            let index=data[i].selectedIndex;
            let value=data[i].options[index].value;
            selectValue.push(value)
        }

        let inputData = [];
        let input=document.getElementsByName("input");
        for(let i=0;i<input.length;i++){
            inputData.push(input[i].value)
        }

        let taskPersonList = [];
        for(let i=0;i<inputData.length;i++){
            taskPersonList.push({})
        }

        for(let i=0;i<inputData.length;i++){
            taskPersonList[i]["userId"]=selectValue[i];
            taskPersonList[i]['responsibility']=inputData[i];
        }
        return taskPersonList
    };
    handleSubmit = () =>{
        const form = this.formRef.props.form;
        const taskPersonList = this.getData();
        form.validateFields((err, values) => {
            let data = {}
            values['createPersonId'] = parseInt(this.ob.userId)
            values["isUrgent"] = 0
            values["status"] = 2
            data["commonBatchNumber"] = values
            data["details"] = taskPersonList
            if (err) {
                return;
            }
            axios({
                url : `${this.url.processManagement.deleteByIds}`,
                method:'post',
                data: data,
                type:'json'
            }).then((data) => {
                message.info(data.data.message);
                this.props.fetch(); // 重新调用分页函数
            })
            // 将value传给后台
            let name = document.getElementsByName("input")
            for(let i=0;i<name.length;i++){
                name[i].value = ""
            }
            form.resetFields();
            this.setState({ visible: false,count:1,data:[1] });
        });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        const taskPersonList = this.getData();
        form.validateFields((err, values) => {
            let data = {}
            values['createPersonId'] = parseInt(this.ob.userId)
            values["isUrgent"] = 0
            values["status"] = -1
            data["commonBatchNumber"] = values
            data["details"] = taskPersonList

            // values["details"] = taskPersonList
            if (err) {
                return;
            }
            axios({
                url : `${this.url.processManagement.deleteByIds}`,
                method:'post',
                data: data,
                type:'json'
            }).then((data) => {
                message.info(data.data.message);
                this.props.fetch(); // 重新调用分页函数
            })
            let name = document.getElementsByName("input")
            for(let i=0;i<name.length;i++){
                name[i].value = ""
            }
            // 将value传给后台
            form.resetFields();
            this.setState({ visible: false,count:1,data:[1] });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'))
        return (
            <span>
                <AddButton handleClick={this.showModal}  name='新增' className='fa fa-plus' />
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    onSubmit = {this.handleSubmit}
                    deleteRow = {this.deleteRow}
                    count = {this.state.count}
                    data = {this.state.data}
                    addData = {this.addData}
                />
            </span>
        );
    }
}

export default AddModal;
