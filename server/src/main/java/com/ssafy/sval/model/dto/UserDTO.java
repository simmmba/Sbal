package com.ssafy.sval.model.dto;

import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.entity.UserInterest;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor
public class UserDTO {

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

    private List<UserInterestDTO> interestDTOList;
    private List<StudyDTO> ledStudyList;
    private List<StudyMemberDTO> joinedStudyList;


    public UserDTO(Integer id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
    public User insertOrUpdateEntity(String password) {
        User updatedUser = new User(id, password, email, phoneNum, nickname, gender, introduction,
                city, town, evaluation, profilePhotoDir, socialLogin, null, null, null);
        List<UserInterest> interestEntityList = null;
        if(interestDTOList != null) {
            interestEntityList = new ArrayList<>();
            for(UserInterestDTO uiDTO : interestDTOList)
                interestEntityList.add(new UserInterest(updatedUser, uiDTO.getLCategory(), uiDTO.getSCategory()));
        }
        updatedUser.setInterestList(interestEntityList);
        return updatedUser;
    }
}

