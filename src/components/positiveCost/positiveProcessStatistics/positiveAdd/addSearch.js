import React,{Component} from 'react'
import {Select,DatePicker,Button,Tabs} from 'antd'
import NewButton from '../../../BlockQuote/newButton'
import axios from 'axios'
const {Option}=Select;

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            modelData:[],
        }
        this.selectChange=this.selectChange.bind(this);
        this.getModel=this.getModel.bind(this)
    }
    componentDidMount(){
        this.getModel()
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }
    getModel(){
        axios({
            url:this.props.url.positiveModel.all,
            method:'get',
            headers: {
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    modelData:res
                })
            }
        })
    }
    /**子组件在接收到props变化时，执行此函数，此处setState不会引起第二次渲染*/
  componentWillReceiveProps(nextProps) {
      if (this.props.periodCode !== nextProps.periodCode) {
        this.setState({
            periodCode: nextProps.periodCode
        })
      }
    }
  selectChange(value,option){
        let name=option.props.name
        this.setState({
            [name]:value
        })
  }
  confirm(){
    //   let {lineCode,periodCode,modelCode,startTime,endTime}=this.state,
    //      params={
    //         beginTime: startTime,
    //         endTime: endTime,
    //         flag: true,
    //         lineCode: lineCode,
    //         periodCode: periodCode,
    //         typeCode: modelCode
    //   }
    //   this.props.addConfirm(params)
  }
    render(){
        return(
            <div>
                <Select onChange={this.selectChange} placeholder='请选择产线' style={{width:'200px',marginRight:'10px'}}>
                {
                      this.props.lineData?this.props.lineData.map(item=>{
                          return(
                              <Option name='lineCode' key={item.code} value={item.code}>{item.name}</Option>
                          )
                      }):null
                  }
                </Select>
                <Select onChange={this.selectChange} value={this.state.modelCode} placeholder='请选择产品型号' style={{width:'200px',marginRight:'10px'}}> 
                {
                      this.state.modelData?this.state.modelData.map(item=>{
                          return(
                              <Option name='modelCode' key={item.code} value={item.code}>{item.name}</Option>
                          )
                      }):null
                  }
                    
                </Select>
                <Select onChange={this.selectChange} value={this.state.periodCode} placeholder='请选择周期' style={{width:'200px',marginRight:'10px'}}> 
                  {
                      this.props.periodStatis?this.props.periodStatis.map(item=>{
                          return(
                              <Option name='periodCode' key={item.code} value={item.code}>{item.name}</Option>
                          )
                      }):null
                  }
                </Select>
                <DatePicker placeholder='周期开始时间' style={{width:'200px',marginRight:'10px'}}/>
                <DatePicker placeholder='周期结束时间' style={{width:'200px',marginRight:'10px'}}/>
                <NewButton name='确定' handleClick={this.confirm}/>     
            </div>
        )
    }
}
export default Search