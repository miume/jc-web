import React, { Component } from 'react';
import axios from 'axios';
class CheckManual extends Component{//查看手册
    constructor(props){
        super(props);
        this.state={
            urlDown:''
        }
        this.checkManual=this.checkManual.bind(this);
    }
    checkManual(){
        const id=this.props.record.id;
      axios({
          url:`${this.props.url.equipmentArchiveRecord.get}/${id}`,
          method:'get',
          headers:{
              'Authorization':this.props.url.Authorization
          }
      })
      .then((data)=>{
         console.log(data);
         const res=data.data.data;
         if(res){
             const manualName=res.equipmentArchiveRecord.manualName;
             const urlDown1=`http://2p277534k9.iok.la:58718/jc/common/equipmentArchiveRecord/pdf/${manualName}`             
             this.setState({
                 urlDown:urlDown1
             });
            }
      });
    }
    render(){
        return(
           <span>
                <span onClick={this.checkManual}><a href={this.state.urlDown}>查看手册</a></span>
           </span>
        );
    }
}
export default CheckManual;