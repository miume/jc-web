import React from 'react';
import { Input,Button,Table } from 'antd';
import './aePopModal.css';
import WhiteSpace from '../BlockQuote/whiteSpace';
import '../Home/page.css';



//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class AePopModal extends React.Component {
    state = {
        dataSource : [],
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
            <div style={{height:'370px'}}>
                <div className="firstHead">
                   <span className="spanHead">
                   中间品：<Input className="inputHead" size="small" placeholder="small size" style={{ width: 100 }}/>
                   送样日期：<Input className="inputHead" size="small" placeholder="small size" style={{ width: 100 }}/>
                   编号：<Input className="inputHead" size="small" placeholder="small size" style={{ width: 100 }}/>
                   </span>
                </div>
                <WhiteSpace/>
                <div className="secHead">
                   <span className="spanHead">
                        样品名称：<Input size="small" placeholder="small size" style={{ width: 100 }}/>
                        <Button type="primary" >清空</Button>
                   </span>
                </div>
                <Table rowKey={record => record.id} dataSource={this.props.data} columns={columns}  pagination={{hideOnSinglePage:true,pageSize:100}} size="small" scroll={{ y: 150 }} />
                <WhiteSpace/>
                <div className="firstHead">
                   <span className="spanHead">
                       判定结果：
                   </span>
                    <span className="fr">
                       检验人：<Input size="small" placeholder="small size" style={{ width: 100 }}/>
                   </span>
                </div>
                <div className="firstHead">
                   <span className="fr">
                       检验日期：<Input size="small" placeholder="small size" style={{ width: 100 }}/>
                   </span>
                </div>
                <WhiteSpace/>


            </div>
        )
    }
}

export default AePopModal;