import React from 'react';
import { Button, Modal, Form, Input,Select,DatePicker,TimePicker,Popover,Col,Checkbox,message  } from 'antd';
import axios from "axios";
import AddButton from '../BlockQuote/newButton'
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import moment from "moment";
// import WhiteSpace from '../BlockQuote/whiteSpace';
// import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;

const userId = localStorage.getItem('menuList')
let ob = JSON.parse(userId)

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const CollectionCreateForm = Form.create()(
    class extends React.Component{
        server
        Authorization
        constructor(props){
            super(props)
            this.state = {
                visible : false,
                person : [],
                factor : [],
                items : [],
                serialNumber : [],
                clicked: false,
            }
            this.handleClickChange = this.handleClickChange.bind(this);
            this.onChangeTime = this.onChangeTime.bind(this);
        }
        componentDidMount() {
            this.fetch();
        }
        componentWillUnmount() {
            this.setState = (state, callback) => {
              return ;
            }
        }
        handleClickChange(visible){
            this.setState({clicked:visible})
        }
        fetch = () =>{
            axios({
                url: `${this.server}/jc/common/authUser/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    person:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/deliveryFactory/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    factor:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/testItem/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    items:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/repoBaseSerialNumber/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    serialNumber:res
                  })
            })
        }
        onChangeTime = (date, dateString) => {
            console.log(date, dateString);
          }

        render(){
            this.Authorization = localStorage.getItem("Authorization");
            this.server = localStorage.getItem('remote');
            const {visible,form,onCancel,onCreate,onChange} = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    closable={false}
                    title="新增"
                    width="400px"
                    footer={[
                        <CancleButton key='back' handleCancel={onCancel}/>,
                        <SaveButton key="define" handleSave={onCreate} style='button' className='fa fa-check' />,
                        <AddButton key="submit" handleClick={onCreate} name='提交' style='button' className='fa fa-check' />
                      ]}
                >
                    <Form horizontal='true'>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请选择送样日期' }],
                            })(
                                <DatePicker onChange={this.onChangeTime} placeholder="请选择送样日期"/>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请选择送样时间' }],
                            })(
                                <TimePicker onChange={this.onChangeTime} placeholder="请选择时间"/>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: '请选择送样人' }],
                            })(
                                <Select placeholder="请选择送样人">
                                    {
                                        this.state.person.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('deliveryFactoryId', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select placeholder="请选择送样工厂">
                                    {
                                        this.state.factor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <Popover
                            content={(
                                <div style={{ width: '200px'}} >
                                 <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                 {
                                    this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                                 }
                                </Checkbox.Group>
                                </div>
                            )}
                            title="检测项目"
                            trigger="click"
                            width={170}
                            height={170}
                            visible={this.state.clicked}
                            onVisibleChange={this.handleClickChange}>
                        <Button style={{marginLeft:"73px"}}>{'请选择检测项目'}</Button>
                        </Popover>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请输入批号' }],
                            })(
                                <Select placeholder="请选择批号">
                                    {
                                        this.state.serialNumber.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.serialNumber}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('exceptionComment', {
                                rules: [{ required: true, message: '请输入异常备注' }],
                            })(
                                <Input placeholder="请输入异常备注"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
);

class AddModal extends React.Component{
    server
    Authorization
    state = {
        visible: false,
        createPersonId:ob.userId,
        status:null,
        id:null,
        acceptStatus:null,
        deliveryFactoryId:null,
        exceptionComment:'',
        sampleDeliveringDate:'',
        serialNumberId:null,
        testItemIds:[]
    };

    onChange = (checkedValues) =>{
        console.log(checkedValues)
        this.setState({
            testItemIds:checkedValues
        })
      }
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
        const form = this.formRef.props.form;
        form.validateFields((err,value)=>{
            if(err){
                return;
            }
            console.log(value)
            let date = moment(value.date).format("YYYY-MM-DD")
            let time = moment(value.time).format("HH:mm:ss")
            let dateTime = date + " " + time
            this.setState({
                status:1,
                id:value.id,
                acceptStatus:1,
                deliveryFactoryId:value.deliveryFactoryId,
                exceptionComment:value.exceptionComment,
                sampleDeliveringDate:dateTime,
                serialNumberId:value.serialNumberId,
            })
            let data = {commonBatchNumber:{createPersonId:this.state.createPersonId,status:this.state.status},details:{deliverer:{id:this.state.id},sampleDeliveringRecord:{
                acceptStatus:this.state.acceptStatus,deliveryFactoryId:this.state.deliveryFactoryId,exceptionComment:this.state.exceptionComment,sampleDeliveringDate:this.state.sampleDeliveringDate,serialNumberId:this.state.serialNumberId
            },testItemIds:this.state.testItemIds}}
            axios({
                url:`${this.server}/jc/common/sampleDeliveringRecord`,
                method:'post',
                headers:{
                    'Authorization': this.state.Authorization
                },
                data: data,
                type:'json'
            }).then((data)=>{
                message.info(data.data.message);
                this.props.fetch();
            })
        })
        this.setState({ visible: false });
    }

    render(){
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.onCreate}
                    onChange={this.onChange}
                />
            </span>
        )
    }
}

export default AddModal