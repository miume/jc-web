import React from 'react';
import { Table ,Divider} from 'antd';
import AllTester from '../../../BlockQuote/allTester';
import IsQualified from "../../../BlockQuote/isQualified";
//判断类型，如果为新增,则data为空
//如果为详情和编辑，则通过id查询该条数据
const columns = [{
    title: '序号',
    dataIndex: 'index',
    key: 'id',
    align:'center',
    width: '10%',
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
    width: '20%',
},{
    title: '计量单位',
    dataIndex: 'unit',
    key: 'unit',
    align:'center',
    width: '20%',
},{
    title: '状态',
    dataIndex: 'isAudit',
    key: 'isAudit',
    width: '30%',
    render: (text) => {
        if(text === 0) {
            return '最近审核未通过';
        } else if(text === 1) {
            return '通过'
        } else {
            return '未审核';
        }
    }
}];
class DetailModal extends React.Component {
    render() {
        const data = this.props.detail;
        const sty = [{maxHeight:550},{maxHeight:480}]
        const divheight = this.props.checkFlag?sty[1]:sty[0];
        return(
            <div style={divheight}>
                <div className="interDrSpanModalTop">
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
                            <td>{data.topData?data.topData.batchNumber:''}</td>
                            <td>{data.topData?data.topData.materialName:''}</td>
                            <td>{data.topData?data.topData.b:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{data.topData?data.topData.materialName+'样品':''}</span>
                       </div>
                </div>
                <div  style={{height:'280px'}}>
                    <Table
                        className="rawTestReport-detailModal"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={data.details}
                        pagination={false}
                        size="small"
                        scroll={{ y: 190 }}
                        bordered
                    />
                </div>
                    <div style={{display:'flex',flexDirection:'row',marginTop:20}}>
                        <div style={{flexGrow:2}}>
                            <p>检验人：{data.testData?data.testData.tester:'无'}</p>
                            <p>检验时间：{data.testData?data.testData.testTime:'无'}</p>
                        </div>
                        <div style={{flexGrow:4}}>
                            <IsQualified
                                status={data.IsQualified?data.IsQualified:0}
                        />
                        </div>
                    </div>
                    <Divider />
                    {   this.props.checkFlag?
                        <div></div>:
                        this.props.flag || this.props.examineData.length>0?
                        <div>
                            <AllTester examineData={this.props.examineData} dataId={this.props.dataId} hide={1}/>
                        </div> :
                        <div className='statusDiv'>
                        <p>{this.props.allStatus[this.props.status.toString()]}</p></div>
                    }

                {/* <AllTester examineData={this.props.examineData} dataId={this.props.dataId} hide={1} /> */}
            </div>
        )
    }
}
export default DetailModal;
