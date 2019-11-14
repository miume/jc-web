import React, { Component } from 'react';
import {DatePicker,Table} from 'antd';
import moment from 'moment';
import Standard from '../../../BlockQuote/standard';

class SetStandardModal extends Component{
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'25%'

        },{
            title:'检测项目',
            dataIndex:'name',
            key:'name',
            align:'center',
            width:'25%'
        },{
            title:'检测标准',
            dataIndex:'value',
            key:'value',
            align:'center',
            width:'25%',
            render:(text,record)=>{
                return <Standard record={record} standardChange={this.standardChange} defaultValue={'请选择标准'}/>
            },
            className:'rawStandardTd'
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
            width:'25%'
        }];
        this.handleDateChange=this.handleDateChange.bind(this);
        this.disabledDate=this.disabledDate.bind(this);
        this.standardChange = this.standardChange.bind(this);
    }

    standardChange(index,value) {
        let newData=[...this.props.data];
        newData[index-1]['value'] = value;
        this.props.inputChange(newData);
    }

    /**监控日期的变化*/
    handleDateChange(date, dateString){
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
