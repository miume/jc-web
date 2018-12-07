import React from 'react';
import ',/todolist.css';
class TodoProcessed extends React.Component{
    render(){
        return (
            <div style={{padding:'15px'}}>
                 <div className='wholediv'>
                     <p className='wholep'>
                         <span className='smallSize'>由您对</span>
                         <span className='bigSize'>进货检验 ECT/213213</span>
                         <span className='smallSize' style={{paddingLeft:'70px'}}>初步审核，检查标准是否判断正确</span>
                         <span style={{paddingLeft:'40%'}}>
                         <span className='time'>2018-10-10</span>
                         <span className='smallSize'>正常</span>
                         </span>
                     </p>
                 </div>
            </div>
        );
    }
}
export default TodoProcessed;