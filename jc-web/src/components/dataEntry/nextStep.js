import React from 'react';
import DataRoute from '../../routes/sonRoute'
class NextStep extends React.Component{
    render(){
        const id = this.props.clickId;
        // const data = [  <ProcessInspection />,<Role /> ]
        // console.log(data)
        // console.log(data.find(this.props.clickId))
        return (
            <DataRoute />
            // <Switch>
            //         <Route path='/process' Component={ProcessInspection}></Route>
            //         <Route path='/role' Component={Role}></Route>
            //     </Switch>
            // <div>
                
            //     <ProcessInspection /> 
            //     <div style={{float:'right', marginTop:'18%',marginRight:'80px',height:'50px'}} >
            //        <button style={{backgroundColor:'#30c7f5',width:'100px',height:'40px'}} onClick={this.props.lastStep}>上一步</button>
            //    </div>
            // </div>
        );
    }
}
export default NextStep;