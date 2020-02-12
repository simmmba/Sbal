import React, {useEffect, useState} from 'react'
// import StudyList from '../components/studyList/StudyList'
import StudyListComponent from "../components/studyList/StudyListComponent";
import StudyStore from "../stores/StudyStore";
import {getStudyList} from '../lib/api/study'

const StudyListPage = () => {
    const [studyList, setStudyList] = useState([]);
    useEffect(
        () => {
            getStudyList().then(res => {
                setStudyList(res.data.value);
            })
        }
    )
    return (
        <div>
            {
                studyList.map(study => (
                    <StudyListComponent studyFromParent={study}/>
                ))
            }
            {/*<StudyList/>*/}
        </div>
    )
}

export default StudyListPage
