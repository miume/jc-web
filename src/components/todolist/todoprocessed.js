import React from 'react';
import Todo from './todo';
import './todolist.css';
class TodoProcessed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
        }
    }
    render(){
        return (
            <div style={{padding:'15px',overflow:'auto',height:'480px'}}>
                    <div>
                        {
                            this.props.data?this.props.data.map(e=>{
                                return <Todo key={e.commonBatchNumber.id} data={e.commonBatchNumber} details={e.details} />
                            }):null
                        }   
                    </div> 
                    {/* <div className='wrapxxx'>
                        {data.map((e,index) => {
                            return (
                                <div key={index} className={e}></div>
                            )
                        })}
                    </div> */}
            </div>
        );
    }
}
export default TodoProcessed;