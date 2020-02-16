/**@jsx jsx */
import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import { css, jsx } from '@emotion/core'
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
import { cityAndTownsForForm, interestsForForm } from '../../stores/UserStore'
import StudyStore from '../../stores/StudyStore'
import { Study } from '../main/MainTypes'
import { FormComponentProps } from 'antd/lib/form/Form'
import { useHistory, useLocation } from 'react-router'

function FilterForm({ form }: FormComponentProps) {
  const { getFieldDecorator } = form
  const { RangePicker } = DatePicker
  const { TextArea } = Input

  const history = useHistory()
  const { pathname } = useLocation()

  const state = useLocalStore(() => ({
    monthOrWeek: 2,
    weekdayOrWeekend: 0,
    timeslot: 0,
    checked: false
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
            evaluationLimit: values.evaluationLimit,
            isOnline: values.isOnline,
            timeslot: values.timeslot
          }

          StudyStore.createStudy(dataToSend, history)
        } else {
          console.log(values)
          StudyStore.filterData.lcategory = values.category[0]
          StudyStore.filterData.scategory = values.category[1]
          StudyStore.filterData.city = values.location[0]
          StudyStore.filterData.town = values.location[1]
          StudyStore.filterData.weekdayOrWeekend = values.weekdayOrWeekend
          StudyStore.filterData.isOnline = values.isOnline
          console.log(StudyStore.filterData)
          StudyStore.modalVisible = false
        }
      } else {
        message.error('스터디 정보를 확인해주세요')
      }
    })
  }

  const isOnline = [
    { value: 1, label: '온라인' },
    { value: 0, label: '오프라인' }
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
      {pathname !== '/study' && <h1>스터디 만들기</h1>}
      <Col>
        {pathname !== '/study' && (
          <Row>
            <Form.Item label={'스터디 이름'}>
              {getFieldDecorator('title', {
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
              initialValue: ['어학', 'TOEIC'],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: '스터디 분야를 입력해주세요'
                }
              ]
            })(<Cascader options={interestsForForm} />)}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label={'방식'}>
            {getFieldDecorator('isOnline', {
              initialValue: 1
            })(
              <Radio.Group>
                {isOnline.map(
                  (iO: { value: number; label: string }, index: number) => (
                    <Radio.Button value={iO.value} key={index}>
                      {iO.label}
                    </Radio.Button>
                  )
                )}
              </Radio.Group>
            )}
          </Form.Item>
        </Row>
        {pathname !== '/study' && (
          <Row>
            <Form.Item label={'스터디 일정'}>
              {getFieldDecorator('monthorWeek', {
                initialValue: 2
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
              <InputNumber
                defaultValue={1}
                css={css`
                  margin-left: 15px;
                  width: 35px;
                `}
                min={freqMinMax[`${state.monthOrWeek}`].min}
                max={freqMinMax[`${state.monthOrWeek}`].max}
                disabled={freqMinMax[`${state.monthOrWeek}`].disabled}
              />
              회
            </Form.Item>
          </Row>
        )}

        <Form.Item label={'요일'}>
          {getFieldDecorator('weekdayOrWeekend', {
            initialValue: 2
          })(
            <Radio.Group>
              {weekdayOrWeekend.map(
                (ts: { value: number; label: string }, index: number) => (
                  <Radio.Button value={ts.value} key={index}>
                    {ts.label}
                  </Radio.Button>
                )
              )}
            </Radio.Group>
          )}
        </Form.Item>

        {pathname !== '/study' && (
          <Row>
            {' '}
            <Form.Item label={'시간대'}>
              {getFieldDecorator('timeslot', {
                initialValue: 2
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
            <Form.Item label={'스터디 일자'}>
              {getFieldDecorator('studyDate', {
                rules: [
                  {
                    required: true,
                    message: '스터디 일자를 입력해주세요!'
                  }
                ]
              })(<RangePicker />)}
            </Form.Item>
          </Row>
        )}
        <Row>
          <Form.Item label="지역">
            {getFieldDecorator('location', {
              initialValue: ['서울', '강남구'],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: '스터디 지역을 입력해주세요'
                }
              ]
            })(<Cascader options={cityAndTownsForForm} />)}
          </Form.Item>
        </Row>
        {pathname !== '/study' && (
          <Row>
            <Form.Item label="최대 인원">
              {getFieldDecorator('maxParticipants', {
                initialValue: 30
              })(<Slider marks={sliderMarks} min={1} max={30} />)}
            </Form.Item>

            <Form.Item label="간단한 소개">
              {getFieldDecorator('contents', {
                rules: [
                  {
                    required: true,
                    message: '간단하게 소개를 입력해주세요!'
                  }
                ]
              })(<TextArea rows={4} allowClear />)}
            </Form.Item>
            <Form.Item label={'성실도 제한'}>
              {getFieldDecorator('evaluationLimit')(
                <Slider
                  marks={sliderMarksEval}
                  min={1}
                  max={100}
                  disabled={state.checked}
                />
              )}
              <Checkbox
                checked={state.checked}
                onChange={() => {
                  state.checked = !state.checked
                }}
              >
                제한 없음
              </Checkbox>
            </Form.Item>
          </Row>
        )}

        <Button
          css={css`
            height: 40px;
          `}
          block
          type="primary"
          htmlType="submit"
        >
          {pathname !== '/study' ? '스터디 생성' : '필터 적용'}
        </Button>
      </Col>
    </Form>
  ))
}
export default Form.create({ name: 'filter_form' })(FilterForm)
