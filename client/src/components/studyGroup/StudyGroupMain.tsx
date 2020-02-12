import React from 'react'
import { Display } from '../Display'
import { Menu, Icon } from 'antd'

// const { SubMenu } = Menu
const StudyGroupMain = () => {
  const studyinfo = [
    {
      name: '',
      lala: ''
    }
  ]

  return (
    <Display>
      <Menu
        // onClick={this.handleClick}
        // selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item>
          <Icon type="schedule" style={{ fontSize: 19 }} theme="twoTone" />
          일정
        </Menu.Item>
        <Menu.Item>
          <Icon type="snippets" style={{ fontSize: 19 }} theme="twoTone" />
          게시판
        </Menu.Item>
        <Menu.Item>
          <Icon type="smile" style={{ fontSize: 19 }} theme="twoTone" />
          멤버 정보
        </Menu.Item>
      </Menu>

      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }
        ></SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        ></SubMenu>
      </Menu>
    </Display>
  )
}

export default StudyGroupMain
