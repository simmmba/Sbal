package com.ssafy.sval.model.entity;

import java.io.Serializable;
import lombok.*;


@NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class UserInterestId implements Serializable {
    private Integer user;
    private String lCategory;
    private String sCategory;
}
