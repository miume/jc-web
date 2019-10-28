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
                  <Col className='imgRequire'>工序名称
                  </Col>
                  <Col span={18}><Input placeholder='请输入工序名称' defaultValue={this.props.editflag?this.props.record.processName:''}/></Col>
              </Row>
            
              
          </div>
      );
  }
}
export default AddModal