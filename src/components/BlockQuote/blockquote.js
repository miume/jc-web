import React from 'react';
import {withRouter} from 'react-router-dom'
import {Input} from 'antd';
const Search = Input.Search;

class BlockQuote extends React.Component {
    constructor(props){
        super(props);
        this.backHome = this.backHome.bind(this);
    }
    backHome(){
        this.props.history.push({pathname:'/home'});
    }
    render() {
        return (
            <div style={{borderBottom:'1px solid #f0e9e9',height:'80px'}}>
                <div style={{width:'100%',padding:'10px 20px'}} >
                    <div style={{paddingBottom:'10px'}}><span><a onClick={this.backHome}>首页 </a>> {this.props.menu}</span></div>
                    <div style={{color:'black',paddingLeft:'15PX',height:'30px',borderLeft:'4px solid #0079FE',fontSize:'20px',fontWeight:'bolder'}} >
                        {this.props.name}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(BlockQuote);