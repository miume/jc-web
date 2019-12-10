import React,{Component} from 'react'
import {Select,DatePicker,Button,Tabs} from 'antd'
import NewButton from '../../../BlockQuote/newButton'
import axios from 'axios'
const {Option}=Select;

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            periodData:[],
            lineData:[],
            modelData:[],
        }
        this.getLine=this.getLine.bind(this)
        this.getPeriod=this.getPeriod.bind(this)
    }
    componentDidMount(){
        this.getLine()
        this.getPeriod()
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }
    getLine(){
        axios({
            url:this.props.url.positiveProductline.all,
            method:'get',
            headers:{
                '.Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            this.setState({
                lineData:res
            })
        })
    }
    getPeriod(){
        axios({
            url:this.props.url.positiveStatic.all,
            method:'get',
            headers:{
                '.Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            this.setState({
                periodData:res
            })
        })
    }
    render(){
        return(
            <div>
                <Select placeholder='请选择产线' style={{width:'200px',marginRight:'10px'}}>
                {
                      this.state.lineData?this.state.lineData.map(item=>{
                          return(
                              <Option key={item.code} value={item.code}>{item.name}</Option>
                          )
                      }):null
                  }
                </Select>
                <Select placeholder='请选择产品型号' style={{width:'200px',marginRight:'10px'}}> 
                    
                </Select>
                <Select placeholder='请选择周期' style={{width:'200px',marginRight:'10px'}}> 
                  {
                      this.state.periodData?this.state.periodData.map(item=>{
                          return(
                              <Option key={item.code} value={item.code}>{item.name}</Option>
                          )
                      }):null
                  }
                </Select>
                <DatePicker placeholder='周期开始时间' style={{width:'200px',marginRight:'10px'}}/>
                <DatePicker placeholder='周期结束时间' style={{width:'200px',marginRight:'10px'}}/>
                <NewButton name='确定' />
                <Button
                type='primary'>重置</Button>
            
            </div>
        )
    }
}
export default Search