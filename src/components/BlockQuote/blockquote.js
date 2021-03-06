import React from 'react';
import {withRouter} from 'react-router-dom'
class BlockQuote extends React.Component {
    constructor(props){
        super(props);
        this.backHome = this.backHome.bind(this);
    }
    backHome(){
        //清空默认选中一级菜单以及二级菜单
        localStorage.setItem('selectedKeys','')
        localStorage.setItem('defaultOpenKeys',[])
        this.props.history.push({pathname:'/home'});
    }

    componentDidMount() {
        this.current = JSON.parse(localStorage.getItem('current'));
        if (!this.current) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div style={{borderBottom:'1px solid #f0e9e9'}}>
                <div style={{width:'100%',padding:'10px 20px'}} >
                    <div style={{paddingBottom:'10px'}}><span><span className='blue' onClick={this.backHome}>首页 </span>> {this.props.menu} </span><span className={this.props.menu2?'show':'hide'}>> </span><span className='blue' onClick={this.props.returnDataEntry}> {this.props.menu2}</span></div>
                    <div style={{color:'black',paddingLeft:'15PX',height:'30px',borderLeft:'4px solid #0079FE',fontSize:'20px',fontWeight:'bolder'}} >
                        {this.props.name}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(BlockQuote);
