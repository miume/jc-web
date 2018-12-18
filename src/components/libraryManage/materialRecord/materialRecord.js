import React from 'react';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios'

class MaterialRecord extends React.Component{
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
      url:`${this.server}/jc/common/RepoDiffRecord`,
      method:'get',
      headers:{
        'Authorization': this.Authorization
        },
        params: {materialClass:1},
    }).then((data)=>{
      const res = data.data.data;
      for(var i = 1; i<=res.length; i++){
        res[i-1]['index']=i;
    }
      this.setState({
        dataSource:res
      })
    })
  }
    searchContentChange(e){
        const  value=e.target.value;//此处显示的是我搜索框填的内容
          this.setState({searchContent:value});
     }
    searchEvent(){
        const name=this.state.searchContent;
        axios({
            url:`${this.server}/jc/common/RepoDiffRecord/getByMaterialNameLike`,
            method:"get",
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                materialName:name,
                materialClass:1
            },
            type:"json",
        }).then((data)=>{
            const res = data.data.data;
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            this.setState({
                dataSource:res
              })
        })
    }

    render(){
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return (
            <div style={{padding:'0 15px'}}>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入搜索内容'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch = {this.getAllData}
                    >
                    </SearchCell>
                </span>
                <div className='clear'></div>
                <div className="MRparent">
                    <div className="MRone">
                        <div className="MRborder-down">序号</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    {m.index}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRtwo">
                        <div className="MRborder-down">批号</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    {m.serialNumber}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRthree">
                        <div className="MRborder-down">货品名称</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    {m.materialName}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRfour">
                        <div className="MRborder-down">货品型号</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    原材料
                                </div>    
                    })
                }
                    </div>
                    <div className="MRfour">
                        <div className="MRborder-down">盘库日期</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    盘库日期
                                </div>    
                    })
                }
                    </div>
                    <div className="MRfour">
                        <div className="MRborder-down">盘库人</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    {m.repoDiffRecord.creator}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRfive">

                            <div className="head-shadow">
                                <div className="MRborder-down3">记录数量</div>
                                {/* <div className="fa fa-balance-scale"></div> */}
                            </div>


                {
                    this.state.dataSource.map((m)=>{
                        if(m.repoDiffRecord.supposedQuantity !== m.repoDiffRecord.realQuantity){
                            return <div className="MRborder-down" style={{color:"red"}}>
                        {m.repoDiffRecord.supposedQuantity}  </div>    
                        }else{
                            return <div className="MRborder-down">
                            {m.repoDiffRecord.supposedQuantity}  </div>  
                        }
                    })
                }
                    </div>
                    <div className="MRsix">
                        <div className="MRborder-down1">实际数量</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
                                    {m.repoDiffRecord.realQuantity}
                                </div>    
                    })
                }
                    </div>
                    <div className="MRseven">
                        <div className="MRborder-down2">记录重量</div>
                        <div className='white-space space-left'></div>
                {
                    this.state.dataSource.map((m)=>{
                        if(m.repoDiffRecord.supposedWeight !== m.repoDiffRecord.realWeight){
                            return <div className="MRborder-down" style={{color:"red"}}>
                            {m.repoDiffRecord.supposedWeight}
                        </div>
                        }else{ return <div className="MRborder-down">
                        {m.repoDiffRecord.supposedWeight}
                    </div>}
                       
                    })
                }
                    </div>
                    <div className="MReight">
                        <div className="MRborder-down4">实际重量</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="MRborder-down">
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