import React, { Component } from 'react';
import {DatePicker,Input,Table} from 'antd';
import moment from 'moment';

class SetStandardModal extends Component{
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
                return(<Input id={record.id} name='value' placeholder='请输入检测标准' size="small" style={{border:'none'}} onChange={this.inputChange}/>)
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
        this.disabledDate=this.disabledDate.bind(this);
    }
    inputChange(e){
       const value=e.target.value;//输入框输入的值(检测标准)
       const id=e.target.id;//检测项目的id
       const name=e.target.name;//value
       const newData=[...this.props.data];
       const index=newData.findIndex(item=>parseInt(id)===parseInt(item.id));
       newData[index][name]=value;//加一个检测标准字段
    //    console.log(newData);
       this.props.inputChange(newData);
    }
    handleDateChange(date, dateString){
        //console.log(dateString);
        this.props.handleDate(dateString);
    }
    disabledDate(current){
        return  current < moment().startOf('day');//不可选择今天以前的日期
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
                          rowKey={record=>record.id}
                          columns={this.columns}
                          dataSource={this.props.data}
                          pagination={{hideOnSinglePage:true,pageSize:100}}
                          size='small'
                          bordered
                          scroll={{y:230}}
                        />
                  </div>
                  <div style={{marginTop:'15px'}}>
                     <DatePicker 
                        onChange={this.handleDateChange} 
                        disabledDate={this.disabledDate}
                        placeholder='请选择施行日期' 
                        size='large' style={{width:'320px'}}
                    />
                  </div>
                 
              </div>
          );
      }
}
export default SetStandardModal;