import React from 'react';
import CommonBaseData from '../../BlockQuote/baseData';

class DataStatistics extends React.Component{

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        return (
            <CommonBaseData current={this.current}/>
        );
    }
}

export default DataStatistics;
