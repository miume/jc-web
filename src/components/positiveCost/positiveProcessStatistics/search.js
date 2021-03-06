import React, {Component} from "react";
import {DatePicker, Select, Button, message} from "antd";
import NewButton from "../../BlockQuote/newButton";
import moment from 'moment'

const {Option} = Select;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        periodFlag: true, //为了一开始的渲染，一旦select了，此标志为false
        lineCodeFlag:true
    };
    this.startChange = this.startChange.bind(this);
    this.endChange = this.endChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.reset=this.reset.bind(this);
  }
  componentWillUnmount(){
      this.setState=()=>{
          return
      }
  }
 
/**开始日期变化*/
  startChange(date, dateString) {
    let {length,time}=this.props,{periodFlag}=this.state,
        secondTime = time && periodFlag?time:this.state.time,
        length1=length&&periodFlag?length:this.state.length,
        end = dateString.replace(new RegExp("-","gm"),"/"),
        t=new Date(`${end} ${secondTime}`).getTime()+24*length1*3600*1000,
        endTime=moment(t).format('YYYY-MM-DD HH:mm:ss'),
        endDate=moment(t).format('YYYY-MM-DD ')
    this.setState({
      startTime: `${dateString} ${secondTime}`,
      endTime: endTime,
      startDate:dateString,
        endDate:endDate,
        secondTime:endTime.split(' ')[1]
    });
  }
  /**结束日期变化*/
  endChange(date, dateString) {
    let {secondTime}=this.state

    this.setState({
      endDate: dateString,
      endTime:`${dateString} ${secondTime}`
    });
  }
  /**监控下拉框变化*/
  selectChange(value,option) {
     if(option.props.name==='lineCode'){
         this.setState({
             lineCode:value,
             lineCodeFlag:false
         })
     }
     else{//统计周期下拉变化
         let name=option.props.name.split('-')
         let time=name[0],length=name[1]
         this.setState({
             periodCode: value,
             periodFlag: false,
             length:length,
             time:time,
             periodFlag:false
         });
     }
  }
    /**点击确定*/
    confirm() {
        let {periodCode, startTime, endTime, lineCode} = this.state,
            params = {
                beginTime: startTime,
                endTime: endTime,
                periodCode: periodCode,
                lineCode: lineCode
            };
        // if(!periodCode||!startTime||!endTime||!lineCode){
        // message.error('信息选择不完整!')
        // return
        // }
        this.props.confirm(params)
    }

    reset() {
      if(this.props.tabKey==='2'){//已统计，周期和产线要有默认值，待提交不需要
        this.setState({
            startTime: undefined,
            endTime: undefined,
            periodCode: this.props.periodCode,
            lineCode: this.props.lineCode,
            startDate: null,
            endDate: null
        })
        this.props.getStatisticPage({
            periodCode: this.props.periodCode,
            lineCode: this.props.lineCode,
        })
      }
      else{
        this.setState({
            startTime: undefined,
            endTime: undefined,
            periodCode: undefined,
            lineCode: undefined,
            startDate: null,
            endDate: null
        })
        this.props.getPendSubmit({})
      }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.periodCode !== nextProps.periodCode) {
                this.setState({
                    periodCode: nextProps.periodCode
                })
           
        }
        if (this.props.lineCode !== nextProps.lineCode) {
            this.setState({
                lineCode: nextProps.lineCode
            })
        }
    }

    render() {
        let {line, periodStatis,tabKey} = this.props, {lineCode, endDate, periodCode, startDate} = this.state
        return (
            <span className={this.props.flag ? "searchCell" : "hide"}>
        <span>开始时间 : </span>
                &nbsp;
                <DatePicker
                    onChange={this.startChange}
                    style={{width: 150, marginRight: "10px"}}
                    placeholder={"请选择开始日期"}
                    value={startDate ? moment(startDate) : null}
                />
        <span>结束时间 : </span>
                &nbsp;
                <DatePicker
                    onChange={this.endChange}
                    style={{width: 150, marginRight: "10px"}}
                    placeholder="请选择结束日期"
                    value={endDate ? moment(endDate) : null}
                />
        <Select
            value={periodCode}
            style={{width: 150, marginRight: "10px"}}
            onChange={this.selectChange}
            placeholder={'请选择统计周期'}
        >
          {periodStatis
              ? periodStatis.map(item => {
                  return (
                      <Option key={item.code} value={item.code}
                              name={`${item.startTime}-${item.length}-${'periodCode'}`}>
                          {item.name}
                      </Option>
                  );
              })
              : null}
        </Select>
         <Select
             value={lineCode}
             style={{width: 150, marginRight: "10px"}}
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
        <NewButton name="确定" handleClick={this.confirm}/>
        <Button type={'primary'} onClick={this.reset} className={'button'}><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
      </span>
        );
    }
}

export default Search;
