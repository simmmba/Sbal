package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.StudyMember;
import com.ssafy.sval.model.entity.StudyMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMemberRepository extends JpaRepository<StudyMember, StudyMemberId> {
    int countStudyMemberByStudyIdAndState(Integer studyId, Integer State);
}
