import React from 'react'
import { Display } from '../Display'
import { Menu, Icon, Switch } from 'antd'
import { NavLink, Route } from 'react-router-dom'
import StudyGroupBoard from './StudyGroupBoard'
import StudyGroupMember from './StudyGroupMember'
import StudyGroupSchedule from './StudyGroupSchedule'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const StudyGroupMain = () => {
  const study = [
    {
      id: 1,
      name: 'React 스터디'
    }
  ]

  const title = css`
    padding: 15px 10px 15px 23px;
    /* border: 1px solid black; */
    font-size: 30px;
    font-weight: bold;
    color: #0061b9;
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
  `

  const content = css`
    /* border: 1px solid black; */
    width: 100%;
    margin-left: 10px;
  `

  return (
    <Display>
      {study.map(s => (
        <div css={top}>
          <div css={title}>{s.name}</div>
        </div>
      ))}
      {study.map(s => (
        <div css={total}>
          <div>
            <Menu
              style={{ width: 145 }}
              defaultSelectedKeys={['schedule']}
              // defaultOpenKeys={['sub1']}
              mode="inline"
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
                  <Icon type="smile" style={{ fontSize: 19 }} theme="twoTone" />
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
              {/* <Route
                path={`/study/${s.id}/schedule`}
                exact
                // rendor props: 컴포넌트 대신 보여주고싶은 jsx 넣을 수 있음
                // render={() => <div>사용자를 선택해 주세요</div>}
              /> */}
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
              />
            </Switch>
          </div>
        </div>
      ))}
    </Display>
  )
}

export default StudyGroupMain
