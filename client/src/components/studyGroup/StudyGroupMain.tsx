import React from 'react'
import { Display } from '../Display'
import { Menu, Icon } from 'antd'
import { NavLink, Route, Switch } from 'react-router-dom'
import StudyGroupBoard from './StudyGroupBoard'
import StudyGroupBoardDetail from './StudyGroupBoardDetail'
import StudyGroupMember from './StudyGroupMember'
import StudyGroupSchedule from './StudyGroupSchedule'
import StudyGroupBoardEdit from './StudyGroupBoardEdit'
import StudyGroupBoardInsert from './StudyGroupBoardInsert'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const StudyGroupMain = () => {
  const study = [
    {
      id: 1,
      name: 'React 스터디'
    }
  ]

  const bid = 1

  const title = css`
    padding: 15px 10px 10px 23px;
    /* border: 1px solid black; */
    font-size: 30px;
    font-weight: bold;
    /* color: #0061b9; */
    color: navy;

    &:hover {
      color: navy;
    }
  `

  // const title = css`
  //   /* width: 100%; */
  //   font-weight: bold;
  //   font-size: 30px;
  //   color: #113000;
  //   text-align: left;
  //   /* border: 1px solid black; */
  //   margin-left: 10px;
  // `

  const total = css`
    display: flex;
  `

  const top = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `

  const content = css`
    /* border: 1px solid black; */
    width: 100%;
    margin-left: 25px;
    min-height: 360px;
  `

  const menu = css`
    margin-top: 50px;
  `

  return (
    <Display>
      {study.map(s => (
        <div>
          <div css={top}>
            <NavLink css={title} to={`/study/${s.id}`}>
              {s.name}
            </NavLink>
          </div>
          <div css={total}>
            <div css={menu}>
              <Menu
                style={{ width: 145 }}
                // defaultSelectedKeys={['schedule']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                selectable={false}
              >
                <Menu.Item key="schedule">
                  <NavLink to={`/study/${s.id}/schedule`}>
                    <Icon
                      type="schedule"
                      style={{ fontSize: 19 }}
                      theme="twoTone"
                    />
                    일정
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="board">
                  <NavLink to={`/study/${s.id}/board`}>
                    <Icon
                      type="snippets"
                      style={{ fontSize: 19 }}
                      theme="twoTone"
                    />
                    게시판
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="memberinfo">
                  <NavLink to={`/study/${s.id}/member`}>
                    <Icon
                      type="smile"
                      style={{ fontSize: 19 }}
                      theme="twoTone"
                    />
                    멤버 정보
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="studyinfo">
                  <NavLink to={`/study/details/${s.id}`}>
                    <Icon
                      type="info-circle"
                      style={{ fontSize: 19 }}
                      theme="twoTone"
                    />
                    스터디 정보
                  </NavLink>
                </Menu.Item>
              </Menu>
            </div>
            <div css={content}>
              <Switch>
                <Route
                  path={`/study/${s.id}`}
                  exact
                  // rendor props: 컴포넌트 대신 보여주고싶은 jsx 넣을 수 있음
                  component={StudyGroupSchedule}
                />
                <Route
                  path={`/study/${s.id}/schedule`}
                  component={StudyGroupSchedule}
                />
                <Route
                  path={`/study/${s.id}/member`}
                  component={StudyGroupMember}
                />
                <Route
                  path={`/study/${s.id}/board`}
                  component={StudyGroupBoard}
                  exact
                />
                <Route
                  path={`/study/${s.id}/board/${bid}`}
                  component={StudyGroupBoardDetail}
                  exact
                />
                <Route
                  path={`/study/${s.id}/board/${bid}/edit`}
                  component={StudyGroupBoardEdit}
                />
                <Route
                  path={`/study/${s.id}/board/insert`}
                  component={StudyGroupBoardInsert}
                />
              </Switch>
            </div>
          </div>
        </div>
      ))}
    </Display>
  )
}

export default StudyGroupMain
