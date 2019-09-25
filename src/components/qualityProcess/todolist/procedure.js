import React from 'react';
import axios from 'axios';
import {Table} from 'antd';

class Procedure extends React.Component{
    componentDidMount(){
        const dataId = this.props.dataId;
        this.getData(dataId);
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
        }
        this.getData = this.getData.bind(this);
        this.judgeText = this.judgeText.bind(this);
        this.columns = [{
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
            render : (text) => this.judgeText(text)
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
                if(items.length>2){
                    testItems = items[0]+','+items[1]+'...';
                    return <span className='text-decoration' title={text}>{testItems.length > 10 ? items[0]+'...' : testItems}</span>;
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
            render : (text) => this.judgeText(text)
          },{
            title: '备注',
            dataIndex: 'procedureTestRecord.comment' ,
            key: 'procedureTestRecord.comment',
            width: '9%',
            align:'center',
            render : (text) => this.judgeText(text)
          }]
    }
    /**通过batchNumberId查单条记录 */
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
     //判断长度
   judgeText(text){
    if(text&&text.length>6){
        return <span className='text-decoration' title={text}>{text.substring(0,6)}</span>
    }else{
        return text
    }
   }
    render(){
        return (
            <div className='checkModal'>
                <div className="interDrSpanModalTop">
                    <table className='todoProcessTable'>
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
                    <Table rowKey={record=>record.procedureTestRecord.id} columns={this.columns} dataSource={this.state.data} size='small' pagination={false} scroll={{y:188}} bordered></Table>
                </div>
                {/* <div className={this.props.flag && this.state.examineData?'':'hide'}>
                    <AllTester examineData={this.state.examineData} dataId={this.props.dataId} />
                </div> */}
                {/* <div className={this.props.flag?'hide':''} >
                    <textarea onChange={this.textChange} className='checkModalTest' placeholder='请输入审核意见'></textarea>
                </div> */}
            </div>
        );
    }
}
export default Procedure;