import React from 'react';
import SearchCell from '../BlockQuote/search';
class HistoryRecord extends React.Component{
    render(){
        return (
            <div style={{padding:'10px'}}>
                 <SearchCell />
            </div>
        );
    }
}
export default HistoryRecord;