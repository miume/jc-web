import React from 'react';
import {withRouter} from 'react-router-dom';

class BlockQuote extends React.Component{
    constructor(props){
        super(props);
        this.returnHome=this.returnHome.bind(this);
        this.returnBaseInfo=this.returnBaseInfo.bind(this);
        this.clickSpan=this.clickSpan.bind(this);
    }
    returnHome(){//返回首页
      this.props.history.push({pathname:'/home'});
    }
    returnBaseInfo(){//返回基础数据页面
       this.props.history.push({pathname:'/baseInfo'});
    }
   //点击进入基础数据的各个子模块
   clickSpan(e){
      //console.log(e.target);
      const path=e.target.id;
      this.props.history.push({pathname:path});
   }
    render(){
        const data=[{
            id:1,
            name:'送样工厂',
            path:'/deliveryFactory',
        },{
            id:2,
            name:'产品工序',
            path:'/productProcess',
        },{
            id:3,
            name:'检测项目',
            path:'/testItem',
        },{
            id:4,
            name:'产品线',
            path:'/productLine',
        }]
        return(
            <div style={{borderBottom:'1px solid darkgrey',height:'80px'}}>
              <div style={{width:'100%',padding:'10px 20px',display:'inline-block'}}>
                 <div style={{paddingBottom:'10px'}}>
                    <span><a onClick={this.returnHome}>首页</a>>{this.props.menu}></span>
                    <span><a onClick={this.returnBaseInfo}>{this.props.menu2}</a></span>
                    <span style={{background:'#F2F2F2',marginLeft:'25px',color:'#999999',fontSize:'14px'}}>
                    {
                        data.map(d=>
                        <span key={d.id} id={d.path} onClick={this.clickSpan}
                        style={{padding:'10px',cursor:'pointer'}} className='hover'>{d.name}</span>)
                    }
                    </span>  
                 </div>
                 <div style={{color:'black',paddingLeft:'15px',height:'25px',borderLeft:'4px solid #0079FE',fontSize:'20px',fontWeight:'bolder'}}>
                    {this.props.name}
                 </div>
              </div>
    
            </div>
        );
    }
}
export default withRouter(BlockQuote);