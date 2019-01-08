import React, { Component } from 'react';
import {DatePicker,Input,Table} from 'antd';

class SetStandardModal extends Component{
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
          
        },{
            title:'检测项目',
            dataIndex:'testItem',
            key:'testItem',
            align:'center',
        },{
            title:'检测标准',
            dataIndex:'value',
            key:'value',
            align:'center',
            render:(text,record)=>{
                return(<Input id={record.id} name='value' placeholder='请输入检测标准' onChange={this.props.handleSave}/>)
            }
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
        }];
        this.handleDateChange=this.handleDateChange.bind(this);
    }
    handleDateChange(date, dateString){
        console.log(date, dateString);
    }
      render(){
          return(
              <div>
                  <div className='rawStandardTop'>
                     <table>
                         <thead>
                            <tr>
                                <th>原材料</th>
                                <th>厂家</th>
                            </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td>{this.props.raw}</td>
                                 <td>{this.props.factory}</td>
                             </tr>
                         </tbody>
                     </table>
                  </div>
                  <div style={{height:'15px'}}></div>
                  <div >
                      <Table 
                          columns={this.columns}
                          size='small'
                          bordered
                        />
                  </div>
                  <div style={{marginTop:'15px'}}>
                      <DatePicker onChange={this.handleDateChange} placeholder='请选择施行日期' size='large' style={{width:'320px'}}/>
                  </div>
                 
              </div>
          );
      }
}
export default SetStandardModal;