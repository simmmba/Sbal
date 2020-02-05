package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.dto.UserDTO;
import lombok.*;

import javax.persistence.*;

@Entity @Table(name = "STUDY_MEMBER")
@IdClass(StudyMemberId.class)
@NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class StudyMember {


    @Id @ManyToOne @JoinColumn(name="study_id")
    Study study;
    @Id
    @ManyToOne @JoinColumn(name = "user_id")
    User user;
    Integer state;

    public StudyMemberDTO toStudiesDTO() {
        return new StudyMemberDTO(study.toDTO(), state);
    }
    public StudyMemberDTO toMemberDTO() {
        return new StudyMemberDTO(new UserDTO(user.getId(), user.getNickname()), state);
    }
    public StudyMemberDTO myPageDTO() {
        return new StudyMemberDTO(study.myPageDTO(), state);
    }
}
