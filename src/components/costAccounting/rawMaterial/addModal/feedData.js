import React from 'react';
import {Button, Divider, Tabs} from "antd";
import FeedDataTable from "./feedDataTable";

const {TabPane} = Tabs;

class FeedData extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {saltMixtureLiquorDTOS,crystalsDTOS,singleCrystalLiquorDTOS} = this.props;
        return (
            <div className={this.props.flag? 'raw-material-add-feed' : 'hide'}>
                <div className='raw-material-feed-data'>补料数据</div>
                <Divider type={"horizontal"}/>
                <Tabs defaultActiveKey={'1'}>
                    <TabPane tab={'混合盐溶液'} key={'1'}>
                        <FeedDataTable data={saltMixtureLiquorDTOS} feedDataChange={this.props.feedDataChange}/>
                    </TabPane>
                    <TabPane tab={'晶体'} key={'2'}>
                        <FeedDataTable data={crystalsDTOS} flag='crystal' feedDataChange={this.props.feedDataChange}/>
                    </TabPane>
                    <TabPane tab={'单晶体溶液'} key={'3'}>
                        <FeedDataTable data={singleCrystalLiquorDTOS} flag='singleCrystal' feedDataChange={this.props.feedDataChange}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    /**点击统计分析按钮*/
    handleClick() {
        this.setState({
            visible: true
        })
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default FeedData;
