/**
 * flag===1 代表详情
 * flag===2 代表编辑
 * flag===undefined（即不传flag） 代表新增
 */
import React from 'react';
import {Table,Select} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
const Option = Select.Option;
  
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataFlag : 0,               //用来区分是否是触发下拉框删选  1是 0不是
            data : this.props.data,
        }
        this.judgeText = this.judgeText.bind(this);
        this.selectionChange = this.selectionChange.bind(this);
        this.columns = [{
          title: '产品线',
          dataIndex: 'detail.deliveryFactory' ,
          key: 'detail.deliveryFactory',
          width: '9%',
        },{
          title: '工序',
          dataIndex: 'detail.productionProcess' ,
          key: 'detail.productionProcess',
          width: '9%',
        },{
          title: '取样点',
          dataIndex: 'procedureTestRecord.samplePointName' ,
          key: 'procedureTestRecord.samplePointName',
          width: '9%',
          align:'left',
        },{
          title: '取样人',
          dataIndex: 'detail.sampler' ,
          key: 'detail.sampler',
          width: '9%',
        },{
          title: '检测人',
          dataIndex: 'detail.tester' ,
          key: 'detail.tester',
          width: '9%',
        },{
          title: '检测项目',
          dataIndex: 'detail.testItems' ,
          key: 'detail.testItems',
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
          width: '10%',
        },{
          title: '频次',
          dataIndex: 'procedureTestRecord.testFrequency' ,
          key: 'procedureTestRecord.testFrequency',
          width: '9%',
          render : (text) => this.judgeText(text)
        },{
          title: '受检物料',
          dataIndex: 'detail.testMaterialName' ,
          key: 'detail.testMaterialName',
          width: '9%',
          render : (text) => this.judgeText(text)
        },{
          title: '备注',
          dataIndex: 'procedureTestRecord.comment' ,
          key: 'procedureTestRecord.comment',
          width: '9%',
          render : (text) => this.judgeText(text)
        }]
    }
    /**详情按照产品线进行搜索 */
    selectionChange(value) {
        var {data} = this.state;
        if(value !== 'all')
            data = this.props.data.filter(d => parseInt(d.procedureTestRecord.deliveryFactoryId) === parseInt(value));
        else 
            data = this.props.data;
        this.setState({
          data:data,
          dataFlag:1
        })
    }
     //判断长度
   judgeText(text,max){
    if(text&&text.length>8){
        return <span className='text-decoration' title={text}>{text.substring(0,8)}</span>
    }else{
        return text
    }
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
                    <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataFlag?this.state.data:this.props.data} size='small' pagination={false} scroll={{y:228}} bordered></Table>
            </div>)
    }
}
export default Detail;
