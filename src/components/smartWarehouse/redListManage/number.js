import React, { Component } from 'react';
import {Input,Icon} from 'antd';


class Number extends Component{
    constructor(props){
        super(props);
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){//输入框内容变化时的函数
        //console.log(e.target.value);
        const value=e.target.value;
        const number=value.subString(5);
       // console.log(number);
    }
   render(){
   
       return(
          <div style={{display:'inline-block'}}>
                <Input  onChange={this.onChange} className='input-number'
                 suffix={
                <div>
                   <div style={{width:'100%',  height:'17.89px', border:'1px solid #e4e4e4'}}> <Icon type="up" /></div>
                   <div style={{width:'100%',  height:'17.89px', border:'1px solid #e4e4e4'}}> <Icon type="down" /></div>
                </div>
               }
               style={{width:'320px'}}
               />
                
          </div>
       );
   }
}
export default Number;