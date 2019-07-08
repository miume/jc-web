import React, { Component } from 'react';
import axios from 'axios';

class CheckManual extends Component{//查看手册
  
    render(){
        this.href=`${this.props.url. equipmentArchiveRecord.getPdf}/${this.props.record.manualName}`;
        //console.log(this.props.record.manualName);
        //console.log(this.href);
        return(
           <span >
               <a href={this.href} target='_blank'>查看手册</a>
           </span>
        );
    }
}
export default CheckManual;