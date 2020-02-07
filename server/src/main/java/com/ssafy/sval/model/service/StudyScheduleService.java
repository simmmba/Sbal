package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.Attendance;
import com.ssafy.sval.model.entity.StudyMember;
import com.ssafy.sval.model.entity.StudySchedule;
import com.ssafy.sval.model.repository.AttendanceRepository;
import com.ssafy.sval.model.repository.StudyMemberRepository;
import com.ssafy.sval.model.repository.StudyScheduleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class StudyScheduleService {
    @Autowired
    StudyScheduleRepository studyScheduleRepository;
    @Autowired
    StudyMemberRepository studyMemberRepository;
    @Autowired
    AttendanceRepository attendanceRepository;

    public StudySchedule find(Integer id) {
        return studyScheduleRepository.findById(id).get();
    }
    @Transactional
    public StudySchedule insert(StudySchedule schedule) {
        StudySchedule createdSchedule = update(schedule);
        attendanceRepository.saveAll(createdSchedule.getAttendanceList());
        return createdSchedule;
    }

    @Transactional
    public StudySchedule update(StudySchedule schedule) {
        StudySchedule updatedSchedule = studyScheduleRepository.save(schedule);
        List<StudyMember> studyMemberList = studyMemberRepository.findStudyMembersByStudyIdAndState(updatedSchedule.getStudy().getId(), 1);
        updatedSchedule.setAttendanceList(new ArrayList<>());
        List<Attendance> attendanceList = updatedSchedule.getAttendanceList();
        for (StudyMember sm : studyMemberList) attendanceList.add(new Attendance(updatedSchedule, sm.getUser(), 0));

        return updatedSchedule;
    }

    public void delete(Integer scheduleId) {
        studyScheduleRepository.deleteById(scheduleId);
    }
}
