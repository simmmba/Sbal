package com.ssafy.sval.model.service;

import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.entity.*;
import com.ssafy.sval.model.repository.AttendanceRepository;
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
    @Autowired
    AttendanceRepository attendanceRepository;

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
            if(studyMember.getState()==3) delete(studyMember.getStudy().getId(),studyMember.getUser().getId());
            else studyMemberRepository.save(studyMember);
            return true;
        }
    }

    @Transactional
    public void delete(Integer studyId, Integer loginUserId) {
        StudyMember studyMember = studyMemberRepository.findById(new StudyMemberId(studyId, loginUserId)).get();
        Study study = studyRepository.findById(studyId).get();
        if(study.getScheduleList() != null){
            for(int i=0; i<study.getScheduleList().size(); i++){
                if(study.getScheduleList().get(i).getAttendanceList()!=null){
                    for(int j=0; j<study.getScheduleList().get(i).getAttendanceList().size(); j++){
                        if(study.getScheduleList().get(i).getAttendanceList().get(j).getUser().getId()==loginUserId){
                            if(study.getScheduleList().get(i).getAttendanceList().get(j).getState()==0){
                                attendanceRepository.delete(study.getScheduleList().get(i).getAttendanceList().get(j));
                            }
                        }
                    }
                }
            }
        }
        studyMemberRepository.delete(studyMember);
    }

    public int getjoinedMemeberCount(Integer studyId) {
        return studyMemberRepository.countStudyMemberByStudyIdAndState(studyId, 1);
    }
}
