import React from "react";

import DataPart from './dataPart';
import './data.css';
import CommonBaseData from '../../BlockQuote/baseData'


class EquipmentMaintenance extends React.Component{

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        return (
            <CommonBaseData current={this.current}/>
        );
    }
}

export default EquipmentMaintenance;
