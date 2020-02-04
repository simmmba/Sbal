package com.ssafy.sval.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name ="user_interest")
@IdClass(UserInterestId.class)
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class UserInterest {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Id
    private String l_category;

    @Id
    private String s_category;

}
