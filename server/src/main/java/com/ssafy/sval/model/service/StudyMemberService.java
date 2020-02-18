package com.ssafy.sval.model.service;

import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.entity.StudyMember;
import com.ssafy.sval.model.entity.StudyMemberId;
import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.repository.StudyMemberRepository;
import com.ssafy.sval.model.repository.StudyRepository;
import com.ssafy.sval.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class StudyMemberService {
    @Autowired
    StudyMemberRepository studyMemberRepository;
    @Autowired
    StudyRepository studyRepository;
    @Autowired
    UserRepository userRepository;

    @Transactional
    public boolean insert(Integer studyId, Integer userId) {
        Study study = studyRepository.findById(studyId).get();
        User user = userRepository.findById(userId).get();
        if(studyMemberRepository.findById(new StudyMemberId(studyId, userId)).isPresent()) {
            return false;
        } else {
            StudyMember studyMember = new StudyMember(study, user, 0);
            studyMemberRepository.save(studyMember);
            return true;
        }
    }

    @Transactional
    public boolean update(StudyMemberDTO studyMemberDTO, Integer loginUserId) {
        int studyId = studyMemberDTO.getStudy().getId();
        int userId = studyMemberDTO.getUser().getId();
        StudyMember studyMember = studyMemberRepository.findById(new StudyMemberId(studyId, userId)).get();
        if(studyMember.getStudy().getLeader().getId()!= loginUserId) {
            return false;
        } else {
            studyMember.setState(studyMemberDTO.getState());
            if(studyMember.getState()==3) studyMemberRepository.delete(studyMember);
            else studyMemberRepository.save(studyMember);
            return true;
        }
    }

    @Transactional
    public void delete(Integer studyId, Integer loginUserId) {
        StudyMember studyMember = studyMemberRepository.findById(new StudyMemberId(studyId, loginUserId)).get();
        studyMemberRepository.delete(studyMember);
    }

    public int getjoinedMemeberCount(Integer studyId) {
        return studyMemberRepository.countStudyMemberByStudyIdAndState(studyId, 1);
    }
}
