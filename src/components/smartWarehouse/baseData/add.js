import React,{Component} from 'react';
import axios from 'axios';
import {Input,Form, Checkbox,Modal,message,TreeSelect} from 'antd'
import NewButton from '../../BlockQuote/newButton'
import CancleButton from '../../BlockQuote/cancleButton'
const FormItem=Form.Item;

class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
        };
        this.handleEdit=this.handleEdit.bind(this);
        this.showModal=this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleData=this.handleData.bind(this);
        this.getMaterialType = this.getMaterialType.bind(this);
        this.treeDataProcessing = this.treeDataProcessing.bind(this);
    }
    showModal() {
        this.getMaterialType();
        this.setState({
            visible:true
        })
    };

    /**获取所有物料类型树形结构*/
    getMaterialType() {
        axios({
            url: `${this.props.url.materialType.all}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data, treeData = [];
            treeData = this.treeDataProcessing(res)
            this.setState({
                treeData: treeData
            });
        })
    }

    /**处理物料信息树形结构*/
    treeDataProcessing(res, result = []) {
        for(let i = 0; i < res.length; i++) {
            let temp = {
                title: res[i]['typeName'],
                key: res[i]['id'],
                value: res[i]['typeName']+'-'+res[i]['id'],
                children: []
            }, children = res[i]['children'];

            children = children && children.length ? this.treeDataProcessing(children,[]) : [];
            temp.children = children;
            result.push(temp)
        }
        return result;
    }

    /**新增和删除的取消弹出框*/
    handleCancel() {
        this.setState({
            visible:false
        });
        this.props.form.resetFields();//重置表单
    }

    /**点击保存*/
    handleEdit() {
        let values=this.props.form.getFieldsValue();
        if(!values.materialName || !values.materialTypeId) {
            message.info('物料名称和物料类型不能为空！');
            return;
        } else {
            values.materialTypeId = values.materialTypeId.split('-')[1];
            values['ni'] = values.metal.indexOf('ni') > -1 ? 1 : 0;
            values['co'] = values.metal.indexOf('co') > -1 ? 1 : 0;
            values['mn'] = values.metal.indexOf('mn') > -1 ? 1 : 0;
            delete values['metal'];
            console.log(values)
            //this.handleData(values)
        }
    }

    /**更新数据或新增数据*/
    handleData(data) {
        this.setState({
            visible:false
        });
        let url = `${this.props.url.materialInfo.add}`, method = 'POST',
            {editFlag, record} = this.props;
        //更新物料信息对应的接口和方法
        if(editFlag) {
            url = `${this.props.url.materialInfo.materialInfo}/${record.id}`;
            method = 'PUT';
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
            this.props.getTableData();
        })
    }

    render(){
        let {form,record}=this.props,{getFieldDecorator}=form,
            obj=this.props.editFlag? {
            initialValue: record.material + '-'+ record.materialTypeId,
            rules:[{required:true,message:'请选择物料类型'}]
        }:{
            initialValue: '',
            rules:[{required:true,message:'请选择物料类型'}]
        };//判断物料类型是否显示初始值，编辑需要显示此条记录值，新增不需要
        return(
          <span>
                {this.props.editFlag?<span className='blue' onClick={this.showModal}>编辑</span>
                :<NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                }
                <Modal
                    title={this.props.editFlag?'编辑数据':'新增数据'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={()=>this.handleCancel()} />,
                        <NewButton key='add' className='fa fa-check' handleClick={this.handleEdit} name='确定'/>
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
                            {getFieldDecorator('materialTypeId',obj)(
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={this.state.treeData}
                                    placeholder="请选择物料类型"
                                    treeDefaultExpandAll
                                />
                            )}
                        </FormItem>
                        <FormItem label='所含金属' wrapperCol={{span:18}} required>
                            {getFieldDecorator('metal',{
                            initialValue:this.props.editFlag? this.props.record.metal : [],
                            rules:[{required:true,message:'请选择所含金属'}]
                            })(
                            <Checkbox.Group style={{width:'100%'}}>
                                <Checkbox style={{width:'90px'}} value='ni'>Ni</Checkbox>
                                <Checkbox style={{width:'90px'}} value='co'>Co</Checkbox>
                                <Checkbox style={{width:'90px'}} value='mn'>Mn</Checkbox>
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
