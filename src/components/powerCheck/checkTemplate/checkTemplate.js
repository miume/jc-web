import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";

class PowerCheckTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const current = JSON.parse(localStorage.getItem('current')) ;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}/>
            </div>
        );
    }
}

export default PowerCheckTemplate;
