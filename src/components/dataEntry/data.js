import React from 'react';
import DataPart from './dataPart';
class Data extends React.Component{
    render(){
        return (
            <div style={{marginTop:'20px',width:'100%',height:'100%'}}>
                <div style={{marginLeft:'20px'}}>
                {
                    this.props.data.map(d=>
                        <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.props.click}></DataPart>
                    )
                }
               </div>
           </div>
        );
    }
}
export default Data;