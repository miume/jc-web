import React from 'react';
import axios from 'axios';
import Tr1 from './tr1';
import {Button,Select} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
const Option = Select.Option;
class ProcessTable extends React.Component{
    componentDidMount(){
        this.getAllUser();
        // this.getAllProductLine();
        this.getAllTestMaterial();
        this.getAllProductionProcess();
    }
    constructor(props){
        super(props);
        this.state = {
            count : this.props.data?this.props.data.length:1,
            addApplyData:[],                             //存取每行的数据
            flag : this.props.flag,
            data : this.props.data?this.props.data:[{id:1}], //用已知数据来渲染有多少行
        }
        this.editorRow = this.editorRow.bind(this);
        this.addData = this.addData.bind(this);
        this.getData = this.getData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
        // this.getAllTestItem = this.getAllTestItem.bind(this);
        // this.getAllProductLine = this.getAllProductLine.bind(this);
        this.getAllTestMaterial = this.getAllTestMaterial.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
    }
    /**获取所有送样工厂 */
    // getAllProductLine(){
    //     axios({
    //       url:`${this.props.url.deliveryFactory.deliveryFactory}`,
    //       method:'get',
    //       headers:{
    //         'Authorization':this.props.url.Authorization
    //       }
    //     }).then(data=>{
    //       const res = data.data.data;
    //       const children = res.map(e=>{
    //           return <Option key={e.id} value={e.id}>{e.name}</Option>
    //       })
    //       this.setState({
    //           allProductLine : children
    //       })
    //   })
    // }
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
    /**编辑数据 */
    editorRow(value){
        var {data} = this.state;
        for(var i = 0; i < data.length; i++){
            if(data[i].id.toString()===value)
                data[i].mode = 2;
        }
        // console.log(data)
        this.setState({
            data:data,
        })
    }
    /**新增一条数据 */
    addData() {
        const {count,data} = this.state;
        /**点击新增 前面已知数据全部变成不可编辑 */
        for(var i = 0; i < data.length; i++){
            data[i].mode = 1;
        }
        //console.log(data)
        data.push({
            mode:3,
            id:count+1,
            procedureTestRecord:{}
        })
        this.setState({
            count: count+1,
            data: data,
        })
    }
    /**删除一条数据 不仅要删除渲染table的数据，还要删除实时存取table数据的数组中对应数据*/
    deleteRow(value){
        var {count,data,addApplyData} = this.state;
        // console.log(addApplyData)
        addApplyData = addApplyData.filter(e=>e.id.toString()!==value);  //删除存取的每行数据
        this.setState({
            count:count-1,
            data:data.filter(d=>d.id.toString()!==value),
            addApplyData:addApplyData
        })
    }
    /**获取每个Tr的值 */
    getData(data){
        //console.log(data)
        const {addApplyData} = this.state;
        if(addApplyData.length === 0) { addApplyData.push(data)};
        var flag = 0;
        for(var i = 0; i < addApplyData.length; i++){
            if(addApplyData[i].id === data.id){
                addApplyData[i] = data;
                flag = 1;
            }
        }
        if(!flag){
            addApplyData.push(data)
        }
        this.state.addApplyData = addApplyData;
        this.props.getData(addApplyData);//将数据传给父元素
    }
    render(){
        return (
            <div style={{height:'400px'}}>
                    <div className='fr'>已录入{this.state.count}条数据</div><br/>
                         <table id='process-table'>
                             <thead className='thead'>
                             <tr>
                                <td>产品线</td>
                                <td>工序</td>
                                <td>取样点</td>
                                <td>取样人</td>
                                <td>检测人</td>
                                <td>检测项目</td>
                                <td>频次</td>
                                <td>受检物料</td>
                                <td>备注</td><td>操作</td>
                              </tr>
                             </thead>
                             <tbody className='tbody'>
                             {
                                this.state.data.map((m,index) => { 
                                    return <Tr1 key={index} deleteRow={this.deleteRow} id={m.id?m.id.toString():m} url={this.props.url} getData={this.getData}
                                           value={m} flag={this.props.flag} mode={m.mode} editorRow={this.editorRow}
                                           allProductLine={this.props.allProductLine} allProductionProcess={this.state.allProductionProcess} allUser={this.state.allUser}
                                           allTestItem={this.props.allTestItem} allTestMaterial={this.state.allTestMaterial}
                                           /> })
                             }
                             </tbody>
                         </table>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
             </div>
        )
    }
}
export default ProcessTable;