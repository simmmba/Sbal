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
    </Display>
  )
}

export default StudyGroupMain
