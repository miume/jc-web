import React from 'react';
import {Form, Icon, Input} from 'antd';
import PictureUp from './upload'

class Tr extends React.Component{
    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        var array = [];
        for(var i=0;i<this.props.deviceSpotcheckModelsDetails.length;i++){
            array.push(i);
        }
        getFieldDecorator('keys', { initialValue: array });
        const keys = getFieldValue('keys');
        return(
            keys.map((k,index) => {
                return(
                    <div key={index}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <Form.Item>
                    {getFieldDecorator(`content[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.props.deviceSpotcheckModelsDetails[k]?this.props.deviceSpotcheckModelsDetails[k].spotcheckItems:undefined
                    })(
                        <Input placeholder='请输入项目名称' style={{width:'150px'}}/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator(`standard[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.props.deviceSpotcheckModelsDetails[k]?this.props.deviceSpotcheckModelsDetails[k].spotcheckContent:undefined
                    })(
                        <Input placeholder='请输入点检标准' style={{width:'150px'}}/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator(`frequency[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.props.deviceSpotcheckModelsDetails[k]?this.props.deviceSpotcheckModelsDetails[k].spotcheckPeriod:undefined
                    })(
                        <Input placeholder='请输入点检周期' style={{width:'150px'}}/>
                    )}
                </Form.Item>

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
                </div>
            </div>
                )
            })
        )
    }
}

export default Tr;
