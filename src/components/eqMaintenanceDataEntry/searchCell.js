import React from 'react';
import {Button, Input,DatePicker} from 'antd';
class SearchCell extends React.Component{
    render(){
        const Search = Input.Search;
        const type= this.props.type;
        return(
            //className={this.props.flag?'searchCell':'hide'}
            <span className={this.props.flag?'searchCell':'hide'}>
            {
                this.props.timeFlag?
                    <span id='date-choose'>
                <DatePicker className = {`search-${type}`} onChange={this.props.searchContentChange} placeholder='请选择日期' />
                <Button type="primary" icon="search" className='time-search' onClick={this.props.searchEvent}></Button></span>:
                    <Search
                        id='search'
                        className = {`search-${type}`}
                        placeholder="请输入搜索内容"
                        onSearch={this.props.searchEvent}
                        onChange={this.props.searchContentChange}
                        enterButton
                        style={{ width: 250 }}
                    />
            }
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
        //console.log(searchComponent);
        searchComponent.childNodes[0].value = ''
        console.log(searchComponent.childNodes[0])
        console.log(searchComponent.childNodes)
        this.props.fetch(this.props.clickdeviceName,'',1);
    }
}
export default SearchCell;
