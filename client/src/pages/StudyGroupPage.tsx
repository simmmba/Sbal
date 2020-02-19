import React from 'react'
import StudyGroupMain from '../components/studyGroup/StudyGroupMain'
import { useParams } from 'react-router'
const StudyGroupPage = () => {
  const { id } = useParams()
  return (
    <>
      <StudyGroupMain id={Number(id)} />
    </>
  )
}

export default StudyGroupPage
