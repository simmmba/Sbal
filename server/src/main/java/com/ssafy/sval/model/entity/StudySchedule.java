package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.AttendacneDTO;
import com.ssafy.sval.model.dto.StudyScheduleDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "STUDY_SCHEDULE")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class StudySchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne @JoinColumn(name = "STUDY_ID")
    private Study study;

    @OneToMany(mappedBy = "schedule")
    private List<Attendance> attendanceList;

    private String subject;
    private String homework;
    private String meetDate;
    private String location;

    public StudyScheduleDTO toDTO() {
        List<AttendacneDTO> attendanceDTOList = null;
        if(attendanceList!=null) {
            attendanceDTOList = new ArrayList<>();
            for (Attendance a : attendanceList) attendanceDTOList.add(a.toDTO());
        }
        return new StudyScheduleDTO(id, null, attendanceDTOList, subject, homework, meetDate, location);
    }
}
