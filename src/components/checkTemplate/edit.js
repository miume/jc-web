import React from 'react';
import axios from 'axios';
import { Button, Modal,Select,Form, Input,message,Icon,Col, Row,Upload,Radio,Divider,DatePicker } from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';

class Edit extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
    }
}

export default Edit