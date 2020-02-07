package com.ssafy.sval.model.dto;

import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.entity.StudySchedule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor
public class StudyScheduleDTO {
    private Integer id;
    private StudyDTO studyDTO;
    private List<AttendacneDTO> attendanceDTOList;
    private String subject;
    private String homework;
    private String meetDate;
    private String location;

    public StudySchedule toEntity() {
        Study study = new Study();
        study.setId(studyDTO.getId());
        return new StudySchedule(id, study, null, subject, homework, meetDate, location);
    }
}
