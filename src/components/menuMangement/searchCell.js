import React from 'react';
import {Input,Button} from 'antd';
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
        this.props.fetch();
        /**重置时清除搜索框的值 */
        document.getElementById('search').value = '';
    }
}
export default SearchCell;