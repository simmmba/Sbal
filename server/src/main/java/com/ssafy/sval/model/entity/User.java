package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.StudyDTO;
import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.dto.UserDTO;
import com.ssafy.sval.model.dto.UserInterestDTO;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name="USER")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String pw;
    private String email;
    private String phoneNum;
    private String nickname;
    private Integer gender;
    private String introduction;
    private String city;
    private String town;
    private Double evaluation;
    private String profilePhotoDir;
    private String socialLogin;

    @OneToMany(mappedBy = "user")
    private List<UserInterest> interestList;

    @OneToMany(mappedBy = "leader")
    private List<Study> ledStudyList;

    @OneToMany(mappedBy = "user")
    private List<StudyMember> joinedStudyList;

    public UserDTO mainPageDTO() {
        UserDTO user = new UserDTO(id, nickname);
        List<UserInterestDTO> userInterestDTOList = new ArrayList<>();
        for (UserInterest ui : interestList) userInterestDTOList.add(ui.toDTO());
        user.setInterestDTOList(userInterestDTOList);

        List<StudyDTO> ledStudyDTOList = new ArrayList<>();
        for (Study s : ledStudyList) ledStudyDTOList.add(s.toDTO());
        user.setLedStudyList(ledStudyDTOList);

        List<StudyMemberDTO> joinedStudyDTOList = new ArrayList<>();
        for (StudyMember sm : joinedStudyList) joinedStudyDTOList.add(sm.toStudiesDTO());
        user.setJoinedStudyList(joinedStudyDTOList);

        return user;
    }

    public UserDTO updatePageDTO() {
        UserDTO user = new UserDTO(id, null, email, phoneNum, nickname, gender, introduction, city, town,
                evaluation, profilePhotoDir, socialLogin, null, null, null);
        List<UserInterestDTO> userInterestDTOList = new ArrayList<>();
        for (UserInterest ui : interestList) userInterestDTOList.add(ui.toDTO());
        user.setInterestDTOList(userInterestDTOList);
        return user;
    }

}
