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
                  <Col className='imgRequire fontAdd'>物料种类名称:</Col>
                  <Col span={18}><Input placeholder='请输入物料种类名称' defaultValue={this.props.editflag?this.props.record.materialTypeName:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col className='imgRequire fontAdd'>数据类型:</Col>
                  <Col span={18}><Input placeholder='请输入数据类型' defaultValue={this.props.editflag?this.props.record.ownProcess:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col className='imgRequire fontAdd'>所属工序:</Col>
                  <Col span={18}><Input placeholder='请输入所属工序' defaultValue={this.props.editflag?this.props.record.dataType:''}/></Col>
              </Row>
              <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                  <Col className='imgRequire fontAdd'>产线:</Col>
                  <Col span={18}><Input placeholder='请输入产线' defaultValue={this.props.editflag?this.props.record.productline:''}/></Col>
              </Row>
          </div>
      );
  }
}
export default AddModal