import React from 'react';
import {Modal,Button,Table} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import SmallButton from '../BlockQuote/smallbutton';
const approvalProcess = [{
    id:1,
    name:'流程1'
},{
    id:2,
    name:'流程2'
},{
    id:3,
    name:'流程3'
}]
// const children = approvalProcess.map(p => 
//     <Option key={p.id}>{p.name}</Option>
// )
//表头的假数据
// const columns = [{
//     title: '批号',
//     dataIndex: 'batchNumber' ,
//     key: 'batchNumber',
//     width: '9%',
//     align:'center',
//   }, {
//     title: '创建人',
//     dataIndex: 'creatPerson',
//     key:  'creatPerson.id',
//     render:creatPerson => `${creatPerson.userName}`,
//     width: '8%',
//     align:'center',
//   }, {
//     title: '创建时间',
//     dataIndex: 'creatTime',
//     key: 'creatTime',
//     width: '19%',
//     align:'center',
//   }, {
//     title: '修改人',
//     dataIndex: 'updatePerson',
//     key: 'updatePerson.id',
//     render:updatePerson => `${updatePerson.userName}`,
//     width: '9%',
//     align:'center',
//   }, {
//     title: '修改时间',
//     dataIndex: 'updateTime',
//     key: 'updateTime',
//     width: '19%',
//     align:'center',
//   }, {
//     title: '类型',
//     dataIndex: 'type',
//     key: 'type',
//     render: type => {
//         switch(`${type}`) {
//           case '1': return '制成检测数据';
//           case '2': return '样品送检数据';
//           case '3': return '样品报告单数据';
//           default: return '';
//         }
//     },
//     width: '12%',
//     align:'center',
//   }, {
//     title: '状态',
//     dataIndex: 'state',
//     key:'state',
//     render: state => {
//       switch(`${state}`) {
//         case '-1': return '已保存未提交';
//         case '0': return '已提交未未审核';
//         case '1': return '审核中';
//         case '2': return '审核通过';
//         case '3': return '审核未通过';
//         case '4': return '合格';
//         case '5': return '不合格';
//       }
//     },
//     width: '10%',
//     align:'center',
//   }, {
//     title: '紧急',
//     dataIndex: 'isUrgent',
//     key: 'isUrgent',
//     render: isUrgent =>  `${isUrgent}`?'正常':'紧急',
//     width: '7%',
//     align:'center',
//   }]
  const columns1 = [{
    title: '产品线',
    dataIndex: 'productLine' ,
    key: 'productLine',
    width: '9%',
    align:'center',
  },{
    title: '工序',
    dataIndex: 'procedureName' ,
    key: 'procedureName',
    width: '9%',
    align:'center',
  },{
    title: '样品检测点',
    dataIndex: 'samplePoint' ,
    key: 'samplePoint',
    width: '9%',
    align:'center',
  },{
    title: '测试项目',
    dataIndex: 'testItem' ,
    key: 'testItem',
    width: '9%',
    align:'center',
  },{
    title: '测试频率',
    dataIndex: 'testFrequency' ,
    key: 'testFrequency',
    width: '9%',
    align:'center',
  },{
    title: '采样人',
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
    title: '状态',
    dataIndex: 'status' ,
    key: 'status',
    width: '9%',
    align:'center',
  },{
    title: '备注',
    dataIndex: 'comment' ,
    key: 'comment',
    width: '9%',
    align:'center',
  }]
  const detailData = [{
      id: 1,
      productLine:'HHHH',

  }]
/**存取 */

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            clickId : 'all'
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this);
    }
    /**处理新增一条记录 */
    handleDetail() {
        console.log(this.props.value)
        this.setState({
          visible: true
        });
      }
    handleOk() {
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
    handleChange(value){
        console.log(`selected:${value}`)
    }
    /**点击button进行删选 根据产品线进行删选数据 */
    click(e){
      const id = e.target.id;
      console.log('this.state.clickId:'+this.state.clickId+'  id:'+id)
      if(id!=this.state.clickId){
        document.getElementById(this.state.clickId).style.backgroundColor='#ebebeb';
        e.target.style.backgroundColor='#00b4f0';
      }
      this.setState({
        clickId:id
      })
    }
    componentDidMount(){
        
    }

    render() {
        const data = [this.props.value];
        return (
            <span>
                <a onClick={this.handleDetail} >详情</a>
                <Modal title="详情" visible={this.state.visible}
                    onCancel={this.handleCancel}  width='1000px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                         <div>
                         <button style={{width:'100px',height:'40px',backgroundColor:'#00b4f0',marginRight:'10px'}} id='all' onClick={this.click}>全部</button>
                           {
                             approvalProcess.map(b => <SmallButton key={b.id} id={b.id} name={b.name} click={this.click} />)
                           }
                         </div>
                         <WhiteSpace />
                         <Table columns={columns1} size='small' pagination={false} bordered></Table>
                    </div>
                </Modal>
            </span>
        );
    }
}
export default Detail;