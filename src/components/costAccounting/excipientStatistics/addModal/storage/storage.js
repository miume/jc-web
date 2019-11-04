import React from "react";
import {Button, Divider,Table, Select, Input,Spin} from "antd";
import NewButton from "../../../../BlockQuote/newButton";

class Storage extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            anStorage:undefined,
            jianStorage:undefined,
        }
    }
    change = (e) =>{
        this.setState({
            anStorage:e.target.value
        })
    }
    onChange=(e)=>{
        this.setState({
            jianStorage:e.target.value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                氨入库量：<Input style={{width:"30%"}} value={this.state.anStorage} onChange={this.change}/>
                <span style={{width:"30%",marginLeft:"80px",display:"inlineBlock"}}>碱入库量：<Input style={{width:"30%"}} value={this.state.jianStorage} onChange={this.onChange}/></span>
            </span>
        )
    }
}

export default Storage