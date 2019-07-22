import React from 'react';
import axios from 'axios';
import {Button, Input,DatePicker} from 'antd';

var date=new Date();
var strYear = date.getFullYear();
var strDay = date.getDate();
var strMonth = date.getMonth()+1;
var NowDate= strYear+"-"+strMonth+"-"+strDay;

class SearchCell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectState:'',
            selectTime:'',
            //searchData:'',
            searchInput:'',
            LastIndexDate:' ',
            NowIndexDate:' ',
        }

        this.handleClicka=this.handleClicka.bind(this);
        this.handleClickb=this.handleClickb.bind(this);
        this.handleClickc=this.handleClickc.bind(this);
        this.handleChangeTime=this.handleChangeTime.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.getLastMonthTime=this.getLastMonthTime.bind(this);
    }
    handleClicka=()=> {
        console.log('传送点击的button获取表格数据')
            this.setState({
                selectState: 'oneMonth',
            })
        //近1个月
        var d=this.getLastMonthTime(1)
        console.log(d)
        console.log(NowDate)
        this.setState({
            NowIndexDate:NowDate,
            LastIndexDate:d,
        })

    }
        handleClickb=()=>{
            console.log('传送点击的button获取表格数据')
            this.setState({
                selectState:'threeMonth',
            })
            //近3个月
            var d=this.getLastMonthTime(3)
            console.log(d)
            this.setState({
                NowIndexDate:NowDate,
                LastIndexDate:d,
            })
        }
    handleClickc=()=>{
        console.log('传送点击的button获取表格数据')
        this.setState({
            selectState:'year',
        })
        //近一年
        var d=this.getLastMonthTime(12)
        console.log(d)
        this.setState({
            NowIndexDate:NowDate,
            LastIndexDate:d,
        })
    }
    handleChangeTime=(e)=>{
        console.log('选择时间')
        this.setState({
            selectTime:e.value,
        })
        // const pramas ={
        //     deptId:this.props.depCode,
        //     condition:this.state.selectTime,
        // }
        // this.props.getTableData(pramas)
    }
    handleSearch=()=>{
        console.log('搜索事件')
        const pramas ={
            deptId:parseInt(this.props.depCode),
            condition:this.state.searchInput,
        }
        console.log(pramas)
        this.props.getTableData(pramas)
    //     axios({
    //         url: `${this.props.url.eqMaintenanceDataEntry.getAll}`,
    //         method:'get',
    //         headers:{
    //             'Authorizatiton':this.url.Authorization},
    //         params:{
    //             deviceName:clickdeviceName
    //         },}
    //     ).then((data)=>{
    //         console.log('sssssssssss')
    //         const result = data.data.data
    //         console.log(result)
    //         // this.pagination.total=result?result.total:0;
    //         // this.pagination.current=result.pageNum;
    //         console.log('------------------')
    //         // console.log(result.pageNum)
    //         console.log('------------------')
    //         // if(result&&result.list){
    //         //     for(let i=1;i<=result.list.length;i++){
    //         //         result.list[i-1]['id']=result.prePage*10+i;
    //         //     }
    //         // }
    //         this.setState({
    //             datasource:result,
    //         });
    //         // const res = data.data.data;
    //         // if(res&&res.list)
    //         // {
    //         //     for(var i = 1; i <= res.list.length;i++){
    //         //         var e = res.list[i-1];
    //         //         e['index'] = res.prePage*10+i
    //         //     }
    //         //     this.pagination.total = res?res.total:0;
    //         //     this.setState({
    //         //         dataSource:res.list,
    //         //     })
    //         // }
    //     });
    // }


}
    searchContentChange=(e)=>{
        console.log('获得input内容')
        this.setState({
            searchInput: e.target.value,
        })
    }

    getLastMonthTime(month){
        //  1    2    3    4    5    6    7    8    9   10    11   12月
        var daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
        if (((strYear % 4) === 0) && ((strYear % 100)!==0) || ((strYear % 400)===0)){
            daysInMonth[2] = 29;
        }
        if(month===1){
            if(strMonth - 1 === 0) //二、解决跨年问题
            {
                strYear -= 1;
                strMonth = 12;
            }
            else
            {
                strMonth -= month;
            }
        }
        else if(month===3){
            if(strMonth - month<= 0) //二、解决跨年问题
            {
                strYear -= 1;
                if(strMonth===1)strMonth=10;
                else if(strMonth===2)strMonth=11;
                else if(strMonth===3)strMonth=12;
            }
            else
            {
                strMonth -= month;
            }
        }
        else if(month===12){
            strYear-=1;
        }
        // strYear=2000;
        // strMonth=2;
        // strDay=31;
//  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
        strDay = Math.min(strDay,daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30
        if(strMonth<10)//给个位数的月、日补零
        {
            strMonth="0"+strMonth;
        }
        if(strDay<10)
        {
            strDay="0"+strDay;
        }
        var datastr = strYear+"-"+strMonth+"-"+strDay;
        return datastr;
    }

    render(){
        const Search = Input.Search;
        const type= this.props.type;
        const {  RangePicker } = DatePicker;
        return(
            //className={this.props.flag?'searchCell':'hide'}
            <div >
                <span style={{paddingTop: '7px'}}>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;默认：&nbsp;&nbsp;&nbsp;</span>

                <Button
                    style={{height:30}}
                    onClick={this.handleClicka}
                    type="default"
                >最近1月</Button>&nbsp;&nbsp;&nbsp;

                <Button
                    style={{height:30}}
                    onClick={this.handleClickb}
                    type="default"
                >最近3月</Button>&nbsp;&nbsp;&nbsp;

                <Button
                    style={{height:30}}
                    onClick={this.handleClickc}
                    type="default"
                >最近1年</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                保养时段：<RangePicker style={{width:200}} onChange={this.onChange} />&nbsp;&nbsp;

                <Search
                   //  id='search'
                   // className = {`search-${type}`}
                  //  placeholder={this.props.name}
                     onSearch={this.handleSearch}
                     onChange={this.searchContentChange}
                     enterButton
                    style={{ width: 200 }}
                  //  searchContentChange={this.searchContentChange}
                    name='单号/设备名称/编号...'
                />

                <Button
                    type="primary"
                    style={{marginLeft:10,width:70}}
                    onClick={this.getFetch}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>

            </div>
        );
    }

    getFetch = () => {
        /*重置时清除搜索框的值*/
        let searchComponent = document.getElementsByClassName(`search-${this.props.type}`)[0]
        //console.log(searchComponent);
        searchComponent.childNodes[0].value = ''
        //console.log(searchComponent.childNodes[0])
        this.props.fetch({},1);
        console.log('重置')
    }

    // ffetch=(selectdate)=>{
    //     // if(flag)
    //     //     this.setState({
    //     //         pageChangeFlag:0,
    //     //         searchContent:''
    //     //     })
    //     axios({
    //         url: `${this.props.url.eqMaintenanceDataEntry.getAll}`,
    //         method:'get',
    //         headers:{
    //             'Authorizatiton':this.url.Authorization},
    //         params:{
    //             deviceName:selectdate
    //         },}
    //     ).then((data)=>{
    //         console.log('sssssssssss')
    //         const result = data.data.data
    //         console.log(result)
    //         console.log('------------------')
    //         this.setState({
    //             datasource:result,
    //         });
    //     });
    // }


    // /**获取查询时角色名称的实时变化 */
    // searchContentChange(e){
    //     const value = e.target.value;
    //     this.setState({searchContent:value});
    // }
}
export default SearchCell;
