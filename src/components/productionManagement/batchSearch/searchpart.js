import React from 'react';
import {Button, Icon, Input} from 'antd';
import "./batchSearch.css"


export default class SearchPart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            InputValue:'',
        }
    }
    handleInputChange=(e)=>{
        this.setState({InputValue:e.target.value})
    }
    render(){
        return(
            <span className="batchsearchPart">
                <Input
                    id="batchInput"
                    placeholder="请输入关键字"
                    value={this.state.InputValue}
                    onChange={this.handleInputChange}
                />
                <Button
                    type="primary"
                    style={{marginLeft:10}}
                    onClick={this.handleSearch}
                    className='button'
                >
                    <Icon type="search" />搜索</Button>
                <Button
                    type="primary"
                    onClick={this.getFetch}
                    className='button'
                >
                    <i className="fa fa-repeat" aria-hidden="true"/> 重置</Button>
            </span>
        );
    }
    handleSearch=()=>{
        var params={};
            params={
                condition:this.state.InputValue,
            }
    }
    getFetch = () => {
        /**重置时清除搜索框的值 */
        this.setState({
            InputValue:'',
        })
    }
}

