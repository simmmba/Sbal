import React from 'react'
import { Spin, Icon } from 'antd'

function LoadingSpin({ tip }: { tip?: string }) {
  return (
    <Spin
      tip={tip}
      indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
    />
  )
}
export default LoadingSpin
