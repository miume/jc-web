import React, { Component } from 'react';
import './detail.css';


class DetailModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
               <div className='rawStandardTop'>
                   <table >
                       <thead>
                           <tr>
                              <th>批号</th>
                              <th>原材料</th>
                              <th>厂家名称</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>{this.props.record.batchNumber}</td>
                               <td></td>
                               <td></td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               <div></div>
               <div></div>
            </div>
        );
    }
}
export default DetailModal;