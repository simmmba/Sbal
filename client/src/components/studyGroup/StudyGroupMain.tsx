import React from 'react'
import { Display } from '../Display'
import { Menu } from 'antd'
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
import { useLocalStore, useObserver } from 'mobx-react'
import StudyStore from '../../stores/StudyStore'
import ScrollToTop from '../ScrollToTop'
import StudyMap from './StudyMap'
import palette from '../../lib/styles/palette'

const StudyGroupMain = ({ id }: { id: number }) => {
  useEffect(() => {
    StudyStore.fetchStudyGroup(Number(id))
  }, [id])

  const title = css`
    font-weight: bold;
    font-size: 30px;
    color: ${palette.violet[9]};
    text-align: left;
    margin-left: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: 815px) {
      font-size: 25px;
    }
  `

  const total = css`
    display: flex;
    margin-top: 20px;
    @media screen and (max-width: 815px) {
      flex-direction: column;
    }
  `

  const top = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 3px dashed ${palette.violet[1]};
  `

  const main = css`
    display: flex;
    margin: 5px 0px 5px 0px;
  `

  const content = css`
    width: 100%;
    margin-left: 25px;
    min-height: 360px;
    @media screen and (max-width: 815px) {
      margin-left: 0;
    }
  `
  const menu = css`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 815px) {
      margin-top: 0;
      margin-bottom: 10px;
    }
  `
  const move = css`
    color: #5d5d5d;
    background: ${palette.violet[1]};
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    margin: 0px 0px 0px 2px;
    padding: 0px 10px 0px 10px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #4c4c4c;
      box-shadow: 2px 2px 3px inset;
    }
  `

  const all = css`
    margin-top: 42px;
    margin-bottom: 50px;
  `

  const Emoji = (props: {
    label: string | undefined
    symbol: React.ReactNode
  }) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  )

  const state = useLocalStore(() => ({
    width: window.innerWidth,
    updateWidth() {
      this.width = window.innerWidth
    }
  }))
  useEffect(() => {
    window.addEventListener('resize', state.updateWidth)
    return () => window.removeEventListener('resize', state.updateWidth)
  })

  return useObserver(() => (
    <Display>
      <div css={all}>
        <div css={top}>
          <div css={main}>
            <div css={title}>
              {StudyStore.studyGroup.title}&nbsp;
              <NavLink
                css={move}
                to={`/study/details/${StudyStore.studyGroup.id}`}
              >
                <span
                  css={css`
                    transition: 0.3s;
                    &:hover {
                      font-size: larger;
                    }
                  `}
                >
                  <Emoji label="move" symbol="🚴‍♀️" />
                </span>
                &nbsp; 상세정보 페이지로 이동&nbsp;
                <span
                  css={css`
                    transition: 0.3s;
                    &:hover {
                      font-size: larger;
                    }
                  `}
                >
                  <Emoji label="move" symbol="🚴‍♀️" />
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        <div css={total}>
          <div css={menu}>
            <Menu
              style={
                state.width >= 815
                  ? { width: 145 }
                  : {
                      height: 50,
                      display: 'flex',
                      flexWrap: 'wrap'
                    }
              }
              mode={state.width >= 815 ? 'inline' : 'horizontal'}
              selectable={false}
            >
              <Menu.Item key="schedule">
                <NavLink to={`/study/${StudyStore.studyGroup.id}/schedule`}>
                  <big>
                    <Emoji label="schedule" symbol="📅" />
                  </big>
                  {state.width >= 815 ? ' 스케줄' : ''}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="board">
                <NavLink to={`/study/${StudyStore.studyGroup.id}/board`}>
                  <big>
                    <Emoji label="board" symbol="📝" />
                  </big>
                  {state.width >= 815 ? ' 게시판' : ''}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="memberinfo">
                <NavLink to={`/study/${StudyStore.studyGroup.id}/member`}>
                  <big>
                    <Emoji label="member" symbol="😃" />
                  </big>
                  {state.width >= 815 ? ' 멤버 정보' : ''}
                </NavLink>
              </Menu.Item>
              {!StudyStore.studyGroup.isOnline && (
                <Menu.Item key="studylocation">
                  <NavLink to={`/study/${StudyStore.studyGroup.id}/map`}>
                    <big>
                      <Emoji label="map" symbol="🌏" />
                    </big>
                    {state.width >= 815 ? ' 스터디 장소' : ''}
                  </NavLink>
                </Menu.Item>
              )}
            </Menu>
          </div>
          <div css={content}>
            <ScrollToTop />
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
              <Route
                path={`/study/:id/map`}
                component={StudyMap}
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
