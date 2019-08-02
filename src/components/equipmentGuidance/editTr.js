import React from 'react';
import {Col, Form, Icon, Input, Row} from 'antd';
import PictureUp from './upload'

class Tr extends React.Component{
    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        var array = [];
        for(var i=0;i<this.props.content.length;i++){
            array.push(i);
        }
        getFieldDecorator('keys', { initialValue: array });
        const keys = getFieldValue('keys');
        return(
            keys.map((k,index) => {
                return(
                    <div key={index}>
                        <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item >
                                {getFieldDecorator(`content[${k}]`,{
                                    validateTrigger: ['onChange', 'onBlur'],
                                    initialValue:this.props.content[k]?this.props.content[k].checkContent:undefined
                                })(
                                    <Input placeholder='每日点检内容' style={{width:'130px'}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                {getFieldDecorator(`standard[${k}]`,{
                                    validateTrigger: ['onChange', 'onBlur'],
                                    initialValue:this.props.content[k]?this.props.content[k].checkStandard:undefined
                                })(
                                    <Input placeholder='检查标准' style={{width:'130px'}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                {getFieldDecorator(`frequency[${k}]`,{
                                    validateTrigger: ['onChange', 'onBlur'],
                                    initialValue:this.props.content[k]?this.props.content[k].checkFrequency:undefined
                                })(
                                    <Input placeholder='频次' style={{width:'120px'}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Form.Item style={{marginRight: 4 }}>
                            {
                                <PictureUp k={k} handleChange={this.props.handleChange} fileList={this.props.state[`fileList${k}`]}/>
                            }
                        </Form.Item>
                        <Form.Item>
                            {keys.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    disabled={keys.length === 1}
                                    onClick={() => this.props.remove(k)}
                                />
                            ) : null}
                        </Form.Item>
                        </Row>
                    </div>
                )
            })
        )
    }
}

export default Tr;