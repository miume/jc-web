import React from 'react';
import {Icon, Table} from "antd";

class YearTable extends React.Component {
    render() {
        return (
            <div>
                <table border="1" className="repoStatisticsFlow_year_table">
                    <tr>
                        {
                            this.props.yearColumn?this.props.yearColumn.map(item => {
                                return (
                                    <th className="repoStatisticsFlow_year_table_th">{item}</th>
                                )
                            }):null
                        }
                    </tr>
                    <tr>
                        {
                            this.props.yearRow1?this.props.yearRow1.map(item => {
                                return (
                                    <th className="repoStatisticsFlow_year_table_td">{item}</th>
                                )
                            }):null
                        }
                    </tr>
                    <tr>
                        {
                            this.props.yearRow2?this.props.yearRow2.map(item => {
                                return (
                                    <th className="repoStatisticsFlow_year_table_td">{item}</th>
                                )
                            }):null
                        }
                    </tr>
                    <tr>
                        {
                            this.props.yearRow3?this.props.yearRow3.map(item => {
                                return (
                                    <th className="repoStatisticsFlow_year_table_td">{item}</th>
                                )
                            }):null
                        }
                    </tr>
                </table>
            </div>
        );
    }

}

export default YearTable;
