import React from 'react';
import axios from 'axios';
import {Modal,Table,message} from 'antd';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import WhiteSpace from '../BlockQuote/whiteSpace';
import SmallButton from '../BlockQuote/smallbutton';
import EditorApply from './editorApply';
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
  const columns = [{
    title: '送样工厂',
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
    width: '9%',
    align:'center',
  },{
    title: '检测人',
    dataIndex: 'tester' ,
    key: 'tester',
    width: '9%',
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
            testItems = items[0]+','+items[1]+','+items[2]+','+items[3]+'...';
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
/**存取 */

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            clickId : 'all',
            detailData:[],
            data:[],
            flag:0,
            allTestItem:[],
            applyData:[],
            iteration:1
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.click = this.click.bind(this);
        // this.getDetailData = this.getDetailData.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.getApplyData = this.getApplyData.bind(this);
    }
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
        this.getAllTestItem();
        this.setState({
          visible: true,
          flag:0
        });
      }
    /**通过id查询详情 */
    getDetailData(){
       axios.get(`${this.props.url.procedure.procedureTestRecord}/${this.props.value}`,{
           headers:{
               'Authorization':this.props.url.Authorization
           }
       }).then((data)=>{
           const details = data.data.data? data.data.data.details:[];
           var iteration = 1;
           console.log(details)
           if(details){
            for(var i = 0; i < details.length; i++){
                // console.log(details[i].commonBatchNumber.iteration)
                iteration = details[i].procedureTestRecord.isIteration;
                details[i].id = i+1;
             }
           }
           this.setState({
               detailData:details,
               data:details,
               iteration:0
            //    iteration:!iteration&&this.props.status===2?0:1
           })
       })
    }
    handleOk() {
        this.setState({
            flag:1
        });
    }
    /**点击迭代 */
    handleIteration(){
      this.setState({
        flag:1
    });
    }
    /**确定取消 */
    cancel() {
      this.setState({
          visible: false
      });
  }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    /**点击button进行删选 根据产品线进行删选数据 */
    click(e){
      const id = e.target.id;
      var {detailData,data} = this.state;
      if(id!==this.state.clickId){
        document.getElementById(this.state.clickId).style.backgroundColor='#ebebeb';
        e.target.style.backgroundColor='#00b4f0';
        detailData = data.filter(d => parseInt(d.productionProcess.id) === parseInt(id));
        //console.log(detailData)
      }
      if(id === 'all'){
        detailData = data;
      }
      this.setState({
        clickId:id,
        detailData:detailData
      })
    }
    /**获取所有检测项目 */
    getAllTestItem(){
      axios({
        url:`${this.props.url.procedure.testItems}`,
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
    /**获取数据 */
    getApplyData(data){
        this.state.applyData = data;
    }
    /**点击送审 */
    handleOkApply(){
      this.applyOut(0);
  }
  /**点击保存送审 */
  handleSave(){
      this.applyOut(-1);
  }
  applyOut(status){
      const details = this.state.applyData;
      for(var i = 0; i < details.length; i++){
          delete details[i].id;
          var e = details[i].procedureTestRecord;
          for(var j in e){
              if( e[j]==='' || e[j] === -1 || e[j] === []){
                  message.info('新增数据不能为空，请填写完整！');
                  return
              }
          }
      }
      this.setState({
          visible:false,
          visible1:false
      })
      const createPersonId = JSON.parse(localStorage.getItem('menuList')).userId;
      const commonBatchNumber = {
          id:this.props.value,
          createPersonId:createPersonId,
          status:status,
          isUrgent:this.state.urgent
      }
      const taskId = this.state.process === -1?'':this.state.process;
      axios.put(`${this.props.url.procedure.procedureTestRecord}`,{
          commonBatchNumber:commonBatchNumber,
          details:details
      },{
          headers:{
              'Authorization':this.props.url.Authorization
          },
          params:{
              taskId:taskId
          }
      }).then((data)=>{
          message.info(data.data.message);
          this.props.fetch();
      }).catch(()=>{
          message.info('操作失败，请联系管理员！')
      })
  }
    render() {
        return (
            <span>
                <span className='blue' onClick={this.handleDetail} >详情</span>
                <Modal title="详情" visible={this.state.visible} closable={false} centered={true}
                    onCancel={this.handleCancel}  width='1300px' maskClosable={false}
                    footer={[
                      <CancleButton key='cancle' handleCancel={this.cancel} />,
                      <span key='save' className={this.state.flag?'show':'hide'}>
                          <SaveButton handleSave={this.handleSave}/>
                          <NewButton  handleClick={this.handleOkApply} name={'审核'} className={'fa fa-check'}/>
                          </span>,
                        <span key="submit" className={this.state.iteration || this.state.flag?'hide':'show'}>
                            <NewButton handleClick={this.handleIteration} name={'迭代'} className={this.state.flag?'fa fa-check':'fa fa-level-up' }/>
                        </span>
                    ]} 
                  >
                    <div style={{height:'350px'}} className={this.state.flag?'hide':'show'}>
                         <div>
                         <button style={{width:'100px',height:'40px',backgroundColor:'#0086ff',marginRight:'10px',borderRadius:'3px'}} id='all' onClick={this.click}>全部</button>
                           {
                             this.props.allProductionProcess?this.props.allProductionProcess.map(b => <SmallButton key={b.id} id={b.id} name={b.name} click={this.click} />):null
                           }
                         </div>
                         <WhiteSpace />
                         <Table rowKey={record=>record.procedureTestRecord.id} columns={columns} dataSource={this.state.detailData} size='small' pagination={false} scroll={{y:200}} bordered></Table>
                    </div>
                    {/* <div style={{height:'350px'}} className={this.state.flag?'show':'hide'}>
                       <EditorApply data={this.state.data} allTestItem={this.state.allTestItem} getApplyData={this.getApplyData}/>
                    </div> */}
                    
                </Modal>
            </span>
        );
    }
}
export default Detail;