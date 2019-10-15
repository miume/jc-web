import React from 'react';
import {Button, Icon, message, Modal, Upload} from 'antd';
import axios from 'axios';


class PictureUp extends React.Component{
    url
    ob
    state={
        previewVisible:false,
        previewImage: '',
        fileList:[],
    };

    previewCancel = () =>{
        this.setState({ previewVisible: false })
    }

    previewPreview = (file) =>{
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }

    

    onRemove = (e) =>{
        console.log(e.response.data)
        var list = []
        list.push(e.response.data)
        // console.log(list)
        axios({
            url: `${this.url.deviceSpot.cancelLoad}`,
            method:'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params:{path:e.response.data},
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
        })
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const { previewVisible, previewImage } = this.state;
        const fileList = this.props.fileList ? this.props.fileList : []
        return(
            <div className="clearfix">
                <Upload
                    action={this.url.deviceSpot.upload}
                    listType="picture"
                    fileList={this.props.fileList}
                    onPreview={this.previewPreview}
                    onChange={this.props.handleChange.bind(this,`fileList${this.props.k}`)}
                    onRemove={this.onRemove}
                >
                    {fileList.length === 1 ? null : <Button>
                        <Icon type="upload"/>上传图片
                    </Button>}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
                    <img alt="图片未显示" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default PictureUp