import React, { Component } from 'react';
import moment from 'moment';
import {Form,Col,Input,Select,DatePicker,Row,InputNumber} from 'antd';
const Option=Select.Option;
const FormItem=Form.Item;


class EditModal extends Component{
        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form; 
            return(
                <Form horizontal='true' >
                  <Row>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                             {getFieldDecorator('archiveName',{
                                 initValue:'',
                                 rules:[{required:true,message:'档案名称不能为空'}],
                              })(
                                 <Input placeholder='请输入档案名称' style={{width:'230px'}}/>
                              )
                             }
                        </FormItem>
                     </Col>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                                { getFieldDecorator('instrumentName',{
                                    initValue:'',
                                    rules:[{required:true,message:'设备名称不能为空'}]
                                })(
                                    <Select placeholder='请选择设备名称' style={{width:'230px'}}>
                                    </Select>
                                )
                                }
                        </FormItem>
                     </Col>
                  </Row> 
                      <FormItem wrapperCol={{span:24}}>
                         { getFieldDecorator('installTime',{
                                initValue:'',
                                rules:[{required:true,message:'安装日期不能为空'}]
                                })(
                                 <DatePicker placeholder='请选择安装日期' style={{width:'300px'}}/>
                                )
                                }
                        </FormItem>
                    <Row>
                        <Col span={12} style={{display:"block"}}>
                            <FormItem wrapperCol={{span:24}}>
                                {getFieldDecorator('warrantyPeriod',{
                                        initValue:'',
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
                            {getFieldDecorator('supplyManufacture',{
                                initValue:'',
                                rules:[{required:true,message:'供货厂家不能为空'}],
                            })(
                                <Select placeholder='请选择供货厂家' style={{width:'230px'}}></Select>
                            )
                            }
                        </FormItem>
                     </Col>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                            { getFieldDecorator('supplyManufacturePhone',{
                                    initValue:'',
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
                            {getFieldDecorator('repairManufacture',{
                                initValue:'',
                                rules:[{required:true,message:'维修厂家不能为空'}],
                            })(
                                <Select placeholder='请选择维修厂家' style={{width:'230px'}}></Select>
                            )
                            }
                        </FormItem>
                     </Col>
                     <Col span={12} style={{display:"block"}}>
                        <FormItem wrapperCol={{span:24}}>
                            { getFieldDecorator('repairManufacturePhone',{
                                    initValue:'',
                                    rules:[{required:true,message:'维修厂家电话不能为空'}]
                                })(
                                    <Input placeholder='请输入维修厂家电话' style={{width:'230px'}}/>
                                   
                                )
                            }
                        </FormItem>
                     </Col>
                  </Row> 
                </Form>
            );
        }
}
export default Form.create()(EditModal);