package com.ssafy.sval.model.service;

import com.ssafy.sval.exceptions.InvalidUserInfoException;
import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.entity.UserInterest;
import com.ssafy.sval.model.repository.UserInterestRepository;
import com.ssafy.sval.model.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



import javax.transaction.Transactional;
import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository uRepo;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private UserInterestRepository interestRepo;

    @Transactional
    public Map<String, String> insert(User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPw(passwordEncoder.encode(user.getPw()));
        List<UserInterest> userInterestList = user.getInterestList();
        user.setInterestList(new ArrayList<>());
        user = uRepo.save(user);

        for(int i=0; i<userInterestList.size(); i++){
            UserInterest interest = userInterestList.get(i);
            user.addInterest(interest);

            interestRepo.save(interest);
        }

        Map<String, String> map = new HashMap<String, String>();
        map.put("result", "success");
        return map;
    }


    public User signup(User user) {
        user.setPw(passwordEncoder.encode(user.getPw()));
        return uRepo.save(user);
    }

    public boolean isExistEmail(String email) {
        return uRepo.existsUserByEmail(email);
    }

    public boolean isExistNickname(String nickname) {
        return uRepo.existsUserByNickname(nickname);
    }

    public User signIn(String email, String pw) {
        if (!uRepo.existsUserByEmail(email)) {
            throw new InvalidUserInfoException("로그인 정보를 확인하세요.");
        } else {
            User user = uRepo.findUserByEmail(email);
            if (passwordEncoder.matches(pw, user.getPw())) {
                // 정상 처리
                return user;
            } else {
                // 비밀번호 매치 실패
                throw new InvalidUserInfoException("로그인 정보를 확인하세요.");
            }
        }
    }

    public List<User> findAll() {
        return uRepo.findAll();
    }
}
