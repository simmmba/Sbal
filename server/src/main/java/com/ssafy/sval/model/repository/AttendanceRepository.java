package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.Attendance;
import com.ssafy.sval.model.entity.AttendanceId;
import com.ssafy.sval.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, AttendanceId> {
    List<Attendance> findAllByUser(User user);
}
