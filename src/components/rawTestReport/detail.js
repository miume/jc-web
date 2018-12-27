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
            examineData:[],
            detail:[],
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.getAllTester = this.getAllTester.bind(this);
    }
    /**点击详情 */
    handleDetail(){
        this.getAllTester();
        this.getDetailData();
        this.setState({
            visible:true
        })
    }
    /**通过batchNumberId 查询审核人 */
    getAllTester(){
        axios({
          url:`${this.props.url.toDoList}/${this.props.id}/result`,
          method:'get',
          headers:{
            'Authorization':this.props.url.Authorization
          }
        }).then(data=>{
          const res = data.data.data;
          //console.log(res)
          if(res){
            this.setState({
                examineData : res
            })
          }
      })   
      }
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
            // var examineData = {};
            var IsQualified = 0;
            if(res){
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
                this.setState({
                    detail:{
                        details:details,
                        topData:topData,
                        testData:testData,
                        IsQualified:IsQualified,
                    }
                })
            }
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
                <span className={this.props.status===0||this.props.status===1||this.props.status===2||this.props.status===3?'blue':'notClick'} onClick={this.handleDetail} >详情</span>
                <Modal title='详情' visible={this.state.visible} closable={false}
                maskClosable={false} centered={true} style={{top:10}}
                 footer={[
                    <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel}/>
                  ]}
                  >
                  <div style={{height:580}}>
                        <DetailModal detail={this.state.detail} examineData={this.state.examineData}  />
                    </div>
                </Modal>
            </span>
        );
    }
}
export default Detail;