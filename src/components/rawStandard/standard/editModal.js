import React, { Component } from 'react';
import {DatePicker,Input,Table} from 'antd';
import moment from 'moment';
class EditStandardModal extends Component{
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'18%'
          
        },{
            title:'检测项目',
            dataIndex:'name',
            key:'name',
            align:'center',
            width:'22%'
        },{
            title:'检测标准',
            dataIndex:'value',
            key:'value',
            align:'center',
            render:(text,record)=>{
                // console.log(text);
                // console.log(record);
                return(<Input id={record.id} name='value' defaultValue={text} placeholder='请输入检测标准' size="small" style={{border:'none',textAlign:'center'}} onChange={this.inputChange}/>)
            },
            className:'rawStandardTd'
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
            width:'22%'
        }];
        this.handleDateChange=this.handleDateChange.bind(this);
        this.inputChange=this.inputChange.bind(this);
    }
    inputChange(e){
       const value=e.target.value;//输入框输入的值(检测标准)
       const id=e.target.id;//检测项目的id
       const name=e.target.name;//value
       //console.log(value,id,name);
       const newData=[...this.props.standardData];//未修改的数据
       const index=newData.findIndex(item=>parseInt(id)===parseInt(item.id));
       newData[index][name]=value;//加一个检测标准字段
       //console.log(newData);
       this.props.inputChange(newData);//修改后的数据
    }
    handleDateChange(date, dateString){
        //console.log(dateString);
        this.props.handleDate(dateString);
    }
      render(){
          
          return(
              <div>
                  <div className='rawStandardTop'>
                     <table>
                         <thead>
                            <tr>
                                <th>批号</th>
                                <th>原材料</th>
                                <th>厂家</th>
                            </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td style={{width:'40%'}}>{this.props.record.batchNumber}</td>
                                 <td>{this.props.raw}</td>
                                 <td>{this.props.factory}</td>
                             </tr>
                         </tbody>
                     </table>
                  </div>
                  <div style={{height:'15px'}}></div>
                  <div >
                      <Table 
                          rowKey={record=>record.index}
                          columns={this.columns}
                          dataSource={this.props.standardData}
                          pagination={{hideOnSinglePage:true,pageSize:100}}
                          size='small'
                          bordered
                          scroll={{y:230}}
                        />
                  </div>
                  <div style={{marginTop:'15px'}}>
                      {this.props.effectiveTime!=''?
                        <DatePicker defaultValue={moment((this.props.effectiveTime),'YYYY-MM-DD')} 
                        onChange={this.handleDateChange} 
                        placeholder='请选择施行日期' 
                        size='large' style={{width:'320px'}}/>
                      :''
                      }
                  </div>
                 
              </div>
          );
      }
}
export default EditStandardModal;