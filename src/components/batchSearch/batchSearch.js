import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import SearchPart from "./searchpart"
import {Table} from "antd";
import {searchcolums,datas} from "../batchInfo/colums";

class BatchSearch extends React.Component{
    url
    constructor(props){
        super(props)
        this.state={
            size:'1',
            page:'10',
        }
        this.pagination={
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            }
        }
    }
    handleSizeChange=(current,size)=>{
        //console.log(current);
        this.setState({
            size:current.pageSize,
            page:'1',
            //loading:true,
        },()=>{
           // this.getTableData()
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="批次追溯" />
                <div className="batchSearch_page" style={{padding: '15px'}}>
                    <SearchPart/>
                    <Table
                        className="batchSearch_table"
                        columns={searchcolums}
                        size={"small"}
                        bordered={true}
                        dataSource={datas}
                        scroll={{y:360}}
                        pagination={this.pagination}
                    />
                </div>
            </div>
        )
    }
}

export default BatchSearch