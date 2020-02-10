// import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const listContent = css`
  display: flex;
  /* border: 1px solid yellow; */
  padding: 0px 0px 3px 0px;
  &:hover {
    background: rgb(236, 236, 236);
  }
`

const listLank = css`
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
  vertical-align: middle;
  /* border: 1px solid brown; */
  height: 0px;
`

const StudyRank = props => {
  return (
    <div>
      {props.list.length > 0 ? (
        props.list.map(list => (
          <div css={listContent}>
            <div css={listLank}>
              <p>{list.lno}</p>
            </div>
            <div css={listContainer}>
              <p>
                <div css={listName}>{list.lname}</div>
                <div css={listType}>{list.ltype}</div>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>스터디 없음</div>
      )}
    </div>
  )
}

export default StudyRank
