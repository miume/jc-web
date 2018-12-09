import React from 'react';
import axios from 'axios';
import {Modal,Table} from 'antd';
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
    title: '产品线',
    dataIndex: 'productLine.name' ,
    key: 'productLine.name',
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
    dataIndex: 'procedureTestRecord.testItems' ,
    key: 'procedureTestRecord.testItems',
    render:(text)=>{ 
      const items = text.split(',');
      var testItems = '';
      if(items.length>3){
          testItems = items[0]+','+items[1]+','+items[2]+','+items[3]+'...';
          return <abbr title={text}>{testItems}</abbr>;
      }else{
        testItems = text;
        return text;
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
            flag:0
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this);
        // this.getDetailData = this.getDetailData.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
    }
    /**处理新增一条记录 */
    handleDetail() {
        this.getDetailData();
        this.setState({
          visible: true,
          flag:0
        });
      }
    /**通过id查询详情 */
    getDetailData(){
       axios.get(`${this.props.server}/jc/common/procedureTestRecord/${this.props.value}`,{
           headers:{
               'Authorization':this.props.Authorization
           }
       }).then((data)=>{
           const details = data.data.data.details;
           this.setState({
               detailData:details,
               data:details
           })
       })
    }
    handleOk() {
        this.setState({
            // visible: false
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
    /**下拉框变化 */
    // handleChange(value){
    //     console.log(`selected:${value}`)
    // }
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
    render() {
        return (
            <span>
                <span className='blue' onClick={this.handleDetail} >详情</span>
                <Modal title="详情" visible={this.state.visible} closable={false}
                    onCancel={this.handleCancel}  width='1000px' maskClosable={false}
                    footer={[
                      <CancleButton key='cancle' handleCancel={this.cancel}/>,
                      <SaveButton key='save'  className={this.state.flag?'show':'hide'}></SaveButton>,
                      <NewButton key="submit" handleClick={this.handleIteration} name='迭代' className='fa fa-level-up' />
                    ]} 
                  >
                    <div style={{height:'400px'}} className={this.state.flag?'hide':'show'}>
                         <div>
                         <button style={{width:'100px',height:'40px',backgroundColor:'#00b4f0',marginRight:'10px'}} id='all' onClick={this.click}>全部</button>
                           {
                             this.props.allProductionProcess.map(b => <SmallButton key={b.id} id={b.id} name={b.name} click={this.click} />)
                           }
                         </div>
                         <WhiteSpace />
                         <Table rowKey={record=>record.procedureTestRecord.id} columns={columns} dataSource={this.state.detailData} size='small' pagination={false} bordered></Table>
                    </div>
                    <div style={{height:'400px'}} className={this.state.flag?'show':'hide'}>
                       <EditorApply />
                    </div>
                    
                </Modal>
            </span>
        );
    }
}
export default Detail;