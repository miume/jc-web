import React from 'react';
import { Button, Modal, Form, Input,message,Select,DatePicker,TimePicker  } from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

var myDate = new Date();
var hh = myDate.getHours();


var time = ""
if(hh<10){
    time+="0"
}
time+=hh+":"
var mm = myDate.getMinutes();
if(mm<10){
    time+="0"
}
time+=mm+":"
var ss = myDate.getSeconds();
if(ss<10){
    time+="0"
}
time+=ss


var year = myDate.getFullYear(); 
var month = myDate.getMonth() + 1;
var day = myDate.getDate(); 

var clock=year+"-"

if(month<10){
    clock+="0"
}
clock+=month+"-"

if(day<10){
    clock+="0"
}
clock+=day
const dateFormat = 'YYYY-MM-DD';

const CollectionCreateForm = Form.create()(
    class extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                visible : false,
            }
        }
        onChange = (date, dateString) => {
            console.log(date, dateString);
          }
        render(){
            const {visible,form,onCancel,onCreate} = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    title="新增"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                <div>
                    请选择送样日期：<DatePicker onChange={this.onChange} defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}/>
                </div><br />
                <div>
                    请选择送样时间：<TimePicker placeholder="请选择送样时间" defaultValue={moment(time,'HH:mm:ss')}/>
                </div><br />
                <div>
                    请选择送样人员：
                    <Select defaultValue="-1">
                        <Option value='-1'>张三</Option>
                        <Option value='0'>李四</Option>
                    </Select>
                </div><br />
                <div>
                    请选择送样工厂：
                    <Select defaultValue="-1">
                        <Option value='-1'>兵工厂</Option>
                        <Option value='0'>食品厂</Option>
                    </Select>
                </div><br />
                <div>
                    请选择送样项目：
                    <Select defaultValue="-1">
                        <Option value='-1'>铅</Option>
                        <Option value='0'>硫</Option>
                    </Select>
                </div><br />
                <div>
                    请输入送样批号：<Input />
                </div><br />
                <div>
                    请输入异常备注：<Input />
                </div>
                </Modal>
            )
        }
    }
);

class AddModal extends React.Component{
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false });
        form.resetFields();
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    onCreate = () =>{
        this.setState({ visible: false });
    }

    render(){
        return(
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}} onClick={this.showModal}>新增</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.onCreate}
                />
            </span>
        )
    }
}

export default AddModal