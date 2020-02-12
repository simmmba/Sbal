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
  Icon,
  Select,
  Slider
} from 'antd'
import { cityAndTowns, interests } from '../../stores/UserStore'
import { FormComponentProps } from 'antd/lib/form/Form'

function FilterForm({ form }: FormComponentProps) {
  const { Option } = Select
  const { getFieldDecorator } = form

  const state = useLocalStore(() => ({
    lCategory: '',
    sCategort: '',
    city: '서울',
    town: '',
    maxParticipants: 0
  }))

  const isOnline = [
    { value: 1, label: '온라인' },
    { value: 0, label: '오프라인' }
  ]
  const monthorWeek = [
    { value: 1, label: '' },
    { value: 2, label: '오프라인' },
    { value: 0, label: '온라인' }
  ]
  const sliderMarks = {
    5: '5',
    10: '10',
    15: '15',
    20: '20',
    25: '25',
    30: '30'
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 }
  }

  return useObserver(() => (
    <Form
      {...formItemLayout}
      css={css`
        background-color: yellow;
      `}
    >
      <Col>
        <Row>
          <Form.Item label={'분야'}>
            <Radio.Group defaultValue={interests['어학']} buttonStyle="solid">
              {Object.keys(interests).map((lc: string, index: number) => (
                <Radio.Button value={lc} key={index}>
                  {lc}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </Row>
        <Form.Item label={'방식'}>
          {' '}
          <Radio.Group defaultValue={interests['어학']} buttonStyle="solid">
            {isOnline.map(
              (iO: { value: number; label: string }, index: number) => (
                <Radio.Button value={iO.value} key={index}>
                  {iO.label}
                </Radio.Button>
              )
            )}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="인원수">
          {getFieldDecorator('slider')(
            <Slider marks={sliderMarks} min={1} max={30} />
          )}
        </Form.Item>
        <Form.Item label={'기간'}></Form.Item>
        <Form.Item label={'횟수'}></Form.Item>

        <Form.Item label={'요일'}></Form.Item>
        <Form.Item label={'시간'}></Form.Item>
        {/* <Form.Item label={'지역'}>
          <Radio.Group defaultValue={'서울'} buttonStyle="solid">
            {Object.keys(cityAndTowns).map((city: string, index: number) => (
              <Radio.Button value={city} key={index}>
                {city}
              </Radio.Button>
            ))}
          </Radio.Group>
          <Radio.Group defaultValue={cityAndTowns['서울']} buttonStyle="solid">
            {cityAndTowns[state.city].map((town: string, index: number) => (
              <Radio.Button value={town} key={index}>
                {town}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label={'지역'} hasFeedback>
          <Select defaultValue="서울" placeholder="Please select a country">
            {Object.keys(cityAndTowns).map((city: string, index: number) => (
              <Option value={city} key={index}>
                {city}
              </Option>
            ))}
          </Select>
          <Select defaultValue="강남구" placeholder="Please select a country">
            {cityAndTowns[state.city].map((town: string, index: number) => (
              <Option value={town} key={index}>
                {town}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={'성실도'}></Form.Item>
      </Col>
    </Form>
  ))
}
export default Form.create({ name: 'filter_form' })(FilterForm)
