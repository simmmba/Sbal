import React from 'react'
import {NavLink} from 'react-router-dom'
/**@jsx jsx */
import {css, jsx} from '@emotion/core'
import {Icon} from 'antd'
import Reply from './Reply'
import StudyStore from '../../stores/StudyStore'
import {useParams, useHistory} from 'react-router'
import {StudyNotice} from "./StudyGroupType";
import {useEffect} from 'react'

const StudyGroupBoardDetail = () => {
    const {index} = useParams();
    const notice: StudyNotice = StudyStore.studyGroup.noticeDTOList[Number(index)];
    const main = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-content: center; */
    /* border: 1px solid black; */
  `

    const upper = css`
    display: flex;
    padding: 8px 0px 10px 20px;
  `

    const title = css`
    display: flex;
    font-weight: bold;
    font-size: 21px;
    color: #004584;
    /* padding: 0px 17px 0px 5px; */
  `

    const content = css`
    display: flex;
    flex-direction: column;
    background: #eef7ff;
    border-radius: 5px;
    margin-bottom: 2px;
  `

    const btitle = css`
    display: flex;
    align-items: center;
    padding: 10px 0px 2px 22px;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
  `

    const writer = css`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 14px;
    /* border-right: 2px dashed #fff; */
  `

    const date = css`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px 20px 10px 20px; */
    font-size: 13px;
    padding-left: 10px;
    /* width: 200px; */
    /* border-right: 2px dashed #fff; */
  `
    const hit = css`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px 20px 10px 20px; */
    font-size: 13px;
    /* width: 100px; */
    padding-left: 10px;
  `

    const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  //   const btn = css`
  //   border: none;
  //   cursor: pointer;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   font-size: 14px;
  //   font-weight: bold;
  //   color: navy;
  //
  //   background: #d9e5ff;
  //   border-radius: 7px;
  //   width: 100px;
  //   height: 30px;
  // `

    const detail = css`
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    justify-content: space-between;
    padding: 3px 50px 30px 27px;
    color: #747474;
    flex-wrap: wrap;
  `

    const top = css`
    display: flex;
    flex-direction: column;
    background: #d1e9ff;
    border-radius: 5px;
    margin-bottom: 2px;
  `
    const bottom = css`
    display: flex;
    padding: 20px;
    min-height: 150px;
  `

    const left = css`
    display: flex;
  `
    const right = css`
    display: flex;
  `

    const navLink = css`
    display: flex;
    color: #747474;
    padding-right: 15px;

    &:hover {
      color: #4c4c4c;
    }
  `
    const history = useHistory();
    const clickDeleteIcon = (id: number, deleteIndex: number) => {
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
            StudyStore.deleteNotice(id);
            StudyStore.studyGroup.noticeDTOList.splice(deleteIndex, 1);
            history.goBack();
        }
    }

    useEffect(() => {
        StudyStore.increaseNoticeHits(Number(notice.id), Number(index));
    })

    return (
        <div css={main}>
            <div css={upper}>
                <div css={title}>
                    <Icon
                        css={icon}
                        type="snippets"
                        style={{fontSize: 24}}
                        theme="twoTone"
                        twoToneColor="navy"
                    />
                    &nbsp;게시글 읽기
                </div>
            </div>
            <div>
                <div css={content}>
                    <div css={top}>
                        <div css={btitle}>{notice.title}</div>
                        <div css={detail}>
                            <div css={left}>
                                <div css={writer}>{notice.writer.nickname}&nbsp;&nbsp; |</div>
                                <div css={date}>{notice.date.substr(0, 16)}&nbsp;&nbsp; |</div>
                                <div css={hit}>조회 {notice.hits}</div>
                            </div>
                            {notice.writer.id === StudyStore.loginUser.id ? (
                                <div css={right}>
                                    <NavLink
                                        css={navLink}
                                        to={`/study/${StudyStore.studyGroup.id}/editBoard/${Number(index)}`}
                                    >
                                        <Icon css={icon} type="edit" theme="filled"/>
                                    </NavLink>
                                    <Icon css={icon} type="delete" theme="filled"
                                          onClick={() => clickDeleteIcon(notice.id, Number(index))}/>

                                </div>
                            ) : (<div/>)}
                        </div>
                    </div>
                    <div css={bottom}>{notice.content}</div>
                </div>
            </div>
            <Reply index={Number(index)}/>
        </div>
    )
}

export default StudyGroupBoardDetail
