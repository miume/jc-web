import React,{Component} from 'react';
import BlockQuote from '../../BlockQuote/blockquote';
import '../../qualityProcess/dataEntry/data.css';
import DataPart from '../../qualityProcess/dataEntry/dataPart';
const icon=[
    'fa fa-industry fa-5x','fa fa-wrench fa-5x',
    'fa fa-tint fa-5x','fa fa-sitemap fa-5x','fa fa-bar-chart fa-5x',
    'fa fa-code-fork fa-5x','fa fa-cogs fa-5x','fa fa-bars fa-5x'
]

class BaseInfoPositiveCost extends Component{
   constructor(props){
        super(props);
        this.state={
            clickId:'',
            flag:0,
            path:'',
            clickButton:''
        }
        this.click=this.click.bind(this);
        this.getData=this.getData.bind(this);
   }

   componentDidMount(){
    this.getData()
}
click(e) {
    let path = e.currentTarget.id.split('-'), {menuId,menuName} = this.current;
    const inspectionManagement={
        openKeys: menuId,
        menuName: path[1],
        menuParent: menuName,
        path: path[0],
        menuId: parseInt(path[2])
    };
    localStorage.setItem('postiveBase',JSON.stringify(inspectionManagement))
    this.props.history.push({pathname:path[0]})
}

getData() {
    const menus = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===this.current.path)[0]:[];
    let data = menus && menus['menuList'] ?
                menus['menuList'].sort((a,b)=>a.menuId-b.menuId).map((m,index)=>{
                    return ({
                        id : m.menuId,
                        name : m.menuName,
                        path : `${m.path}-${m.menuName}-${m.menuId}`,
                        className : icon[index]
                    })
                }):[];
    this.setState({
        data:data
    })
}
render(){
    this.current=JSON.parse(localStorage.getItem('current'))?JSON.parse(localStorage.getItem('current')):null
    return(
        <div>
            <BlockQuote menu={this.current?this.current.menuParent:''} name={this.current?this.current.menuName:''}/>
            <div className='dataEntry'>
                <div className='card-parent'>
                    {
                        this.state.data?this.state.data.map(d=>
                            <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className} ></DataPart>
                        ):null
                    }
                </div>
            </div>
        </div>
    )
}
}
export default BaseInfoPositiveCost;
