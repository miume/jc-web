import React from "react";
import {Button, Input, Layout, message, Tree} from "antd";
import axios from "axios";
import home from "../../commom/fns";
import "../equipmenRepair.css";
import DepTree from "./depTree";
import SearchCell from "../../BlockQuote/search";
import TheTable from "./theTable";

class WillRepair extends React.Component{
    constructor(props){
        super(props)

    }

    render() {
        this.url=this.props.url;

        return(
            <div style={{padding: '15px'}} className="eRp">
                {/*左边树部分*/}
                <div className="eRp-left">
                    <DepTree
                        url={this.url}
                        getTableData={this.props.getTableData}
                    />
                </div>
                <div className='eRp-right'>
                    <div className='eRp-putright'>
                        <SearchCell
                            name='关键字'
                            flag={true}
                            fetch={this.fetch}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                        />
                    </div>

                    <div className='eRp-shangbianju'>
                        <TheTable
                            url={this.url}
                            rightTableData={this.props.rightTableData}
                        />
                    </div>
                </div>
            </div>
        );
    }

    fetch=()=>{

    }
    /**绑定搜索事件*/
    searchEvent=()=>{

    }
    /**跟踪搜索事件变化 */
    searchContentChange=(e)=>{

    }
}
export default WillRepair