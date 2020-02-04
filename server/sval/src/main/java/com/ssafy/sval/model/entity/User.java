package com.ssafy.sval.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor @NoArgsConstructor
//@Getter @Setter
@Entity @Table(name="USER")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pw;
    private String email;
    private String phoneNum;
    private String nickname;
    private int gender;
    private String introduction;
    private String city;
    private String town;
    private Double evaluation;
    private String profilePhotoDir;
    private String socialLogin;


    @OneToMany(mappedBy = "user" )
    @JsonManagedReference
    private List<UserInterest> interestList = new ArrayList<>();

    public void addInterest(UserInterest interest){
        interest.setUser(this);
        this.interestList.add(interest);
    }
}


