package com.ssafy.sval.model.service;

import com.ssafy.sval.model.dto.StudyDTO;
import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.dto.UserDTO;
import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.repository.StudyMemberRepository;
import com.ssafy.sval.model.repository.StudyRepository;
import com.ssafy.sval.model.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CommonService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StudyRepository studyRepository;
    @Autowired
    StudyMemberRepository studyMemberRepository;

    public UserDTO manufactureMyInfo(UserDTO user) {
        List<StudyDTO> ledStudyList = user.getLedStudyList();
        for (StudyDTO s : ledStudyList)
            s.setJoinedMemberCount(studyMemberRepository.countStudyMemberByStudyIdAndState(s.getId(), 1));
        for (StudyMemberDTO sm : user.getJoinedStudyList()) {
            StudyDTO s = sm.getStudy();
            s.setJoinedMemberCount(studyMemberRepository.countStudyMemberByStudyIdAndState(s.getId(), 1));
        }
        return user;
    }

    @Transactional
    public Map<String, Object> manufactureMain(UserDTO user) {
        Map<String, Object> mainInfo = this.manufactureMain();
        List<StudyMemberDTO> joinedStudyList = user.getJoinedStudyList();
        if(joinedStudyList != null) {
            for (StudyMemberDTO sm : joinedStudyList) {
                StudyDTO s = sm.getStudy();
                s.setJoinedMemberCount(studyMemberRepository.countStudyMemberByStudyIdAndState(s.getId(), 1));
            }
        }
        mainInfo.put("loginUser", user);

        return mainInfo;
    }

    @Transactional
    public Map<String, Object> manufactureMain() {
        Map<String, Object> mainInfo = new HashMap<>();

        List<Study> recentlyEnrolledStudies = studyRepository.findTop5ByStateOrderByEnrollDateDesc(0);
        List<StudyDTO> recentlyEnrolled = new ArrayList<>();
        for (Study s : recentlyEnrolledStudies) {
            StudyDTO sDTO = s.mainPageDTO();
            sDTO.setJoinedMemberCount(studyMemberRepository.countStudyMemberByStudyIdAndState(sDTO.getId(), 1));
            recentlyEnrolled.add(sDTO);
        } mainInfo.put("recentlyEnrolled", recentlyEnrolled);

        List<Study> mostHitsStudies = studyRepository.findTop5ByStateOrderByHitsDesc(0);
        List<StudyDTO> mostHits = new ArrayList<>();
        for (Study s : mostHitsStudies) {
            StudyDTO sDTO = s.mainPageDTO();
            sDTO.setJoinedMemberCount(studyMemberRepository.countStudyMemberByStudyIdAndState(sDTO.getId(), 1));
            mostHits.add(sDTO);
        } mainInfo.put("mostHits", mostHits);

        return mainInfo;
    }
}
