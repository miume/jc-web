import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import NewButton from "../../BlockQuote/newButton";
import {Spin} from "antd";
import SearchCell from '../../BlockQuote/search';

class CheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current')) ;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd}/>
                    <NewButton name='删除' handleClick={this.statisticalAnalysis}/>
                    <SearchCell flag={true} search={this.confirm} reset={this.reset} selectChange={this.selectChange} startChange={this.startChange} endChange={this.endChange}/>
                    <div className='clear'></div>
                </Spin>
            </div>
        );
    }
}

export default CheckItem;
