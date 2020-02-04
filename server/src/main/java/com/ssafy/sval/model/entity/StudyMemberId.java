package com.ssafy.sval.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class StudyMemberId implements Serializable {
    private Integer study;
    private Integer user;
}
