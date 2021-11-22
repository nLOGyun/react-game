import React from "react";
import {Layout, message, Dropdown, Menu} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {getLocalStorage} from '../../method/localStorage'
import './style.css'

const { Header, Content, Footer } = Layout;

export default class Snick extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      height: 700,
      username: ''
    };
  }

  componentDidMount() {
    let height = (document.body.offsetHeight || 700) - (64 + 70)
    let username = getLocalStorage('username')
    if (!username) {
      this.props.history.push('/login')
    } else {
      this.setState({height, username})
    }
  }

  logout() {
    localStorage.removeItem('username')
    message.success('您已退出登录...');
    setTimeout(() => {
      this.props.history.push('/login')
    }, 1500)
  }

  checkPage(page) {
    console.log(111, page)
    this.props.history.push(page)
  }

  render() {
    const {height, username} = this.state
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <div onClick={this.checkPage.bind(this, '/games/saoLei')}>sao lei</div>
        </Menu.Item>
      </Menu>
    );
    return(
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className='header-title'>Welcome! {username}<p onClick={this.logout.bind(this)}> 退出登录</p></div>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

          <div className="site-layout-background" style={{ padding: 24, minHeight: height }}>
            <div>Hello! There are something you can see in this shit web</div>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Shit Games... <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>@dashuaibi</Footer>
      </Layout>
    )
  }
}
