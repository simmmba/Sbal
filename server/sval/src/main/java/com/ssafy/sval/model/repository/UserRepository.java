package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsUserByEmail(String email);
    boolean existsUserByNickname(String nickname);
    User findUserByEmail(String email);
}
