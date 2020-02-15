package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "STUDY")
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String contents;
    @ManyToOne
    @JoinColumn(name = "leader_id")
    private User leader;
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

    @OneToMany(mappedBy = "study")
    private List<StudyMember> memberList;

    @OneToMany(mappedBy = "study")
    private List<StudySchedule> scheduleList;

    @OneToMany(mappedBy = "study")
    private List<Notice> noticeList;

    public StudyDTO toDTO() {
        StudyDTO studyDTO = new StudyDTO(id, title, contents, new UserDTO(leader.getId(), leader.getNickname()),
                lCategory, sCategory, city, town, state, maxParticipants, hits, isOnline, monthOrWeek,
                frequency, weekdayOrWeekend, timeslot, evaluationLimit, enrollDate, startDate, endDate,
                null, null, null,null);

        if(memberList != null) {
            List<StudyMemberDTO> memberDTOList = new ArrayList<>();
            for (StudyMember sm : memberList) memberDTOList.add(sm.toMemberDTO());
            studyDTO.setStudyMemberDTOList(memberDTOList);
        }

        if(scheduleList!=null) {
            List<StudyScheduleDTO> scheduleDTOList = new ArrayList<>();
            for(StudySchedule ss : scheduleList) scheduleDTOList.add(ss.toDTO());
            studyDTO.setStudyScheduleDTOList(scheduleDTOList);
        }

        if(noticeList != null){
            List<NoticeDTO> noticeDTOList = new ArrayList<>();
            for(Notice n : noticeList) noticeDTOList.add(n.toDTO());
            studyDTO.setNoticeDTOList(noticeDTOList);
        }

        return studyDTO;
    }

    public StudyDTO mainPageDTO() {
        StudyDTO studyDTO = new StudyDTO(id, title, null, new UserDTO(leader.getId(), leader.getNickname()),
<<<<<<< HEAD
                lCategory, sCategory, city, town, state, maxParticipants, hits, isOnline, monthOrWeek,
                frequency, weekdayOrWeekend, timeslot, evaluationLimit, enrollDate,
                startDate, endDate, null, null, null);
=======
                lCategory, sCategory, city, town, state, maxParticipants, hits, isOnline, null,
                null, null, null, evaluationLimit, enrollDate,
                null, null, null, null, null,null);
>>>>>>> study-detail

        return studyDTO;
    }

    public StudyDTO myPageDTO() {
        StudyDTO studyDTO = new StudyDTO(id, title, null, null, null, null,
                null, null, state, maxParticipants, null, isOnline, null, null,
                null, null, null, null, startDate, endDate,
                null, null, null,null);

        return studyDTO;
    }
}
