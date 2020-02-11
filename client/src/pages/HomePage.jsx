import React, { useEffect } from 'react'
/***@jsx jsx */
import { jsx } from '@emotion/core'
import MainStudylist from '../components/main/MainStudyList'
import Slider from 'infinite-react-carousel'
import { loadToken } from '../utils/authCheck'
import { useObserver } from 'mobx-react'

const HomePage = () => {
  useEffect(() => {
    loadToken()
  }, [])

  return useObserver(() => (
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

      <MainStudylist />
    </>
  ))
}

export default HomePage
