import React from 'react';
import {Button, Input} from 'antd';
const Search = Input.Search;
class SearchCell extends React.Component{
    render(){
        return(
            <span style={{float:'right'}}>
                <Search
                    placeholder={this.props.placeholder}
                    onSearch={this.props.searchEvent}
                    onChange={this.props.searchContentChange}
                    enterButton
                    style={{ width: 200 }}
                />
                <Button
                    type="primary"
                    style={{marginLeft:10}}
                    onClick={this.getFetch}
                >重置</Button>
            </span>
        );
    }
    getFetch = () => {
        this.props.fetch();
    }
}
export default SearchCell;
