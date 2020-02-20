import React, { useEffect } from 'react'
/***@jsx jsx */
import { jsx, css } from '@emotion/core'
import MainStudylist from '../components/main/MainStudyList'
import { loadToken } from '../utils/authCheck'
import { useObserver } from 'mobx-react'
import { Carousel } from 'antd'

const HomePage = () => {
  useEffect(() => {
    loadToken()
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
    background: #e5dbff;
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
