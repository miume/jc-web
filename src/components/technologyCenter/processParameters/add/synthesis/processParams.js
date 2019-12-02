import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import ProcessParamsPart from "./processParamsPart";

class ProcessParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: []
        };
    }
    render() {
        let {detail,url,inputChange,addDetail,deleteItem,memoChange} = this.props;
        return (
            <div>
                <NewButton handleClick={addDetail} name='新增' className='fa fa-plus'/>
                {
                    detail ? detail.map((e,index) => {
                        e['index'] = index + 1;
                        return (
                            <ProcessParamsPart key={index} url={url} detail={[e]} inputChange={inputChange} memoChange={memoChange} deleteItem={deleteItem}/>
                        )
                    }) : null
                }
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => null)
    }
}

export default ProcessParams;
