import React, { useEffect } from 'react'
/***@jsx jsx */
import { css, jsx } from '@emotion/core'
import MainStudylist from '../components/main/MainStudyList'
import { loadToken } from '../utils/authCheck'
import { useObserver } from 'mobx-react'
import { Carousel } from 'antd'
import { useHistory } from 'react-router'
import palette from '../lib/styles/palette'

const HomePage = () => {
  
  const history = useHistory()
  useEffect(() => {
    loadToken(history)
  }, [])

  const images = [
    'http://i02a306.p.ssafy.io/images/index/1080_360_2.jpg',
    'http://i02a306.p.ssafy.io/images/index/1080_360_3.jpg',
    'http://i02a306.p.ssafy.io/images/index/1080_360_4.jpg',
    'http://i02a306.p.ssafy.io/images/index/1080_360_5.jpg',
    'http://i02a306.p.ssafy.io/images/index/1080_360_6.jpg',
    'http://i02a306.p.ssafy.io/images/index/1080_360_1.jpeg'
  ]

  const back = css`
    background: ${palette.violet[0]};
  `

  return useObserver(() => (
    <div>
      <Carousel css={back} autoplay={true} autoplaySpeed={2000}>
        {images.map((imageURL: string, index: number) => (
          <div key={index}>
            <img
              src={imageURL}
              alt={`people studying ${index}`}
              css={css`
                width: 100%;
              `}
            />
          </div>
        ))}
      </Carousel>

      <MainStudylist />
    </div>
  ))
}

export default HomePage