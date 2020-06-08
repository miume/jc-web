import React from 'react';
import ProcessParams from "./synthesis/processParams";
import DetailHead from "./detailHead";
import AgedWashingDeatil from "./ageWashingDetail";
import LiquidDetail from "./liquid/liquid";

class DetailContent extends React.Component{
    constructor(props){
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }
    render() {
        let {head} = this.props;
        return (
            <div>
                <DetailHead head={head}/>
                <div>
                    {
                        this.renderTable()
                    }
                </div>
            </div>
        );
    }

    renderTable() {
        let {head,zy,hc,ch,url} = this.props,processCode = head ? head['processCode'] : '';
        if(processCode === 49) {
            return <ProcessParams hc={hc} url={url}/>
        } else if(processCode === 48) {
            return <LiquidDetail zy={zy}/>
        } else if (processCode === 50){
            return <AgedWashingDeatil ch={ch}/>
        } else {
            return null;
        }
    }
}
export default DetailContent;
