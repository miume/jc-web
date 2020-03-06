import React from 'react';
import '../../smartWarehouse/repoBasic/basisData.css'
import CommonBaseData from '../../BlockQuote/baseData';

class BaseData extends React.Component{

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        const ICON = ['fa fa-industry fa-5x','fa fa-wrench fa-5x','fa fa-tint fa-5x','fa fa-sitemap fa-5x','fa fa-info fa-5x']
        return (
            <CommonBaseData current={this.current} icon={ICON}/>
        );
    }
}

export default BaseData;