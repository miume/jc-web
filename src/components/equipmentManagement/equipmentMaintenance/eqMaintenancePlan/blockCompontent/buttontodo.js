import React, {Component} from 'react'
import Addmaintenance from '../miniCompontent/addmaintenancebutton'
import Searchpart from '../miniCompontent/searchpart'
import './style.css'

class ButtonToDd extends Component {
    state={
        MaintenanceType:[],
    }

    render(){
        let {addFlag} = this.props;
        return(
            <div className='Buttontodo'style={{display:'flex'}}>
                <Addmaintenance
                    url={this.props.url}
                    params={this.props.params}
                    getTableData={this.props.getTableData}
                    depCode={this.props.depCode}
                    deviceName={this.props.deviceName}
                    getMaintType={this.props.getMaintType}
                    clearMainType={this.props.clearMainType}
                    getDevice={this.props.getDevice}
                    Device={this.props.Device}
                    MaintenanceType={this.props.MaintenanceType}
                    statusId={this.props.statusId}
                    addFlag={addFlag}
                    getTableParams={this.props.getTableParams}
                />
                <Searchpart
                    id='searchpart'
                    url={this.props.url}
                    searchContent={this.props.searchContent}
                    modifySearchContent={this.props.modifySearchContent}
                    getTableData={this.props.getTableData}
                    selectEvent={this.props.selectEvent}
                    SearchEvent={this.props.SearchEvent}
                    searchReset={this.props.searchReset}
                    depCode={this.props.depCode}
                    statusId={this.props.statusId}
                    depName={this.props.depName}
                    size={this.state.size}
                    current={this.state.current}
                    getTableParams={this.props.getTableParams}
                />
            </div>
        )
    }
}
export default ButtonToDd
