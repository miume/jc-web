import React, { component, Component } from "react";
import { DatePicker, Select, Button } from "antd";
import NewButton from "../../BlockQuote/newButton";
import axios from 'axios'
import moment from 'moment'
const { Option } = Select;
const { RangePicker } = DatePicker;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodFlag: true //为真意味着是用的父组件传过来的默认code，为了一开始的渲染，一旦select了，此标志为false
    };
    this.startChange = this.startChange.bind(this);
    this.endChange = this.endChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.reset=this.reset.bind(this);
  }
/**开始日期变化*/
  startChange(date, dateString) {
    let {length,time}=this.props,{periodFlag}=this.state,
        secondTime = time && periodFlag?time:this.state.time,
        length1=length&&periodFlag?length:this.state.length,
        t=new Date(dateString).getTime()+24*length1*3600*1000,
        endDate=moment(t).format('YYYY-MM-DD')
    this.setState({
      startTime: `${dateString} ${secondTime}`,
      endTime: `${endDate} ${secondTime}`
    });
  }
  /**结束日期变化*/
  endChange(date, dateString) {
    this.setState({
      endDate: dateString
    });
  }
  /**监控下拉框变化*/
  selectChange(value,option) {
      console.log(value,option)
     if(option.props.name==='lineCode'){
         this.setState({
             lineCode:value
         })
     }
     else{//统计周期下拉变化
         let name=option.props.name.split('-')
         let time=name[0],length=name[1]

         this.setState({
             periodCode: value,
             periodFlag: false,
             length:length,
             time:time
         });
     }
  }

    /**点击确定*/
  confirm() {
      let {periodCode}=this.props,{periodFlag,startTime,endTime,lineCode}=this.state,
          periodCode1=periodCode&&periodFlag?periodCode:this.state.periodCode,
          params = {
              startTime: startTime,
              endTime: endTime,
              periodCode: periodCode1,
              lineCode:lineCode
            };

      this.props.addConfirm(params)
  }
  reset(){
  }

  render(){
      let { periodCode ,line,periodStatis} = this.props,{periodFlag}=this.state
      return (
          <span className={this.props.flag ? "searchCell" : "hide"}>
        <span>开始时间 : </span>
              &nbsp;
              <DatePicker
                  onChange={this.startChange}
                  style={{ width: 150, marginRight: "10px" }}
                  placeholder={"请选择开始日期"}
              />
        <span>结束时间 : </span>
              &nbsp;
              <DatePicker
                  onChange={this.endChange}
                  style={{ width: 150, marginRight: "10px" }}
                  placeholder="请选择结束日期"
              />
        <Select
            value={periodCode && periodFlag ? periodCode : this.state.periodCode}
            style={{ width: 120, marginRight: "10px" }}
            onChange={this.selectChange}
            placeholder={'请选择统计周期'}
        >
          {periodStatis
              ? periodStatis.map(item => {
                  return (
                      <Option key={item.code} value={item.code} name={`${item.startTime}-${item.length}-${'periodCode'}`}>
                          {item.name}
                      </Option>
                  );
              })
              : null}
        </Select>
         <Select
             style={{ width: 120, marginRight: "10px" }}
             onChange={this.selectChange}
             placeholder={'请选择产线'}
         >
          {line
              ? line.map(item => {
                  return (
                      <Option key={item.code} value={item.code} name={'lineCode'}>
                          {item.name}
                      </Option>
                  );
              })
              : null}
        </Select>
        <NewButton name="确定" handleClick={this.confirm} />
        <Button type={'primary'} onClick={this.reset} className={'button'}><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
      </span>
      );
  }
}
export default Search;
