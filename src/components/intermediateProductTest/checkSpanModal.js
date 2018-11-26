import React from 'react';
import { Input,Button,Table,Radio,Divider } from 'antd';
import './aePopModal.css';
import '../Home/page.css';
import IsQualified from "./isQualified";


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
    state = {
        topData : topData,      //表头数据
        testData: testData,   // 检验人数据
        examineData: examineData,  //审核人数据
        status : '', //0不合格，1合格

    };
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        align:'center',
        width: '12%',
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
                    style={{border:'0'}}
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
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        return(
            <div >
                <div style={{paddingBottom:'55px'}}>
                    <table style={{float:'left',align:'center',border:"1px solid gray"}} >
                        <thead>
                        <tr>
                            <th style={{background:'#0079FE', color:'white', width:200,textAlign:'center'}}>批号</th>
                            <th style={{background:'#0079FE', color:'white', width:200,textAlign:'center'}}>原材料</th>
                            <th style={{background:'#0079FE', color:'white', width:200,textAlign:'center'}}>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{textAlign:'center'}}>{this.state.topData.batchNumber}</td>
                            <td style={{textAlign:'center'}}>{this.state.topData.materialName}</td>
                            <td style={{textAlign:'center'}}>{this.state.topData.b}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <span style={{float:'left',paddingTop:'10px',paddingBottom:'10px'}}>
                           样品名称：<span>{this.state.topData.materialName+'样品'}</span>
                    </span>
                    <Button style={{float:'right',width:'100px'}} size="large">清空</Button>
                </div>
                <div style={{paddingTop:'50px'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.props.data}
                        pagination={{hideOnSinglePage:true,pageSize:100}}
                        size="small"
                        scroll={{ y: 250 }}
                    />
                </div>
                <div>
                    可不可以通过调用组件，通过状态来返回不同值
                    <div id='passDiv' style={{border:'3px solid #999999',width:'130px',float:'right'}}>
                        <span id='passSpan' onClick={this.selectQualified(1)} style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                    </div>
                    <div id='noPassDiv' style={{border:'3px solid #999999',width:'130px',float:'right'}}>
                        <span id='noPassSpan' onClick={this.selectQualified(0)} style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                    </div>
                </div>
            </div>
        )
    }
    change = (e) => {
        console.log('eeeee:',e)
        e.className = 'redClass';
    }
    /**实现选择合格:1与不合格:0功能 */
    selectQualified = (status) => {
        // if(status===0){
        //     var idPassDiv = document.getElementById('passDiv');
        //     idPassDiv.style.border = '3px solid #FF3B30';
        //     var idPassSpan = document.getElementById('passSpan');
        //     idPassSpan.style.border = '3px solid #FF3B30';
        //     idPassSpan.style.color = '#FF3B30';
        // };
        // if(status===1){
        //     var idNoPassDiv = document.getElementById('noPassDiv');
        //     idNoPassDiv.style.border = '3px solid #4BD863';
        //     var idNoPassSpan = document.getElementById('noPassSpan');
        //     idNoPassSpan.style.border = '3px solid #4BD863';
        //     idNoPassSpan.style.color = '#4BD863';
        // };
        // switch (status) {
        //     case 0:
        //         var idPassDiv = document.getElementById('passDiv');
        //         idPassDiv.style.border = '3px solid #FF3B30';
        //         var idPassSpan = document.getElementById('passSpan');
        //         idPassSpan.style.border = '3px solid #FF3B30';
        //         idPassSpan.style.color = '#FF3B30';
        //         break;
        //     case 1:
        //         var idNoPassDiv = document.getElementById('noPassDiv');
        //         idNoPassDiv.style.border = '3px solid #4BD863';
        //         var idNoPassSpan = document.getElementById('noPassSpan');
        //         idNoPassSpan.style.border = '3px solid #4BD863';
        //         idNoPassSpan.style.color = '#4BD863';
        //         break;
        // }
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default CheckSpanModal;