import  React,{Component} from 'react'
import Search from './compareSearch'
import ReactEcharts from 'echarts-for-react'
class PositiveProcessCom extends Component{
    constructor(props){
        super(props);
        this.handleConfirm=this.handleConfirm.bind(this);
        this.periodChange=this.periodChange.bind(this);
        this.timeChange=this.timeChange.bind(this)
        this.lineChange=this.lineChange.bind(this);
        this.analyChange=this.analyChange.bind(this)
        this.getOption=this.getOption.bind(this);
    }
    handleConfirm(){

    }
    periodChange(){

    }
    timeChange(){

    }
    lineChange(){

    }
    analyChange(){

    }
    getOption(){
        const option={
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['在线原料','工序名称','工序名称']
            },
            toolbox:{
                feature:{
                    magicType:{show:true,type:['line','bar']},
                    saveAsImage:{show:true}
                }
            },
            xAxis:{
                type:'',
                name:'日期',
                boundaryGap:false,
                data:['2019-09-01','2019-09-02','2019-09-03','2019-09-04','2019-09-05']
            },
            yAxis:{
                type:'value',
                name:'含量(T)'
            },
            series:[{
                name:'在线原料',
                type:'line',
                data:[24, 25, 57, 35, 32]
            },{
                name:'工序名称',
                type:'line',
                data:[26, 28, 51, 48, 19]
            },{
                name:'工序名称',
                type:'line',
                data:[9, 26, 28, 52, 48]
            }]
        }
        return option
    }
    render(){
        return(
            <div>
                <Search flag={true} handleConfirm={this.handleConfirm} periodChange={this.periodChange} timeChange={this.timeChange} lineChange={this.lineChange} analyChange={this.analyChange}/>
               <ReactEcharts
                option={this.getOption()}
                style={{height:'350px',width:'800px',margin:'20px 100px 0 150px'}}/>
            </div>
        )
    }
}
export default PositiveProcessCom