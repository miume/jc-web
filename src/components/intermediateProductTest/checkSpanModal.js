import React from 'react';
import { Input,Button,Table } from 'antd';
import CheckQualifiedModal from '../BlockQuote/checkQualifiedModal';
import './interProduct.css';


const topData = {
    batchNumber: 'EcT/139',
    materialName: '镍矿石',
    b: '2018年11月11日',
};
const testData = {
    tester: '检测人',
    testTime: '2018年11月12日',
};
const examineData = {
    examiner: '审核人',
    examineView: '数据正常，审核通过',
    examineTime: '2018年11月12日',
}
//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class CheckSpanModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            topData : topData,      //表头数据
            testData: testData,   // 检验人数据
            examineData: examineData,  //审核人数据
            status : '', //0不合格，1合格
        };
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        align:'center',
        width: '20%',
    },{
        title: '检测项目',
        dataIndex: 'testItem',
        key: 'testItem',
        align:'center',
        width: '25%',
    },{
        title: '检测结果',
        dataIndex: 'testResult',
        key: 'testResult',
        align:'center',
        width: '30%',
        render: (text,record) => {
            return(
                <Input
                    placeholder='输入检测结果'
                    style={{border:'0',paddingLeft:'10px'}}
                />
            )
        }
    },{
        title: '计量单位',
        dataIndex: 'itemUnit',
        key: 'itemUnit',
        align:'center',
        width: '25%',
    }];
    render() {
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                }),
            };
        });
        return(
            <div >
                <div className="interCheckModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>编号</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.topData.batchNumber}</td>
                            <td>{this.state.topData.materialName}</td>
                            <td>{this.state.topData.b}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interCheckModalMiddle">
                    <div>
                           样品名称：<span>{this.state.topData.materialName+'样品'}</span>
                    </div>
                    <Button><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button>
                </div>
                <div className="interCheckModalBottom">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 300 }}
                        bordered
                    />
                </div>
                <CheckQualifiedModal
                />
            </div>
        )
    }
    /**实现选择合格:1与不合格:0功能 */

    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default CheckSpanModal;