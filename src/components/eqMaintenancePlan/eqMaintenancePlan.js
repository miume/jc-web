import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import DepartmentCard from './blockCompontent/department'
import ButtonToDd from './blockCompontent/buttontodo'
import ContentTable from './blockCompontent/contenttable'
import './blockCompontent/style.css'

class EqMaintenancePlan extends React.Component{
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
                <Blockquote menu={current.menuParent} name="保养计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px' ,display:'flex',margin:'15px'}} >
                    <DepartmentCard style={{display:'inline' ,width:"20%"}} />
                    <div style={{width:"80%",marginLeft:'15px'}}>
                        <ButtonToDd />
                        <ContentTable />
                    </div>

                </div>

            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }
}

export default EqMaintenancePlan