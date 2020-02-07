package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.Attendance;
import com.ssafy.sval.model.entity.AttendanceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, AttendanceId> {

}
