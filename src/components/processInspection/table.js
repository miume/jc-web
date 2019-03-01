import React from 'react';
import axios from 'axios';
import Tr1 from './tr1';
import {Button,Select} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
const Option = Select.Option;
class ProcessTable extends React.Component{
    componentDidMount(){
        this.getAllUser();
        this.getAllTestMaterial();
        this.getAllProductionProcess();
    }
    constructor(props){
        super(props);
        this.state = {
            // count : this.props.data?this.props.data.length:1,
            // addApplyData:[],                             //存取每行的数据
            // flag : this.props.flag,
            // maxCount : this.props.data?this.props.data.length:1,
            // data : this.props.data?this.props.data:[{id:1}], //用已知数据来渲染有多少行
        }
        this.getAllUser = this.getAllUser.bind(this);
        this.getAllTestMaterial = this.getAllTestMaterial.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
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
        const children = res?res.map(p =>
            <Option key={p.id} value={p.id}>{p.description}</Option>
            ):null
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
            if(res){
                const children = res.map(e=>{
                    return <Option key={e.id} value={e.id}>{e.materialName}</Option>
                })
                this.setState({
                    allTestMaterial:children
                })
            }
        })
    }
    render(){
        return (
            <div style={{height:'400px'}}>
                    <div className='fr'>已录入{this.props.count}条数据</div><br/>
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
                                this.props.data?this.props.data.map((m,index) => { 
                                    return <Tr1 key={index} deleteRow={this.props.deleteRow} id={m.id?m.id:m} url={this.props.url} getData={this.props.getData}
                                           detail={m} flag={this.props.flag} mode={m.mode} editorRow={this.props.editorRow}
                                           allProductLine={this.props.allProductLine} allProductionProcess={this.state.allProductionProcess} allUser={this.state.allUser}
                                           allTestItem={this.props.allTestItem} allTestMaterial={this.state.allTestMaterial}
                                           /> })
                                   : null
                             }
                             </tbody>
                         </table>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.props.addData}/>
             </div>
        )
    }
}
export default ProcessTable;