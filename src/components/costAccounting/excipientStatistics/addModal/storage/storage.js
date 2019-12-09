import React from "react";
import {Input} from "antd";

class Storage extends React.Component{
    url;
    constructor(props){
        super(props);
    }

    render() {
        let {ammValue,alkValue,inputChange} = this.props;
        return(
            <div className='excipient-statistics-add-display'>
                <div>
                    <span>氨入库量：</span>
                    <Input style={{width:"200px"}} name={'ammValue'} value={ammValue} onChange={inputChange}/>
                </div>
                <div>
                    <span>碱入库量：</span>
                    <Input style={{width:"200px"}} name={'alkValue'} value={alkValue} onChange={inputChange}/>
                </div>
            </div>
        )
    }
}

export default Storage
