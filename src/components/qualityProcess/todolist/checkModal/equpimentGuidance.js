import React from 'react';
import WhiteSpace from '../../../BlockQuote/whiteSpace';
import axios from 'axios';
import "../../../equipmentManagement/equipmentGuidance/equiptment.css";
import Preview from "../../../equipmentManagement/equipmentGuidance/preview";

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            data:[],
            name:'',
            time:'',
            previewVisible:false,
            previewImage: '',
        };
        this.fetch = this.fetch.bind(this);
        this.previewCancel = this.previewCancel.bind(this);
        this.previewPreview = this.previewPreview.bind(this);
    }

    componentDidMount(){
        this.fetch(this.props.batchNumberId)
    }

    fetch = (id) => {
        axios({
            url:`${this.props.url.instructor.instructorAll}/`+ parseInt(id),
            method:"GET",
        }).then((data) => {
            const res = data.data.data;
            if(res){
                this.setState({
                    data : res.content,
                    name : res.instructorName,
                    time : res.effectiveDate
                })
            }
        })
    }

    previewPreview = (e) =>{
        this.setState({
            previewImage: e,
            previewVisible: true,
        })
    }
    previewCancel = () =>{
        this.setState({ previewVisible: false })
    }
    render(){
        return(
            <div>
                <span className='Eqname'>{this.state.name}</span>
                <span className='Eqtime'>{this.state.time}</span>
                <WhiteSpace />
                <div id="Eqedit" style={{height:'360px'}}>
                {this.state.data.map(e=>
                        <div key={e.id}>
                            <span className='Eqcontent'>{e.checkContent}</span>
                            <span className='Eqstandard'>{e.checkStandard}</span>
                            <span className='Eqfrequency'>{e.checkFrequency}</span>
                            <img style={{cursor:'pointer'}} onClick={this.previewPreview.bind(this,`http://2p277534k9.iok.la:58718/jc/common/equipmentInstructor/pic/${e.checkPointPicName}`)} alt="图片未上传" className='Eqpicture' src={`http://2p277534k9.iok.la:58718/jc/common/equipmentInstructor/pic/${e.checkPointPicName}`} />
                            <Preview previewVisible={this.state.previewVisible} previewImage={this.state.previewImage} previewCancel={this.previewCancel}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Detail
