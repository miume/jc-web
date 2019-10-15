import React from 'react';
import {Button, DatePicker, Input} from 'antd';

class SearchCell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectState:'',
            selectTime:'',
            searchInput:'',
            LastIndexDate:'',
            NowIndexDate:'',
            LastDate:'',
            NowDate:'',
            date:{},
            clickFlag: 1
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
            clickFlag: 1,
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
                clickFlag: 2,
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
            clickFlag: 3,
            date:date
        })
    }
    dateArea = (date, dateString) => {
        let NowIndexDate = dateString[1], LastIndexDate = dateString[0]
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
        const {  RangePicker } = DatePicker;
        return(
            <div style={{paddingBottom: '5px'}}>
                <span style={{paddingTop: '7px'}}>&nbsp;&nbsp;默认：&nbsp;&nbsp;&nbsp;</span>

                <Button
                    className={this.state.clickFlag === 1?"bd-blue":"bd-grey"}
                    style={{height:30,marginRight: 5}}
                    onClick={this.handleClicka}
                    type="default"
                >最近1月</Button>

                <Button
                    className={this.state.clickFlag === 2?"bd-blue":"bd-grey"}
                    style={{height:30,marginRight: 5}}
                    onClick={this.handleClickb}
                    type="default"
                >最近3月</Button>

                <Button
                    className={this.state.clickFlag === 3?"bd-blue":"bd-grey"}
                    style={{height:30,marginRight: 80}}
                    onClick={this.handleClickc}
                    type="default"
                >最近1年</Button>


                保养时段：<RangePicker style={{width:230}} onChange={this.dateArea}
                        />&nbsp;&nbsp;

                <Search
                    value={this.state.searchInput}
                    placeholder={this.props.name}
                    onSearch={this.handleSearch}
                    onChange={this.searchContentChange}
                    enterButton
                    style={{ width: 200 }}
                    name='单号/设备名称/编号...'
                />
                <Button
                    type="primary"
                    style={{marginLeft:5,float: 'right'}}
                    onClick={this.getFetch}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </div>
        );
    }

    /**重置*/
    getFetch = () => {
        this.setState({
            searchInput:'',
            LastDate:null,
            NowDate:null
        })
        var date = this.props.getLastMonthTime(1);
        var params = {
            deptId:parseInt(this.props.depCode),
            statusId:3,
            startDate:date.datastr,
            endDate:date.NowDate
        }
        this.props.fetch(params,1);
    }
}
export default SearchCell;
