import React from 'react';
import {Avatar} from 'antd';
class Part extends React.Component{
    render(){
        return (
            <div className='part'>
                <span style={{padding:'0 10px'}}><Avatar style={{backgroundColor:'#0079fe'}}><span style={{fontWeight:'bolder'}}>{this.props.index}</span></Avatar></span>
                <div>
                    <p className='partSpan'>{this.props.data.userId === this.props.id?'有您进行':this.props.data.personName}</p>
                    <p className='partSpan1'>{this.props.data.responsibility}</p>
                </div>
                <span style={{width:'100px',height:'1.5px', padding:'5px',borderBottom:'1px solid grey'}}></span>
            </div>
        );
    }
}
export default Part;