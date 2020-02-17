import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon, Modal, DatePicker } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useLocalStore } from 'mobx-react'
import StudyStore from "../../stores/StudyStore";
import {CreatedOrUpdatedSchedule} from "./StudyGroupType";
import moment from 'moment'

const ScheduleAdd = () => {
  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const btn = css`
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: navy;

    background: #d9e5ff;
    border-radius: 7px;
    width: 130px;
    height: 30px;

    &:hover {
      background-color: #b2ccff;
    }
  `

  const element = css`
    display: flex;
    padding-top: 3px;
  `

  const top = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
  `

  const title = css`
    width: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
  `
  const content = css`
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
  `

  // 스케줄 추가 버튼 클릭시
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    const newSchedule = {
      studyDTO: {
        id: state.study.id
      },
      subject: state.subject,
      homework: state.homework,
      meetDate: state.meetDate.concat(":00"),
      location: state.location
    }
    StudyStore.enrollNewSchedule(newSchedule);
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const state = useLocalStore<CreatedOrUpdatedSchedule>(() => ({
    id: -1,
    study: {
      id: StudyStore.studyGroup.id
    },
    subject: '',
    homework: '',
    meetDate: '',
    location: '',
    onChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
      state[e.target.name] = e.target.value;
    }
  }))

  const handleDatePickerChanged = (date: any, dateString: string) => {
    state.meetDate = dateString;
  }

  return (
    <div>
      <button css={btn} onClick={showModal}>
        스케줄 추가&nbsp;&nbsp;
        <Icon
          css={icon}
          type="plus-circle"
          style={{ fontSize: 20 }}
          theme="twoTone"
          twoToneColor="navy"
        />
      </button>
      <Modal
        // title="스케줄 추가"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="취소"
        okText="등록"
        destroyOnClose={true}
      >
        <h2 css={top}>스터디 스케줄 추가</h2>
        <div css={element}>
          <div css={title}>스케줄명</div>
          <TextArea
            css={content}
            rows={1}
            placeholder="이번 스터디의 목표 혹은 주제가 있다면 입력해주세요."
            name="subject"
            onChange={state.onChangeTextArea}
          />
        </div>
        <div css={element}>
          <div css={title}>시간</div>
          <div css={content}>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="날짜, 시간을 입력하세요"
              name="meetDate"
              defaultValue={moment().locale('ko-KR')}
              onChange={handleDatePickerChanged}
            />
          </div>
        </div>
        <div css={element}>
          <div css={title}>장소</div>
          <TextArea
            css={content}
            rows={1}
            placeholder="장소를 입력하세요"
            name="location"
            onChange={state.onChangeTextArea}
          />
        </div>
        <div css={element}>
          <div css={title}>준비사항</div>
          <TextArea
            css={content}
            rows={1}
            placeholder="준비사항을 입력하세요"
            name="homework"
            onChange={state.onChangeTextArea}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ScheduleAdd
