import React,{Component} from 'react'
import {Input,Row,Col} from 'antd'
import '../statisticalPeriod/add.css'
class AddModal extends Component{
  constructor(props){
      super(props)
  }
  render(){
      
      return(
          <div >
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col className='imgRequire'>PLC地址
                  </Col>
                  <Col span={18}><Input placeholder='请输入PLC地址' defaultValue={this.props.editflag?this.props.record.plcAddressName:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <label for='period' className='imgRequire'>地址说明</label>
                  <Col span={18}><Input placeholder='请输入地址说明' defaultValue={this.props.editflag?this.props.record.addressDescription:''}/></Col>
              </Row>
            
              
          </div>
      );
  }
}
export default AddModal