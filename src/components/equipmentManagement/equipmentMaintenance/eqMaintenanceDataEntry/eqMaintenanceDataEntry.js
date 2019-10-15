import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import LeftLayout from "./leftLayout"

import "./eqMaintenanceDataEntry.css"

class EqMaintenanceDataEntry extends React.Component{

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props){
        super(props)
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="项目录入"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <LeftLayout
                    url={this.url}
                    operation={this.operation}
                    current={this.current}
                />
            </div>
        )
    }

    /**返回数据录入页面 */
    returnDataEntry() {
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }
}

export default EqMaintenanceDataEntry