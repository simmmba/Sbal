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
        if(interestList != null) for (UserInterest ui : interestList) userInterestDTOList.add(ui.toDTO());
        user.setInterestDTOList(userInterestDTOList);

        List<StudyMemberDTO> joinedStudyDTOList = new ArrayList<>();
        if(joinedStudyList != null) {
            for (StudyMember sm : joinedStudyList)
                if(sm.state==1) joinedStudyDTOList.add(sm.toStudiesDTO());
        }
        user.setJoinedStudyList(joinedStudyDTOList);
        return user;
    }

    public UserDTO updatePageDTO() {
        UserDTO user = new UserDTO(id, null, email, phoneNum, nickname, gender, introduction, city, town,
                evaluation, profilePhotoDir, socialLogin, null, null, null);
        List<UserInterestDTO> userInterestDTOList = new ArrayList<>();
        if(interestList != null) for (UserInterest ui : interestList) userInterestDTOList.add(ui.toDTO());
        user.setInterestDTOList(userInterestDTOList);
        return user;
    }

    public UserDTO myPageDTO() {
        UserDTO user = this.updatePageDTO();

        if(ledStudyList != null && joinedStudyList != null) {
            for (Study s : ledStudyList) {
                int studyId = s.getId();
                for (StudyMember sm : joinedStudyList) {
                    if (sm.getStudy().getId() == studyId) {
                        joinedStudyList.remove(sm);
                        break;
                    }
                }
            }
        }

        List<StudyDTO> ledStudyDTOList = new ArrayList<>();
        if(ledStudyList != null) for (Study s : ledStudyList) ledStudyDTOList.add(s.myPageDTO());
        user.setLedStudyList(ledStudyDTOList);

        List<StudyMemberDTO> joinedStudyDTOList = new ArrayList<>();
        if(joinedStudyList != null) for (StudyMember sm : joinedStudyList) joinedStudyDTOList.add(sm.myPageDTO());
        user.setJoinedStudyList(joinedStudyDTOList);

        return user;
    }
}
