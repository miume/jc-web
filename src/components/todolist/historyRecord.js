import React from 'react';
import SearchCell from '../BlockQuote/search';
class HistoryRecord extends React.Component{
    render(){
        console.log(this.props.historyRecord)
        return (
            <div style={{padding:'10px'}}>
                 <SearchCell />
            </div>
        );
    }
}
export default HistoryRecord;