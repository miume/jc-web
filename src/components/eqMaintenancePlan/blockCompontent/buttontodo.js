import React, {Component} from 'react'
import Addmaintenance from '../miniCompontent/addmaintenancebutton'
import Searchpart from '../miniCompontent/searchpart'
import './style.css'

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
                    MaintenanceType={this.props.MaintenanceType}
                    statusId={this.props.statusId}
                    size={this.state.size}
                    current={this.state.current}
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
                />
            </div>
        )
    }
}
export default ButtonToDd