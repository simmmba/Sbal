import React from 'react'
import { useLocalStore } from 'mobx-react'
import { Form, Radio, Row, Col, Input, Button, Icon } from 'antd'

function FilterForm() {
  const state = useLocalStore(() => ({
    lCategory: '',
    sCategort: ''
  }))
  const interests = {
    어학: ['TOEIC', 'TOEIC SPEAKING'],
    취업: ['면접', '인적성']
  }
  const a = 1

  return (
    <Form>
      <Col>
        <Form.Item label={'분야'}>
          <Radio.Group defaultValue={interests['어학']} buttonStyle="solid">
            {Object.keys(interests).map((lc: string, index: number) => (
              <Radio.Button value={lc} key={index}>
                {lc}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label={'방식'}></Form.Item>
        <Form.Item label={'인원'}></Form.Item>
        <Form.Item label={'기간'}></Form.Item>
        <Form.Item label={'횟수'}></Form.Item>
        {a === 1 && <div>야야야</div>}
        <Form.Item label={'요일'}></Form.Item>
        <Form.Item label={'시간'}></Form.Item>
        <Form.Item label={'지역'}></Form.Item>
        <Form.Item label={'성실도'}></Form.Item>
      </Col>
    </Form>
  )
}

export default FilterForm
