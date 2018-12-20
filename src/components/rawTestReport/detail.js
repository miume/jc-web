import React from 'react';
import {Modal} from 'antd';
import DetailModal from './detailModal';
import axios from 'axios';
import CancleButton from '../BlockQuote/cancleButton';
// const columns1 = [{
//     title:'序号',
//     dataIndex:'id',
//     key:'id',
//     align:'center',
//     width:'10%'
// },{
//     title:'检测项目',
//     dataIndex:'testItem',
//     key:'testItem',
//     align:'center',
//     width:'30%'
// },{
//     title:'检测结果',
//     dataIndex:'result',
//     key:'result',
//     align:'center',
//     width:'30%'
// },{
//     title:'计量单位',
//     dataIndex:'unit',
//     key:'unit',
//     align:'center',
//     width:'30%'
// },]
// const data = [];
// for(var i = 1; i <=10; i++){
//     data.push({
//         id:i,
//         testItem:`Ca${i}`,
//         result:`结果${i}`,
//         unit:'g/ml'
//     })
// }
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            topData:{},
            testData:{},
            examineData:{},
            detail:[],
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        // this.getAllTestItem = this.getAllTestItem.bind(this);
    }
    /**点击详情 */
    handleDetail(){
        // this.getAllTestItem();
        this.getDetailData();
        this.setState({
            visible:true
        })
    }
    /**获取所有检测项目 */
    // getAllTestItem(){
    //     axios({
    //       url:`${this.props.url.testItems.testItems}`,
    //       method:'get',
    //       headers:{
    //         'Authorization':this.props.url.Authorization
    //       }
    //     }).then(data=>{
    //       const res = data.data.data;
    //       this.setState({
    //         allTestItem : res
    //     })
    //   })   
    //   }
    /**通过id获取数据 */
    getDetailData(){
        axios.get(`${this.props.url.rawTestReport.getById}?id=${this.props.value}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var details  = [];
            var topData = {};
            var testData = {};
            var examineData = {};
            var IsQualified = 0;
            if(res)
                IsQualified = res.testReportRecord?res.testReportRecord.IsQualified:0;
                topData={
                    batchNumber: res.serialNumber?res.serialNumber:'',
                    materialName: res.materialName?res.materialName:'',
                    b:res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                testData={
                    tester:res.tester?res.tester:'',
                    testTime:res.testReportRecord?res.testReportRecord.judgeDate:'',
                }
                if(res.testReportRecord.IsQualified){
                    examineData = {
                        examiner: '审核人',
                        examineView: '数据正常，审核通过',
                        examineTime: '2018年11月12日',
                    }
                }
                if(res.testDTOS){
                    for(var i = 0; i < res.testDTOS.length; i++){
                        var e = res.testDTOS[i];
                            details.push({
                                index:`${i+1}`,
                                id:e.testItemResultRecord.id,
                                testItemId:e.testItemResultRecord.testItemId,
                                testItemName:e.name,
                                testResult:e.testItemResultRecord.testResult,
                                unit:'g/ml'
                            })
                    }   
                }
                // console.log(details)
                // console.log(topData)
                // console.log(testData)
                // console.log(examineData)
                this.setState({
                    detail:{
                        details:details,
                        topData:topData,
                        testData:testData,
                        examineData:examineData,
                        IsQualified:IsQualified,
                    }
                })
        })
    }
    /**点击确定按钮 */
    handleOk(){
        this.setState({
            visible:false
        })
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        return (
            <span>
                <span className='blue' onClick={this.handleDetail} >详情</span>
                <Modal title='详情' visible={this.state.visible} closable={false}
                maskClosable={false} centered={true} style={{top:10}}
                 footer={[
                    <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel}/>
                  ]}
                  >
                  <div style={{height:580}}>
                        <DetailModal detail={this.state.detail}  />
                    </div>
                 {/* <div style={{height:'550px'}}>
                     <table>
                         <thead className='thead'>
                             <tr>
                                 <td>批号</td><td>原材料</td><td>送样日期</td>
                             </tr>
                         </thead>
                         <tbody className='tbody'>
                             <tr>
                                 <td></td><td>{value.batchNumberId}</td><td>{value.date}</td>
                             </tr>
                         </tbody>
                     </table>
                     <div style={{padding:'10px'}}>
                         <span className='span'>样品名称：镍矿石样品</span>
                     </div>
                     <Table rowKey={record=>record.id} columns={columns1} dataSource={data} pagination={false} size='small' bordered scroll={{y:200}}></Table>
                     <div style={{padding:'10px',height:'40px',fontSize:'15px'}}>
                         <div style={{float:'left'}}>
                             <p className='span'>检验人：<span></span></p>
                             <p className='span'>检验时间：<span></span></p>
                         </div>
                         <IsQualified status={1}></IsQualified>
                     </div>
                     <Divider type='horizontal'/>
                     <div style={{textAlign:'center',fontSize:'15px'}}>
                          审核中
                     </div>
                 </div> */}
                </Modal>
            </span>
        );
    }
}
export default Detail;