package com.ssafy.sval.model.dto;

import com.ssafy.sval.model.entity.Attendance;
import com.ssafy.sval.model.entity.StudySchedule;
import com.ssafy.sval.model.entity.User;
import lombok.*;

@Data
@AllArgsConstructor @NoArgsConstructor
public class AttendacneDTO {
    StudyScheduleDTO schedule;
    UserDTO user;
    Integer state;

    public Attendance toEntity() {
        StudySchedule schedule  = new StudySchedule();
        schedule.setId(this.schedule.getId());
        User user = new User();
        user.setId(this.user.getId());
        return new Attendance(schedule, user, state);
    }
}
