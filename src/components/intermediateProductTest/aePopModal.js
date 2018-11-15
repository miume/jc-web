import React from 'react';
import { Input,Button,Table,Radio } from 'antd';
import './aePopModal.css';
import WhiteSpace from '../BlockQuote/whiteSpace';
import '../Home/page.css';



//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class AePopModal extends React.Component {
    state = {
        topData : [],
    };
    columns = [{
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        align:'center',
        width: '12%',
    },{
        title: '检测项目',
        dataIndex: 'a',
        key: 'a',
        align:'center',
        width: '25%',
    },{
        title: '检测结果',
        dataIndex: 'b',
        key: 'b',
        align:'center',
    },{
        title: '计量单位',
        dataIndex: 'c',
        key: 'c',
        align:'center',
        width: '25%',
    }];
    topColumns = [{
        title: '批号',
        dataIndex: 'id',
        key: 'id',
        align:'center',
    },{
        title: '原材料',
        dataIndex: 'a',
        key: 'a',
        align:'center',
    },{
        title: '送样日期',
        dataIndex: 'b',
        key: 'b',
        align:'center',
    }];
    render() {
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    // editable: col.editable,
                    // dataIndex: col.dataIndex,
                    // title: col.title,
                    // handleSave: this.handleSave,
                }),
            };
        });
        return(
           <div style={{paddingTop:'10px'}}>
               <div>
                   <Table
                       rowKey={record => record.id}
                       columns={this.topColumns}
                       dataSource={this.props.topData}
                       size="small"
                       pagination={{hideOnSinglePage:true,pageSize:100}}
                   />
               </div>
               <div style={{paddingTop:'20px'}}>
                       <span style={{float:'left'}}>
                           样品名称：<Input size="small" placeholder="small size" style={{ width: 100 }}/>
                       </span>
                   <Button style={{float:'right'}}>清空</Button>
               </div>
               <div style={{paddingTop:'50px'}}>
                   <Table
                       rowKey={record => record.id}
                       columns={columns}
                       dataSource={this.props.data}
                       pagination={{hideOnSinglePage:true,pageSize:100}}
                       size="small" scroll={{ y: 150 }}
                   />
               </div>
               <div style={{paddingTop:'20px'}}>
                   <Radio.Group size={'large'} buttonStyle="solid" style={{float:'left'}}>
                       <Radio.Button value="pass" >合格</Radio.Button>
                       <Radio.Button value="nopass">不合格</Radio.Button>
                   </Radio.Group>
                   <table style={{float:'right'}}>
                       <tbody>
                       <tr>
                           <td>检验人：</td>
                           <td><Input size="small" placeholder="small size" style={{ width: 100 }} /></td>
                       </tr>
                       <tr>
                           <td>检验时间：</td>
                           <td><Input size="small" placeholder="small size" style={{ width: 100 }} /></td>
                       </tr>
                       </tbody>
                   </table>
               </div>
           </div>
        )
    }
}

export default AePopModal;