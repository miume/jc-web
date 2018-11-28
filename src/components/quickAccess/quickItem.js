import React from 'react';
import {withRouter} from 'react-router-dom';
import './quickAccess.css'
class QuickItem extends React.Component{
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }
    click(){ 
        console.log(this.props.path)
        // console.log(event)
        const path = this.props.path
        this.props.history.push({pathname:path})
    }
    render(){
        return (
            <div className='quick-tag-wrapper' onClick={this.click}>
                <div className='quick-tag' style={{border:'1px solid #0079FE',cursor:'pointer',height:'50px'}}>
                        <div className='quick-tag-icon' style={{background:'#0079FE', height:'50px', width:'25%', minWidth:'50px',  float:'left', textAlign:'center', lineHeight:'60px'}}>
                            <i className="fa fa-camera-retro fa-2x" style={{color:'white',background:'#0079FE'}}></i>
                        </div> 
                        <div className='quick-tag-text' style={{fontSize:'15px',color:'black',float:'left', fontWeight:'400',lineHeight:'50px',height:'50px',textAlign:'center'}}>
                            <span style={{marginRight:'10px'}}>{this.props.name}</span><div className='text-gap'></div><i className="fa fa-angle-right fa-1x"></i>
                        </div>
                </div>
            </div>    
        );
    }
}
export default withRouter(QuickItem) ;