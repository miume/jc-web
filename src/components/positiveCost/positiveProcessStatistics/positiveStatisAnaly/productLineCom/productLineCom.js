import React,{Component} from 'react'
import Search from '../processCompare/compareSearch'
import ReactEcharts from 'echarts-for-react'
import {Spin} from 'antd'
class ProductLineCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.handleConfirm=this.handleConfirm.bind(this)
        this.periodChange=this.periodChange.bind(this);
        this.timeChange=this.timeChange.bind(this)
        this.dataTypeChange=this.dataTypeChange.bind(this);
        this.getOption=this.getOption.bind(this);
    }
    handleConfirm(){

    }
    periodChange(){
        
            }
    timeChange(){

    }
    dataTypeChange(){
        
    }
    getOption(){
        const option={
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['生产线1','生产线2','生产线3']
            },
            toolbox:{
                feature:{
                    magicType:{show:true,type:['line','bar']},
                    saveAsImage:{show:true}
                }
            },
            xAxis:{
                type:'category',
                name:'日期',
                boundaryGap:false,
                data:['2019-09-01','2019-09-02','2019-09-03','2019-09-04','2019-09-05']
            },
            yAxis:{
                type:'value',
                name:'含量(T)',
            },
            series:[{
                name:'生产线1',
                type:'line',
                data:[24, 25, 57, 35, 32]
            },{
                name:'生产线2',
                type:'line',
                data:[26, 28, 51, 48, 19]
            },{
                name:'生产线3',
                type:'line',
                data:[9, 26, 28, 52, 48]
            }]
        }
        return option
    }
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search handleConfirm={this.handleConfirm} periodChange={this.periodChange} timeChange={this.timeChange} dataTypeChange={this.dataTypeChange}/>
                    <ReactEcharts 
                        option={this.getOption()}
                        style={{height:'350px',margin:'20px 100px 0 150px'}}/>
                </Spin>
            </div>
        )
    }
}
export default ProductLineCom