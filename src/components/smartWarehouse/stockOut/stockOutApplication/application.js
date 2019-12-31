import React from 'react';
import Search from "./seach";
import Left from "./left";
import Right from "./right";
import {Tabs} from "antd";

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={'rightDiv-content'}>
                <Search/>
                <div className={'stock-out-flex'}>
                    <Left />
                    <div style={{width: '4%'}}></div>
                    <Right />
                </div>
            </div>
        )
    }
}

export default Application;
