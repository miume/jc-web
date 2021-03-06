import React from 'react';
import axios from 'axios';
import {Select,Input,Popover,Button,Checkbox,Col} from 'antd';
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
    componentDidMount(){
        // this.getTrData();
        // this.getAllUser();
        // this.getAllTestItem();
        // this.getAllProductLine();
        // this.getAllTestMaterial();
        // this.getAllProductionProcess();
    }
    constructor(props){
        super(props);
        this.state = {
            detail:{
                id:this.props.id,
                procedureTestRecord:{
                    comment:'',
                    procedureId:-1,
                    deliveryFactoryId:-1,
                    samplePointName:'',
                    sampler:-1,
                    testFrequency:'',
                    serialNumberId:-1,
                    tester:-1,
                },
                testItemIds:[]
            },
            clicked: false,
            hovered: false,
            allProductLine : [],      //存取所有产品线
            allProductionProcess : [],//存取所有产品工序
            allTestItem : [],         //存取所有检测项目
            allUser : [],             //存取所有用户
            allTestMaterial: [],   //存取所有送检物料,
            testItems: '',          //存取检测项目
            testItemIds:[]
            // deliveryFactoryId:-1,      //存取产品线
            // procedureId:-1 ,       //存取工序ID
            // sampler:-1,            //存取取样人角色id
            // tester:-1,             //存取检测人角色id
            // testFrequency:'',      //存取频次的内容
            // serialNumberId:-1,     //存取检测物料id
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
        this.serialNumberId = this.serialNumberId.bind(this);
        this.comment = this.comment.bind(this);
        this.getTrData = this.getTrData.bind(this);
    }
     /**获取所有送样工厂 */
     getAllProductLine(){
        axios({
          url:`${this.props.url.deliveryFactory.deliveryFactory}`,
          method:'get',
          headers:{
            'Authorization':this.props.url.Authorization
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
        url:`${this.props.url.productionProcess.productionProcess}`,
        method:'get',
        headers:{
          'Authorization':this.props.url.Authorization
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
        url:`${this.props.url.testItems.testItems}`,
        method:'get',
        headers:{
          'Authorization':this.props.url.Authorization
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
        url:`${this.props.url.role.getAll}`,
        method:'get',
        headers:{
          'Authorization':this.props.url.Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        const children = res.map(p =>
            <Option key={p.id} value={p.id}>{p.description}</Option>
            )
        this.setState({
          allUser : children
      })
    })
    }
    /**获取所有受检物料 */
    getAllTestMaterial(){
        axios({
            url:`${this.props.url.serialNumber.serialNumber}?materialClass=2`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
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
        const {detail,allTestItem} = this.state;
        detail.testItemIds = checkedValues;
        var testItems = '';
        for(var i = 0; i < allTestItem.length; i++){
            for(var j = 0; j < checkedValues.length; j++){
                if(checkedValues[j] === allTestItem[i].id && j < checkedValues.length-1){
                    testItems += allTestItem[i].name + ',';
                }
                if(checkedValues[j] === allTestItem[i].id && j === checkedValues.length-1){
                    testItems += allTestItem[i].name;
                }
            }
        }
        var testItem = testItems.split(' ');
        /**如果检测项目超过两个，则只显示两个检测项目，其他的隐藏 */
        const length = testItem.length;
        if(length>4){
            testItems = testItem[0]+' '+testItem[1]+' '+testItem[2]+' '+testItem[3]+'...';
        }
        this.setState({
            detail:detail,
            testItems:testItems
        })
        // console.log(checkedValues)
    }
    /**监控产品线下拉框的变化 */
    productLineChange(value){
        const {detail} = this.state;
        detail.procedureTestRecord.deliveryFactoryId = value
        this.setState({
            detail:detail
        })
    }
    /**监控工序下拉框的变化 */
    productionProcessChange(value){
        const {detail} = this.state;
        detail.procedureTestRecord.procedureId = value
        this.setState({
            detail:detail
        })
    }
    /**监控取样点输入框的变化 */
    samplePointName(e){
        const value = e.target.value;
        const {detail} = this.state;
        detail.procedureTestRecord.samplePointName = value
        this.setState({
            detail:detail
        })
    }
    /**监控下拉框取样人的变化 */
    sampler(value){
        const {detail} = this.state;
        detail.procedureTestRecord.sampler = value
        this.setState({
            detail:detail
        })
    }
    /**监控检测人下拉框的变化 */
    tester(value){
        const {detail} = this.state;
        detail.procedureTestRecord.tester = value
        this.setState({
            detail:detail
        })
    }
    /**监控频次的变化 */
    testFrequency(e){
        const value = e.target.value;
        const {detail} = this.state;
        detail.procedureTestRecord.testFrequency = value
        this.setState({
            detail:detail
        })
    }
    /**监控受检物料下拉框的变化 */
    serialNumberId(value){
        const {detail} = this.state;
        detail.procedureTestRecord.serialNumberId = value
        this.setState({
            detail:detail
        })
    }
    /**监控备注的变化 */
    comment(e){
        const value = e.target.value;
        const {detail} = this.state;
        detail.procedureTestRecord.comment = value
        this.setState({
            detail:detail
        })
    }
    getTrData(){
        var {detail} = this.state;
        const allTestItem = this.props.allTestItem;
        if(allTestItem){
            const d = this.props.value;
            const items = d.testItems?d.testItems.split(','):[];
            var testItemIds = [];
            /**将查到的testItems字符串转换为id数组 */
            for(var i = 0; i < allTestItem.length; i++){
                for(var j = 0; j < items.length; j++){
                    if(items[j] === allTestItem[i].name ){
                        testItemIds.push(allTestItem[i].id)
                    }
                }
        }
        //console.log(testItemIds)
        detail = {
            id:this.props.id,
            procedureTestRecord:{
                comment:d.comment,
                procedureId:d.procedureId,
                deliveryFactoryId:d.deliveryFactoryId,
                samplePointName:d.samplePointName,
                sampler:d.sampler,
                testFrequency:d.testFrequency,
                serialNumberId:d.serialNumberId,
                tester:d.tester,
            },
            testItemIds:testItemIds
        }
        this.setState({
            detail:detail,
            testItems:d.testItems,
            testItemIds:testItemIds
        })
        }

    }
    render() {
        // this.props.getData(this.state.detail)
        const d = this.props.value;
        const {testItemIds} = this.state;
        const allTestItem = this.props.allTestItem?this.props.allTestItem:this.state.allTestItem;
        return (
            <tr id={this.props.id}>
                <td><Select style={{width:'100%'}} placeholder='请选择产品线' onChange={this.productLineChange} defaultValue={d.deliveryFactoryId}>{this.state.allProductLine}</Select></td>
                <td><Select style={{width:'100%'}} placeholder='请选择工序' onChange={this.productionProcessChange} defaultValue={d.procedureId}>{this.state.allProductionProcess}</Select></td>
                <td><Input style={{width:'100%'}} placeholder='请输入取样点' style={{border:'none',textAlign:'center'}} onChange={this.samplePointName} defaultValue={d.samplePointName}/></td>
                <td><Select style={{width:'100%'}} placeholder='请选择取样人' onChange={this.sampler} defaultValue={d.sampler}>{this.state.allUser}</Select></td>
                <td><Select style={{width:'100%'}} placeholder='请选择检测人' onChange={this.tester} defaultValue={d.tester}>{this.state.allUser}</Select></td>
                <td><Popover
                    content={(
                        <div style={{ width: '200px'}} >
                         <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} defaultValue={testItemIds}>
                         {
                            allTestItem.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                         }
                        </Checkbox.Group>
                        </div>
                    )}
                    title="检测项目"
                    trigger="click"
                    width={170}
                    height={170}
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}>
                    {
                        this.state.testItems?<Button>{this.state.testItems}</Button>:<Button className='PI-popover-placeholder'>请选择检测项目</Button>
                    }
                    </Popover></td>

                <td><Input placeholder='请输入频次' style={{border:'none',textAlign:'center',width:'100%'}} onChange={this.testFrequency} defaultValue={d.testFrequency}/></td>
                <td><Select style={{width:'100%',border:'none'}} placeholder='受检物料' onChange={this.serialNumberId} defaultValue={d.serialNumberId}>{this.state.allTestMaterial}</Select></td>
                <td><Input placeholder='请输入备注' style={{border:'none',textAlign:'center',width:'100%'}} onChange={this.comment} defaultValue={d.comment}/></td>
                <td><span className='blue' onClick={()=>this.props.deleteRow(this.props.id)} value={this.props.value}>删除</span></td>
            </tr>
        );

    }
}
export default Tr;
