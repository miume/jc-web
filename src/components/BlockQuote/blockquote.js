import React from 'react';
import {Input} from 'antd';
const Search = Input.Search;

class BlockQuote extends React.Component {
    render() {
        return (
            <div style={{background: '#f2f2f2',fontSize:'18px',width:'100%',height:'45px',padding:'10px' }} >
                <div style={{float:'left',color:'#1E9FFF',paddingRight:'30PX',}} >
                    {this.props.name}
                </div>
            </div>
        );
    }
}
export default BlockQuote;