import React from 'react';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios'

class MaterialRecord extends React.Component{
    url
    server
    Authorization
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
    constructor(props){
        super(props);
        this.state={
            searchContent:'',
            dataSource:[],
            user:[]
        }
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.getAllData = this.getAllData.bind(this);
    }
    componentDidMount() {
        this.getAllData();
    }
    /**获取所有父菜单 */
  getAllData(){
    axios({
      url:`${this.url.libraryManage.getAll}`,
      method:'get',
      headers:{
        'Authorization': this.url.Authorization
        },
        params: {materialClass:1},
    }).then((data)=>{
      const res = data.data.data;
      if(res){
        for(var i = 1; i<=res.length; i++){
            res[i-1]['index']=i;
        }
          this.setState({
            dataSource:res,
            searchContent:'',
          })
      }
    })
  }
    searchContentChange(e){
        const value=e.target.value;//此处显示的是我搜索框填的内容
          this.setState({searchContent:value});
     }
    searchEvent(){
        const name=this.state.searchContent;
        axios({
            url:`${this.url.libraryManage.getAllLikeByPage}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                materialName:name,
                materialClass:1
            },
            type:"json",
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                for(var i = 1; i<=res.length; i++){
                    res[i-1]['index']=i;
                }
                this.setState({
                    dataSource:res
                  })
            }
        })
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return (
            <div style={{padding:'0 15px'}}>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货品名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch = {this.getAllData}
                        type={this.props.type}
                        flag={this.props.flag}
                    >
                    </SearchCell>
                </span>
                <div className='clear'></div>
                <div className='LM-tableHeadContainer' style={{verticalAlign:"baseline"}}>
                <div className="LM-tableHead" style={{width:"10%"}}>序号</div>
                <div className="LM-tableHead" style={{width:"12.8%"}}>批次号</div>
                <div className="LM-tableHead" style={{width:"12.8%"}}>货品名称</div>
                <div className="LM-tableHead" style={{width:"12.8%"}}>货品型号</div>
                <div className="LM-tableHead" style={{width:"12.8%"}}>盘库日期</div>
                <div className="LM-tableHead" style={{width:"12.75%"}}>盘库人</div>
                {/* <div className="LM-blueTableHead LM-tableHead" style={{width:"10%"}}>记录数量</div>
                <div className="LM-blueTableHead LM-tableHead" style={{width:"10%"}}>实际数量</div> */}
                <div className="LM-blueTableHead LM-tableHead" style={{width:"12.8%"}}>记录重量</div>
                <div className="LM-blueTableHead LM-tableHead" style={{width:"12.8%"}}>实际重量</div>
                </div>
                <div className="MRparent">
                    <div className="MRone">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className="MRborder-down" key={index}>
                                    {m.index}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRtwo">
                {
                    this.state.dataSource.map((m,index)=>{
                        // var string = m.serialNumber.split('-')[0]+'...'
                        // if(m.serialNumber.length>13){
                        //     string = m.serialNumber.substring(0,13)
                        // }else{
                        //     string = m.serialNumber
                        // }
                        return <div title={m.serialNumber} className="MRborder-down" key={index}>
                                    {m.serialNumber}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRthree">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className="MRborder-down" key={index}>
                                    {m.materialName}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRfour">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className="MRborder-down" key={index}>
                                    原材料
                                </div>    
                    })
                }
                    </div>
                    <div className="MRfour">
                {

                    this.state.dataSource?this.state.dataSource.map((m,index)=>{
                        var string = m.repoDiffRecord.createTime?m.repoDiffRecord.createTime.substring(0,10):'无'
                        return <div title={m.repoDiffRecord.createTime} style={{textDecoration:'underline'}} className="MRborder-down" key={index}>
                                    {string}
                                </div>    
                    }):null
                }
                    </div>
                    <div className="MRfour">
                {
                    this.state.dataSource?this.state.dataSource.map((m,index)=>{
                        return <div className="MRborder-down" key={index}>
                                    {m.creator}
                                </div>    
                    }):null
                }
                    </div>
                    {/* <div className="MRfive">

                            <div className="head-shadow">
                            </div>


                {
                    this.state.dataSource.map((m,index)=>{
                        if(m.repoDiffRecord.supposedQuantity !== m.repoDiffRecord.realQuantity){
                            return <div className="MRborder-down" key={index} style={{color:"red"}}>
                        {m.repoDiffRecord.supposedQuantity}  </div>    
                        }else{
                            return <div className="MRborder-down" key={index}>
                            {m.repoDiffRecord.supposedQuantity}  </div>  
                        }
                    })
                }
                    </div> */}
                    {/* <div className="MRsix">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className="MRborder-down" key={index}>
                                    {m.repoDiffRecord.realQuantity}
                                </div>    
                    })
                }
                    </div> */}
                    <div className="MRseven">
                        {/* <div className="MRborder-down2">记录重量</div> */}
                        <div className='white-space space-left'></div>
                {
                    this.state.dataSource.map((m,index)=>{
                        if(m.repoDiffRecord.supposedWeight !== m.repoDiffRecord.realWeight){
                            return <div className="MRborder-down" key={index} style={{color:"red"}}>
                            {m.repoDiffRecord.supposedWeight}
                        </div>
                        }else{ return <div className="MRborder-down" key={index}>
                        {m.repoDiffRecord.supposedWeight}
                    </div>}
                       
                    })
                }
                    </div>
                    <div className="MReight">
                        {/* <div className="MRborder-down4">实际重量</div> */}
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className="MRborder-down" key={index}>
                                    {m.repoDiffRecord.realWeight}
                                </div>    
                    })
                }
                    </div>
                </div>
            </div>
        )
    }
}

export default MaterialRecord