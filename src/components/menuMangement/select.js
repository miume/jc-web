import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;
class Selected extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        console.log(`selected ${value}`);
      }
    render(){
        return(<div>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
        </div>)
    }
} 
export default Selected;