import React from "react";
import Blockquote from "../BlockQuote/blockquote";

class BatchRule extends React.Component{
    url
    constructor(props){
        super(props)

    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="批次规则" />
                <div style={{padding: '15px'}}>
                    待开发
                </div>
            </div>
        )
    }
}

export default BatchRule