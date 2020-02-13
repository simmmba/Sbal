import React, {useEffect, useState} from 'react'
import StudyList from '../components/studyList/StudyList'
// import StudyListComponent from "../components/studyList/StudyListComponent";
// import StudyStore from "../stores/StudyStore";
import {getStudyList} from '../lib/api/study'

const StudyListPage = () => {
    const [studyList, setStudyList] = useState([]);
    useEffect(
        () => {
            getStudyList().then(res => {
                console.log(res.data.value)
                setStudyList(res.data.value);
            })
        }
    , [])
    return (
        <div>
            {
                // studyList.map(study => (
                //     <StudyListComponent study={study}/>
                // ))
                <StudyList studyList={studyList}/>
            }
        </div>
    )
}

export default StudyListPage
