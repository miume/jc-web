import React from 'react';
import axios from 'axios';
import DetailModal from '../dataEntry/rawTestReport/detailModal';
class RawTest extends React.Component{
    componentDidMount(){
        const dataId = this.props.dataId;
        const type = this.props.type;
        var url = '';
        switch(type){
            case 5:  url = `${this.props.url.productTestRecord.getByBatchNUmberId}?batchNumberId=${dataId}`; break;
            case 9:  url = `${this.props.url.rawTestReport.rawTestReport}/detailsByBatchNumberId?id=${dataId}`; break;
            case 10: url =  `${this.props.url.intermediateProduct}/detailsByBatchNumberId/${dataId}`; break;
            case 13: url = `${this.props.url.rawStandard.getStandard}/${dataId}`; break;
            default: url = ''; break;
        }
        this.getData(url);
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
            reply:'',
        }
        this.getData = this.getData.bind(this);
        // this.textChange = this.textChange.bind(this);
        // this.getAllTester = this.getAllTester.bind(this);
    }
    getData(url){
        axios.get(`${url}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var details  = [];
            var topData = {};
            var testData = {};
            var IsQualified = 0;
            if(res){
                IsQualified = res.testReportRecord?res.testReportRecord.isQualified:0;
                topData={
                    batchNumber: res.commonBatchNumber.batchNumber?res.commonBatchNumber.batchNumber:'',
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
                                unit:e.unit
                            })
                    }
                }
                var detail = {
                    details:details,
                    topData:topData,
                    testData:testData,
                    IsQualified:IsQualified,
                }
                this.setState({
                    data:detail
                })
            }
        })
    }
    /**通过batchNumberId 查询审核人 */
    // getAllTester(dataId){
    //     axios({
    //       url:`${this.props.url.toDoList}/${dataId}/result`,
    //       method:'get',
    //       headers:{
    //         'Authorization':this.props.url.Authorization
    //       }
    //     }).then(data=>{
    //       const res = data.data.data;
    //     //   console.log(res)
    //       if(res){
    //         this.setState({
    //             examineData : res
    //         })
    //       }
    //   })
    //   }
    /**监控审核意见的变化 */
    // textChange(e){
    //     const value = e.target.value;
    //     this.setState({
    //         reply:value
    //     })
    // }
    render(){
        // this.props.getReplyData(this.state.reply);
        return (
            <DetailModal detail={this.state.data} dataId={this.props.dataId} checkFlag={1} />
        );
    }
}
export default RawTest;