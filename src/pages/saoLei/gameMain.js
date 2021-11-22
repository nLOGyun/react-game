import React from "react";
import { Layout } from 'antd';
import SaoLei from "./main";
import '../../style/index.css';
import {getLocalStorage} from "../../method/localStorage";

const { Header, Content, Footer } = Layout;

export default class GameMain extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            minHeight: 0,
            text: 'Hello',
            count: 0,
            username: ''
        };
    }
    componentDidMount() {
        let minHeight = document.body.offsetHeight;
        let username = getLocalStorage('username')
        if (!username) {
            this.props.history.push('/login')
        } else {
            this.setState( { minHeight: minHeight, username } )
        }
    }
    changeText(){
        let { count } = this.state;
        let a = Math.random();
        let text;
        if( a < 0.25 ){
            text = 'Hello?';
        } else if( a < 0.5 ){
            text = 'Halo!';
        } else if( a < 0.75 ){
            text = 'HaLou...'
        } else {
            text = 'hi~';
        }
        this.setState( {text: text, count: count+1}, () => {
            if( count > 4 ){
                setTimeout( () => {
                    this.setState({ count: 0 })
                }, 3000 )
            }
        } );
    }

    render() {
        let { minHeight, text, count, username } = this.state;
        return(
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '40px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: '#fff', height: '40px', lineHeight: '40px' }} onClick={() => this.changeText()}>{text}{username}</div>
                    {
                        count > 5 && <div style={{ color: '#fff', marginLeft: '20px', fontSize: '12px' }}> 你可真无聊啊.. </div>
                    }
                </Header>
                <Content className="site-layout" style={{ padding: '0 12px', marginTop: 40 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: minHeight-72 }}>
                        <SaoLei/>
                    </div>
                </Content>
                <Footer className="main_footer" style={{ fontSize: '12px', height: '32px', fontWeight: 500, lineHeight: '22px'}}>@一起去抓水母吧</Footer>
            </Layout>
        )
    }
}
