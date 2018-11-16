import React from 'react';
import DataButton from '../BlockQuote/bigbutton'
class Data extends React.Component{
    render(){
        return (
            <div style={{marginTop:'80px'}}>
                <div style={{float:'left',marginLeft:'15%'}}>
                {
                    this.props.data.map(d=>
                        <DataButton key={d.id} id={d.id} name={d.name} path={d.path} buttonstyle={this.props.buttonstyle} click={this.props.click} buttonClass={this.props.buttonClass}></DataButton>
                    )
                }
               </div>
               
               <div style={{marginLeft:'88%', marginTop:'43%',marginRight:'80px',height:'50px',position:'absolute'}} >
                   <button style={{backgroundColor:'#30c7f5',width:'100px',height:'40px'}} onClick={this.props.nextStep}>下一步</button>
               </div>
           </div>
        );
    }
}
export default Data;