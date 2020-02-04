package com.ssafy.sval.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class StudyMemberDTO {
    private StudyDTO study;
    private UserDTO user;
    private int state;

    public StudyMemberDTO(StudyDTO study, int state) {
        this.study = study;
        this.state = state;
    }
    public StudyMemberDTO(UserDTO user, int state) {
        this.user = user;
        this.state = state;
    }
}