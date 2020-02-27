import React from 'react';
import './basisData.css';
import CommonBaseData from '../../BlockQuote/baseData';

class BaseData extends React.Component{

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        const ICON = ['fa fa-globe fa-5x','fa fa-industry fa-5x','fa fa-magnet fa-5x','fa fa-magic fa-5x','fa fa-info fa-5x','fa fa-map-signs fa-5x','fa fa-location-arrow fa-5x','fa fa-lightbulb-o fa-5x','fa fa-anchor fa-5x','fa fa-adjust fa-5x']
        return (
            <CommonBaseData current={this.current} icon={ICON}/>
        );
    }
}

export default BaseData;
