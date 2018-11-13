import React from 'react';
import {Select,Input,Popover,Button,Checkbox,Row,Col} from 'antd';
import './editor.css';
const Option = Select.Option;
const approvalProcess = [{
    id:1,
    name:'流程1'
},{
    id:2,
    name:'流程2'
},{
    id:3,
    name:'流程3'
}]

const children = approvalProcess.map(p => 
    <Option key={p.id}>{p.name}</Option>
)
const text ='1111';
class Tr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            hovered: false,
        }
        this.hide = this.hide.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
    }
    hide(){
        this.setState({
            clicked:false
        })
    }
    handleClickChange(){
        this.setState({clicked:true})
    }
    render() {
        return (
            <tr className='tbody' id={this.props.value}>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Popover
                    content={(
                        <div>
                        {
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                            <Row>
                            {
                                approvalProcess.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                            }
                            </Row>
                            </Checkbox.Group>
                        }
                        <a onClick={this.hide}>Close</a>
                        </div>
                    )}
                    title="Click title"
                    trigger="click"
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}>
                    <Button>请选择测试项目</Button>
                    </Popover></td>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Select style={{width:'100%'}}>{children}</Select></td>
                <td><Input defaultValue='' placeholder='请输入测试频率' style={{border:'none',textAlign:'center'}} /></td>
                <td><Input defaultValue='' placeholder='请输入状态' style={{border:'none',textAlign:'center'}}/></td>
                <td><Input defaultValue='' placeholder='请输入备注' style={{border:'none',textAlign:'center'}}/></td>
                <td><a href='#' onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</a></td>
            </tr>
        );

    }
}
export default Tr;