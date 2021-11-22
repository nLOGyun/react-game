import React from "react";
import {Button, Input, Layout, message} from 'antd';
import './style.css'

const { Header, Content, Footer } = Layout;

export default class Snick extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      height: 700,
      disabled: false
    };
  }

  componentDidMount() {
    let height = (document.body.offsetHeight || 700) - (64 + 70)
    this.setState({height})
  }

  changeValue(value, key) {
    let sta = {}
    sta[key] = value
    this.setState(sta)
  }

  async register() {
    const {username, password, rePassword} = this.state
    if (!username) {
      message.error('输账号了么');
      return
    }
    if (!password) {
      message.error('输密码了么');
      return
    }
    if (password !== rePassword) {
      message.error('两次密码不一致');
      return
    }
    fetch(`http://localhost:3001/user/register?username=${username}&password=${password}`).then(res => res.json()).then(res => {
      if(res.code === 200) {
        message.success(res.data);
        this.setState({disabled: true})
        setTimeout(() => {
          this.props.history.push('/login')
        }, 1000)
      } else if (res.code === 500) {
        message.error(res.data);
      }
    })

  }

  render() {
    const {height, disabled} = this.state
    return(
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className='header-title'>Welcome!</div>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: height }}>
            <div>Oh! you don't have an account?</div>
            <div>
              <Input style={{ margin: '10px 0' }} placeholder="请输入您的账号" onChange={(e) => this.changeValue(e.target.value, 'username')}/>
              <Input.Password style={{ marginBottom: '10px' }} placeholder="请输入您的密码" onChange={(e) => this.changeValue(e.target.value, 'password')}/>
              <Input.Password placeholder="请确认您的密码" onChange={(e) => this.changeValue(e.target.value, 'rePassword')}/>
            </div>
            <Button type="primary" disabled={disabled} style={{ margin: '10px 0' }} block onClick={this.register.bind(this)}>
              确定注册！
            </Button>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>@dashuaibi</Footer>
      </Layout>
    )
  }
}
