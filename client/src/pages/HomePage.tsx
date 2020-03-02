/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import MainStudylist from '../components/main/MainStudyList'
import { useObserver } from 'mobx-react'
import { Carousel } from 'antd'
import palette from '../lib/styles/palette'

const HomePage = () => {
  const images = [
    'http://i02a306.p.ssafy.io/images/index/banner1.png',
    'http://i02a306.p.ssafy.io/images/index/banner2.png',
    'http://i02a306.p.ssafy.io/images/index/banner3.png',
    'http://i02a306.p.ssafy.io/images/index/banner4.png'
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
