import React from 'react';
import {Icon, Table} from "antd";
import ReactEcharts from 'echarts-for-react'


class LeftPie extends React.Component {

    render() {
        return (
            <div className="repoStatisticsDull_pie">
                <ReactEcharts
                    option={this.props.pieOption}
                />
            </div>
        );
    }

}

export default LeftPie;
