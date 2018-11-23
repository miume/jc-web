import React from 'react';
import {withRouter} from 'react-router-dom';
class QuickItem extends React.Component{
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }
    click(){ 
        // console.log(this.props.path)
        // console.log(event)
        const path = this.props.path
        this.props.history.push({pathname:path})
    }
    render(){
        return (
            <div style={{width:'200px',height:'50px',border:'1px solid #0079FE',cursor:'pointer',float:'left',margin:'0 25px 20px 0',}} onClick={this.click} >
                <div style={{width:'50px',background:'#0079FE',height:'100%',float:'left'}}>
                    <p style={{paddingTop:'10px'}}><i className="fa fa-camera-retro fa-2x" style={{color:'white'}}></i></p>
                </div>
                <div style={{float:'left',marginLeft:'30px',marginTop:'12px'}}>
                    <p style={{fontSize:'15px',color:'black',fontWeight:'bold'}}><span style={{marginRight:'10px'}}>{this.props.name}</span><i className="fa fa-angle-right fa-1x" style={{marginLeft:'20px'}}></i></p>
                </div>
            </div>
        );
    }
}
export default withRouter(QuickItem) ;