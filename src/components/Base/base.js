import React from 'react';
import {Button,Icon} from 'antd';

class Base extends React.Component{
    constructor(props){
        super(props);
        this.state={
            seletedId:[]
        }
    }
  render(){
      return(
          <div>
              <Button type='primary' disabled={!this.state.seletedId.length===0}>下一步<Icon type='right' /></Button>
          </div>
      );
  }
}
 export default Base;