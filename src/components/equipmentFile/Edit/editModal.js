import React, { Component } from 'react';
import moment from 'moment';
import {Form,Col,Input,Select,DatePicker,Row,InputNumber,Upload,Button,Icon} from 'antd';
//import axios from 'axios';
const Option=Select.Option;
const FormItem=Form.Item;


  

class EditModal extends Component{
    constructor(props){
        super(props);
        this.state={
            dateString:this.props.record.installTime,
            fileList: [{//已经上传的文件列表（受控）
                uid: '-1',
                name:this.props.record.manualName ,
              }],
        }
      
        this.dateChange=this.dateChange.bind(this);
        this.dateOk=this.dateOk.bind(this);
        this.beforeUploadHandle=this.beforeUploadHandle.bind(this);
        this.fileRemove=this.fileRemove.bind(this);
    }
    dateChange(value, dateString) {
       this.setState({
           dateString:dateString
       });
      }
    dateOk(value) {
        //console.log('onOk: ', value);
      }

     // 拦截文件上传
    /**上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。*/
    beforeUploadHandle=(file)=>{
        console.log(file);
        this.setState(state => ({
          fileList: [...state.fileList, file],//将选择的上传的文件放到上传文件列表fileList中
        }));
        return false;
      }
    // 文件列表的删除
    fileRemove=(file)=>{
        this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();//返回一个子数组
            newFileList.splice(index, 1);//删除从index出开始的1个文件
            return {
              fileList: newFileList,
            };
          });
    }
      getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）,4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        const values= this.props.form.getFieldsValue();

        values['installTime']=this.state.dateString;
        values['id']=this.props.record.id;
        
        const { fileList } = this.state;
        console.log(fileList);
        const formData = new FormData();//文件信息和其他表单信息一起提交，这个时候需要用到formData()；通过append方法将数据逐条添加到formData中（tips:formData数据在console后只有一个空的对象，但是数据都在里面，要想获取数据需要调用formData.get()方法）；
        fileList.forEach((file) => {//将所有上传的文件都添加进数组
          formData.append('file', file);
        });
        console.log(formData.get('file'));
        // values为表单其他项的数据,在antd-pro中是values.f
        Object.keys(values).map((item)=>{
            //console.log(item);
            formData.append(item,values[item]);//FormData 对象用来保存key/value结构的数据
        })
        return formData;
    }
     render(){
            const { form } = this.props;
            const { getFieldDecorator } = form; 
           
            return(
                <Form horizontal='true' >
                  <Row>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                             {getFieldDecorator('name',{
                                 initialValue:this.props.record.archiveName,
                                 rules:[{required:true,message:'档案名称不能为空'}],
                              })(
                                 <Input placeholder='请输入档案名称' style={{width:'230px'}}/>
                              )
                             }
                        </FormItem>
                     </Col>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                                { getFieldDecorator('instrumentId',{
                                    initialValue:this.props.record.instrumentId,
                                    rules:[{required:true,message:'设备名称不能为空'}]
                                })(
                                    <Select placeholder='请选择设备名称' style={{width:'230px'}}>
                                       {
                                        this.props.equipmentBaseInstrument.map((item)=>{
                                            return(
                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                            )
                                        })
                                    }
                                    </Select>
                                )
                                }
                        </FormItem>
                     </Col>
                  </Row> 
                      <FormItem wrapperCol={{span:24}}>
                         { getFieldDecorator('installTime1',{
                                initialValue:moment(this.props.record.installTime,'YYYY-MM-DD HH:mm:ss'),
                                rules:[{required:true,message:'安装日期不能为空'}]
                                })(
                                 <DatePicker 
                                   showTime
                                   format="YYYY-MM-DD HH:mm:ss"
                                   onChange={this.dateChange}
                                   onOk={this.dateOk}
                                   placeholder='请选择安装日期' 
                                   style={{width:'300px'}}
                                  
                                  />
                                )
                                }
                        </FormItem>
                    <Row>
                        <Col span={12} style={{display:"block"}}>
                            <FormItem wrapperCol={{span:24}}>
                                {getFieldDecorator('warrantyPeriod',{
                                        initialValue:this.props.record.warrantyPeriod,
                                        rules:[{required:true,message:'保修期限不能为空'}]
                                    })(
                                        <InputNumber min={1} placeholder='请输入保修期限' style={{width:'230px'}}/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} style={{display:"block"}}>
                            <FormItem wrapperCol={{span:24}}>
                                    { 
                                    <span>(年)</span>
                                    }
                            </FormItem>
                       </Col>
                   </Row> 
                   <Row>
                     <Col span={12} style={{display:"block"}}>
                       <FormItem wrapperCol={{span:24}}>
                            {getFieldDecorator('supplyManufacturerId',{
                                initialValue:this.props.record.supplyManufacturerId,
                                rules:[{required:true,message:'供货厂家不能为空'}],
                            })(
                                <Select placeholder='请选择供货厂家' style={{width:'230px'}}>
                                   {
                                       this.props.supplyManufacture.map((item)=>{
                                            return(
                                                <Option key={item.id} value={item.id}>{item.name}</Option>     
                                            )
                                       })
                                   }
                                </Select>
                            )
                            }
                        </FormItem>
                     </Col>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                            { getFieldDecorator('supplyManufacturePhone',{
                                    initialValue:this.props.record.supplyManufacturePhone,
                                    rules:[{required:true,message:'供货厂家电话不能为空'}]
                                })(
                                    <Input placeholder='请输入供货厂家电话' style={{width:'230px'}}/>
                                )
                            }
                        </FormItem>
                     </Col>
                  </Row> 
                  <Row>
                     <Col span={12} style={{display:"block"}}>
                       <FormItem wrapperCol={{span:24}}>
                            {getFieldDecorator('repairManufacturerId',{
                                initialValue:this.props.record.repairManufacturerId,
                                rules:[{required:true,message:'维修厂家不能为空'}],
                            })(
                                <Select placeholder='请选择维修厂家' style={{width:'230px'}}>
                                    {
                                       this.props.repairManufacture.map((item)=>{
                                            return(
                                                <Option key={item.id} value={item.id}>{item.name}</Option>     
                                            )
                                       })
                                   }
                                </Select>
                            )
                            }
                        </FormItem>
                     </Col>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                            { getFieldDecorator('repairManufacturePhone',{
                                    initialValue:this.props.record.repairManufacturePhone,
                                    rules:[{required:true,message:'维修厂家电话不能为空'}]
                                })(
                                    <Input placeholder='请输入维修厂家电话' style={{width:'230px'}}/>
                                   
                                )
                            }
                        </FormItem>
                     </Col>
                  </Row> 
                  <Row>
                        <Col span={10} style={{display:"block"}}>
                            <FormItem wrapperCol={{span:24}}>
                                {  
                                    <Upload beforeUpload={this.beforeUploadHandle} onRemove={this.fileRemove} fileList={this.state.fileList}>
                                        <Button className='equipmentFile-upload-button'>
                                        <Icon type="upload" className='equipmentFile-upload-icon'/> 上传手册文件
                                        </Button>
                                    </Upload>
                                 
                                }
                            </FormItem>
                        </Col>
                        <Col span={14} style={{display:"block"}}>
                            <FormItem wrapperCol={{span:24}}>
                                {
                                    <span className='equipmentFile-upload-p'>支持文件格式: .pdf</span>
                                }
                            </FormItem>
                       </Col>
                   </Row> 
                </Form>
            );
        }
}
export default Form.create()(EditModal);