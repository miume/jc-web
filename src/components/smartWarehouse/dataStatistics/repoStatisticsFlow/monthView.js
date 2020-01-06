import React from 'react';
import {Icon, Table} from "antd";
import ReactEcharts from 'echarts-for-react'


class MonthView extends React.Component {

    render() {
        return (
            <div className="repoStatisticsFlow_month_line">
                <ReactEcharts
                    option={this.props.monthOption}
                />
            </div>
        );
    }

}

export default MonthView;
