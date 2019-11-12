import React,{Component} from 'react'
import {Spin} from 'antd'
import Search from '../processCompare/compareSearch'
import ReactEcharts from 'echarts-for-react';
class ProductLineCompare extends Component{//工序对比分析
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodCode:this.props.periodCode?this.props.periodCode:1,
            dateTime:'',
            processCode:1,
        }
        this.getOption=this.getOption.bind(this);
        this.selectPeriodChange=this.selectPeriodChange.bind(this);
        this.selectProcessChange=this.selectProcessChange.bind(this);
        this.dateChange=this.dateChange.bind(this);
        this.search=this.search.bind(this);
    }
    getOption(){
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Ni','Co','Mn']
            },
        
            toolbox: {
                feature: {
                    magicType:{show:true,type:['line','bar']},
                    saveAsImage: {show:true}
                }
            },
            xAxis: {
                type: 'category',
                name:'周期数',
                boundaryGap: false,
                data: ['59','60','61','63','64','70']
            },
            yAxis: {
                type: 'value',
                name:'含量(T)'
            },
            series: [
                {
                    name:'Ni',
                    type:'line',
                    data:[24, 25, 57, 35, 32, 20]
                },
                {
                    name:'Co',
                    type:'line',
                    data:[26, 28, 51, 48, 19, 17]
                },
                {
                    name:'Mn',
                    type:'line',
                    data:[9, 26, 28, 52, 48, 18]
                },
            ]
        };
        return option;        
    }
    selectPeriodChange(value){
        this.setState({
            periodCode:value
        })
    }
    selectProcessChange(value){
        this.setState({
            processCode:value
        })
    }
    dateChange(date,dateString){
        this.setState({
            dateTime:dateString
        })
    }
    search(){
        let {periodCode,processCode,dateTime}=this.state;
        let params={//点击确定，将params传给后台
            periodCode:periodCode,
            processCode:processCode,
            dateTime:dateTime
        }
    }
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                   <Search flag={true} lineFlag={true} staticPeriod={this.props.staticPeriod} process={this.props.process} periodCode={this.state.periodCode} processCode={this.state.processCode} selectPeriodChange={this.selectPeriodChange} selectProcessChange={this.selectProcessChange} dateChange={this.dateChange}/>
                   <ReactEcharts
                        option={this.getOption()}
                        style={{height: '350px', width: '800px',margin:'20px 100px 0 150px'}}
                        />
                </Spin>
            </div>
        );
    }
}
export default ProductLineCompare 