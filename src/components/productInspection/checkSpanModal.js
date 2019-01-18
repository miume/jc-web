import React from 'react';
import { Input,Button,Table } from 'antd';
import './aePopModal.css';
import CheckQualifiedModal from '../BlockQuote/checkQualifiedModal';
import './productInspection.css';


//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
class CheckSpanModal extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         topData : topData,      //表头数据
    //         testData: testData,   // 检验人数据
    //         examineData: examineData,  //审核人数据
    //         status : '', //0不合格，1合格
    //     };
    // }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '12%',
    },{
        title: '检测项目',
        dataIndex: 'testItemName',
        key: 'testItemName',
        align:'center',
        width: '20%',
    },{
        title: '检测结果',
        dataIndex: 'testResult',
        key: 'testResult',
        align:'center',
        render: (text,record,index) => {
            return(
                <Input
                    placeholder='输入检测结果'
                    style={{border:'0',paddingLeft:'10px'}}
                    onChange={this.props.inputSave}
                    value={record.testResult}
                    name={index}
                />
            )
        }
    },{
        title: '行业标准',
        dataIndex: 'rawTestItemStandard',
        key: 'rawTestItemStandard',
        align:'center',
        width: '20%',
    },{
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
        align:'center',
        width: '20%',
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
                <div className="productCheckModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>批号</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.props.data.topData.serialNumber}</td>
                            <td>{this.props.data.topData.materialName}</td>
                            <td>{this.props.data.topData.sampleDeliveringDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="productCheckModalMiddle">
                    <div>
                           样品名称：<span>{this.props.data.topData.materialName+'样品'}</span>
                    </div>
                    <Button><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button>
                </div>
                <div className="productCheckModalBottom">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data.testDTOS}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 400 }}
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