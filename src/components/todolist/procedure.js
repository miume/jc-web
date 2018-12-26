import React from 'react';
import axios from 'axios';
import {Table} from 'antd';
import Line from './line';
const examineData = [{
    id: 100,
    handler: 1,
    personName:'王大大',
    handleTime: "2018-12-20 09:34:23",
    handleReply: "我没意见",
},{
    id: 101,
    handler: 2,
    personName:'兰亚戈',
    handleTime: "2018-12-23 09:34:23",
    handleReply: "同意",
},{
    id: 103,
    handler: 3,
    personName:'胡旭东',
    handleTime: "2018-12-24 09:34:23",
    handleReply: "勉强",
},{
    id: 104,
    handler: 4,
    personName:'杨梅',
    handleTime: "2018-12-25 09:34:23",
    handleReply: "勉强",
}]
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
        this.getAllTester(dataId);
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
            reply:''
        }
        this.getData = this.getData.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.textChange = this.textChange.bind(this);
        this.getAllTester = this.getAllTester.bind(this);
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
     /**通过batchNumberId 查询审核人 */
     getAllTester(dataId){
        axios({
          url:`${this.props.url.toDoList}/${dataId}/result`,
          method:'get',
          headers:{
            'Authorization':this.props.url.Authorization
          }
        }).then(data=>{
          const res = data.data.data;
          console.log(res)
          if(res){
            this.setState({
                examineData : res
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
    moveLeft(){
        this.handleMove(-1);
    }
    moveRight(){
        this.handleMove(1);
    }
    handleMove(number) {
        var middle = document.getElementsByClassName('check-detail-div'); 
        console.log(middle)    
        let count = 830;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                    // tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                    
                    // tbodyMiddleRef.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                }
                if(count <= 0 || pre === middle.scrollLeft) {
                    clearInterval(interval);
                }
            },1)
        }else if(gap > 0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                count -= 1;
                middle.scrollLeft += (number === 1 ? 1 : -1);
                // tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    }
    render(){
        this.props.getReplyData(this.state.reply);
        const count = examineData?examineData.length:0;
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
                <div className={this.props.flag?"check-detail":'hide'}>
                    <div className='check-detail-div'>
                        <div className='check-detail-div-hidden'>
                       {
                            examineData.map((e)=>(
                                <div className='check-detail-div-hidden-part' key={e.id}>
                                    <div className='part-demo' >
                                        <div><span>审核人：<span>{e.personName?e.personName:''}</span></span></div>
                                        <div><span>审核意见：<span>{e.handleReply?e.handleReply:''}</span></span></div>
                                        <div><span>审核日期：<span>{e.handleTime?e.handleTime:''}</span></span></div>
                                    </div>
                                    <div className='line-part'>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    <div className='check-detail-i' ><i className='fa fa-2x fa-caret-left' onClick={this.moveLeft}></i><i className='fa fa-2x fa-caret-right' onClick={this.moveLeft}></i></div>
                </div>
                <div className={this.props.flag?'hide':''} >
                    <textarea onChange={this.textChange} className='checkModalTest' placeholder='请输入审核意见'></textarea>
                </div>
            </div>
        );
    }
}
export default Procedure;