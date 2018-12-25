import React from 'react';
import axios from 'axios';
import DetailModal from '../rawTestReport/detailModal';
class RawTest extends React.Component{
    componentDidMount(){
        const dataId = this.props.dataId;
        const type = this.props.type;
        var url = '';
        if(type===9){
            url = `${this.props.url.rawTestReport.rawTestReport}/detailsByBatchNumberId?id=${dataId}`;
        }else{
            url = `${this.props.url.intermediateProduct}/detailsByBatchNumberId/${dataId}`
        }
        this.getData(url);
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
            reply:'',
        }
        this.textChange = this.textChange.bind(this);
        this.getData = this.getData.bind(this);
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
                var detail = {
                    details:details,
                    topData:topData,
                    testData:testData,
                    IsQualified:IsQualified,
                }
                // console.log(IsQualified)
                // console.log(detail)
                this.setState({
                    data:detail
                })
            }
        })
    }
    /**监控审核意见的变化 */
    textChange(e){
        const value = e.target.value;
        this.setState({
            reply:value
        })
    }
    render(){
        this.props.getReplyData(this.state.reply);
        return (
            <div style={{height:580}}>
                 {/* 目前接口还没写好，所以没有数据，但可以输入审核意见，点击通过或者不通过按钮 */}
                <DetailModal detail={this.state.data} />
                <div className={this.props.flag?'hide':'check-footer'} >
                    <textarea onChange={this.textChange} className='checkModalTest' placeholder='请输入审核意见'></textarea>
                </div>
            </div>
        );
    }
}
export default RawTest;