import React from 'react';
import {Button, Input} from 'antd';
const Search = Input.Search;

class NewSearchCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: undefined
        };
        this.reset = this.reset.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
    }
    render(){
        let {searchContent} = this.state, {flag,placeholder} = this.props;
        return (
            <span className={flag?'searchCell':'hide'}>
                 <Search
                     placeholder={placeholder}
                     value={searchContent}
                     onSearch={this.searchEvent}
                     onChange={this.searchContentChange}
                     enterButton
                     style={{ width: 250 }}
                 />
                <Button
                    type="primary"
                    style={{marginLeft:10}}
                    onClick={this.reset}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }

    /**监控搜索内容变化*/
    searchContentChange(e) {
        let searchContent = e.target.value;
        this.setState({
            searchContent
        })
    }

    /**搜索事件*/
    searchEvent() {
        let {searchContent} = this.state;
        this.props.searchEvent(searchContent);
    }

    reset() {
        this.setState({
            searchContent: undefined
        });
        this.props.reset();
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default NewSearchCell;
