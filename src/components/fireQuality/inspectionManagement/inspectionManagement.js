/**
 * author: ym
 * date: 2019-12-16
 * 火法质量-检验管理
 * */
import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";

class InspectionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let current = JSON.parse(localStorage.getItem('current')) ;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
            </div>
        )
    }
}

export default InspectionManagement;
