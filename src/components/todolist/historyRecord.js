import React from 'react';
import Todo from './todo';
import SearchCell from '../BlockQuote/search';
class HistoryRecord extends React.Component{
    render(){
        console.log(222)
        return (
            <div style={{padding:'10px'}}>
                 <SearchCell />
                 {/* <div>
                    {
                        data?data.map(e=>{
                            return <Todo key={e.commonBatchNumber.id} data={e.commonBatchNumber} details={e.details} />
                        }):null
                    }
                </div> */}
            </div>
        );
    }
}
export default HistoryRecord;