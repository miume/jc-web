import React from 'react';
import BasePart from './basePart';

class BaseInfoData extends React.Component{
    
  render(){
      return(
        <div style={{marginTop:'20px',width:'100%',height:'100%'}}>
            <div style={{marginLeft:'20px'}}>
                {
                    this.props.data.map(d=>
                        <BasePart key={d.id} id={d.id} name={d.name} path={d.path} click={this.props.click}></BasePart>
                    )
                }
            </div>
        </div>
      );
  }
}
 export default BaseInfoData;