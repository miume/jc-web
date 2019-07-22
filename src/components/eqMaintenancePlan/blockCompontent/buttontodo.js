import React, {Component} from 'react'
import { Modal,InputNumber , Input,DatePicker,TreeSelect , Table ,Radio,message } from 'antd';
import Addmaintenance from '../miniCompontent/addmaintenancebutton'
import Searchpart from '../miniCompontent/searchpart'
import './style.css'
import axios from "axios";
class ButtonToDd extends Component {
    state={
        MaintenanceType:[],
    }


        render(){
        return(
            <div className='Buttontodo'style={{display:'flex'}}>
                <Addmaintenance
                    url={this.props.url}
                    params={this.props.params}
                    getTableData={this.props.getTableData}
                    depCode={this.props.depCode}
                    depName={this.props.depName}
                    getMaintType={this.props.getMaintType}
                    getDevice={this.props.getDevice}
                    Device={this.props.Device}
                />
                <Searchpart
                    id='searchpart'
                    url={this.props.url}
                    searchContent={this.props.searchContent}
                    modifySearchContent={this.props.modifySearchContent}
                    getTableData={this.props.getTableData}
                    selectEvent={this.props.selectEvent}
                    searchEvent={this.props.searchEvent}
                    searchReset={this.props.searchReset}
                    depCode={this.props.depCode}
                />
            </div>
        )
    }
}
export default ButtonToDd