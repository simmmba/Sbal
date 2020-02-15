// import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import { StudyRankprops, Study } from './MainTypes'
import myStudy from '../../stores/StudyStore'

const listBox = css`
  /* width: 650px; */
  /* margin: 10px; */
  border: 1px solid red;
  background-color: white;
  padding: 15px 15px 20px 15px;
  width: 330px;
  border: 10px solid rgb(236, 236, 236);
`
const listTitle = css`
  font-size: 15px;
  font-weight: 900;
  color: grey;
  margin-bottom: 10px;
  /* border: 1px solid skyblue; */
`

const listContent = css`
  display: flex;
  /* border: 1px solid yellow; */
  padding: 0px 0px 3px 0px;
  &:hover {
    background: rgb(236, 236, 236);
  }
`

const listRank = css`
  margin: 5px 20px 5px 15px;
  /* border: 1px solid orange; */
  color: grey;
  font-weight: bold;
`

const listName = css`
  margin: 5px 5px 0px 5px;
  /* border: 1px solid green; */
  font-weight: 750;
`

const listType = css`
  margin: 0px 5px 5px 5px;
  /* border: 1px solid purple; */
  font-size: small;
`

const listContainer = css`
  display: flex;
  flex-direction: table-column;
  justify-content: flex-end;
  /* vertical-align: middle; */
  /* border: 1px solid brown; */
  height: 0px;
`

const titleMap: { [key: string]: string } = {
  myStudy: '내 진행 중인 스터디',
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
                  <div css={listName}>{study.title}</div>
                  <div css={listType}>{study.lcategory}</div>
                </div>
              </div>
            </div>
          </NavLink>
        ))
      ) : (
        <div>스터디 없음</div>
      )}
    </div>
  )
}

export default StudyRank
