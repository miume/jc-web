import React from 'react';
import {Button, Input} from 'antd';
class SearchCell extends React.Component{
    render(){
        const Search = Input.Search;
        const type= this.props.type;
        return(
            <span style={{float:'right',paddingBottom:'8px'}}>
                <Search
                    id='search'
                    className = {`search-${type}`}
                    placeholder={this.props.name}
                    onSearch={this.props.searchEvent}
                    onChange={this.props.searchContentChange}
                    enterButton
                    style={{ width: 200 }}
                />
                <Button
                    type="primary"
                    style={{marginLeft:10}}
                    onClick={this.getFetch}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }
    getFetch = () => {
        /**重置时清除搜索框的值 */
        let searchComponent = document.getElementsByClassName(`search-${this.props.type}`)[0]        
        searchComponent.childNodes[0].value = ''
        this.props.fetch();
    }
}
export default SearchCell;
