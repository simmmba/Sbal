package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.StudyMember;
import com.ssafy.sval.model.repository.StudyMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyMemberService {
    @Autowired
    StudyMemberRepository smRepo;

    public StudyMember insert(StudyMember studyMember) {
        return smRepo.save(studyMember);
    }
}
