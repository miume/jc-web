import React from 'react';
import axios from 'axios';
import DrSpanModal from '../productInspection/drSpanModal';

class CkeckProductInspection extends React.Component{
    componentDidMount(){
        this.getDetailData();
    }
    constructor(props){
        super(props);
        this.state = {
            detailData:{
                topData: {},   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                examine: {       //审核数据
                    examineStatus: '',
                },
                isQualified: '', //不合格状态
            },
        };
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        return(
            <div style={{height:450}}>
                <DrSpanModal
                    data={this.state.detailData}
                />
            </div>
        )
    }
    getDetailData = () =>{
        axios({
            url:`${this.props.url.productInspection.productRecord}/${this.props.dataId}`,
            method : 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(res){
                isQualified = res.isPublished;
                topData = {
                    serialNumber: res.repoBaseSerialNumber.serialNumber,
                    materialName: res.repoBaseSerialNumber.materialName,
                    sampleDeliveringDate: res.deliveringDate
                };
                const testResultDTOList = res.testResultDTOList;
                if(testResultDTOList) {
                    for(var i=0; i<testResultDTOList.length; i++){
                        var e = testResultDTOList[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.testItem.name,
                            testResult:e.testItemResultRecord.testResult,
                            rawTestItemStandard:e.standardValue,
                            unit:e.testItem.unit,
                            isValid: e.testItemResultRecord.isValid
                        })
                    }
                }
                testData = {
                    tester: res.testReportRecord?res.testReportRecord.judger:'',
                    testTime: res.testReportRecord?res.testReportRecord.judgeDate:'',
                };
                this.setState({
                    detailData:{
                        topData: topData,
                        testDTOS: testDTOS,
                        testData: testData,
                        isQualified: isQualified,
                        examine: {
                            examineStatus: '',
                        },
                    },
                });
            }
        })
    }
}

export default CkeckProductInspection;