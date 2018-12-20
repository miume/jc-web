import React from 'react';
import { Input,Button,Table } from 'antd';
import CheckQualifiedModal from '../BlockQuote/checkQualifiedModal';
import './interProduct.css';
import CheckModal from "../BlockQuote/checkModal";


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
            // status : '', //0不合格，1合格
            newTestDTOS: [],
            interCheckData:{
                testDTOS: [],
                sampleDeliveringRecord: {
                    id: -1,
                    testResult: ''
                },
                testReportRecord:{
                    isQualified: -1,
                }

            },
            isQualified: -1,
        };
        this.save = this.save.bind(this);
        this.clickIsQualified = this.clickIsQualified.bind(this);
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '20%',
    },{
        title: '检测项目',
        dataIndex: 'testItemName',
        key: 'testItemName',
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
                    id={record.id}
                    name='testResult'
                    defaultValue={text}
                    placeholder='输入检测结果'
                    style={{border:'0',paddingLeft:'10px'}}
                    onChange={this.save}
                />
            )
        }
    },{
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
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
                            <td>{this.props.data.topData.serialNumberId}</td>
                            <td>{this.props.data.topData.materialName}</td>
                            <td>{this.props.data.topData.sampleDeliveringDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interCheckModalMiddle">
                    <div>
                           样品名称：<span>{this.props.data.topData.materialName?(this.props.data.topData.materialName+'样品'):''}</span>
                    </div>
                    <Button><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button>
                </div>
                <div className="interCheckModalBottom">
                    <Table
                        rowKey={record => record.index}
                        columns={columns}
                        dataSource={this.props.data.testDTOS}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 300 }}
                        bordered
                    />
                </div>
                <CheckQualifiedModal
                    status={this.props.data.isQualified}
                    clickIsQualified = {this.clickIsQualified}
                />
            </div>
        )
    }
    /**监听检测结果输入框的变化 */
    /**input框内容变化，实现自动保存数据 */
    save(e){
        console.log(e.target.value)
        const value = e.target.value;
        const name = e.target.name;
        const id = e.target.id;
        var newData = [...this.props.data.testDTOS];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        newData[index][name] = value;
        this.setState({
            newTestDTOS:newData
        })
    }
    /**---------------------- */
    /**点击合格与不合格 */
    clickIsQualified = (isQualified) => {
        this.setState({
            isQualified: isQualified
        },()=>{
            console.log(this.state.isQualified)
        })
    };
    /**实现保存按钮功能 */

    /**---------------------- */
}

export default CheckSpanModal;