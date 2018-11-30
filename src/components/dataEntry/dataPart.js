import React from 'react';
import './data.css';
class DataPart extends React.Component{
    render(){
        return (
            <div className='nav-card' style={{cursor:'pointer',display:'inline-block',height:'220px'}} id={this.props.path} onClick={this.props.click}>
                <div style={{border:'1px solid #0079FE'}}>
                    <div style={{width:'100%',height:'80%',backgroundColor:'#0079FE',textAlign:'center'}}>
                        <p style={{padding:'40px'}} id={this.props.path} ><i className={this.props.className} style={{color:'white'}} id={this.props.path} ></i></p>
                    </div>
                    <div style={{textAlign:'center',fontSize:'14px',fontWeight:'500',color:'black',marginTop:'10px'}}>
                        <p id={this.props.path} className='hover'>{this.props.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default DataPart;