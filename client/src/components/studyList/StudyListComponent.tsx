import React from 'react';
import {Study} from './StudyTypes'
import {WrapperDiv} from "./StudyStyled";

function studyListComponent(studyFromParent: Study, index: number) {
    return (
        <WrapperDiv>
            <div>{studyFromParent.id}</div>
        </WrapperDiv>
    )
}

export default studyListComponent;