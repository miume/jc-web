import React,{Component} from 'react'
import {Input,Row,Col} from 'antd'
import './add.css'
class AddModal extends Component{
  constructor(props){
      super(props)
  }
  render(){
      
      return(
          <div >
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col className='imgRequire'>周期名称</Col>
                  <Col span={18}><Input placeholder='请输入周期' defaultValue={this.props.editflag?this.props.record.cycleName:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col  className='imgRequire'>默认时长(天)</Col>
                  <Col span={18}><Input placeholder='请输入默认时长(天)' defaultValue={this.props.editflag?this.props.record.defaultDuration:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col  className='imgRequire'>开始时刻:</Col>
                  <Col span={18}><Input placeholder='请输入开始时刻' defaultValue={this.props.editflag?this.props.record.startTime:''}/></Col>
              </Row>
          </div>
      );
  }
}
export default AddModal