import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Modal, DatePicker } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import StudyStore from '../../stores/StudyStore'
import { useLocalStore } from 'mobx-react'
import { CreatedOrUpdatedSchedule } from './StudyGroupType'
import moment from 'moment'
import palette from '../../lib/styles/palette'

const ScheduleEdit = ({ sIndex }: { sIndex: number }) => {
  const btn = css`
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: ${palette.violet[9]};
    background: ${palette.violet[0]};
    border-radius: 7px;
    height: 25px;
    transition: 0.3s;

    &:hover {
      background-color: ${palette.violet[1]};
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
    align-items: center;
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

  // 스케줄 추가 버튼 클릭시
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    const editedSchedule = {
      id: state.id,
      studyDTO: {
        id: state.study.id
      },
      subject: state.subject,
      homework: state.homework,
      meetDate: state.meetDate,
      location: state.location
    }
    StudyStore.editSchedule(editedSchedule)

    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const schedule = StudyStore.studyGroup.studyScheduleDTOList[Number(sIndex)]
  const state = useLocalStore<CreatedOrUpdatedSchedule>(() => ({
    id: schedule.id,
    study: {
      id: StudyStore.studyGroup.id
    },
    subject: schedule.subject,
    homework: schedule.homework,
    meetDate: schedule.meetDate,
    location: schedule.location,
    onChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
      state[e.target.name] = e.target.value
    }
  }))

  const handleDatePickerChanged = (date: any, dateString: string) => {
    state.meetDate = dateString
  }

  return (
    <div>
      <button css={btn} onClick={showModal}>
        수정 <Emoji label="edit" symbol="✏️" />
      </button>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="취소"
        okText="등록"
        destroyOnClose={true}
      >
        <h2 css={top}>스케줄 수정</h2>
        <div css={element}>
          <div css={title}>스케줄명</div>
          <TextArea
            css={content}
            rows={1}
            placeholder="스케줄명을 입력하세요"
            defaultValue={state.subject}
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
              name="time"
              defaultValue={moment(state.meetDate)}
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
            defaultValue={state.location}
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
            defaultValue={state.homework}
            name="homework"
            onChange={state.onChangeTextArea}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ScheduleEdit
