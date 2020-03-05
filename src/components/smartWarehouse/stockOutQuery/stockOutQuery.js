import React from 'react'
import BlockQuote from "../../BlockQuote/blockquote";
import Query from "../stockOut/stockOutQuery/query";

class StockOutQuery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let current = JSON.parse(localStorage.getItem('current')), url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current ? current.menuParent : ''}></BlockQuote>
                <Query url={url} type={'outStock'}/>
            </div>
        )
    }
}

export default StockOutQuery;
