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
import { useEffect } from 'react'
import { StudyGroupType, StudyMember, StudySchedule } from './StudyGroupType'
import { getStudyGroup } from '../../lib/api/study'
import { useLocalStore, useObserver } from 'mobx-react'
import StudyStore from '../../stores/StudyStore'

const StudyGroupMain = ({ id }: { id: number }) => {
  // const study = [
  //   {
  //     id: 1,
  //     name: 'React 스터디'
  //   }
  // ]
  // let study: StudyGroupType = useLocalStore(() => ({
  //     id: 0,
  //     title: "",
  //     contents: "",
  //     leader: {
  //         id: 0,
  //         nickname: ""
  //     },
  //     city: "",
  //     town: "",
  //     state: 0,
  //     maxParticipants: 0,
  //     hits: 0,
  //     isOnline: false,
  //     monthOrWeek: 0,
  //     timeslot: 0,
  //     evaluationLimit: 0,
  //     enrollDate: "",
  //     startDate: "",
  //     endDate: "",
  //     joinedMemberCount: 0,
  //     lcategory: "",
  //     scategory: "",
  //
  //     studyMemberDTOList: [],
  //     studyScheduleDTOList: [],
  //
  // }));
  useEffect(() => {
    StudyStore.fetchStudyGroup(Number(id))
  }, [])
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

  return useObserver(() => (
    <Display>
      {/*{study.map(s => (*/}
      <div>
        <div css={top}>
          <NavLink css={title} to={`/study/${StudyStore.studyGroup.id}`}>
            {StudyStore.studyGroup.title}
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
                <NavLink to={`/study/${StudyStore.studyGroup.id}/schedule`}>
                  <Icon
                    type="schedule"
                    style={{ fontSize: 19 }}
                    theme="twoTone"
                  />
                  스케줄
                </NavLink>
              </Menu.Item>
              <Menu.Item key="board">
                <NavLink to={`/study/${StudyStore.studyGroup.id}/board`}>
                  <Icon
                    type="snippets"
                    style={{ fontSize: 19 }}
                    theme="twoTone"
                  />
                  게시판
                </NavLink>
              </Menu.Item>
              <Menu.Item key="memberinfo">
                <NavLink to={`/study/${StudyStore.studyGroup.id}/member`}>
                  <Icon type="smile" style={{ fontSize: 19 }} theme="twoTone" />
                  멤버 정보
                </NavLink>
              </Menu.Item>
              <Menu.Item key="studyinfo">
                <NavLink to={`/study/details/${StudyStore.studyGroup.id}`}>
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
                path={`/study/${StudyStore.studyGroup.id}`}
                exact={true}
                component={() => <StudyGroupSchedule />}
              />
              <Route
                path={`/study/${StudyStore.studyGroup.id}/schedule`}
                component={() => <StudyGroupSchedule />}
              />
              <Route
                path={`/study/${StudyStore.studyGroup.id}/member`}
                component={() => <StudyGroupMember />}
              />
              <Route
                path={`/study/${StudyStore.studyGroup.id}/board`}
                component={() => <StudyGroupBoard />}
                exact={true}
              />
              <Route
                path={`/study/${StudyStore.studyGroup.id}/board/:index`}
                component={() => <StudyGroupBoardDetail />}
                exact={true}
              />
              <Route
                path={`/study/${StudyStore.studyGroup.id}/editBoard/:index`}
                component={StudyGroupBoardEdit}
              />
              <Route
                path={`/study/${StudyStore.studyGroup.id}/newBoard`}
                component={StudyGroupBoardInsert}
                exact={true}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Display>
  ))
}

export default StudyGroupMain
