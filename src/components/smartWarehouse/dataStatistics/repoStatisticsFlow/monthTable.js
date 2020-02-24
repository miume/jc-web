import React from 'react';
import {Icon, Table} from "antd";

class MonthTable extends React.Component {

    render() {
        return (
            <div>
                <table key="table" border="1" className="repoStatisticsFlow_month_table">
                    <tbody>
                        <tr>
                            {
                                this.props.monthColumn?this.props.monthColumn.map((item,index) => {
                                    return (
                                        <th key={"monthColumn" + index}>{item}</th>
                                    )
                                }):null
                            }
                        </tr>
                        <tr>
                            {
                                this.props.monthRow1?this.props.monthRow1.map((item,index) => {
                                    return (
                                        <th key={"monthRow1" + index}>{item}</th>
                                    )
                                }):null
                            }
                        </tr>
                        <tr>
                            {
                                this.props.monthRow2?this.props.monthRow2.map((item,index) => {
                                    return (
                                        <th key={"monthRow2" + index}>{item}</th>
                                    )
                                }):null
                            }
                        </tr>
                        <tr>
                            {
                                this.props.monthRow3?this.props.monthRow3.map((item,index) => {
                                    return (
                                        <th key={"monthRow3" + index}>{item}</th>
                                    )
                                }):null
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default MonthTable;
