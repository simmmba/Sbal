// import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import { StudyRankprops, Study } from './MainTypes'
import LoadingSpin from '../common/LoadingSpin'
import React from 'react'

const listBox = css`
  margin: 10px;
  background-color: white;
  padding: 15px 15px 20px 15px;
  width: 330px;
  border-radius: 10px;
`
const listTitle = css`
  font-size: 16px;
  font-weight: 900;
  color: black;
  margin-bottom: 10px;
  margin-left: 10px;
`

const listContent = css`
  display: flex;
  padding: 0px 0px 3px 0px;
  &:hover {
    /* background: rgb(236, 236, 236); */
    background: #f3f0ff;
  }
`

const listRank = css`
  margin: 5px 20px 5px 15px;
  color: grey;
  font-weight: bold;
`

const listName = css`
  margin: 5px 5px 0px 5px;
  font-weight: 750;
`

const listType = css`
  margin: 0px 5px 5px 5px;
  font-size: small;
`

const listContainer = css`
  display: flex;
  flex-direction: table-column;
  justify-content: flex-end;
  height: 0px;
`

const empty = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`

const link = css`
  margin: 10px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 7px;
  width: 150px;
  height: 30px;
  transition: 0.3s;
  /* border: 2px solid #e5dbff; */
  background: #e5dbff;

  &:hover {
    background-color: #f3f0ff;
  }
`

const comment = css`
  font-size: 12px;
  color: #ff5e00;
`

const titleMap: { [key: string]: string } = {
  myStudy: '나의 진행 중인 스터디',
  recentStudy: '최근 개설된 스터디',
  famousStudy: '지금 급상승 중인 스터디'
}

const StudyRank = ({ title, list }: StudyRankprops) => {
  return (
    <div css={listBox}>
      <div css={listTitle}>{titleMap[title]}</div>
      {list.length > 0 ? (
        list.map((study: Study, index: number) => (
          <NavLink to={`study/details/${study.id}`} key={index}>
            <div css={listContent}>
              <div css={listRank}>
                <p>{index + 1}</p>
              </div>
              <div css={listContainer}>
                <div>
                  <div css={listName}>
                    {study.title.length > 10
                      ? study.title.slice(0, 19) + '...'
                      : study.title}
                    {study.joinRequestCount != null &&
                    study.joinRequestCount > 0 ? (
                      <span css={comment}>
                        &nbsp;&nbsp;[{study.joinRequestCount}]
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div css={listType}>{study.lcategory}</div>
                </div>
              </div>
            </div>
          </NavLink>
        ))
      ) : sessionStorage.token && title === 'myStudy' ? (
        <div css={empty}>
          <span className="emoji" role="img" aria-label={'^^'}>
            참여중인 스터디가 없네요 😅
          </span>
          스터디를 둘러보시겠어요?
          <NavLink css={link} to="/study">
            스터디 보러가기
          </NavLink>
        </div>
      ) : !sessionStorage.token && title === 'myStudy' ? (
        <div css={empty}>
          <span className="emoji" role="img" aria-label={'^^'}>
            로그인 후 목록을 확인할 수 있어요! 😉
          </span>
          <NavLink css={link} to="/login">
            로그인하기
          </NavLink>
          <NavLink css={link} to="/study">
            스터디 둘러보기
          </NavLink>
        </div>
      ) : (
        <LoadingSpin />
      )}
    </div>
  )
}

export default StudyRank
