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
            date:{},
            clickflaga:1,
            clickflagb:0,
            clickflagc:0,
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
            clickflagb:0,
            clickflagc:0,
            clickflaga:1,
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
                clickflaga:0,
                clickflagb:1,
                clickflagc:0,
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
            clickflaga:0,
            clickflagb:0,
            clickflagc:1,

            date:date
        })
    }
    dateArea = (date, dateString) => {
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
        this.props.getTableData(pramas)

}
    searchContentChange=(e)=>{
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
                <span style={{paddingTop: '7px'}}>&nbsp;&nbsp;默认：&nbsp;&nbsp;&nbsp;</span>

                <Button
                    className={this.state.clickflaga?"bd-blue":"bd-grey"}
                    style={{height:30}}
                    onClick={this.handleClicka}
                    type="default"
                >最近1月</Button>&nbsp;&nbsp;&nbsp;

                <Button
                    className={this.state.clickflagb?"bd-blue":"bd-grey"}
                    style={{height:30}}
                    onClick={this.handleClickb}
                    type="default"
                >最近3月</Button>&nbsp;&nbsp;&nbsp;

                <Button
                    className={this.state.clickflagc?"bd-blue":"bd-grey"}
                    style={{height:30}}
                    onClick={this.handleClickc}
                    type="default"
                >最近1年</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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
        this.setState({
            searchInput:'',
            LastDate:null,
            NowDate:null
        })
        this.props.fetch({},1);
    }
}
export default SearchCell;
