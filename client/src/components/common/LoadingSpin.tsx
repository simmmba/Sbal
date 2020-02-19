import React from 'react'
import { Spin, Icon } from 'antd'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

function LoadingSpin({ tip }: { tip?: string }) {
  const box = css`
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
  `

  return (
    <div css={box}>
      <Spin
        tip={tip}
        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
      />
    </div>
  )
}
export default LoadingSpin
