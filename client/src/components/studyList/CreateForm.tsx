/**@jsx jsx */
import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import { css, jsx } from '@emotion/core'
import '../../css/custom-antd.css'
import {
  Form,
  Radio,
  Row,
  Col,
  Input,
  Button,
  Slider,
  DatePicker,
  Cascader,
  InputNumber,
  Checkbox,
  message
} from 'antd'
import {
  cityAndTownsForForm,
  interestsForForm,
  makeFilter
} from '../../stores/UserStore'
import StudyStore from '../../stores/StudyStore'
import StudyDetailStore from '../../stores/StudyDetailStore'
import { Study } from '../main/MainTypes'
import { FormComponentProps } from 'antd/lib/form/Form'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import { useHistory, useLocation } from 'react-router'
import moment from 'moment'
import { RadioChangeEvent } from 'antd/lib/radio'

function CreateForm({ form }: FormComponentProps) {
  const { getFieldDecorator } = form
  const { RangePicker } = DatePicker
  const { TextArea } = Input

  const history = useHistory()
  const { pathname } = useLocation()

  let initialValues: Study
  if (pathname.slice(0, 14) === '/study/details') {
    initialValues = {
      title: StudyDetailStore.data.title,
      lcategory: StudyDetailStore.data.lcategory,
      scategory: StudyDetailStore.data.scategory,
      city: StudyDetailStore.data.city,
      town: StudyDetailStore.data.town,
      maxParticipants: StudyDetailStore.data.maxParticipants,
      contents: StudyDetailStore.data.contents,
      frequency: StudyDetailStore.data.frequency,
      monthOrWeek: StudyDetailStore.data.monthOrWeek,
      weekdayOrWeekend: StudyDetailStore.data.weekdayOrWeekend,
      startDate: StudyDetailStore.data.startDate,
      endDate: StudyDetailStore.data.endDate,
      evaluationLimit: StudyDetailStore.data.evaluationLimit,
      isOnline: StudyDetailStore.data.isOnline,
      timeslot: StudyDetailStore.data.timeslot
    }
  } else {
    initialValues = {
      title: '',
      lcategory: '개발',
      scategory: 'Web',
      city: '서울',
      town: '강남구',
      maxParticipants: 30,
      contents: '',
      frequency: 2,
      monthOrWeek: 2,
      weekdayOrWeekend: 2,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment()
        .add(30, 'days')
        .format('YYYY-MM-DD'),
      evaluationLimit: 30,
      isOnline: false,
      timeslot: 2
    }
  }

  const state = useLocalStore(() => ({
    monthOrWeek: 2,
    weekdayOrWeekend: 0,
    timeslot: 0,
    checked: false,
    interestDisabled: false,
    isOnlineDisabled: false,
    weekdayOrWeekendDisabled: false,
    locationDisabled: false,
    interestChecked: false,
    isOnlineChecked: false,
    weekdayOrWeekendChecked: false,
    locationChecked: false,
    io: initialValues.isOnline,

    onInterestChange(e: CheckboxChangeEvent) {
      this.interestChecked = !this.interestChecked
      this.interestDisabled = !this.interestDisabled
    },
    onChangeIsOnline(e: RadioChangeEvent) {
      this.io = e.target.value
    }
  }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (pathname !== '/study') {
          const dataToSend: Study = {
            title: values.title,
            lcategory: values.category[0],
            scategory: values.category[1],
            city: values.location[0],
            town: values.location[1],
            maxParticipants: values.maxParticipants,
            contents: values.contents,
            frequency: values.frequency,
            monthOrWeek: values.monthOrWeek,
            weekdayOrWeekend: values.weekdayOrWeekend,
            startDate: values.studyDate[0].format('YYYY-MM-DD'),
            endDate: values.studyDate[1].format('YYYY-MM-DD'),
            evaluationLimit: state.checked ? 0 : values.evaluationLimit,
            isOnline: values.isOnline,
            timeslot: values.timeslot
          }
          if (pathname === '/study/create') {
            StudyStore.createStudy(dataToSend, history)
            history.push('/study')
          } else {
            dataToSend.leader = {
              id: parseInt(sessionStorage.id),
              nickname: ''
            }
            dataToSend.id = StudyDetailStore.data.id
            dataToSend.state = StudyDetailStore.data.state
            dataToSend.hits = StudyDetailStore.data.hits
            StudyStore.updateStudy(dataToSend, history)
            history.push('/study')
            StudyDetailStore.modalVisible = false
          }
        } else {
          StudyStore.filterData.lcategory = values.category[0]
          StudyStore.filterData.scategory = values.category[1]
          StudyStore.filterData.city = values.location[0]
          StudyStore.filterData.town = values.location[1]
          StudyStore.filterData.weekdayOrWeekend = values.weekdayOrWeekend
          StudyStore.filterData.isOnline = values.isOnline
          StudyStore.filterStudyList()
          StudyStore.modalVisible = false
        }
      } else {
        message.error('스터디 정보를 확인해주세요')
      }
    })
  }

  const isOnline = [
    { value: 0, label: '오프라인' },
    { value: 1, label: '온라인' }
  ]
  const monthorWeek = [
    { value: 1, label: '매월' },
    { value: 2, label: '매주' },
    { value: 0, label: '추후 협의' }
  ]
  const timeslot = [
    { value: 1, label: '오전' },
    { value: 2, label: '오후' },
    { value: 3, label: '저녁' },
    { value: 0, label: '추후 협의' }
  ]
  const weekdayOrWeekend = [
    { value: 1, label: '평일' },
    { value: 2, label: '주말' },
    { value: 3, label: '혼합' },
    { value: 0, label: '추후 협의' }
  ]
  const sliderMarks = {
    5: '5',
    15: '15',
    26: '25'
  }
  const sliderMarksEval = {
    10: '10',
    30: '30',
    50: '50',
    70: '70',
    90: '90'
  }
  const freqMinMax: {
    [key: string]: { min: number; max: number; disabled: boolean }
  } = {
    1: { min: 1, max: 30, disabled: false },
    2: { min: 1, max: 7, disabled: false },
    0: { min: 1, max: 7, disabled: true }
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    hideRequiredMark: true
  }

  return useObserver(() => (
    <Form
      {...formItemLayout}
      css={css`
        background-color: white;
        padding: 20px;
      `}
      onSubmit={handleSubmit}
    >
      {pathname === '/study/create' ? (
        <h2
          css={css`
            text-align: center;
            font-weight: bold;
            color: #6741d9;
          `}
        >
          스터디 개설하기
        </h2>
      ) : pathname === '/study' ? (
        <h2
          css={css`
            text-align: center;
            font-weight: bold;
            color: #6741d9;
          `}
        >
          스터디 검색 필터
        </h2>
      ) : (
        <h2
          css={css`
            text-align: center;
            font-weight: bold;
            color: #6741d9;
          `}
        >
          스터디 수정하기
        </h2>
      )}
      <br />
      <Col>
        {pathname !== '/study' && (
          <Row>
            <Form.Item label={'스터디 이름'}>
              {getFieldDecorator('title', {
                initialValue: initialValues.title,
                rules: [
                  {
                    required: true,
                    message: '스터디 이름을 입력해주세요!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Row>
        )}
        <Row>
          <Form.Item label="분야">
            {getFieldDecorator('category', {
              initialValue: [initialValues.lcategory, initialValues.scategory],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: '스터디 분야를 입력해주세요'
                }
              ]
            })(
              <Cascader
                options={
                  pathname !== '/study'
                    ? interestsForForm
                    : makeFilter(interestsForForm)
                }
              />
            )}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label={'방식'}>
            {getFieldDecorator('isOnline', {
              initialValue: initialValues.isOnline
            })(
              <Radio.Group
                disabled={state.isOnlineDisabled}
                onChange={state.onChangeIsOnline}
              >
                {isOnline.map(
                  (iO: { value: number; label: string }, index: number) => (
                    <Radio.Button value={Boolean(iO.value)} key={index}>
                      {iO.label}
                    </Radio.Button>
                  )
                )}
                {pathname === '/study' && (
                  <Radio.Button value={null} key={99}>
                    적용 안함
                  </Radio.Button>
                )}
              </Radio.Group>
            )}
          </Form.Item>
        </Row>

        {state.io === false ? (
          <Row>
            <Form.Item label="지역">
              {getFieldDecorator('location', {
                initialValue: [initialValues.city, initialValues.town],
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '스터디 지역을 입력해주세요'
                  }
                ]
              })(
                <Cascader
                  options={
                    pathname !== '/study'
                      ? cityAndTownsForForm
                      : makeFilter(cityAndTownsForForm)
                  }
                />
              )}
            </Form.Item>
          </Row>
        ) : (
          <Row
            css={css`
              display: none;
            `}
          >
            <Form.Item label="지역">
              {getFieldDecorator('location', {
                initialValue: [initialValues.city, initialValues.town],
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '스터디 지역을 입력해주세요'
                  }
                ]
              })(
                <Cascader
                  options={
                    pathname !== '/study'
                      ? cityAndTownsForForm
                      : makeFilter(cityAndTownsForForm)
                  }
                />
              )}
            </Form.Item>
          </Row>
        )}

        {pathname !== '/study' && (
          <Row>
            <Form.Item label={'스터디 일정'}>
              {getFieldDecorator('monthOrWeek', {
                initialValue: initialValues.monthOrWeek
              })(
                <Radio.Group
                  onChange={e => {
                    state.monthOrWeek = e.target.value
                  }}
                >
                  {monthorWeek.map(
                    (iO: { value: number; label: string }, index: number) => (
                      <Radio.Button value={iO.value} key={index}>
                        {iO.label}
                      </Radio.Button>
                    )
                  )}
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label={'스터디 횟수'}>
              {getFieldDecorator('frequency', {
                initialValue: initialValues.frequency
              })(
                <InputNumber
                  css={css`
                    width: 60px;
                  `}
                  min={freqMinMax[`${state.monthOrWeek}`].min}
                  max={freqMinMax[`${state.monthOrWeek}`].max}
                  disabled={freqMinMax[`${state.monthOrWeek}`].disabled}
                />
              )}
              &nbsp;회
            </Form.Item>
          </Row>
        )}

        <Form.Item label={'요일'}>
          {getFieldDecorator('weekdayOrWeekend', {
            initialValue: initialValues.weekdayOrWeekend
          })(
            <Radio.Group>
              {weekdayOrWeekend.map(
                (ts: { value: number; label: string }, index: number) => (
                  <Radio.Button value={ts.value} key={index}>
                    {ts.label}
                  </Radio.Button>
                )
              )}
              {pathname === '/study' && (
                <Radio.Button value={null} key={99}>
                  적용 안함
                </Radio.Button>
              )}
            </Radio.Group>
          )}
        </Form.Item>

        {pathname !== '/study' && (
          <Row>
            {' '}
            <Form.Item label={'시간대'}>
              {getFieldDecorator('timeslot', {
                initialValue: initialValues.timeslot
              })(
                <Radio.Group>
                  {timeslot.map(
                    (ts: { value: number; label: string }, index: number) => (
                      <Radio.Button value={ts.value} key={index}>
                        {ts.label}
                      </Radio.Button>
                    )
                  )}
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label={'스터디 기간'}>
              {getFieldDecorator('studyDate', {
                initialValue: [
                  moment(initialValues.startDate),
                  moment(initialValues.endDate)
                ],
                rules: [
                  {
                    required: true,
                    message: '스터디 기간를 입력해주세요!'
                  }
                ]
              })(<RangePicker />)}
            </Form.Item>
          </Row>
        )}

        {pathname !== '/study' && (
          <Row>
            <Form.Item label="최대 인원">
              {getFieldDecorator('maxParticipants', {
                initialValue: initialValues.maxParticipants
              })(<Slider marks={sliderMarks} min={1} max={30} />)}
            </Form.Item>

            <Form.Item label={'성실도 제한'}>
              {getFieldDecorator('evaluationLimit', {
                initialValue: initialValues.evaluationLimit
              })(
                <Slider
                  marks={sliderMarksEval}
                  min={1}
                  max={100}
                  disabled={state.checked}
                />
              )}
              &nbsp;&nbsp;
              <Checkbox
                checked={state.checked}
                onChange={() => {
                  state.checked = !state.checked
                }}
              >
                제한 없음
              </Checkbox>
            </Form.Item>

            <Form.Item label="스터디 소개">
              {getFieldDecorator('contents', {
                initialValue: initialValues.contents,
                rules: [
                  {
                    required: true,
                    message: '간단하게 소개를 입력해주세요!'
                  }
                ]
              })(<TextArea rows={4} allowClear />)}
            </Form.Item>
          </Row>
        )}
        <br />

        <Button
          css={css`
            height: 40px;
            border: none;
          `}
          block
          type="primary"
          htmlType="submit"
        >
          {pathname === '/study/create'
            ? '스터디 개설'
            : pathname === '/study'
            ? '설정 완료'
            : '수정 완료'}
        </Button>
      </Col>
      <br />
    </Form>
  ))
}

export default Form.create({ name: 'filter-form' })(CreateForm)
