package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.entity.StudyMember;
import com.ssafy.sval.model.repository.StudyMemberRepository;
import com.ssafy.sval.model.repository.StudyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class StudyService {
    @Autowired
    StudyRepository sRepo;
    @Autowired
    StudyMemberRepository smRepo;

    @Transactional
    public Study insert(Study study) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        study.setEnrollDate(sdf.format(new Date(System.currentTimeMillis())));
        Study createdStudy = sRepo.save(study);
        StudyMember leader = smRepo.save(new StudyMember(createdStudy, createdStudy.getLeader(), 1));
        createdStudy.setMemberList(new ArrayList<>());
        createdStudy.getMemberList().add(leader);
        return createdStudy;
    }

    public Study update(Study study) {
        return sRepo.save(study);
    }

    public Study getStudyDetail(Integer id) {
        Study study = sRepo.findById(id).get();
        study.setHits(study.getHits()+1);
        study = sRepo.save(study);
        return study;
    }

    public List<Study> getStudiesInRecruitment() {
        return sRepo.findStudiesByStateOrderByEnrollDateDesc(0);
    }

    public void delete(Integer id) {
        sRepo.deleteById(id);
    }

    public Study findById(Integer id) {
        return sRepo.findById(id).get();
    }
}
