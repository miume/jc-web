import React from 'react';
class BasePart extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // console.log(this.props.path)
        return (
            <div style={{width:'240px',height:'200px',border:'1px solid #0079FE',margin:'15px',float:'left',cursor:'pointer'}} id={this.props.path} onClick={this.props.click}>
                <div style={{width:'100%',height:'160px',backgroundColor:'#0079FE',textAlign:'center'}}>
                    <p style={{padding:'40px'}}><i className={this.props.className} style={{color:'white'}} id={this.props.path} ></i></p>
                </div>
                <div style={{textAlign:'center',fontSize:'17px',fontWeight:'bold',color:'black',padding:'5px'}}>
                    <p>{this.props.name}</p>
                </div>
            </div>
        );
    }
}
export default BasePart;