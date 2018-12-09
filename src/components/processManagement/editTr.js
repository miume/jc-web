// import React from "react";
// import axios from "axios";

// class EditTr extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             approvalProcess:[],
//             loading : false,
//         }
//         this.server = localStorage.getItem('remote');
//     }
//     getAllUser = (params = {})=>{
//         this.setState({ loading: true });
//         axios({
//             url: `${this.server}/jc/common/authUser/getAll`,
//             method:'get',
//             params: params,
//         }).then((data)=>{
//             const res = data.data.data;
//             this.setState({
//                 approvalProcess : res,
//                 loading: false,
//             })
//         })
//     };
//     componentDidMount() {
//         this.getAllUser();
//     }

//     render(){
//         const children = this.state.approvalProcess.map(p => 
//             <option id={p.id} key={p.id} value={p.id}>{p.name}</option>
//         )
//         return(
//             this.props.dataSourse.map((m)=>{return (
//             <tr className='tbody'>
//                 <td><select style={{width:'100%',border:"none"}} name="select" id="sleID" placeholder="请选择负责人">{children}</select></td>
//                 <td><input name="input" style={{width:'100%',border:"none"}} value={m.responsibility} placeholder="请输入职责"/></td>
//                 <td><span href='#' className="blue" onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
//             </tr>
//         )})
//         )
//     }
// }