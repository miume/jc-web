import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;
class Selected extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }
   
     handleChange(value) {
        console.log(`selected ${value}`);
      }
     render(){
       
         return(
             <div>
                      
                        <Select  style={{ width: 80 }}   onChange={this.handleChange}>
                            <Option value="product">生产部</Option>
                            <Option value="test">测试部</Option>
                        </Select>
                    
                
             </div>
         );
     }
}
export default Selected;