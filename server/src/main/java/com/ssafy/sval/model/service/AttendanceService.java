package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.Attendance;
import com.ssafy.sval.model.repository.AttendanceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AttendanceService {
    @Autowired
    AttendanceRepository attendanceRepository;

    public void update(Attendance attendance) {
        attendanceRepository.save(attendance);
    }
}
