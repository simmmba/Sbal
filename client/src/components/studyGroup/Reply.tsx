import React, { useState, useRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'
import ReplyInsert from './ReplyInsert'
import StudyStore from "../../stores/StudyStore";

const Reply = ({index} : {index: number}) => {

    const replyList = StudyStore.studyGroup.noticeDTOList[Number(index)].replyList;

    const cnt = css`
    border-bottom: 1px solid #d5d5d5;
    margin: 20px 0px 15px 0px;
    padding: 10px 0px 5px 15px;
    color: #4c4c4c;
  `

    const comment = css`
    padding: 0px 20px 0px 25px;
  `

    const writer = css`
    display: flex;
    align-items: center;
    font-weight: bold;
    padding-right: 15px;
    font-size: 15px;
  `
    const date = css`
    display: flex;
    align-items: center;
    font-size: 13px;
  `
    const content = css`
    padding-left: 5px;
  `

    const upper = css`
    display: flex;
    justify-content: space-between;
    padding-bottom: 2px;
  `

    const left = css`
    display: flex;
  `
    const right = css`
    display: flex;
  `

    const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  `

    const list = css`
    padding-bottom: 15px;
  `

    const navLink = css`
    color: #747474;

    &:hover {
      color: #4c4c4c;
    }
  `

    return (
        <div>
            <div css={cnt}>
                <b>{replyList.length}</b>개의 댓글
            </div>
            <div css={comment}>
                {replyList.map(r => (
                    <div css={list} key={r.id}>
                        <div css={upper}>
                            <div css={left}>
                                <div css={writer}>{r.writer}</div>
                                <div css={date}>{r.date.substr(0, 16)}</div>
                            </div>
                            <div css={right}>
                                <NavLink css={navLink} to={`/`}>
                                    <Icon
                                        css={icon}
                                        type="edit"
                                        //   style={{ fontSize: 24 }}
                                        // theme="twoTone"
                                        theme="filled"
                                        // twoToneColor="navy"
                                    />
                                </NavLink>
                                <NavLink css={navLink} to={`/`}>
                                    <Icon
                                        css={icon}
                                        type="delete"
                                        //   style={{ fontSize: 24 }}
                                        theme="filled"
                                        // twoToneColor="navy"
                                    />
                                </NavLink>
                            </div>
                        </div>
                        <div css={content}>
                            <pre>{r.content}</pre>
                        </div>
                    </div>
                ))}

                <ReplyInsert index={Number(index)}/>
            </div>
        </div>
    )
}

export default Reply
