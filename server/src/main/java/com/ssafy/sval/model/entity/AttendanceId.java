package com.ssafy.sval.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class AttendanceId implements Serializable {
    private Integer schedule;
    private Integer user;
}
