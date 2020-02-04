package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.UserInterest;
import com.ssafy.sval.model.entity.UserInterestId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInterestRepository extends JpaRepository<UserInterest, UserInterestId> {
}
