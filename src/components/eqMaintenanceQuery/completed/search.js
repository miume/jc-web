import React from 'react';
import axios from 'axios';
import {Button, Input,DatePicker} from 'antd';
class SearchCell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectState:'',
            selectTime:'',
            //searchData:'',
            searchInput:'',
        }

        this.handleClicka=this.handleClicka.bind(this);
        this.handleClickb=this.handleClickb.bind(this);
        this.handleClickc=this.handleClickc.bind(this);
        this.handleChangeTime=this.handleChangeTime.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }
    handleClicka=()=> {
        console.log('传送点击的button获取表格数据')

            this.setState({
                selectState: 'oneMonth',
            })

    }
        handleClickb=()=>{
            console.log('传送点击的button获取表格数据')
            this.setState({
                selectState:'threeMonth',
            })

        }
    handleClickc=()=>{
        console.log('传送点击的button获取表格数据')
        this.setState({
            selectState:'year',
        })

    }
    handleChangeTime=(e)=>{
        console.log('选择时间')
        this.setState({
            selectTime:e.value,
        })
    }
    handleSearch=()=>{
        console.log('搜索事件')
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


    render(){
        const Search = Input.Search;
        const type= this.props.type;
        return(
            //className={this.props.flag?'searchCell':'hide'}
            <div >
                <span style={{paddingTop: '7px'}}>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;默认：&nbsp;&nbsp;&nbsp;</span>
                <Button onClick={this.handleClicka} type="default" >最近1月</Button>&nbsp;&nbsp;&nbsp;
                <Button onClick={this.handleClickb}  type="default">最近3月</Button>&nbsp;&nbsp;&nbsp;
                <Button onClick={this.handleClickc} type="default">最近1年</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <DatePicker className = {`search-${type}`} onChange={this.handleChangeTime} placeholder='保养时段' />&nbsp;&nbsp;&nbsp;&nbsp;
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
                    style={{marginLeft:10}}
                    onClick={this.getFetch}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </div>
        );
    }

    getFetch = () => {
        /**重置时清除搜索框的值*/
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
