import React ,{Component}from 'react'
import {Modal} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            items: []
        };

        this.cancel = this.cancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }

    render() {
        let {visible, items} = this.state,
            parentStyle = {
                'display': 'flex',
                'flexWrap': 'wrap',
                'height': 200,
                'overflow': 'auto'
            },
            sonStyle = {
                'display': 'flex',
                'margin': 5
            },
            spanStyle = {
                'display': 'inline-block',
                'width': 180,
                'textAlign': 'right',
                'fontWeight': 500
            },
            span1Style = {
                'width': 60,
                'height': 30,
                'border': '1px solid #ccc',
                'textAlign': 'center'
            };
        return(
            <span>
                <span className={'blue'} onClick={this.showModal}>详情</span>
                <Modal
                    title={'详情'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'600px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={true}/>,
                    ]}>
                        <div style={parentStyle}>
                            {
                                items.length ? items.map(e => {
                                    return (
                                        <div key={e.code} style={sonStyle}>
                                            <span style={spanStyle}>{`${e.name}：`}</span>
                                            <div style={span1Style}>{`${e.values ? e.values : 0} ${e.unit}`}</div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </Modal>
                </span>
        )
    }

    showModal() {
        let {code} = this.props;
        this.getDetailData(code);
        this.setState({
            visible:true
        })
    }

    getDetailData(code) {
        axios({
            url: `${this.props.url.dataReorganize.detail}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.items) {
                this.setState({
                    items: res.items
                })
            }
        })
    }

    cancel(){
        this.setState({
            visible:false
        })
    }
}
export default Detail
