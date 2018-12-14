import React, { Component } from 'react';
import SearchCell from '../../BlockQuote/search';
import DataPart from '../div'
const data=[{
    id:1,
    name:'生产厂家A'
},{
    id:2,
    name:'生产厂家B'
},{ 
    id:3,
    name:'生产厂家C'
},{ 
    id:4,
    name:'生产厂家D'
},{
    id:5,
    name:'生产厂家E'
},{
    id:6,
    name:'生产厂家F'
},{
    id:7,
    name:'生产厂家G'
},{
    id:8,
    name:'生产厂家H'
},{
    id:71,
    name:'生产厂家I'
},{
    id:72,
    name:'生产厂家J'
},{
    id:733,
    name:'生产厂家K'
},{
    id:74,
    name:'生产厂家L'
},{
    id:75,
    name:'生产厂家M'
},{
    id:743,
    name:'生产厂家N'
},{
    id:734,
    name:'生产厂家O'
},{
    id:735,
    name:'生产厂家A'
}];

class Manufacturer extends Component{
    constructor(props){
      super(props);
      this.state={
          searchContent:''
      }
    }
    searchEvent(){

    }
    searchContentChange(e){
       const value=e.target.value;
       this.setState({
           searchContent:value
       });
    }
    render(){
        return(
          <div>
              <div style={{padding:'15px'}}>
               &nbsp; <h2 style={{display:'inline-block'}}>请选择生产厂家</h2>
                <span  style={{float:'right'}}>
                 <SearchCell name='请输入搜索内容'
                 searchEvent={this.searchEvent}
                 searchContentChange={this.searchContentChange}
                 />
                </span>
              </div>
              <div className='rawStanstdardParent'>
                  {
                      data.map(d=>
                    <DataPart  key={d.id} name={d.name}/>
                    )
                  }
              </div>
          </div>
        );
    }
}
export default  Manufacturer ;//生产厂家