import React from 'react';
import { Form,Checkbox,Col,Select,Input} from 'antd';
const FormItem = Form.Item;
const Option=Select.Option;
class RawMaterialAddModal extends React.Component{
    constructor(props){
        super(props);
        this.checkboxChange=this.checkboxChange.bind(this);
    }
    checkboxChange(value){//获取选择复选框的id
        // console.log(value);
        this.props.checkboxChange(value);
    }
  
    getItemsValue = ()=>{ 
        const values= this.props.form.getFieldsValue();
        return values;//用来得到新增框中填写的新值
    }
     /**重置组件的值 */
     resetField=()=>{
      this.props.form.resetFields();
  }

    render(){
        const { form } = this.props;
        const { getFieldDecorator } = form;   
        return(
            <Form horizontal='true' >
              <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('materialName',{
                    
                    rules:[{required:true,message:'请输入原材料名称'}]
                })(
                    <Input placeholder="请输入原材料名称(必填)" key="materialName"/>

                )}
                </FormItem>
              <FormItem wrapperCol={{span:24}} >
                <div className='rawStandardCheckBox'>
                    <Checkbox.Group style={{ width: "100%" }} onChange={this.checkboxChange}>
                    {
                        this.props.items.map(p=>
                        <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                    }
                    </Checkbox.Group>
                </div>
              </FormItem>
            </Form>
        );
    }
}

{/*<Select  placeholder='请选择原材料' style={{height:'24px'}}>*/}
    {/*{*/}
        {/*this.props.rawData.map((data)=>{*/}

            {/*// <Option key={Object.keys(data)[0]} value={Object.keys(data)[0]}>{data[Object.keys(data)[0]]}</Option>*/}
            {/*return(*/}
                {/*<Option key={data.id} value={data.id}>{data.manufacturer}</Option>*/}
            {/*)*/}
        {/*})*/}
    {/*}*/}
{/*</Select>*/}
export default Form.create()(RawMaterialAddModal);
