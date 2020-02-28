import React from 'react'
import StudyDetails from '../components/studyDetail/StudyDetails'
import StudyDetailStore from '../stores/StudyDetailStore'
import { useParams } from 'react-router'

const StudyDetailPage = () => {
  const { id } = useParams()
  StudyDetailStore.studyId = Number(id)

  return (
    <>
      <StudyDetails />
    </>
  )
}

export default StudyDetailPage
