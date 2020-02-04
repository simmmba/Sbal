package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.UserInterestDTO;
import lombok.*;

import javax.persistence.*;

@Entity @Table(name ="USER_INTEREST")
@IdClass(UserInterestId.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UserInterest {

    @Id @ManyToOne @JoinColumn(name = "USER_ID")
    private User user;

    @Id
    private String lCategory;

    @Id
    private String sCategory;

    public UserInterestDTO toDTO() {
        return new UserInterestDTO(lCategory, sCategory);
    }
}