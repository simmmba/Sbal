package com.ssafy.sval.model.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.ssafy.sval.model.dto.StudyDTO;
import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.dto.UserDTO;
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

    public StudyDTO toDTO() {
        StudyDTO studyDTO = new StudyDTO(id, title, contents, new UserDTO(leader.getId(), leader.getNickname()), lCategory, sCategory,
                city, town, state, maxParticipants, hits, isOnline, monthOrWeek, frequency,
                weekdayOrWeekend, timeslot, evaluationLimit, enrollDate, startDate, endDate, null);
        List<StudyMemberDTO> memberDTOList = new ArrayList<>();
        for (StudyMember sm : memberList) memberDTOList.add(sm.toMemberDTO());
        studyDTO.setStudyMemberDTOList(memberDTOList);
        return studyDTO;
    }
}
