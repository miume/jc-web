import React from "react";
import axios from "axios";
import TreeCard from "../../BlockQuote/treeSelect";

class Finished extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props)
        this.url=JSON.parse(localStorage.getItem('url'));
    }
    render(){
        return (
            <div>已完成</div>
        )
    }
}

export default Finished