import React,{Component} from 'react';
import axios from 'axios';
import {Input,Form,Select, Checkbox,Modal,message,TreeSelect} from 'antd'
import NewButton from '../../BlockQuote/newButton'
import CancleButton from '../../BlockQuote/cancleButton'
const FormItem=Form.Item;
const Option=Select.Option;
const { TreeNode } = TreeSelect;

class Add extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
        };
        this.handleEdit=this.handleEdit.bind(this);
    }
    showModal=()=>{
        this.setState({
            visible:true
        })
    };
    handleCancel=()=>{//新增和删除的取消写成了一个
        this.setState({
            visible:false
        });
        this.props.form.resetFields();//重置表单
    }
    handleAdd=()=>{
        this.setState({
            visible:false
        })
        const value=this.props.form.getFieldsValue();
       // console.log(value)
    }

    handleEdit=()=>{
        this.setState({
            visible:false
        })
        var values=this.props.form.getFieldsValue();
        console.log(values)
    }

    /**更新数据或新增数据*/
    handleData(data) {
        let url = `${this.props.url.materialInfo.add}`, method = 'POST',
            {editFlag, record} = this.props;
        //更新物料信息对应的接口和方法
        if(editFlag) {
            url = `${this.props.url.materialInfo}/${record.id}`;
            method = 'PUT';
            data['id'] = record.id;
        }
        axios({
            url: url,
            method: method,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: data,
            type: 'json'
        }).then(data => {
            message.info(data.data.mesg);
            if(data.data.code === 0) {
                let res = data.data.data;
                console.log(res)
            }
            this.setState({
                loading: false
            })
        })
    }

    render(){

        const {form}=this.props;
        const {getFieldDecorator}=form;
        const obj=this.props.editFlag? {
            initialValue:this.props.record.materialType,
            rules:[{required:true,message:'请选择物料类型'}]
        }:{
            rules:[{required:true,message:'请选择物料类型'}]
        };//判断物料类型是否显示初始值，编辑需要显示此条记录值，新增不需要
        return(
          <span>
                {this.props.editFlag?<span className='blue' onClick={this.showModal}>编辑</span>
                :<NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                }
                <Modal
                    title={this.props.editflag?'编辑数据':'新增数据'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={()=>this.handleCancel()} />,
                        <NewButton key='add' className='fa fa-check' handleClick={this.props.editflag?()=>this.handleEdit():()=>this.handleAdd()} name='确定'/>
                    ]}
                >
                    <Form horizontal='true'>
                        <FormItem label='物料名称' wrapperCol={{span:18}} required>
                            {getFieldDecorator('materialName',{
                            initialValue: this.props.editFlag? this.props.record.materialName : '',
                            rules:[{required:true,message:'物料名称不能为空'}],
                            })(//返回一个函数，再调用一个()
                            <Input placeholder='请输入物料名称'></Input>
                            )}
                        </FormItem>
                        <FormItem label='物料类型' wrapperCol={{span:18}} required>
                            {getFieldDecorator('materialType',obj)(
                            <Select placeholder='请选择物料类型' >
                                <Option key='1' value='1'>原材料</Option>
                                <Option key='2' value='2'>中间品</Option>
                                <Option key='3' value='3'>成品  </Option>
                            </Select>
                            )}
                        </FormItem>
                        <FormItem label='所含金属' wrapperCol={{span:18}} required>
                            {getFieldDecorator('metal',{
                            initialValue:this.props.editflag? this.props.record.metal : [],
                            rules:[{required:true,message:'请选择所含金属'}]
                            })(
                            <Checkbox.Group style={{width:'100%'}}>
                                <Checkbox style={{width:'90px'}} value='Ni'>Ni</Checkbox>
                                <Checkbox style={{width:'90px'}} value='Co'>Co</Checkbox>
                                <Checkbox style={{width:'90px'}} value='Mn'>Mn</Checkbox>
                            </Checkbox.Group>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
          </span>
        );
    }
}
export default Form.create()(Add);
