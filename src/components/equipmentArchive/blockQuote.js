import React from "react";
import {withRouter} from 'react-router-dom';

class BlockQuote extends React.Component{
    constructor(props){
        super(props);
        this.backHome = this.backHome.bind(this);
        this.returnBasicData = this.returnBasicData.bind(this);
        this.clickSpan = this.clickSpan.bind(this);
    }
    /**返回主页面 */
    backHome(){
        this.props.history.push({pathname:'/home'});
    }
    /**返回基础数据 */
    returnBasicData(){
        this.props.history.push({pathname:'/equipmentArchive'});
    }
    /**点击返回基础数据各个子模块 */
    clickSpan(e){
        const path = e.target.id;
        this.props.history.push({pathname:path});
    }
    render(){
        const data = [{
            id:1,
            name:"设备档案管理",
            path:"equipmentArchiveManager"
        },{
            id:2,
            name:"配件/部件关联查询",
            path:'eqcomponentSearch'
        }]
        return(
            <div style={{borderBottom:'1px solid darkgrey',height:'80px'}}>
                <div style={{width:'100%',padding:'10px 20px',display:'inline-block'}} >
                <div style={{paddingBottom:'10px'}}><span><span className='blue' onClick={this.backHome}>首页 </span>> {this.props.menu} > </span><span className='blue' onClick={this.returnBasicData}>{this.props.menu2}</span>
                    <span style={{background:'#F2F2F2',marginLeft:'25px',color:'#999999',fontSize:'14px'}}>
                    {
                        data.map(d=>
                            <span key={d.id} id={d.path} onClick={this.clickSpan} style={{padding:'10px',cursor:'pointer'}} className='hover'>{d.name}</span>)
                    }
                    </span>
                    </div>
                    <div style={{color:'black',paddingLeft:'15PX',height:'25px',borderLeft:'4px solid #0079FE',fontSize:'20px',fontWeight:'bolder'}} >
                        {this.props.name}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BlockQuote)