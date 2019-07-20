import { Select } from 'antd';
import React, {Component} from 'react'
import SearchCell from '../../BlockQuote/search'
import '../blockCompontent/style.css'
class Searchpart extends Component {

    constructor(props){
        super(props)
        this.state= {
            statusSelect:{key: "AllStatus", label: "全部状态"},
            searchContent: '',
            pageChangeFlag: 0,
        }
    }
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
        console.log(value)
    };
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        });
        this.fetch({
            // personName: this.state.searchContent
        });
    }
    fetch = () => {

    };

    handleSelectChange=(value)=> {
        this.setState({statusSelect:value})
        //console.log(value); // { key: "lucy", label: "Lucy (101)" }
        //console.log(this.state.statusSelect)
    }
    render(){


        const { Option } = Select;
        return(
            <div id='right_buttons' className='right_Buttontodo'>
                <Select
                    labelInValue={true}
                    style={{ width: "120px" }}
                    value={this.state.statusSelect}
                    onChange={this.handleSelectChange}
                >
                    <Option key="AllStatus" title='全部状态'>全部状态</Option>
                    <Option key="isEffective"  title='已生效'>已生效</Option>
                    <Option key="notEffective"  title='已失效'>已失效</Option>
                </Select>&nbsp;&nbsp;&nbsp;
                <SearchCell
                    name="单号/设备名称/编号..."
                    width='100px'
                    flag={true}
                    searchContentChange={this.searchContentChange}
                    searchEvent={this.searchEvent}
                    fetch={this.fetch}
                />
            </div>
        )
    }
}
export default  Searchpart
