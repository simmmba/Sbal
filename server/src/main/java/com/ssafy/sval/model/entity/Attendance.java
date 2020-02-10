package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.AttendacneDTO;
import com.ssafy.sval.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(name = "ATTENDANCE")
@IdClass(AttendanceId.class)
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Attendance {
    @Id @ManyToOne @JoinColumn(name = "SCHEDULE_ID")
    private StudySchedule schedule;

    @Id @ManyToOne @JoinColumn(name = "MEMBER_ID")
    private User user;

    private Integer state;

    public AttendacneDTO toDTO() {
        UserDTO userDTO = new UserDTO(user.getId(), user.getNickname());
        return new AttendacneDTO(null, userDTO, state);
    }
}
