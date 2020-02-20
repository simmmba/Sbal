package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.entity.UserInterest;
import com.ssafy.sval.model.repository.UserInterestRepository;
import com.ssafy.sval.model.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository uRepo;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private UserInterestRepository interestRepo;

    @Transactional
    public User signUp(User user) {
        List<UserInterest> userInterestList = user.getInterestList();
        user.setInterestList(null);

        user.setPw(passwordEncoder.encode(user.getPw()));
        user.setEvaluation(100.0);
        user.setProfilePhotoDir("default.png");
        //user.setSocialLogin(null);
        user = uRepo.save(user);

        if(userInterestList!=null) {
            for (UserInterest ui : userInterestList) ui.setUser(user);
            interestRepo.saveAll(userInterestList);
        }
        user.setInterestList(userInterestList);
        return user;
    }

    public boolean isExistEmail(String email) {
        return !uRepo.existsUserByEmail(email);
    }

    public boolean isExistNickname(String nickname) {
        return !uRepo.existsUserByNickname(nickname);
    }

    public boolean isExistSocialLogin(String socialLogin){
        return uRepo.existsUserBySocialLogin(socialLogin);
    }

    public User signIn(String email, String pw) {
        if (!uRepo.existsUserByEmail(email)) return null;
        User user = uRepo.findUserByEmail(email);
        if (passwordEncoder.matches(pw, user.getPw())) return user;
        return null;
    }


    @Transactional
    public User update(User user) {
        interestRepo.deleteAllByUserId(user.getId());
        interestRepo.saveAll(user.getInterestList());
        user = uRepo.save(user);
        return user;
    }

    public User findById(Integer id) {
        return uRepo.findById(id).get();
    }

    public User findByNickname(String nickname) {
        return uRepo.findUserByNickname(nickname);
    }

    public User findBySocialLogin(String socialLogin){
        return uRepo.findUserBySocialLogin(socialLogin); }

    public void delete(Integer userId) {
        uRepo.deleteById(userId);
    }
}
