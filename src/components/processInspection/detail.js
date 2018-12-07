import React from 'react';
import {Modal,Table} from 'antd';
import NewButton from '../BlockQuote/newButton';
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
  const columns1 = [{
    title: '产品线',
    dataIndex: 'productLine.id' ,
    key: 'productLine.id',
    width: '9%',
    render:productLine=>{return productLine.name},
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
      if(id!==this.state.clickId){
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
        return (
            <span>
                <span className='blue' onClick={this.handleDetail} >详情</span>
                <Modal title="详情" visible={this.state.visible}
                    onCancel={this.handleCancel}  width='1000px'
                    footer={[
                      <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                    ]} 
                  >
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