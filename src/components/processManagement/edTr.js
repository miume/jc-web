import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';

const Option = Select.Option;

class Tr extends React.Component{
    render(){
        const {details} = this.props
        const children = this.props.approvalProcess.map(p => 
            <Option className="option" id={p.id} key={p.id} value={p.id}>{p.name}</Option>
        )
            const { getFieldDecorator, getFieldValue } = this.props.form;
            var array = [];
            for(var i=0;i<this.props.details.length;i++){
                array.push(i);
            }
          getFieldDecorator('keys', { initialValue: array });
          const keys = getFieldValue('keys');
          // console.log(details[1]?details[1].userId:'')
          return(
                  keys.map((k, index) => {
                      return( 
                      <div key={index}>
                        <Form.Item
                          wrapperCol={{ span: 24 }}
                          style={{float:'left'}}
                        >
                          {getFieldDecorator(`persons[${k}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            initialValue:this.props.details[k]?this.props.details[k].userId:undefined
                            // rules: [{
                            //   required: true,
                            //   message: "请选择负责人",
                            // }],
                          })(
                            <Select placeholder="请选择负责人" style={{ width: '130px',marginRight:'8px'}}>
                              {children}
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                            >
                          {getFieldDecorator(`description[${k}]`,{
                            validateTrigger: ['onChange', 'onBlur'],
                            initialValue:this.props.details[k]?this.props.details[k].responsibility:undefined
                            // rules: [{
                            //   required: true,
                            //   message: "请输入职责",
                            // }],
                          })(
                            <Input placeholder="请输入职责" style={{ width: '88%', marginRight: 4 }} />
                          )}
                          {keys.length > 1 ? (
                            <Icon
                              className="dynamic-delete-button"
                              type="minus-circle-o"
                              disabled={keys.length === 1}
                              onClick={() => this.props.remove(k)}
                            />
                          ) : null}
                        </Form.Item>
                        </div>)
                  }
            )
          )
    }
}

export default Tr