import React from 'react';
import axios from 'axios';
import {Select,Input,Popover,Button,Checkbox,Row,Col} from 'antd';
import './editor.css';
const Option = Select.Option;
// const approvalProcess = [{
//     id:1,
//     name:'流程1'
// },{
//     id:2,
//     name:'流程2'
// },{
//     id:3,
//     name:'流程3'
// }]

// const children = approvalProcess.map(p => 
//     <Option key={p.id} value={p.id}>{p.name}</Option>
// )
class Tr extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.getAllProductLine();
        this.getAllProductionProcess();
        this.getAllTestItem();
        this.getAllUser();
        this.getAllTestMaterial();
    }
    // componentWillMount(){
    //     this.setState = ()=>{
    //       return;
    //     }
    // }
    constructor(props){
        super(props);
        this.state = {
            detail:{
                id:this.props.value,
                comment:'',
                procedureId:-1,
                productLineId:-1,
                samplePointName:'',
                sampler:-1,
                testFrequency:'',
                testMaterialId:-1,
                tester:-1,
                testItems:[]
            },
            clicked: false,
            hovered: false,
            allProductLine : [],      //存取所有产品线
            allProductionProcess : [],//存取所有产品工序
            allTestItem : [],         //存取所有检测项目
            allUser : [],             //存取所有用户
            allTestMaterial: [],   //存取所有送检物料,
            // testItems:[],          //存取检测项目
            // productLineId:-1,      //存取产品线
            // procedureId:-1 ,       //存取工序ID
            // sampler:-1,            //存取取样人角色id
            // tester:-1,             //存取检测人角色id
            // testFrequency:'',      //存取频次的内容
            // testMaterialId:-1,     //存取检测物料id
            // comment:''             //存取备注
        }
        this.hide = this.hide.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
        this.getAllProductLine = this.getAllProductLine.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
        this.getAllTestMaterial = this.getAllTestMaterial.bind(this);
        this.onChange = this.onChange.bind(this);
        this.productLineChange = this.productLineChange.bind(this);
        this.productionProcessChange = this.productionProcessChange.bind(this);
        this.samplePointName = this.samplePointName.bind(this);
        this.sampler = this.sampler.bind(this);
        this.tester = this.tester.bind(this);
        this.testFrequency = this.testFrequency.bind(this);
        this.testMaterialId = this.testMaterialId.bind(this);
        this.comment = this.comment.bind(this);
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
          const children = res.map(e=>{
              return <Option key={e.id} value={e.id}>{e.name}</Option>
          })
          this.setState({
              allProductLine : children
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
            <Option key={p.id} value={p.id}>{p.name}</Option>
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
        this.setState({
          allTestItem : res
      })
    })   
    }
    /**获取所有用户 */
    getAllUser(){
      axios({
        url:`${this.server}/jc/auth/role/getAll`,
        method:'get',
        headers:{
          'Authorization':this.Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        const children = res.map(p => 
            <Option key={p.id} value={p.id}>{p.roleName}</Option>
            )
        this.setState({
          allUser : children
      })
    })   
    }
    /**获取所有受检物料 */
    getAllTestMaterial(){
        axios({
            url:`${this.server}/jc/common/repoBaseSerialNumber/getAll`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            const children = res.map(e=>{
                return <Option key={e.id} value={e.id}>{e.materialName}</Option>
            })
            this.setState({
                allTestMaterial:children
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
    /**下拉面板checkbox的变化 */
    onChange(checkedValues){
        const {detail} = this.state;
        detail.testItems = checkedValues
        this.setState({
            detail:detail
        })
        // console.log(checkedValues)
    }
    /**监控产品线下拉框的变化 */
    productLineChange(value){
        const {detail} = this.state;
        detail.productLineId = value
        this.setState({
            detail:detail
        })
    }
    /**监控工序下拉框的变化 */
    productionProcessChange(value){
        const {detail} = this.state;
        detail.procedureId = value
        this.setState({
            detail:detail
        })
    }
    /**监控取样点输入框的变化 */
    samplePointName(e){
        const value = e.target.value;
        const {detail} = this.state;
        detail.samplePointName = value
        this.setState({
            detail:detail
        })
        // this.setState({
        //     samplePointName:value
        // })
    }
    /**监控下拉框取样人的变化 */
    sampler(value){
        const {detail} = this.state;
        detail.sampler = value
        this.setState({
            detail:detail
        })
    }
    /**监控检测人下拉框的变化 */
    tester(value){
        const {detail} = this.state;
        detail.tester = value
        this.setState({
            detail:detail
        })
    }
    /**监控频次的变化 */
    testFrequency(e){
        const value = e.target.value;
        const {detail} = this.state;
        detail.testFrequency = value
        this.setState({
            detail:detail
        })
    }
    /**监控受检物料下拉框的变化 */
    testMaterialId(value){
        const {detail} = this.state;
        detail.testMaterialId = value
        this.setState({
            detail:detail
        })
    }
    /**监控备注的变化 */
    comment(e){
        const value = e.target.value;
        const {detail} = this.state;
        detail.comment = value
        this.setState({
            detail:detail
        })
    }
    render() {
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        this.props.getData(this.state.detail)
        return (
            <tr className='tbody' id={this.props.value}>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择产品线' onChange={this.productLineChange}>{this.state.allProductLine}</Select></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择工序' onChange={this.productionProcessChange}>{this.state.allProductionProcess}</Select></td>
                <td><Input defaultValue='' placeholder='请输入取样点' style={{border:'none',textAlign:'center'}} onChange={this.samplePointName}/></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择取样人' onChange={this.sampler}>{this.state.allUser}</Select></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='请选择检测人' onChange={this.tester}>{this.state.allUser}</Select></td>
                <td><Popover
                    content={(
                        <div style={{ width: '200px'}} >
                         <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                         {
                            this.state.allTestItem.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                         }
                        </Checkbox.Group>
                        {/* <div onClick={this.hide} style={{display:'flex'}}><div><Button className='blue' size='small' onClick={this.hide}>取消</Button></div><div></div><div><Button className='button' size='small' onClick={this.hide} >确定</Button></div></div> */}
                        </div>
                    )}
                    title="检测项目"
                    trigger="click"
                    width={170}
                    height={170}
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}>
                    <Button>请选择测试项目</Button>
                    </Popover></td>
                
                <td><Input defaultValue='' placeholder='请输入频次' style={{border:'none',textAlign:'center'}} onChange={this.testFrequency}/></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='受检物料' onChange={this.testMaterialId}>{this.state.allTestMaterial}</Select></td>
                <td><Input defaultValue='' placeholder='请输入备注' style={{border:'none',textAlign:'center'}} onChange={this.comment}/></td>
                <td><span className='blue' onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
            </tr>
        );

    }
}
export default Tr;