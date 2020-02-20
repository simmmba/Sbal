import React from 'react';
import {Study} from './StudyTypes'
import {WrapperDiv} from "./StudyStyled";

function studyListComponent({study}: {study: Study}) {
    return (
        <WrapperDiv>
            <div>{study.id}</div>
        </WrapperDiv>
    )
}

export default studyListComponent;