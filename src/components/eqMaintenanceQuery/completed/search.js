import React from 'react';
import axios from 'axios';
import {Button, Input,DatePicker} from 'antd';
import moment from 'moment';
class SearchCell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectState:'',
            selectTime:'',
            //searchData:'',
            searchInput:'',
            LastIndexDate:'',
            NowIndexDate:'',
            LastDate:'',
            NowDate:'',
            date:{}
        }

        this.handleClicka=this.handleClicka.bind(this);
        this.handleClickb=this.handleClickb.bind(this);
        this.handleClickc=this.handleClickc.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.dateArea = this.dateArea.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
    }
    handleClicka=()=> {
        var date = this.props.getLastMonthTime(1)
        var params = {
            deptId:parseInt(this.props.depCode),
            statusId:3,
            startDate:date.datastr,
            endDate:date.NowDate
        }
        this.props.fetch(params)
        this.setState({
            date:date
        })

    }
        handleClickb=()=>{
            var date = this.props.getLastMonthTime(3)
            var params = {
                deptId:parseInt(this.props.depCode),
                statusId:3,
                startDate:date.datastr,
                endDate:date.NowDate
            }
            this.props.fetch(params)
            this.setState({
                date:date
            })
        }
    handleClickc=()=>{
        var date = this.props.getLastMonthTime(12)
        var params = {
            deptId:parseInt(this.props.depCode),
            statusId:3,
            startDate:date.datastr,
            endDate:date.NowDate
        }
        this.props.fetch(params)
        this.setState({
            date:date
        })
    }
    dateArea = (date, dateString) => {
        console.log(date)
        console.log(dateString)
        var NowIndexDate = this.state.NowIndexDate
        var LastIndexDate = this.state.LastIndexDate
        NowIndexDate = dateString[1]
        LastIndexDate = dateString[0]
        this.setState({
            NowIndexDate:NowIndexDate,
            LastIndexDate:LastIndexDate,
            LastDate:date[0],
            NowDate:date[1]
        })
    }
    handleSearch=()=>{
        console.log('搜索事件')
        var date = this.state.date
        var NowIndexDate = this.state.NowIndexDate
        var LastIndexDate = this.state.LastIndexDate
        var pramas = {}
        if(NowIndexDate!==''&&LastIndexDate!==''){
            pramas ={
                deptId:parseInt(this.props.depCode),
                condition:this.state.searchInput,
                startDate:LastIndexDate,
                endDate:NowIndexDate,
                statusId:3
            }
        }else{
            pramas ={
                deptId:parseInt(this.props.depCode),
                condition:this.state.searchInput,
                startDate:date.datastr,
                endDate:date.NowDate,
                statusId:3
            }
        }
        console.log(pramas)
        this.props.getTableData(pramas)

}
    searchContentChange=(e)=>{
        console.log('获得input内容')
        this.setState({
            searchInput: e.target.value,
        })
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
                >最近1年</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                保养时段：<RangePicker style={{width:210}} onChange={this.dateArea} value={[this.state.LastDate,this.state.NowDate]}  />&nbsp;&nbsp;

                <Search
                   //  id='search'
                   // className = {`search-${type}`}
                    value={this.state.searchInput}
                    placeholder={this.props.name}
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
        // let searchComponent = document.getElementsByClassName(`search-$1`)[0]
        //console.log(searchComponent);
        // searchComponent.childNodes[0].value = ''
        //console.log(searchComponent.childNodes[0])
        this.setState({
            searchInput:'',
            LastDate:null,
            NowDate:null
        })
        this.props.fetch({},1);
        console.log('重置')
    }
    // fetch = (params ,flag) => {
    //     console.log(params)
    //     this.props.getTableData(params)
    //     console.log(flag)
    //     /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
    //     if (flag) {
    //         this.setState({
    //             pageChangeFlag: 0,
    //             searchInput: '',
    //         })
    //     }
    // }

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
