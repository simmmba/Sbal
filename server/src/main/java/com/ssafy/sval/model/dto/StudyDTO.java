package com.ssafy.sval.model.dto;

import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor
public class StudyDTO {
    private Integer id;
    private String title;
    private String contents;
    private UserDTO leader;
    private String lCategory;
    private String sCategory;
    private String city;
    private String town;
    private Integer state;
    private Integer maxParticipants;
    private Integer hits;
    private Boolean isOnline;
    private Integer monthOrWeek;
    private Integer frequency;
    private Integer weekdayOrWeekend;
    private Integer timeslot;
    private Double evaluationLimit;
    private String enrollDate;
    private String startDate;
    private String endDate;
    private Integer joinedMemberCount;
    private List<StudyMemberDTO> studyMemberDTOList;

    public Study insertOrUpdateEntity(int leaderId) {
        User leaderEntity = new User();
        leaderEntity.setId(leaderId);
        Study study = new Study(id, title, contents, leaderEntity, lCategory, sCategory, city, town, state,
                maxParticipants, hits, isOnline, monthOrWeek, frequency, weekdayOrWeekend,
                timeslot, evaluationLimit, enrollDate, startDate, endDate, null);
        return study;
    }
}
