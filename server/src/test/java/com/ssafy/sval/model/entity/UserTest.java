package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class UserTest {
    @Autowired
    UserService us;
    @Test
    public void test() {
        assertNotNull(us);
//        log.info("user studyList : {}", us.findById(1).getStudyList());
    }
}