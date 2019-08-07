import React from 'react';
import {Col, Divider, Input, Modal, Popconfirm, Radio, Row, Select} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import home from "../commom/fns";
import SaveButton from "../BlockQuote/saveButton";
import Table from "antd/lib/table";

class Mmodal3 extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible:false,
        }
        this.handleSave=this.handleSave.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onInputChange=this.onInputChange.bind(this)
    }

    render(){

        const { Option } = Select;
        this.column1=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检内容',
            dataIndex:'patrolContent',
            key:'patrolContent',
            width:'40%'
        }]
        this.column2=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'25%',
        },{
            title:'巡检位置',
            dataIndex:'locationName',
            key:'locationName',
            width:'75%'
        }]

        return(
            <span>
             <Modal
                 visible={this.props.visible}
                 closable={false}
                 centered={true}
                 maskClosable={false}
                 width="1000px"
                 height="464"
                 title="详情"
                 footer={[
                     <CancleButton key='cancel' handleCancel={this.props.onCanCel} />]}
             >
                 <Row>
                          <Col span={6} style={{paddingTop:8}}>所属车间:&nbsp;{this.props.workshop}</Col>
                          <Col span={9}>
                              <div className="example-input">巡检模板名称:<Input value={this.props.patrolName} size="small" disabled/> </div></Col>
                          <Col span={9} >
                              <div>
                                  检查类型:
                                <Select value={this.props.checkType} style={{ width: 240 ,paddingLeft:20}} disabled >
                                    <Option value="jack">Jack</Option>
                                </Select>
                              </div>
                          </Col>s
                 </Row>
                 <Row type="flex" justify="start" style={{paddingTop:15,paddingBottom:15}}>
                     <Col span={6} > <div className="example-input2">制&nbsp;&nbsp;表&nbsp;&nbsp;人:<Input value={this.props.setPeople} size="small" disabled/></div></Col>
                          <Col span={9}><div className="example-input">制&nbsp;&nbsp;表&nbsp;&nbsp;日&nbsp;&nbsp;期:&nbsp;&nbsp;<Input placeholder={this.props.tabulatedate} size="small" disabled/> </div></Col>

                 </Row>


                 <div className="inspection-Table">
                 <div className="inspection-Left-Table">
                     <span>项目名称：</span>
                     <span> &nbsp;</span>
                     <Table
                         columns={this.column1}
                         size="small"
                         dataSource={this.props.devicePatrolModelsItemDetailsList}
                     />



                 </div>

                 <div className="inspection-Right-Table">
                     <span>巡检区域：</span>
                      <span> &nbsp;</span>
                     <Table
                         columns={this.column2}
                         size="small"
                         dataSource={this.props.devicePatrolModelsLocationDetails}
                     />

                 </div>
                 </div>
            </Modal>
        </span>
        )
    }
    handleSave=()=>{
        console.log('保存成功')

    }
    handleChange=(value)=>{
        console.log(value)
    }

    addtable=()=>{
        console.log('左边表格增加1')
    }
    addtable2=()=>{
        console.log('右边表格增加1')
        this.setState({
            visible:true
        })
    }
    handleok=()=>{
        this.setState({
            visible:false
        })
        console.log('地点增加完成')
    }
    handleCancle=()=>{
        this.setState({
            visible:false
        })
        console.log(this.props.detailData)
    }
    onInputChange=(e)=>{
        let InputName=e.target.name;
        let InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,
        })
    }
}

export default  Mmodal3