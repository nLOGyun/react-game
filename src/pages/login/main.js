import React from "react";
import {Layout, Input, Button, message} from 'antd';
import './style.css'
import {getLocalStorage, setLocalStorage} from '../../method/localStorage'

const { Header, Content, Footer } = Layout;

export default class Snick extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      height: 700
    };
  }

  componentDidMount() {
    let height = (document.body.offsetHeight || 700) - (64 + 70)
    let username = getLocalStorage('username')
    if (username) {
      message.success('正在自动登录...');
      setTimeout(() => {
        this.props.history.push('/main')
      }, 1500)
    }
    this.setState({height})
  }

  jumpToRegister() {
    this.props.history.push('/register')
  }

  changeValue(value, key) {
    console.log(value, key)
    let sta = {}
    sta[key] = value
    this.setState(sta)
  }

  login() {
    const {username, password} = this.state
    if (!username) {
      message.error('输账号了么');
      return
    }
    if (!password) {
      message.error('输密码了么');
      return
    }
    fetch(`http://localhost:3001/user/login?username=${username}&password=${password}`).then(res => res.json()).then(res => {
      if(res.code === 200) {
        message.success(res.data);
        setLocalStorage('username', username)
        setTimeout(() => {
          this.props.history.push('/main')
        }, 500)
      } else if (res.code === 500) {
        message.error(res.data);
      }
    })
  }

  render() {
    const {height} = this.state
    return(
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className='header-title'>Welcome!</div>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: height }}>
            <div>Hello! Do you have an account?</div>
            <div>
              <Input style={{ margin: '10px 0' }} placeholder="请输入您的账号" onChange={(e) => this.changeValue(e.target.value, 'username')}/>
              <Input.Password placeholder="请输入您的密码" onChange={(e) => this.changeValue(e.target.value, 'password')}/>
            </div>
            <div className='button-container'>
              <Button style={{ margin: '10px 0' }} block onClick={this.jumpToRegister.bind(this)}>
                注册
              </Button>
              <Button style={{ margin: '10px 0' }} type="primary" block onClick={this.login.bind(this)}>
                登录
              </Button>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>@dashuaibi</Footer>
      </Layout>
    )
  }
}
