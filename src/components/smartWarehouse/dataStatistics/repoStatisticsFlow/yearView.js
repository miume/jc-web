import React from 'react';
import {Icon, Table} from "antd";
import ReactEcharts from 'echarts-for-react'


class YearView extends React.Component {

    render() {
        return (
            <div className="repoStatisticsFlow_year_bar">
                <ReactEcharts
                    option={this.props.yearOption}
                />
            </div>
        );
    }

}

export default YearView;
