import React,{Component} from 'react';
import {Input,Form} from 'antd';
const EditableContext = React.createContext(); // ??这个是什么作用
//创建一个Context对象，
//假设我们有很多个组件，我们只需要在父组件使用Provider提供数据，
//然后我们就可以在子组件任何位置使用Consumer拿到数据，不存在跨组件的问题
//Provider有一个参数value
//在Provider组件内遍历子组件，
//如果组件是Consumer的话，就返回一个组件，并将value作为值传递给新创建的子组件Consumer
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
    getInput = () => {
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;//getFieldDecorator用于和表单进行双向绑定
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: ` ${title}不能为空!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }
  export default EditableCell;