import { observable } from 'mobx'
import * as userAPI from '../lib/api/auth'
import {
  LoginData,
  SignupData,
  UserStoreType
} from '../components/auth/AuthTypes'
import { UserInfoType } from '../components/userDetail/UserDetailTypes'
import StudyStore from './StudyStore'
import { CascaderOptionType } from 'antd/lib/cascader'

export const cityAndTowns: { [key: string]: string[] } = {
  서울: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구'
  ],
  인천: [
    '강화군',
    '계양구',
    '남동구',
    '동구',
    '미추홀구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구'
  ],
  경기: [
    '가평군',
    '고양시',
    '고양시 덕양구',
    '고양시 일산동구',
    '고양시 일산서구',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '성남시 분당구',
    '성남시 수정구',
    '성남시 중원구',
    '수원시',
    '수원시 권선구',
    '수원시 영통구',
    '수원시 장안구',
    '수원시 팔달구',
    '시흥시',
    '안산시',
    '안산시 단원구',
    '안산시 상록구',
    '안성시',
    '안양시',
    '안양시 동안구',
    '안양시 만안구',
    '양주시',
    '양평군',
    '여주시',
    '연천군',
    '오산시',
    '용인시',
    '용인시 기흥구',
    '용인시 수지구',
    '용인시 처인구',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시'
  ],
  강원: [
    '강릉시',
    '고성군',
    '동해시',
    '삼척시',
    '속초시',
    '양구군',
    '양양군',
    '영월군',
    '원주시',
    '인제군',
    '정선군',
    '철원군',
    '춘천시',
    '태백시',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군'
  ],
  충북: [
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '제천시',
    '증평군',
    '진천군',
    '청주시',
    '청주시 상당구',
    '청주시 서원구',
    '청주시 청원구',
    '청주시 흥덕구',
    '충주시'
  ],
  충남: [
    '계룡시',
    '공주시',
    '금산군',
    '논산시',
    '당진시',
    '보령시',
    '부여군',
    '서산시',
    '서천군',
    '아산시',
    '예산군',
    '천안시',
    '천안시 동남구',
    '천안시 서북구',
    '청양군',
    '태안군',
    '홍성군'
  ],
  대전: ['대덕구', '동구', '서구', '유성구', '중구'],
  세종: [
    '가람동',
    '고운동',
    '금남면',
    '나성동',
    '다정동',
    '대평동',
    '도담동',
    '반곡동',
    '보람동',
    '부강면',
    '새롬동',
    '소담동',
    '소정면',
    '아름동',
    '어진동',
    '연기면',
    '연동면',
    '연서면',
    '장군면',
    '전동면',
    '전의면',
    '조치원읍',
    '종촌동',
    '한솔동'
  ],
  전북: [
    '고창군',
    '군산시',
    '김제시',
    '남원시',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '익산시',
    '임실군',
    '장수군',
    '전주시',
    '전주시 덕진구',
    '전주시 완산구',
    '정읍시',
    '진안군'
  ],
  광주: ['광산구', '남구', '동구', '북구', '서구'],
  전남: [
    '강진군',
    '고흥군',
    '곡성군',
    '광양시',
    '구례군',
    '나주시',
    '담양군',
    '목포시',
    '무안군',
    '보성군',
    '순천시',
    '신안군',
    '여수시',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군'
  ],
  경북: [
    '경산시',
    '경주시',
    '고령군',
    '구미시',
    '군위군',
    '김천시',
    '문경시',
    '봉화군',
    '상주시',
    '성주군',
    '안동시',
    '영덕군',
    '영양군',
    '영주시',
    '영천시',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
    '포항시',
    '포항시 남구',
    '포항시 북구'
  ],
  대구: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
  경남: [
    '거제시',
    '거창군',
    '고성군',
    '김해시',
    '남해군',
    '밀양시',
    '사천시',
    '산청군',
    '양산시',
    '의령군',
    '진주시',
    '창녕군',
    '창원시',
    '창원시 마산합포구',
    '창원시 마산회원구',
    '창원시 성산구',
    '창원시 의창구',
    '창원시 진해구',
    '통영시',
    '하동군',
    '함안군',
    '함양군',
    '합천군'
  ],
  울산: ['남구', '동구', '북구', '울주군', '중구'],
  부산: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구'
  ],
  제주: ['제주시', '서귀포시']
}
export const cityAndTownsForForm: CascaderOptionType[] = [
  {
    value: '서울',
    label: '서울',
    children: [
      { value: '강남구', label: '강남구' },
      { value: '강동구', label: '강동구' },
      { value: '강북구', label: '강북구' },
      { value: '강서구', label: '강서구' },
      { value: '관악구', label: '관악구' },
      { value: '광진구', label: '광진구' },
      { value: '구로구', label: '구로구' },
      { value: '금천구', label: '금천구' },
      { value: '노원구', label: '노원구' },
      { value: '도봉구', label: '도봉구' },
      { value: '동대문구', label: '동대문구' },
      { value: '동작구', label: '동작구' },
      { value: '마포구', label: '마포구' },
      { value: '서대문구', label: '서대문구' },
      { value: '서초구', label: '서초구' },
      { value: '성동구', label: '성동구' },
      { value: '성북구', label: '성북구' },
      { value: '송파구', label: '송파구' },
      { value: '양천구', label: '양천구' },
      { value: '영등포구', label: '영등포구' },
      { value: '용산구', label: '용산구' },
      { value: '은평구', label: '은평구' },
      { value: '종로구', label: '종로구' },
      { value: '중구', label: '중구' },
      { value: '중랑구', label: '중랑구' }
    ]
  },
  {
    value: '인천',
    label: '인천',
    children: [
      { value: '계양구', label: '계양구' },
      { value: '강화군', label: '강화군' },
      { value: '남동구', label: '남동구' },
      { value: '동구', label: '동구' },
      { value: '미추홀구', label: '미추홀구' },
      { value: '부평구', label: '부평구' },
      { value: '서구', label: '서구' },
      { value: '연수구', label: '연수구' },
      { value: '옹진군', label: '옹진군' },
      { value: '중구', label: '중구' }
    ]
  },
  {
    value: '경기',
    label: '경기',
    children: [
      { value: '고양시', label: '고양시' },
      { value: '가평군', label: '가평군' },
      { value: '고양시 덕양구', label: '고양시 덕양구' },
      { value: '고양시 일산동구', label: '고양시 일산동구' },
      { value: '고양시 일산서구', label: '고양시 일산서구' },
      { value: '과천시', label: '과천시' },
      { value: '광명시', label: '광명시' },
      { value: '광주시', label: '광주시' },
      { value: '구리시', label: '구리시' },
      { value: '군포시', label: '군포시' },
      { value: '김포시', label: '김포시' },
      { value: '남양주시', label: '남양주시' },
      { value: '동두천시', label: '동두천시' },
      { value: '부천시', label: '부천시' },
      { value: '성남시', label: '성남시' },
      { value: '성남시 분당구', label: '성남시 분당구' },
      { value: '성남시 수정구', label: '성남시 수정구' },
      { value: '성남시 중원구', label: '성남시 중원구' },
      { value: '수원시', label: '수원시' },
      { value: '수원시 권선구', label: '수원시 권선구' },
      { value: '수원시 영통구', label: '수원시 영통구' },
      { value: '수원시 장안구', label: '수원시 장안구' },
      { value: '수원시 팔달구', label: '수원시 팔달구' },
      { value: '시흥시', label: '시흥시' },
      { value: '안산시', label: '안산시' },
      { value: '안산시 단원구', label: '안산시 단원구' },
      { value: '안산시 상록구', label: '안산시 상록구' },
      { value: '안성시', label: '안성시' },
      { value: '안양시', label: '안양시' },
      { value: '안양시 동안구', label: '안양시 동안구' },
      { value: '안양시 만안구', label: '안양시 만안구' },
      { value: '양주시', label: '양주시' },
      { value: '양평군', label: '양평군' },
      { value: '여주시', label: '여주시' },
      { value: '연천군', label: '연천군' },
      { value: '오산시', label: '오산시' },
      { value: '용인시', label: '용인시' },
      { value: '용인시 기흥구', label: '용인시 기흥구' },
      { value: '용인시 수지구', label: '용인시 수지구' },
      { value: '용인시 처인구', label: '용인시 처인구' },
      { value: '의왕시', label: '의왕시' },
      { value: '의정부시', label: '의정부시' },
      { value: '이천시', label: '이천시' },
      { value: '파주시', label: '파주시' },
      { value: '평택시', label: '평택시' },
      { value: '포천시', label: '포천시' },
      { value: '하남시', label: '하남시' },
      { value: '화성시', label: '화성시' }
    ]
  },
  {
    value: '강원',
    label: '강원',
    children: [
      { value: '강릉시', label: '강릉시' },
      { value: '고성군', label: '고성군' },
      { value: '동해시', label: '동해시' },
      { value: '삼척시', label: '삼척시' },
      { value: '속초시', label: '속초시' },
      { value: '양구군', label: '양구군' },
      { value: '양양군', label: '양양군' },
      { value: '영월군', label: '영월군' },
      { value: '원주시', label: '원주시' },
      { value: '인제군', label: '인제군' },
      { value: '정선군', label: '정선군' },
      { value: '철원군', label: '철원군' },
      { value: '춘천시', label: '춘천시' },
      { value: '태백시', label: '태백시' },
      { value: '평창군', label: '평창군' },
      { value: '홍천군', label: '홍천군' },
      { value: '화천군', label: '화천군' },
      { value: '횡성군', label: '횡성군' }
    ]
  },
  {
    value: '충북',
    label: '충북',
    children: [
      { value: '괴산군', label: '괴산군' },
      { value: '단양군', label: '단양군' },
      { value: '보은군', label: '보은군' },
      { value: '영동군', label: '영동군' },
      { value: '옥천군', label: '옥천군' },
      { value: '음성군', label: '음성군' },
      { value: '제천시', label: '제천시' },
      { value: '증평군', label: '증평군' },
      { value: '진천군', label: '진천군' },
      { value: '청주시', label: '청주시' },
      { value: '청주시 상당구', label: '청주시 상당구' },
      { value: '청주시 서원구', label: '청주시 서원구' },
      { value: '청주시 청원구', label: '청주시 청원구' },
      { value: '청주시 흥덕구', label: '청주시 흥덕구' },
      { value: '충주시', label: '충주시' }
    ]
  },
  {
    value: '충남',
    label: '충남',
    children: [
      { value: '계룡시', label: '계룡시' },
      { value: '공주시', label: '공주시' },
      { value: '금산군', label: '금산군' },
      { value: '논산시', label: '논산시' },
      { value: '당진시', label: '당진시' },
      { value: '보령시', label: '보령시' },
      { value: '부여군', label: '부여군' },
      { value: '서산시', label: '서산시' },
      { value: '서천군', label: '서천군' },
      { value: '아산시', label: '아산시' },
      { value: '예산군', label: '예산군' },
      { value: '천안시', label: '천안시' },
      { value: '천안시 동남구', label: '천안시 동남구' },
      { value: '천안시 서북구', label: '천안시 서북구' },
      { value: '청양군', label: '청양군' },
      { value: '태안군', label: '태안군' },
      { value: '홍성군', label: '홍성군' }
    ]
  },
  {
    value: '대전',
    label: '대전',
    children: [
      { value: '대덕구', label: '대덕구' },
      { value: '동구', label: '동구' },
      { value: '서구', label: '서구' },
      { value: '유성구', label: '유성구' },
      { value: '중구', label: '중구' }
    ]
  },
  {
    value: '세종',
    label: '세종',
    children: [
      { value: '가람동', label: '가람동' },
      { value: '고운동', label: '고운동' },
      { value: '금남면', label: '금남면' },
      { value: '나성동', label: '나성동' },
      { value: '다정동', label: '다정동' },
      { value: '대평동', label: '대평동' },
      { value: '도담동', label: '도담동' },
      { value: '반곡동', label: '반곡동' },
      { value: '보람동', label: '보람동' },
      { value: '부강면', label: '부강면' },
      { value: '새롬동', label: '새롬동' },
      { value: '소담동', label: '소담동' },
      { value: '소정면', label: '소정면' },
      { value: '아름동', label: '아름동' },
      { value: '어진동', label: '어진동' },
      { value: '연기면', label: '연기면' },
      { value: '연동면', label: '연동면' },
      { value: '연서면', label: '연서면' },
      { value: '장군면', label: '장군면' },
      { value: '전동면', label: '전동면' },
      { value: '전의면', label: '전의면' },
      { value: '조치원읍', label: '조치원읍' },
      { value: '종촌동', label: '종촌동' },
      { value: '한솔동', label: '한솔동' }
    ]
  },
  {
    value: '전북',
    label: '전북',
    children: [
      { value: '고창군', label: '고창군' },
      { value: '군산시', label: '군산시' },
      { value: '김제시', label: '김제시' },
      { value: '남원시', label: '남원시' },
      { value: '무주군', label: '무주군' },
      { value: '부안군', label: '부안군' },
      { value: '순창군', label: '순창군' },
      { value: '완주군', label: '완주군' },
      { value: '익산시', label: '익산시' },
      { value: '임실군', label: '임실군' },
      { value: '장수군', label: '장수군' },
      { value: '전주시', label: '전주시' },
      { value: '전주시 덕진구', label: '전주시 덕진구' },
      { value: '전주시 완산구', label: '전주시 완산구' },
      { value: '정읍시', label: '정읍시' },
      { value: '진안군', label: '진안군' }
    ]
  },
  {
    value: '광주',
    label: '광주',
    children: [
      { value: '광산구', label: '광산구' },
      { value: '남구', label: '남구' },
      { value: '동구', label: '동구' },
      { value: '북구', label: '북구' },
      { value: '서구', label: '서구' }
    ]
  },
  {
    value: '전남',
    label: '전남',
    children: [
      { value: '강진군', label: '강진군' },
      { value: '고흥군', label: '고흥군' },
      { value: '곡성군', label: '곡성군' },
      { value: '광양시', label: '광양시' },
      { value: '구례군', label: '구례군' },
      { value: '나주시', label: '나주시' },
      { value: '담양군', label: '담양군' },
      { value: '목포시', label: '목포시' },
      { value: '무안군', label: '무안군' },
      { value: '보성군', label: '보성군' },
      { value: '순천시', label: '순천시' },
      { value: '신안군', label: '신안군' },
      { value: '여수시', label: '여수시' },
      { value: '영광군', label: '영광군' },
      { value: '영암군', label: '영암군' },
      { value: '완도군', label: '완도군' },
      { value: '장성군', label: '장성군' },
      { value: '장흥군', label: '장흥군' },
      { value: '진도군', label: '진도군' },
      { value: '함평군', label: '함평군' },
      { value: '해남군', label: '해남군' },
      { value: '화순군', label: '화순군' }
    ]
  },
  {
    value: '경북',
    label: '경북',
    children: [
      { value: '경산시', label: '경산시' },
      { value: '경주시', label: '경주시' },
      { value: '고령군', label: '고령군' },
      { value: '구미시', label: '구미시' },
      { value: '군위군', label: '군위군' },
      { value: '김천시', label: '김천시' },
      { value: '문경시', label: '문경시' },
      { value: '봉화군', label: '봉화군' },
      { value: '상주시', label: '상주시' },
      { value: '성주군', label: '성주군' },
      { value: '안동시', label: '안동시' },
      { value: '영덕군', label: '영덕군' },
      { value: '영양군', label: '영양군' },
      { value: '영주시', label: '영주시' },
      { value: '영천시', label: '영천시' },
      { value: '예천군', label: '예천군' },
      { value: '울릉군', label: '울릉군' },
      { value: '울진군', label: '울진군' },
      { value: '의성군', label: '의성군' },
      { value: '청도군', label: '청도군' },
      { value: '청송군', label: '청송군' },
      { value: '칠곡군', label: '칠곡군' },
      { value: '포항시', label: '포항시' },
      { value: '포항시 남구', label: '포항시 남구' },
      { value: '포항시 북구', label: '포항시 북구' }
    ]
  },
  {
    value: '대구',
    label: '대구',
    children: [
      { value: '남구', label: '남구' },
      { value: '달서구', label: '달서구' },
      { value: '달성군', label: '달성군' },
      { value: '동구', label: '동구' },
      { value: '북구', label: '북구' },
      { value: '서구', label: '서구' },
      { value: '수성구', label: '수성구' },
      { value: '중구', label: '중구' }
    ]
  },
  {
    value: '경남',
    label: '경남',
    children: [
      { value: '거제시', label: '거제시' },
      { value: '거창군', label: '거창군' },
      { value: '고성군', label: '고성군' },
      { value: '김해시', label: '김해시' },
      { value: '남해군', label: '남해군' },
      { value: '밀양시', label: '밀양시' },
      { value: '사천시', label: '사천시' },
      { value: '산청군', label: '산청군' },
      { value: '양산시', label: '양산시' },
      { value: '의령군', label: '의령군' },
      { value: '진주시', label: '진주시' },
      { value: '창녕군', label: '창녕군' },
      { value: '창원시', label: '창원시' },
      { value: '창원시 마산합포구', label: '창원시 마산합포구' },
      { value: '창원시 마산회원구', label: '창원시 마산회원구' },
      { value: '창원시 성산구', label: '창원시 성산구' },
      { value: '창원시 의창구', label: '창원시 의창구' },
      { value: '창원시 진해구', label: '창원시 진해구' },
      { value: '통영시', label: '통영시' },
      { value: '하동군', label: '하동군' },
      { value: '함안군', label: '함안군' },
      { value: '함양군', label: '함양군' },
      { value: '합천군', label: '합천군' }
    ]
  },
  {
    value: '울산',
    label: '울산',
    children: [
      { value: '남구', label: '남구' },
      { value: '동구', label: '동구' },
      { value: '북구', label: '북구' },
      { value: '울주군', label: '울주군' },
      { value: '중구', label: '중구' }
    ]
  },
  {
    value: '부산',
    label: '부산',
    children: [
      { value: '강서구', label: '강서구' },
      { value: '금정구', label: '금정구' },
      { value: '기장군', label: '기장군' },
      { value: '남구', label: '남구' },
      { value: '동구', label: '동구' },
      { value: '동래구', label: '동래구' },
      { value: '부산진구', label: '부산진구' },
      { value: '북구', label: '북구' },
      { value: '사상구', label: '사상구' },
      { value: '사하구', label: '사하구' },
      { value: '서구', label: '서구' },
      { value: '수영구', label: '수영구' },
      { value: '연제구', label: '연제구' },
      { value: '영도구', label: '영도구' },
      { value: '중구', label: '중구' },
      { value: '해운대구', label: '해운대구' }
    ]
  },
  {
    value: '제주',
    label: '제주',
    children: [
      { value: '제주시', label: '제주시' },
      { value: '서귀포시', label: '서귀포시' }
    ]
  }
]

export const interests: { [key: string]: string[] } = {
  개발: [
    '.NET',
    'C/C++',
    'Node.js',
    'PHP',
    'iOS',
    'UI/UX Design',
    'Ruby on rails',
    'Machine Learning',
    'Security',
    'Big Data',
    'Server',
    'Android',
    'Algorithms',
    '영상/음성처리',
    'Web',
    'Java',
    'Python',
    'Publisher',
    'Front-End'
  ],
  어학: [
    'BCT',
    'HSK',
    'JLPT',
    'JPT',
    'Opic',
    'TOEFL',
    'TOEIC',
    'TOEIC Speaking'
  ],
  취업: ['자소서', 'NCS', '인적성', '면접']
}

export const interestsForForm: CascaderOptionType[] = [
  {
    value: '개발',
    label: '개발',
    children: [
      { value: '.NET', label: '.NET' },
      { value: 'C/C++', label: 'C/C++' },
      { value: 'Node.js', label: 'Node.js' },
      { value: 'PHP', label: 'PHP' },
      { value: 'iOS', label: 'iOS' },
      { value: 'UI/UX Design', label: 'UI/UX Design' },
      { value: 'Ruby on rails', label: 'Ruby on rails' },
      { value: 'Machine Learning', label: 'Machine Learning' },
      { value: 'Security', label: 'Security' },
      { value: 'Big Data', label: 'Big Data' },
      { value: 'Server', label: 'Server' },
      { value: 'Android', label: 'Android' },
      { value: 'Algorithms', label: 'Algorithms' },
      { value: '영상/음성처리', label: '영상/음성처리' },
      { value: 'Web', label: 'Web' },
      { value: 'Java', label: 'Java' },
      { value: 'Python', label: 'Python' },
      { value: 'Publisher', label: 'Publisher' },
      { value: 'Front-End', label: 'Front-End' }
    ]
  },
  {
    value: '어학',
    label: '어학',
    children: [
      { value: 'BCT', label: 'BCT' },
      { value: 'HSK', label: 'HSK' },
      { value: 'JLPT', label: 'JLPT' },
      { value: 'JPT', label: 'JPT' },
      { value: 'Opic', label: 'Opic' },
      { value: 'TOEFL', label: 'TOEFL' },
      { value: 'TOEIC', label: 'TOEIC' },
      { value: 'TOEIC Speaking', label: 'TOEIC Speaking' }
    ]
  },
  {
    value: '취업',
    label: '취업',
    children: [
      { value: '자소서', label: '자소서' },
      { value: 'NCS', label: 'NCS' },
      { value: '인적성', label: '인적성' },
      { value: '면접', label: '면접' }
    ]
  }
]

const UserStore = observable<UserStoreType>({
  isLoggingIn: false,
  token: null,
  data: {} as UserInfoType,
  //{id, pw, email, phoneNum, nickname, gender, introduction,
  //city, town, evaluation, profilePhotoDir, socialLogin, interestDTOList, ledStudyList, joinedStudyList}

  async signup(data: SignupData) {
    this.isLoggingIn = true
    try {
      const res = await userAPI.register(data)
      const token = res.headers.token
      sessionStorage.setItem('token', token)
      this.token = token
      this.isLoggingIn = false
    } catch (error) {
      alert('로그인에 실패했습니다')
      this.isLoggingIn = false
    }
  },

  // async mypage() {
  //   this.isLoggingIn = true
  //   try {
  //     const res = await userDetail.userInfo()
  //     this.isLoggingIn = false
  //     //this.data = res.data.value.nickname
  //     this.data = res.data
  //     alert(this.data)
  //   } catch (error) {
  //     alert('사용자 정보를 가져오지 못했습니다.')
  //     this.isLoggingIn = false
  //   }
  // },

  async login(data: LoginData) {
    this.isLoggingIn = true
    try {
      const res = await userAPI.login(data)
      const token = res.headers['jwt-auth-token']
      sessionStorage.setItem('token', token)
      this.token = token
      this.isLoggingIn = false
    } catch (error) {
      alert('로그인에 실패했습니다')
      this.isLoggingIn = false
    }
  },

  logout() {
    sessionStorage.removeItem('token')
    this.token = null
    StudyStore.myStudy = []
  },

  edit() {},

  signout() {},

  async getMyInfoDetails() {
    try {
      const res = await userAPI.getMyInfoDetailsForModify()
    } catch (e) {
      alert('정보 조회에 실패했습니다.')
    }
  }
})

export default UserStore
