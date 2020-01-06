import React from 'react';
import {Icon, Table} from "antd";

class MonthTable extends React.Component {

    render() {
        return (
            <div>
                <table border="1" className="repoStatisticsFlow_month_table">
                    <tr>
                        {
                            this.props.monthColumn?this.props.monthColumn.map(item => {
                                return (
                                    <th>{item}</th>
                                )
                            }):null
                        }
                    </tr>
                    <tr>
                        {
                            this.props.monthRow1?this.props.monthRow1.map(item => {
                                return (
                                    <th>{item}</th>
                                )
                            }):null
                        }
                    </tr>
                    <tr>
                        {
                            this.props.monthRow2?this.props.monthRow2.map(item => {
                                return (
                                    <th>{item}</th>
                                )
                            }):null
                        }
                    </tr>
                    <tr>
                        {
                            this.props.monthRow3?this.props.monthRow3.map(item => {
                                return (
                                    <th>{item}</th>
                                )
                            }):null
                        }
                    </tr>
                </table>
            </div>
        );
    }

}

export default MonthTable;
