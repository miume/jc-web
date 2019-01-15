import React from 'react';
import axios from 'axios';
import {Input,Upload,Button,Icon, Modal} from 'antd';

class Tr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previewVisible:false,
            previewImage:'',
            fileList:[{

            }],
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleCancel = ()=>this.setState({
        previewVisible:false
    })
    handlePreview = (file)=>{
        this.setState({
            previewImage:file.url || file.thumbUrl,
            previewVisible:true,
        });
    }
    handleChange =({fileList}) =>this.setState({fileList})
    render(){
        const {previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return(
            <tr>
                <td><Input style={{border:'none'}} placeholder='点检内容'/></td>
                <td><Input style={{border:'none'}} placeholder='检查标准'/></td>
                <td><Input style={{border:'none'}} placeholder='频次'/></td>
                <td></td>
                <td><span style={{width:'100%'}} href='#' className="blue" onClick={()=>this.props.deleteRow(this.props.value)} value={this.props.value}>删除</span></td>
            </tr>
        )
    }
}

export default Tr;