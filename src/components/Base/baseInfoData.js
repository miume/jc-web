import React from 'react';
import DataButton from '../BlockQuote/bigbutton'; 

class BaseInfoData extends React.Component{
    
  render(){
      return(
          <div style={{marginTop:'10px'}}>
              <div style={{float:'left',marginLeft:'15%'}}>
                     {
                         this.props.data.map(d=>
                        <DataButton key={d.id} id={d.id}
                        name={d.name} path={d.path} 
                        buttonstyle={this.props.buttonstyle}
                        click={this.props.click}>
                        </DataButton>)
                     }
              </div>
              <div style={{marginLeft:'80%',marginTop:'500px',
                   height:'50px',position:'absolute'}}>
                    <button style={{backgroundColor:'#30c7f5',
                    width:'100px',height:'40px'}} onClick={this.props.nextStep}>
                    下一步</button>
              </div>
          </div>
      );
  }
}
 export default BaseInfoData;