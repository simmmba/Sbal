import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import Slider from 'infinite-react-carousel'
import MyStudy from '../components/mainStudyRank/MyStudy'
import RecentStudy from '../components/mainStudyRank/RecentStudy'
import FamousStudy from '../components/mainStudyRank/FamousStudy'

const studyRank = css`
  display: flex;
  justify-content: space-around;
  background-color: rgb(236, 236, 236);
  padding: 20px;
  flex-wrap: wrap;
`

const HomePage = () => {
  return (
    <>
      <Slider autoplay autoplaySpeed={3000}>
        <div>
          <center>
            <img
              src="images/1080_360_1.jpeg"
              alt="img1"
              style={{ width: '100%' }}
            ></img>
          </center>
        </div>
        <div>
          <center>
            <img
              src="images/1080_360_2.jpg"
              alt="img2"
              style={{ width: '100%' }}
            ></img>
          </center>
        </div>
        <div>
          <center>
            <img
              src="images/1080_360_3.jpg"
              alt="img3"
              style={{ width: '100%' }}
            ></img>
          </center>
        </div>
        <div>
          <center>
            <img
              src="images/1080_360_4.jpg"
              alt="img4"
              style={{ width: '100%' }}
            ></img>
          </center>
        </div>
        <div>
          <center>
            <img
              src="images/1080_360_5.jpg"
              alt="img5"
              style={{ width: '100%' }}
            ></img>
          </center>
        </div>
        <div>
          <center>
            <img
              src="images/1080_360_6.jpg"
              alt="img6"
              style={{ width: '100%' }}
            ></img>
          </center>
        </div>
      </Slider>

      <div css={studyRank}>
        <MyStudy />
        <RecentStudy />
        <FamousStudy />
      </div>
    </>
  )
}

export default HomePage
