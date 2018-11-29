import React from 'react';
import {withRouter} from 'react-router-dom';

class BlockQuote extends React.Component {
    constructor(props){
        super(props);
        this.backHome = this.backHome.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.clickSpan = this.clickSpan.bind(this);
    }
    /**返回主页面 */
    backHome(){
        this.props.history.push({pathname:'/home'});
    }
    /**返回数据录入 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'})
    }
    /**点击返回数据录入的各个子模块 */
    clickSpan(e){
        const path = e.target.id;
        this.props.history.push({pathname:path});
    }
    render() {
        const data = [{
            id:1,
            name:'制程检测',
            path:'/processInspection',
        },{
            id:2,
            name:'样品送检',
            path:'/sampleInspection',
        },{
            id:3,
            name:'原材料检测',
            path:'/rawTestReport',
        },{
            id:4,
            name:'进货检验',
            path:'/PurchaseCheckReport',
        },{
            id:5,
            name:'中间品检验',
            path:'/InterProduct',
        },{
            id:6,
            name:'成品检验',
            path:'/process',
        },{
            id:7,
            name:'不合格审评表',
            path:'/InterProduct',
        },{
            id:8,
            name:'不合格跟踪表',
            path:'/process',
        }]
        return (
            <div style={{borderBottom:'1px solid darkgrey',height:'80px'}}>
                <div style={{width:'100%',padding:'10px 20px',display:'inline-block'}} >
                    <div style={{paddingBottom:'10px'}}><span><a onClick={this.backHome}>首页 </a>> {this.props.menu} > </span><a onClick={this.returnDataEntry}>>{this.props.menu2}></a>
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
        );
    }
}
export default withRouter(BlockQuote);