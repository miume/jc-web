import React from 'react';
import axios from 'axios';
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
    <Option key={p.id} value={p.id}>{p.name}</Option>
)
class Tr extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.getAllProductLine();
        this.getAllProductionProcess();
        this.getAllTestItem();
        this.getAllUser();
    }
    componentWillMount(){
        this.setState = ()=>{
          return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            hovered: false,
            allProductLine : [],      //存取所有产品线
            allProductionProcess : [],//存取所有产品工序
            allTestItem : [],         //存取所有检测项目
            allUser : [],             //存取所有用户
        }
        this.hide = this.hide.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
        this.getAllProductLine = this.getAllProductLine.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
    }
     /**获取所有产品线 */
     getAllProductLine(){
        axios({
          url:`${this.server}/jc/common/productLine/getAll`,
          method:'get',
          headers:{
            'Authorization':this.Authorization
          }
        }).then(data=>{
          const res = data.data.data;
          this.setState({
              allProductLine : res
          })
      })
    }
    /**获取所有产品工序 */
    getAllProductionProcess(){
      axios({
        url:`${this.server}/jc/common/productionProcess/getAll`,
        method:'get',
        headers:{
          'Authorization':this.Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        const children = res.map(p => 
            <Option key={p.id}>{p.name}</Option>
            )
        this.setState({
          allProductionProcess : children
      })
    })  
    }
    /**获取所有检测项目 */
    getAllTestItem(){
      axios({
        url:`${this.server}/jc/common/testItem/getAll`,
        method:'get',
        headers:{
          'Authorization':this.Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        const children = res.map(p => 
            <Option key={p.id}>{p.name}</Option>
            )
        this.setState({
          allTestItem : children
      })
    })   
    }
    /**获取所有用户 */
    getAllUser(){
      axios({
        url:`${this.server}/jc/common/authUser/getAll`,
        method:'get',
        headers:{
          'Authorization':this.Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        const children = res.map(p => 
            <Option key={p.id}>{p.name}</Option>
            )
        this.setState({
          allUser : children
      })
    })   
    }
    hide(){
        this.setState({
            clicked:false
        })
    }
    handleClickChange(visible){
        this.setState({clicked:visible})
    }
    render() {
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        console.log(this.state.allProductLine)
        return (
            <tr className='tbody' id={this.props.value}>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择产品线'>{this.state.allProductLine}</Select></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择工序'>{this.state.allProductionProcess}</Select></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择产品线'>{this.state.allProductLine}</Select></td>
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
                        <span className='blue' onClick={this.hide}>Close</span>
                        </div>
                    )}
                    title="检测项目"
                    trigger="click"
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}>
                    <Button>请选择测试项目</Button>
                    </Popover></td>
                <td><Select style={{width:'100%',border:'none'}}>{children}</Select></td>
                <td><Select style={{width:'100%',border:'none'}}>{children}</Select></td>
                <td><Input defaultValue='' placeholder='请输入测试频率' style={{border:'none',textAlign:'center'}} /></td>
                <td><Input defaultValue='' placeholder='请输入状态' style={{border:'none',textAlign:'center'}}/></td>
                <td><Input defaultValue='' placeholder='请输入备注' style={{border:'none',textAlign:'center'}}/></td>
                <td><span className='blue' onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
            </tr>
        );

    }
}
export default Tr;