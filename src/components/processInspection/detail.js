/**
 * flag===1 代表详情
 * flag===2 代表编辑
 * flag===undefined（即不传flag） 代表新增
 */
import React from 'react';
import {Table,Select} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
const Option = Select.Option;
  const columns = [{
    title: '产品线',
    dataIndex: 'deliveryFactory.name' ,
    key: 'deliveryFactory.name',
    width: '9%',
  },{
    title: '工序',
    dataIndex: 'productionProcess.name' ,
    key: 'productionProcess.name',
    width: '9%',
  },{
    title: '取样点',
    dataIndex: 'procedureTestRecord.samplePointName' ,
    key: 'procedureTestRecord.samplePointName',
    width: '9%',
    align:'left',
  },{
    title: '取样人',
    dataIndex: 'sampler' ,
    key: 'sampler',
    width: '9%',
  },{
    title: '检测人',
    dataIndex: 'tester' ,
    key: 'tester',
    width: '9%',
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
  },{
    title: '频次',
    dataIndex: 'procedureTestRecord.testFrequency' ,
    key: 'procedureTestRecord.testFrequency',
    width: '9%',
  },{
    title: '受检物料',
    dataIndex: 'testMaterialName' ,
    key: 'testMaterialName',
    width: '9%',
  },{
    title: '备注',
    dataIndex: 'procedureTestRecord.comment' ,
    key: 'procedureTestRecord.comment',
    width: '9%',
  }]
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataFlag : 0,               //用来区分是否是触发下拉框删选  1是 0不是
            data : this.props.data,
        }
        this.selectionChange = this.selectionChange.bind(this);
    }
    selectionChange(value) {
        var {data} = this.state;
        if(value !== 'all')
            data = this.props.data.filter(d => parseInt(d.deliveryFactory.id) === parseInt(value));
        else 
            data = this.props.data;
          this.setState({
            data:data,
            dataFlag:1
          })
    }
    render() {
        return (
            <div style={{height:'350px'}} className={this.state.flag?'hide':'show'}>
                    <Select onChange={this.selectionChange} style={{width:'35%'}} placeholder='请选择产品线'><Option value='all'>选择所有产品线</Option>
                {
                    this.props.allProductLine
                }
                    </Select>
                    <WhiteSpace />
                    <Table rowKey={record=>record.id} columns={columns} dataSource={this.state.dataFlag?this.state.data:this.props.data} size='small' pagination={false} scroll={{y:200}} bordered></Table>
            </div>)
    }
}
export default Detail;
