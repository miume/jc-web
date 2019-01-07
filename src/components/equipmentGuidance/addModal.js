import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import AddButton from '../BlockQuote/newButton'
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import { Button, Modal, Form, Input,message } from 'antd';

class AddModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
}