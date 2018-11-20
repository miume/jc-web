import React from 'react';
import {Input} from 'antd';
const Search = Input.Search;
class SearchCell extends React.Component{
    render(){
        return(
            <span>
                <Search
                    style={{width:200}}
                    placeholder={this.props.name}
                    onChange={this.props.searchContentChange}
                    onSearch={this.props.searchEvent}
                    enterButton/>
                </span>
        );
    }
}
export default SearchCell;