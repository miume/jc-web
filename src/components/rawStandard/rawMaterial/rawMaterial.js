import React, { Component } from 'react';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import '../block.css';
import DataPart from '../div';

// const data=[{
//     id:1,
//     name:'镍钴锰'
// },{
//     id:2,
//     name:'铁矿'
// },{ 
//     id:3,
//     name:'金矿'
// },{ 
//     id:4,
//     name:'银矿'
// },{
//     id:5,
//     name:'铜矿'
// },{
//     id:6,
//     name:'硫酸汞'
// },{
//     id:7,
//     name:'硫酸银'
// },{
//     id:8,
//     name:'石灰石'
// },{
//     id:71,
//     name:'石灰岩'
// },{
//     id:72,
//     name:'硫酸'
// },{
//     id:733,
//     name:'花岗石'
// },{
//     id:74,
//     name:'钻石'
// },{
//     id:75,
//     name:'石墨'
// },{
//     id:743,
//     name:'乙烯'
// },{
//     id:734,
//     name:'氯化钠'
// },{
//     id:735,
//     name:'氯化镁'
// }];


class RawMaterial extends Component{
      url;
      componentDidMount(){
          this.fetch();
      }
    //   componentWillMount(){
    //       this.setState=()=>{
    //           return;
    //       }
    //   }
      constructor(props){
          super(props);
          this.state={
              data:[],
              searchContent:''
          }
          this.onBlockChange=this.onBlockChange.bind(this);
          this.searchContentChange=this.searchContentChange.bind(this);
          this.searchEvent=this.searchEvent.bind(this);
          this.fetch=this.fetch.bind(this);
      }
     fetch=()=>{
       axios({
         url:`${this.url.rawStandard.getRaw}`,
         method:'get',
         headers:{
             'Authorization':this.url.Authorization
         }
       })
       .then((data)=>{
          //console.log(data);
          const res=data.data.data;
        //   var da=[];
        //   for(let i=0;i<res.length;i++){
        //     da.push({
        //           id:res[i].id,
        //           name:res[i].name
        //       });
        //   }
          if(res){
            this.setState({data:res});
            console.log(res);
          }
         
       });
     }



//监听原材料那个块块是否被选中
    onBlockChange(e){
        const id = e.target.id.split('-')[0];
        const name = e.target.id.split('-')[1];
       console.log(id);
       console.log(name);
       this.props.onBlockChange(2,name,true);
       
    }
  
/**---------------------- */
//获取查询时用户名称的实时变化
    searchContentChange(e){
        const value=e.target.value;
        this.setState({
            searchContent:value
        });

    }
    searchEvent(){
       
    }
      render(){
          console.log(this.state.data);
         this.url=JSON.parse(localStorage.getItem('url'));
          return(
              <div>
                  <div style={{padding:'15px'}}>
                    &nbsp; <h2 style={{display:'inline-block'}}><span style={{width:'24px',height:'90px'}}>请选择原材料</span></h2>
                     <span style={{float:'right' }}>
                     <SearchCell name='请输入搜索内容'
                     searchEvent={this.searchEvent}
                     searchContentChange={this.searchContentChange}/>
                     </span>
                   </div>
                   <div className='rawStanstdardParent'>
                       {
                           this.state.data.map(d=>
                            <DataPart  key={d.id} name={d.name} id={d.id}  onBlockChange={this.onBlockChange}/>)
                       }
                       <DataPart  flag={1} name='新增'/>
                   </div>
                 
              </div>
          );
      }
}
export default RawMaterial;