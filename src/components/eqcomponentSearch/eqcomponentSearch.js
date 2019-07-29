import React from "react";
import Blockquote from "../BlockQuote/blockquote";

class EqcomponentSearch extends React.Component{
    constructor(props) {
        super(props);
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="部件/配件关联查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px'}}>
                    待开发
                </div>
            </div>
        );
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentArchive'});
    }

}
export default EqcomponentSearch