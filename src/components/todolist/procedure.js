import React from 'react';
import axios from 'axios';
import {Table} from 'antd';
const columns = [{
    title: '产品线',
    dataIndex: 'deliveryFactory.name' ,
    key: 'deliveryFactory.name',
    width: '9%',
    align:'center',
  },{
    title: '工序',
    dataIndex: 'productionProcess.name' ,
    key: 'productionProcess.name',
    width: '9%',
    align:'center',
  },{
    title: '取样点',
    dataIndex: 'procedureTestRecord.samplePointName' ,
    key: 'procedureTestRecord.samplePointName',
    width: '9%',
    align:'center',
  },{
    title: '取样人',
    dataIndex: 'sampler' ,
    key: 'sampler',
    width: '11%',
    align:'center',
  },{
    title: '检测人',
    dataIndex: 'tester' ,
    key: 'tester',
    width: '11%',
    align:'center',
  },{
    title: '检测项目',
    dataIndex: 'testItemString' ,
    key: 'testItemString',
    render:(text)=>{
      if(text){
        const items = text.split(',');
        var testItems = '';
        if(items.length>3){
            testItems = items[0]+','+items[1]+','+items[2]+'...';
            return <abbr title={text}>{testItems}</abbr>;
        }else{
          testItems = text;
          return text;
        }
      }
     },
    width: '9%',
    align:'center',
  },{
    title: '频次',
    dataIndex: 'procedureTestRecord.testFrequency' ,
    key: 'procedureTestRecord.testFrequency',
    width: '9%',
    align:'center',
  },{
    title: '受检物料',
    dataIndex: 'testMaterialName' ,
    key: 'testMaterialName',
    width: '9%',
    align:'center',
  },{
    title: '备注',
    dataIndex: 'procedureTestRecord.comment' ,
    key: 'procedureTestRecord.comment',
    width: '9%',
    align:'center',
  }]
class Procedure extends React.Component{
    componentDidMount(){
        const dataId = this.props.dataId;
        this.getData(dataId);
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
            reply:''
        }
        this.textChange = this.textChange.bind(this);
        this.getData = this.getData.bind(this);
    }
    getData(dataId){
        axios.get(`${this.props.url.procedure.procedureTestRecord}/${dataId}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            const details = res? res.details:[];
            const status = JSON.parse(localStorage.getItem('status'));
            if(res&&details){
                details['batchNumber'] = res.commonBatchNumber?res.commonBatchNumber.batchNumber:'';
                details['createTime'] = res.commonBatchNumber?res.commonBatchNumber.createTime:'';
                details['status'] = res.commonBatchNumber?status[res.commonBatchNumber.status.toString()]:'';
                details['isUrgent'] = res.commonBatchNumber?(res.commonBatchNumber.isUrgent?'正常':'紧急'):'';
                details['createPersonName'] = res.createPersonName?res.createPersonName:'';
             for(var i = 0; i < details.length; i++){
                 details[i].id = i+1;
                 details[i].procedureTestRecord.testItems = details[i].testItemString;
              }
              this.setState({
                 data:details,
             })
            }
        })
    }
    /**监控审核意见的变化 */
    textChange(e){
        const value = e.target.value;
        this.setState({
            reply:value
        })
    }
    render(){
        this.props.getReplyData(this.state.reply);
        return (
            <div className='checkModal'>
                <div className="interDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>批号</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>紧急</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.data.batchNumber}</td>
                            <td>{this.state.data.createPersonName}</td>
                            <td>{this.state.data.createTime}</td>
                            <td>{this.state.data.status}</td>
                            <td>{this.state.data.isUrgent}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='checkModalDiv'>
                    <Table rowKey={record=>record.procedureTestRecord.id} columns={columns} dataSource={this.state.data} size='small' pagination={false} scroll={{y:188}} bordered></Table>
                </div>
                <div className={this.props.flag?'hide':''} >
                    <textarea onChange={this.textChange} className='checkModalTest' placeholder='请输入审核意见'></textarea>
                </div>
            </div>
        );
    }
}
export default Procedure;