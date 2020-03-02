import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { useParams } from 'react-router'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { message } from 'antd'
import palette from '../../lib/styles/palette'
import StudyDetailStore from '../../stores/StudyDetailStore'
import '../map/map.css'

declare global {
  interface Window {
    kakao: any
  }
}
let map: any

const StudyMap = () => {
  const { id } = useParams()

  useEffect(() => {
    StudyDetailStore.studyId = Number(id)
    StudyDetailStore.studyDetail()

    let container = document.getElementById('map')
    let option = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    }

    map = new window.kakao.maps.Map(container, option)

    var geocoder = new window.kakao.maps.services.Geocoder()

    geocoder.addressSearch(
      StudyDetailStore.data.city + ' ' + StudyDetailStore.data.town,
      function(result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: coords
          })

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">설정 위치</div>'
          })
          infowindow.open(map, marker)

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords)

          //searchPlaces();
        }
      }
    )
  }, [id])

  let markers: any[] = []

  var ps = new window.kakao.maps.services.Places()
  var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })

  function searchPlaces(idx: number) {
    if (idx === 1) {
      ps.keywordSearch(
        StudyDetailStore.data.city + ' ' + StudyDetailStore.data.town + ' 카페',
        placesSearchCB
      )
    } else
      ps.keywordSearch(
        StudyDetailStore.data.city +
          ' ' +
          StudyDetailStore.data.town +
          ' 스터디룸',
        placesSearchCB
      )
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data: any, status: any, pagination: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data)

      displayPagination(pagination)
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      message.error('검색 결과가 존재하지 않습니다.')
      return
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      message.error('검색 결과 중 오류가 발생했습니다.')
      return
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places: any) {
    var listEl = document.getElementById('placesList'),
      menuEl = document.getElementById('menu_wrap'),
      fragment = document.createDocumentFragment(),
      bounds = new window.kakao.maps.LatLngBounds()

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl)

    removeMarker()

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x
        ),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition)

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      ;(function(marker, title) {
        window.kakao.maps.event.addListener(marker, 'mouseover', function() {
          displayInfowindow(marker, title)
        })

        window.kakao.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close()
        })

        itemEl.onmouseover = function() {
          displayInfowindow(marker, title)
        }

        itemEl.onmouseout = function() {
          infowindow.close()
        }
      })(marker, places[i].place_name)

      fragment.appendChild(itemEl)
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    if (listEl != null) {
      listEl.appendChild(fragment)
    }
    if (menuEl !== null) {
      menuEl.scrollTop = 0
    }

    map.setBounds(bounds)
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(index: any, places: any) {
    var el = document.createElement('li'),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>'

    if (places.road_address_name) {
      itemStr +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        places.address_name +
        '</span>'
    } else {
      itemStr += '    <span>' + places.address_name + '</span>'
    }
    el.innerHTML = itemStr
    el.className = 'item'

    return el
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position: any, idx: any) {
    var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new window.kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      ),
      marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage
      })

    marker.setMap(map) // 지도 위에 마커를 표출합니다
    markers.push(marker) // 배열에 생성된 마커를 추가합니다

    return marker
  }

  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
    markers = []
  }

  function displayPagination(pagination: any) {
    var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i

    // 기존에 추가된 페이지번호를 삭제합니다
    if (paginationEl !== null) {
      while (paginationEl.hasChildNodes()) {
        if (paginationEl.lastChild !== null) {
          paginationEl.removeChild(paginationEl.lastChild)
        }
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i + ''

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker: any, title: any) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>'

    infowindow.setContent(content)
    infowindow.open(map, marker)
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el: any) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild)
    }
  }

  const mapcss = css`
    width: 100%;
    height: 500px;
    display: inline-block;
    position: absolute;
    overflow: hidden;
  `
  const searchStyle = css`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
  `
  const buttonStyle = css`
    width: 59%;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid white;
    border-radius: 5px;
    background: ${palette.violet[5]};
    padding: 10px 0;
    color: white;
    cursor: pointer;
  `

  return useObserver(() => (
    <div>
      <div className="option">
        <div css={searchStyle}>
          <button
            css={buttonStyle}
            onClick={() => {
              searchPlaces(1)
            }}
          >
            스터디 주변 카페
          </button>
          <button
            css={buttonStyle}
            onClick={() => {
              searchPlaces(2)
            }}
          >
            스터디 주변 스터디룸
          </button>
        </div>
      </div>

      <div className="map_wrap">
        <div id="map" css={mapcss}></div>
        <div id="menu_wrap" className="bg_white">
          <div
            css={css`
              text-align: center;
              font-size: 13px;
              font-weight: bold;
              margin-top: 10px;
              margin-bottom: 10px;
              padding-top: 5px;
              padding-bottom: 5px;
              background-color: white;
            `}
          >
            "{StudyDetailStore.data.city} {StudyDetailStore.data.town}" 기준
            검색 결과입니다.
          </div>
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  ))
}
export default StudyMap
