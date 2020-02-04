package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.entity.UserInterest;
import com.ssafy.sval.model.entity.UserInterestId;
import org.hibernate.annotations.OnDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserInterestRepository extends JpaRepository<UserInterest, UserInterestId> {

//    @Modifying
//    @Query("delete from UserInterest ui where ui.user = :user ")
//    void deleteUserInterestByUserId(@Param("user") User user);
    void deleteAllByUserId(Integer id);
    // @Query("UPDATE USER SET PROFILE_PHOTO_DIR=:path WHERE ID=:id);
}