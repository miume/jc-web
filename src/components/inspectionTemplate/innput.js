import React from 'react';
import {Input} from "antd";


class Innput extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            patrolContent:''
        }
        this.onChange=this.onChange.bind(this)
    }
    render() {
        return (
            <div>
                <Input  onChange={this.onChange} value={this.props.value} />
            </div>
        );
    }

    onChange=(e)=>{
        const record=this.props.record
        this.props.changepatrolContent(e.target.value,record)
        console.log(this.props.record)
        console.log(this.props.record.patrolContent)
        // this.changerecord(e.target.value)
    }
}


export default Innput