import React from 'react';
class DataPart extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // console.log(this.props.path)
        return (
            <div style={{border:'1px solid #0079FE',cursor:'pointer'}} id={this.props.path}>
                <div style={{width:'100%',height:'50%px',backgroundColor:'#0079FE',textAlign:'center'}}>
                    <p style={{padding:'40px'}} id={this.props.path} ><i className={this.props.className} style={{color:'white'}} id={this.props.path} ></i></p>
                </div>
                <div style={{textAlign:'center',fontSize:'17px',fontWeight:'bold',color:'black',marginTop:'10px'}}>
                    <p id={this.props.path}>{this.props.name}</p>
                </div>
            </div>
        );
    }
}
export default DataPart;