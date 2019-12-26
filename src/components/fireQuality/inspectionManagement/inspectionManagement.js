import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote";
import BasePart from "../../qualityProcess/Base/basePart";

const icon=['fa fa-industry fa-5x','fa fa-wrench fa-5x',
'fa fa-tint fa-5x','fa fa-sitemap fa-5x']

class InspectionManagement extends Component {
    constructor(props){
        super(props)
        this.state={
            clickId:'',
            flag:0,
            path:'',
            clickButton:''
        }
        this.click=this.click.bind(this)
        this.getData=this.getData.bind(this);
    }
    componentDidMount(){
        this.getData()
    }
    click(e) {
        let path = e.currentTarget.id.split('-')
        const inspectionManagement={
            openKeys:this.current.menuId,
            menuName:path[1],
            menuParent:this.current.menuName,
            path:path[0]
        }
        localStorage.setItem('inspectionManagement',JSON.stringify(inspectionManagement))
        this.props.history.push({pathname:path[0]})
    }
    getData(){
            const menus=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===this.current.path)[0]:[]
            var data=menus&&menus.menuList?
            menus.menuList.sort((a,b)=>a.menuId-b.menuId).map((m,index)=>{
                return ({
                    id : m.menuId,
                    name : m.menuName,
                    path : `${m.path}-${m.menuName}`,
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
                                <BasePart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className}></BasePart>
                            ):null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default InspectionManagement
