import React from "react";
import Layout from './components/layout'
import {Button, Select, message} from 'antd';
import {InfoOutlined} from '@ant-design/icons'

export default class SaoLei extends React.Component{
    newGame = () => {
        this.child.makeData();
    }
    onRef = (ref) => {
        this.child = ref
    }
    changeStage = (e) => {
        this.child.changeStage(e)
    }
    showTip(){
        message.info('可以双击来标记 🚩');
    }
    render(){
        return(
            <div>
                <div style={{ display: 'block', marginBottom: '20px' }}>
                    <Button type="primary" shape="round" size='small' onClick={() => this.newGame()}>
                        New Game
                    </Button>
                    <Button type="primary" style={{ marginLeft: '20px' }} icon={<InfoOutlined />} shape="circle" size='small' onClick={() => this.showTip()}/>
                    <Select style={{ marginLeft: '20px' }} defaultValue="easy" size='small' onChange={(e) => this.changeStage(e)}>
                        <Select.Option value="easy">Easy</Select.Option>
                        <Select.Option value="hard">Hard</Select.Option>
                    </Select>
                </div>
                <Layout onRef={this.onRef}/>
            </div>
        )
    }
}