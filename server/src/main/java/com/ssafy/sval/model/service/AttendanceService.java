package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.Attendance;
import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.repository.AttendanceRepository;
import com.ssafy.sval.model.repository.StudyScheduleRepository;
import com.ssafy.sval.model.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AttendanceService {
    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    StudyScheduleRepository scheduleRepository;
    @Autowired
    UserRepository userRepository;

    public void update(Attendance attendance) {
        // 1. attendance 테이블에서 user id 가 일치하는 모든 칼럼을 가져온다.
        attendance = attendanceRepository.save(attendance);
        User targetUser = attendance.getUser();
        List<Attendance> attendanceList = attendanceRepository.findAllByUser(targetUser);

        int sum = 100;
        int cnt = 1;
        for (Attendance a : attendanceList) {
            if(a.getState()!=0) {
                sum += a.getState();
                cnt++;
            }
        }
        double avg = (double) sum / cnt;
        if(cnt == 1) avg = 100.0;
        targetUser.setEvaluation((double) Math.round(avg));
        userRepository.save(targetUser);
    }
}
