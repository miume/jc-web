import React from 'react';
import SearchCell from "../BlockQuote/search";
import UnqualifiedTable from "./unqualifiedTable";
import BlockQuote from "../BlockQuote/blockquote";

const data =[];
for (let i = 0; i < 20; i++) {
    data.push({
        index: i,
        id:i,
        a: '测试',
        b: '测试',
        c: '启东北新',
        d: '2019年1月10号',
        e: '李小红',
        f: '2018年11月27日',
        g: '李小红',
        h: '2018年11月27日',
        type: '进货检验',
        state:3,
        isUrgent:'紧急',
    });
}

class UnqualifiedExamine extends React.Component{
    Authorization;
    server;
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return ;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: data,
            searchContent:'',
            searchText: '',
        };
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
    }
    render() {
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        const current = JSON.parse(localStorage.getItem('current')) ;
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell
                        name='请输入搜索内容'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        // fetch={this.fetch}
                    />
                </span>
                <div className='clear' ></div>
                <UnqualifiedTable
                    data={this.state.dataSource}
                    pagination={this.pagination}
                    // fetch={this.fetch}
                />
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
}

export default UnqualifiedExamine;