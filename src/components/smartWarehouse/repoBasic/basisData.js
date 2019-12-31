import React from 'react';
import './basisData.css';
import CommonBaseData from '../../BlockQuote/baseData';

class BaseData extends React.Component{

    render() {
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null;
        return (
            <CommonBaseData current={this.current}/>
        );
    }
}

export default BaseData;
