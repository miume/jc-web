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
                  <Col className='imgRequire'>产线</Col>
                  <Col span={18}><Input placeholder='请输入产线' defaultValue={this.props.editflag?this.props.record.cycleName:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col className='imgRequire'>所属工序</Col>
                  <Col span={18}><Input placeholder='所属工序' defaultValue={this.props.editflag?this.props.record.defaultDuration:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col  className='imgRequire'>物料种类</Col>
                  <Col span={18}><Input placeholder='请输入物料种类' defaultValue={this.props.editflag?this.props.record.startTime:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col  className='imgRequire'>PLC地址</Col>
                  <Col span={18}><Input placeholder='请输入PLC地址' defaultValue={this.props.editflag?this.props.record.startTime:''}/></Col>
              </Row>
          </div>
      );
  }
}
export default AddModal