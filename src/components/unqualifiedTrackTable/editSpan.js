import React from 'react';
import { Modal} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import NewButton from '../BlockQuote/newButton';
import './unqualifiedTrack.css';
import EdSpanModal from './edSpanModal';

const topData = {
    materialName: '硫酸钴',
    norm: '25Kg/袋',
    quantity: '32',
    sampleDeliveringDate: '2018-12-27 12：20：20',
    deliveryFactory: '启东北新'
};
const judgement = 1;
const judger = '周小伟';
class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: judgement,
                judger: judger,
                topData: topData,
            },
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="600px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <NewButton
                            handleClick={this.handleClick}
                            className="fa fa-check"
                            name="提交"
                        />
                    ]}
                >
                    <div style={{height:400}}>
                        <EdSpanModal
                            checkData={this.state.checkData}
                            spanState={true}
                        />

                    </div>
                </Modal>
            </span>
        )
    }

    /**点击编辑 */
    handleEdit() {
        // this.getDetailData();
        this.setState({
            visible: true,
        })
    }
    /**
     * 详情 区分进货和成品   根据某子段，对数据进行组装
     * 进货：调用进货的PurchaseModal，数据进行组装
     * 成品：调用成品的组件，数据进行组装
     * 同时要在<div>中进行子段判断，来调用哪个组件
     */
    getDetailData = () => {

    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleClick = () => {
        this.setState({
            visible: false,
        });
    }

}

export default EditSpan;